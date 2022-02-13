import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { NextHandler } from 'next-connect';

import User, { IUser } from '@/backend/models/user';

interface NextApiRequestExtended extends NextApiRequest {
  user: IUser;
}

const protect =
  () =>
  async (
    req: NextApiRequestExtended,
    res: NextApiResponse,
    next: NextHandler
  ): Promise<void> => {
    try {
      const session = await getSession({ req });

      if (session) {
        const currentUser = await User.findById(session.user._id);

        if (!currentUser) {
          return res.status(401).json({
            message: 'The user no longer exist.',
          });
        }

        req.user = currentUser;
      }

      return next();
    } catch (error) {
      return res.status(401).json({
        message:
          'You are unauthorized to access the requested resource. Please log in.',
      });
    }
  };

export default protect;
