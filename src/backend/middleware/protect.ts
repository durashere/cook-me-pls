import { getSession } from 'next-auth/client';

import User from '@/backend/models/user';

const protect = () => {
  return async (req, res, next) => {
    try {
      const session = await getSession({ req });

      const currentUser = await User.findById(session.user._id);

      if (!currentUser) {
        return res.status(401).json({
          message: 'The user no longer exist.',
        });
      }

      req.user = currentUser;

      return next();
    } catch (error) {
      return res.status(401).json({
        message:
          'You are unauthorized to access the requested resource. Please log in.',
      });
    }
  };
};

export default protect;
