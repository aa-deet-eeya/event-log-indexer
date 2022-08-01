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

1. To run displayEvents run `ts-node ./displayEvents.ts`
2. To run insertEvents run `ts-node ./insertEvents.ts`


## Results

1. Insert Events
![Insert Events](https://raw.githubusercontent.com/aa-deet-eeya/event-log-indexer/main/img/insertEvents.png)

2. Display Events
![Display Events](https://raw.githubusercontent.com/aa-deet-eeya/event-log-indexer/main/img/displayEvents.png)
