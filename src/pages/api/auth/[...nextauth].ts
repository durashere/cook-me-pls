import { MongoClient } from 'mongodb';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import FacebookProvider from 'next-auth/providers/facebook';
import NextAuth from 'next-auth';

import User from '@/backend/models/user';
import dbConnect from '@/backend/dbConnect';

const {
  FACEBOOK_CLIENT_ID,
  FACEBOOK_CLIENT_SECRET,
  MONGODB_URL,
  NEXTAUTH_SECRET,
} = process.env;

if (!FACEBOOK_CLIENT_ID) {
  throw new Error(
    'Please define the FACEBOOK_CLIENT_ID environment variable inside .env.local'
  );
}
if (!FACEBOOK_CLIENT_SECRET) {
  throw new Error(
    'Please define the FACEBOOK_CLIENT_SECRET environment variable inside .env.local'
  );
}
if (!MONGODB_URL) {
  throw new Error(
    'Please define the MONGODB_URL environment variable inside .env.local'
  );
}
if (!NEXTAUTH_SECRET) {
  throw new Error(
    'Please define the NEXTAUTH_SECRET environment variable inside .env.local'
  );
}

const client = new MongoClient(MONGODB_URL);
const clientPromise = client.connect();

export default NextAuth({
  providers: [
    FacebookProvider({
      clientId: FACEBOOK_CLIENT_ID,
      clientSecret: FACEBOOK_CLIENT_SECRET,
    }),
  ],

  secret: NEXTAUTH_SECRET,

  adapter: MongoDBAdapter(clientPromise),

  callbacks: {
    async signIn({ user, profile }) {
      if (user.image !== profile.picture.data.url) {
        await dbConnect();
        await User.findByIdAndUpdate(user.id, {
          image: profile.picture.data.url,
        });
      }
      return true;
    },

    async session({ session, user }) {
      const updatedSession = {
        ...session,
        user: { ...session.user, _id: user.id },
      };
      return updatedSession;
    },
  },
});
