// File: pages/api/runModel.js

import { runModel } from './replicateAPI';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { prompt } = req.body;
  try {
    const result = await runModel(prompt);
    // res.status(200).json(result);
  } catch (error: any) {
    console.error('Error in replicateAPI:', error); // Log the error
    // res.status(500).json({ error: error.toString() });
  }
}