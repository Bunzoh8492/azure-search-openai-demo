/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APP_AUTH: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
