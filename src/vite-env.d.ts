/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_BE: string;
  readonly VITE_APP_PEER: string;
  readonly VITE_APP_PEER_PORT: string;
  // more env variables...
}
