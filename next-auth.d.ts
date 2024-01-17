import { DefaultSession } from '@auth/core/types';

declare module '@auth/core/types' {
  interface Session {
    user?: {
      id?: string;
      permissions?: string[];
    } & DefaultSession['user'];
  }
  interface User {
    permissions?: string[];
  }
}
