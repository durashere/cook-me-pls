import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect, { NextConnect } from 'next-connect';
import { IUser } from './models/user';

export interface NextApiRequestExtended extends NextApiRequest {
  user: IUser;
}

export default function getHandler(): NextConnect<
  NextApiRequestExtended,
  NextApiResponse
> {
  return nextConnect<NextApiRequestExtended, NextApiResponse>({
    onError(error, req, res) {
      res.status(501).json({ error: `Sorry something Happened!` });
      // .json({ error: `Sorry something Happened! ${error.message}` });
    },
    onNoMatch(req, res) {
      res.status(405).json({ error: `Method  Not Allowed` });
      // res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    },
  });
}
