import mongoose from 'mongoose';
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

import User from '@/backend/models/user';

export default NextAuth({
  providers: [
    Providers.Facebook({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
  ],

  database: process.env.MONGODB_URL,

  callbacks: {
    async signIn(user, account, profile) {
      if (user.image !== profile.picture.data.url) {
        await mongoose.connect(process.env.MONGODB_URL as string);
        await User.findByIdAndUpdate(user.id, {
          image: profile.picture.data.url,
        });
      }
      return true;
    },

    session(session, user) {
      // eslint-disable-next-line no-param-reassign
      session.user._id = user.id as string;
      return session;
    },
  },
});
