# Announcement-App

This is a [Next.js](https://nextjs.org/) project created with MongoDB as Database.

### Demo 
[http://localhost:3000](http://localhost:3000)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## API Endpoints

The following API endpoints are available:

1. `GET /api/company?scrip_cd=<SCRIP_CD>` API to find announcements of a company(SCRIP_CD) or multiple companies.
2. `GET /api/special_period?start_date=<START_DATE>&end_date=<END_DATE>` API to find announcements over a specified period (start & end dates) or announcements of a company/group of companies over a period.
3. `GET /api/critical` API to find all the critical announcements or critical announcements of a list of companies over a given period.
4. `GET /api/past_two_days` API to retrieve announcements from the past 1-2 days in descending time order.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
