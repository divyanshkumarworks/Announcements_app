import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../libs/mongodb';

const isStringArray = (value: any): value is string[] =>
  Array.isArray(value) && value.every((item) => typeof item === 'string');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const queryvalues = req.query.scrip_cd?.toString().split(',');

  const { db } = await connectToDatabase();
  const collection = db.collection('company_announcements');
  try {
    if (!queryvalues || !isStringArray(queryvalues)) {
      return res.status(400).json({ error: 'Invalid array provided in query parameters.' });
    }
    if (typeof(queryvalues) !== "string" ) {
    
      const convertedArray = queryvalues.map((value) => Number(value));
      const announcements = await collection
        .find({ SCRIP_CD: { $in : convertedArray} })
        .toArray();

      res.status(200).json(announcements);
    }
    else {
      const announcements = await collection
        .find({ SCRIP_CD: parseInt(queryvalues as string) })
        .toArray();

      res.status(200).json(announcements);
    } 
  }
  catch (error: any) { // Type assertion here to handle 'unknown'
    console.error('Error occurred:', error);
    res.status(500).json({ message: error.message || 'An internal server error occurred.' });
  }
}