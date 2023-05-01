interface AppConfig {
  env: string
  version: string
  amplify: object
}

export const initAppConfig = async () => {
  console.time("fetchConfig");
  const res = await fetch("/config.json");
  console.timeEnd("fetchConfig");
  appConfig = await res.json();
  console.info(appConfig);
  return appConfig;
};

export let appConfig: AppConfig;
