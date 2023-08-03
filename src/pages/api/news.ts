import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../lib/mongodb';
import NewsModel from '../../src/models/News';

connectDB();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const news = await NewsModel.find({});
    res.status(200).json(news);
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}