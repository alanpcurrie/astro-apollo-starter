/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
interface ImportMetaEnv {
  readonly COME_ENV: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
