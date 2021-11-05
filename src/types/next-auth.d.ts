import NextAuth from 'next-auth';

import { IUser } from '@/backend/models/user';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: IUser;
  }

  interface User {
    id: string;
  }

  interface Profile {
    picture: {
      data: {
        url: string;
      };
    };
  }
}
