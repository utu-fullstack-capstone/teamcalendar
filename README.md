# Teamcalendar

Calendar scheduling app with social media feed and user management

## Getting Started

Clone the repository

```
git clone git@github.com:utu-fullstack-capstone/teamcalendar.git
```

Install dependencies

Backend

In the root folder, run

```
npm install
```

Frontend

In the **client** folder, run

```
npm install
```

## Configuration

In the **config** folder, add _default.json_ file

```
{
  "mongoURI": <mongodb connection string>,
  "twitter_consumer_key": <twitter api consumer key>,
  "twitter_consumer_secret": <twitter api consumer secret>,
  "twitter_access_token_key": <twitter access token key>,
  "twitter_access_token_secret": <twitter access token secret>
}

```

## Scripts

Start node backend server

```
npm run backend
```

Start react frontend

```
npm run client
```

Start backend and frontend concurrently

```
npm run dev
```

## Deployment

TODO: Add additional notes about how to deploy this on a live system

## Built With

- [MongoDB](https://www.mongodb.com/) - Document database
- [Express](https://expressjs.com/) - Node.js web application framework
- [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- [Redux](https://redux.js.org) - Predictable state container for JavaScript apps
- [Node](https://nodejs.org) - JavaScript runtime built on Chrome's V8 JavaScript engine.
- [Fullcalendar](https://fullcalendar.io/) - JavaScript calendar
