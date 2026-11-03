/// <reference types="vite/client" />

declare global {
  interface Window {
    __HUTAIB_PREVIEW__?: boolean;
    __HUTAIB_PREVIEW_BADGE__?: boolean;
    __HUTAIB_CLIENT_PREVIEW__?: boolean;
  }
}

export {};
