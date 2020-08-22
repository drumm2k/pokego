// Target the module containing the `ProcessEnv` interface
declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    NEXT_PUBLIC_API: string;
    NEXT_PUBLIC_REFRESH_TOKEN: string;
  }
}
