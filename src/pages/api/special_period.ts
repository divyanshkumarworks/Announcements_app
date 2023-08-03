import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../libs/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { start_date, end_date, scrip_cd } = req.query;

  try {
    const { db } = await connectToDatabase();
    const collection = db.collection('company_announcements');

    if (start_date && end_date) {

      const new_start_date = new Date(start_date)
      const new_end_date = new Date(end_date)

      const announcements = await collection
      .find({ "DT_TM": { "$gte" : new_start_date , "$lte": new_end_date} })
      .toArray();

      res.status(200).json(announcements);
    }
    if (scrip_cd) {
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
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}