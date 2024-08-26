declare namespace NodeJS {
  interface ProcessEnv {
    EAS_BUILD: "true" | "false";
    GOOGLE_SERVICES_JSON: string;
    EAS_BUILD_PROJECT_ID: string;
  }
}
