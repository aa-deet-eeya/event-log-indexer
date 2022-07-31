import Web3 from 'web3';
require('dotenv').config()

const DoubleOrNothingContractAddress = "0x37943b5B865A873CeC965A38b706F817d780B9E8";
const DoubleOrNothingABI = require('./ABI/DoubleOrNothing.json');
const Events = require('./models/Events');
const connectDB = require('./config');


(async ()=>{
    try {
        await connectDB();
        const web3 = new Web3(process.env.PROVIDER_URL);
        const DoubleOrNothingContract = new web3.eth.Contract(DoubleOrNothingABI, DoubleOrNothingContractAddress);

        const LatestUserLostEvent = await Events
            .find({ name: "UserLost" })
            .sort("-blockNumber")
            .limit(1);

            
        const LatestUserWonEvent = await Events
            .find({ name: "UserWon" })
            .sort("-blockNumber")
            .limit(1);
            
        const fromBlockUserLost = LatestUserLostEvent.length ? LatestUserLostEvent[0].blockNumber+1 : 0;
        const fromBlockUserWon = LatestUserWonEvent.length ? LatestUserWonEvent[0].blockNumber+1 : 0;
        console.log(`Searching from ${fromBlockUserLost} to latest Block for UserLost and ${fromBlockUserWon} Block for UserWon Events`);
        
        const lostEvents = await DoubleOrNothingContract.getPastEvents('UserLost', { fromBlock: fromBlockUserLost, toBlock: 'latest'})
        const wonEvents = await DoubleOrNothingContract.getPastEvents('UserWon', { fromBlock: fromBlockUserWon, toBlock: 'latest' })
        console.log(`Got ${lostEvents.length} UserLost Events and ${wonEvents.length} UserWon Events`);

        if(lostEvents.length || wonEvents.length) {
            const lostStore = lostEvents.map(_ => ({
                blockNumber: _.blockNumber,
                name: 'UserLost',
                user: _.returnValues.user,
                betAmount: +web3.utils.fromWei(_.returnValues.betAmount, 'ether'),
                amountLost: +web3.utils.fromWei(_.returnValues.amountLost, 'ether'),
                amountWon: 0,
                userChoice: +_.returnValues.userChoice,
                finalNum: +_.returnValues.finalNum,
            }));
            
            const wonStore = wonEvents.map(_ => ({
                blockNumber: _.blockNumber,
                name: 'UserWon',
                user: _.returnValues.user,
                betAmount: +web3.utils.fromWei(_.returnValues.betAmount, 'ether'),
                amountLost: 0,
                amountWon: +web3.utils.fromWei(_.returnValues.amountWon, 'ether'),
                userChoice: +_.returnValues.userChoice,
                finalNum: +_.returnValues.finalNum,
            }));
    
            Events
                .insertMany([...lostStore, ...wonStore])
                .then(res => {
                    console.log(`Successfully Inserted ${res.length} Events`);
                    process.exit();
                })
                .catch(e => {
                    console.log(`Error encountered: ${e}`);
                    process.exit(1);
                })
        } else {
            console.log(`Events Upto Date!`)
            process.exit();
        }
    } catch(err) {
        console.log(err);
        console.error(err.message);
        process.exit(1);
    }
})();
    