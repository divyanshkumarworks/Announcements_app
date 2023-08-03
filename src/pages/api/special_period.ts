import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../libs/mongodb';

const isStringArray = (value: any): value is string[] =>
  Array.isArray(value) && value.every((item) => typeof item === 'string');

  const convertToDate = (value: string | string[]): Date | null => {
  if (Array.isArray(value)) {
    value = value[0]; // Take the first value from the array
  }

  return new Date(value);
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { start_date, end_date, scrip_cd } = req.query;

  try {
    const { db } = await connectToDatabase();
    const collection = db.collection('company_announcements');


    if (!start_date || !end_date) {
      return res.status(400).json({ error: 'start_date and end_date are required.' });
    }

    const new_start_date = convertToDate(start_date);
    const new_end_date = convertToDate(end_date);

    if (new_start_date === null || new_end_date === null) {
      return res.status(400).json({ error: 'Invalid date format provided in query parameters.' });
    }


    if (start_date && end_date) {

      const announcements = await collection
      .find({ "DT_TM": { "$gte" : new_start_date , "$lte": new_end_date} })
      .toArray();

      res.status(200).json(announcements);
    }
    if (scrip_cd) {
      if (!scrip_cd || !isStringArray(scrip_cd)) {
        return res.status(400).json({ error: 'Invalid array provided in query parameters.' });
      }
      if (typeof(scrip_cd) !== "string"){

        const convertedArray = scrip_cd.map((value) => Number(value));

        const announcements = await collection
        .find({ SCRIP_CD: { $in : convertedArray } })
        .toArray();

        res.status(200).json(announcements);
      }else if (typeof(scrip_cd) === "string") {
        const announcements = await collection
        .find({ SCRIP_CD: parseInt(scrip_cd as string) })
        .toArray();

        res.status(200).json(announcements);
      }
    }
  } catch (error: any) {
    console.error('Error occurred:', error);
    res.status(500).json({ message: 'An internal server error occurred.' });
  }
}