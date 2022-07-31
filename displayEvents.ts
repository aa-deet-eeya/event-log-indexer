(async ()=>{
    try {
        const Events = require('./models/Events');
        const connectDB = require('./config');

        await connectDB();
        const allEvents = await Events
            .find({}, {
                _id: 0,
                blockNumber: 1,
                name: 1,
                user: 1,
                betAmount: 1,
                amountLost: 1,
                amountWon: 1,
                userChoice: 1,
                finalNum: 1,
            })
            .sort("-blockNumber")
            .lean()

        console.table(allEvents)
        process.exit(0);
    } catch(err) {
        console.log(err);
        console.error(err.message);
        process.exit(1);
    }
})();
    