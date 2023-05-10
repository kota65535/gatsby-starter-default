import React from 'react';
import Layout from '@/layouts/Layout';
import { ConfirmationDialog } from '@/components/common/ConfirmationDialog';
import { ResourceList, ResourceDetailsDialog, ResourceCreationDialog, Field } from '@/components/resources';
import * as yup from 'yup';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import short from 'short-uuid';
import { ClosableSnackbar } from '@/components/common/ClosableSnackbar';
import { TextField } from '@mui/material';
import { DropDownSelect } from '@/components/form/DropdownSelect';
import { RadioSelect } from '@/components/form/RadioSelect';
import { CheckboxSelect, fromBooleanMap, toBooleanMap } from '@/components/form/CheckboxSelect';
import { FileSelect } from '@/components/form/FileSelect';

export const Sex = {
  MAN: '男',
  WOMAN: '女',
  NONE: 'なし'
} as const;

export type Sex = (typeof Sex)[keyof typeof Sex];

export const Hobby = {
  CLIMBING: '登山',
  WALKING: '散歩',
  BOOK: '読書'
} as const;

export type Hobby = (typeof Hobby)[keyof typeof Hobby];

interface User {
  id: string;
  name: string;
  age: number;
  birth: string;
  sex: Sex;
  married: string;
  hobbies: Hobby[];
  files: Blob[];
}

interface UserForm extends Omit<User, 'hobbies'> {
  hobbies: { [keyof in Hobby]: boolean };
}

const fields: Field<UserForm>[] = [
  {
    name: 'id',
    label: 'ID',
    schema: yup.string().required(),
    component: (field, form) => {
      const { name } = field;
      const { errors } = form.formState;
      return (
        <TextField {...form.register(name)} error={name in errors} helperText={errors[name]?.message || ''} disabled />
      );
    }
  },
  {
    name: 'name',
    label: '名前',
    schema: yup.string().required(),
    component: (field, form) => {
      const { name } = field;
      const { errors } = form.formState;
      return <TextField {...form.register(name)} error={name in errors} helperText={errors[name]?.message || ''} />;
    }
  },
  {
    name: 'age',
    label: '年齢',
    schema: yup
      .number()
      .integer()
      .transform((v, o) => (o === '' ? undefined : v))
      .typeError(({ label }) => `${label} must be an integer.`)
      .required(),
    component: (field, form) => {
      const { name } = field;
      const { errors } = form.formState;
      return <TextField {...form.register(name)} error={name in errors} helperText={errors[name]?.message || ''} />;
    }
  },
  {
    name: 'birth',
    label: '誕生日',
    schema: yup.date().required(),
    component: (field, form) => {
      const { name } = field;
      const { errors } = form.formState;
      return (
        <TextField
          type="date"
          {...form.register(name)}
          error={name in errors}
          helperText={errors.birth?.message || ''}
        />
      );
    }
  },
  {
    name: 'sex',
    label: '性別',
    schema: yup.string().required(),
    component: (field, form) => {
      const { name, label } = field;
      return <DropDownSelect form={form} name={name as 'sex'} label={label} choices={Object.values(Sex)} />;
    }
  },
  {
    name: 'married',
    label: '未婚/既婚',
    schema: yup.string().required(),
    component: (field, form) => {
      const { name, label } = field;
      return <RadioSelect form={form} name={name as 'married'} label={label} choices={['未婚', '既婚']} />;
    }
  },
  {
    name: 'hobbies',
    label: '趣味',
    schema: yup.mixed<{ [keyof in Hobby]: boolean }>().test('atLeastOne', '1つ以上選択してください', (value) => {
      return Object.values(value || {}).some((v) => v);
    }),
    component: (field, form) => {
      const { name, label } = field;
      return <CheckboxSelect form={form} name={name} label={label} choices={Object.values(Hobby)} />;
    },
    valueGetter: (rawValue: { [keyof in Hobby]: boolean }) => {
      return Object.entries(rawValue)
        .filter(([, v]) => v)
        .map(([k]) => k)
        .join(',');
    }
  },
  {
    name: 'files',
    label: '写真',
    schema: yup.array().of(yup.mixed<File>().required()),
    component: (field, form) => {
      return <FileSelect form={form} name={'files'} />;
    },
    valueGetter: (rawValue: File[]) => {
      return rawValue.map((v) => v.name).join(',');
    }
  }
];

let resources: User[] = [
  {
    id: '1',
    name: '山田太郎',
    age: 12,
    birth: '2013-01-01',
    sex: '男',
    married: '未婚',
    hobbies: ['登山'],
    files: []
  },
  {
    id: '2',
    name: '山田次郎',
    age: 13,
    birth: '2013-01-02',
    sex: '女',
    married: '既婚',
    hobbies: ['読書'],
    files: []
  }
];

const formToResource = (form: UserForm): User => {
  return {
    ...form,
    hobbies: fromBooleanMap(form.hobbies)
  };
};

const resourceToForm = (resource: User): UserForm => {
  return {
    ...resource,
    hobbies: toBooleanMap(Hobby, resource.hobbies)
  };
};

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

const getUsers = async () => {
  await sleep(2000);
  return resources;
};

const createUser = async (user: Partial<User>): Promise<User> => {
  await sleep(2000);
  const created = { id: short.uuid(), ...user } as User;
  resources = [created, ...resources];
  return created;
};

const updateUser = async (user: User): Promise<User> => {
  await sleep(2000);
  const idx = resources.findIndex((r) => r.id === user.id);
  resources = [...resources.slice(0, idx), user, ...resources.slice(idx + 1)];
  return user;
};

const deleteUser = async (user: Partial<User>): Promise<void> => {
  resources = resources.filter((r) => r.id !== user.id);
};

const Index = () => {
  const usersQuery = useQuery<User[], Error>(['users'], () => getUsers());
  const queryClient = useQueryClient();
  const createUserMutation = useMutation<User, Error, Partial<User>>(createUser, {
    onSuccess: (result) => {
      queryClient.setQueryData<User[]>(['users'], (current) => {
        if (!current) {
          return current;
        }
        return [result, ...current];
      });
    },
    onError: (error, variables) => {
      setErrorText(error.message);
    }
  });
  const updateUserMutation = useMutation<User, Error, User>(updateUser, {
    onSuccess: (result) => {
      queryClient.setQueryData<User[]>(['users'], (current) => {
        if (!current) {
          return current;
        }
        const idx = current.findIndex((r) => r.id === result.id);
        return [...current.slice(0, idx), result, ...current.slice(idx + 1)];
      });
    },
    onError: (error, variables) => {
      setErrorText(error.message);
    }
  });
  const deleteUserMutation = useMutation<void, Error, User>(deleteUser, {
    onSuccess: (result, variable) => {
      queryClient.setQueryData<User[]>(['users'], (current) => {
        if (!current) {
          return current;
        }
        const idx = current.findIndex((r) => r.id === variable.id);
        return [...current.slice(0, idx), ...current.slice(idx + 1)];
      });
    },
    onError: (error, variables) => {
      setErrorText(error.message);
    }
  });
  const [selectedUser, setSelectedUser] = React.useState<UserForm | undefined>(undefined);
  const [createOpen, setCreateOpen] = React.useState(false);
  const [detailsOpen, setDetailsOpen] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  const [errorText, setErrorText] = React.useState('');

  const onCreate = () => {
    setCreateOpen(true);
  };
  const onCreateOK = async (data: Partial<UserForm>) => {
    const user = formToResource(data as UserForm);
    try {
      await createUserMutation.mutateAsync(user);
    } finally {
      setCreateOpen(false);
      setSelectedUser(undefined);
    }
  };
  const onCreateCancel = () => {
    setCreateOpen(false);
    setSelectedUser(undefined);
  };

  const onDetailsOpen = (data: UserForm) => {
    setDetailsOpen(true);
    setSelectedUser(data);
  };
  const onDetailsClose = () => {
    setDetailsOpen(false);
    setSelectedUser(undefined);
  };

  const onEdit = (user: UserForm) => {
    setEditOpen(true);
    setSelectedUser(user);
  };
  const onEditOK = async (data: UserForm) => {
    const user = formToResource(data);
    try {
      await updateUserMutation.mutateAsync(user);
    } finally {
      setEditOpen(false);
      setSelectedUser(undefined);
    }
  };
  const onEditCancel = () => {
    setEditOpen(false);
    setSelectedUser(undefined);
  };

  const onDelete = (data: UserForm) => {
    setDeleteOpen(true);
    setSelectedUser(data);
  };
  const onDeleteOK = (data: UserForm | undefined) => async () => {
    try {
      if (data) {
        const user = formToResource(data);
        await deleteUserMutation.mutateAsync(user);
      }
    } finally {
      setDeleteOpen(false);
      setSelectedUser(undefined);
    }
  };
  const onDeleteCancel = () => {
    setDeleteOpen(false);
    setSelectedUser(undefined);
  };

  const onRefresh = async () => {
    await usersQuery.refetch();
  };

  const onCloseSnackbar = () => {
    setErrorText('');
  };

  React.useEffect(() => {
    if (usersQuery.isError) {
      setErrorText(usersQuery.error.message);
    }
  }, [usersQuery.isError, usersQuery.error?.message]);

  let userFormValues: UserForm[] = [];
  if (usersQuery.isSuccess) {
    userFormValues = usersQuery.data.map(resourceToForm);
  }

  return (
    <Layout>
      <ClosableSnackbar message={errorText} onClose={onCloseSnackbar} />
      <ResourceList
        fields={fields}
        resources={userFormValues}
        onClick={onDetailsOpen}
        onCreate={onCreate}
        onEdit={onEdit}
        onDelete={onDelete}
        onRefresh={onRefresh}
        loading={usersQuery.isLoading || usersQuery.isRefetching}
      />
      {detailsOpen && (
        <ResourceDetailsDialog title="Details" fields={fields} resource={selectedUser} onClose={onDetailsClose} />
      )}
      {createOpen && (
        <ResourceCreationDialog
          title="New"
          fields={fields.filter((f) => f.name !== 'id')}
          resource={selectedUser}
          onOK={onCreateOK}
          onCancel={onCreateCancel}
        />
      )}
      {editOpen && (
        <ResourceCreationDialog
          title="Update"
          fields={fields}
          resource={selectedUser}
          onOK={onEditOK}
          onCancel={onEditCancel}
        />
      )}
      <ConfirmationDialog
        title="Deletion"
        body="Are you sure to delete?"
        open={deleteOpen}
        onOK={onDeleteOK(selectedUser)}
        onCancel={onDeleteCancel}
      ></ConfirmationDialog>
    </Layout>
  );
};

export default Index;
