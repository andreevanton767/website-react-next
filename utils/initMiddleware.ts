import Cors from 'cors';
import { NextApiRequest, NextApiResponse } from 'next';

const applyCors = Cors({
  methods: ['GET', 'OPTIONS'],
});

/**
 * Add CORS to api handler req/res
 * @param req
 * @param res
 * @returns
 */
export const withCors = (req: NextApiRequest, res: NextApiResponse) =>
  new Promise((resolve, reject) => {
    applyCors(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
