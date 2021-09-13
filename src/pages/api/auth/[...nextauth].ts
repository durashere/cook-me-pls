import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

export default NextAuth({
  providers: [
    Providers.Facebook({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
  ],

  database: process.env.MONGODB_URL,

  callbacks: {
    async session(session, user) {
      return { ...session, user: { ...session.user, _id: user.id } };
    },
  },
});
