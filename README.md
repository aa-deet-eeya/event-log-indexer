# event-log-indexer
Scripts to store event data in the DB

This Repo includes two scripts,
1. displayEvents.ts : This Displays whatever is stored in the Database
2. insertEvents.ts : This Inserts Past Events in the Database


To run the scripts you would need the following in your .env file
```
MONGODB_URI=
PROVIDER_URL=
```

And apart from this install all the dependencies using `npm i`, and finally run the scripts using `ts-node`
