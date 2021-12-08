import NextAuth from 'next-auth';

import { IUser } from '@/backend/models/user';

declare module 'next-auth' {
  interface Session {
    user: IUser;
  }

  interface Profile {
    picture: {
      data: {
        url: string;
      };
    };
  }
}
