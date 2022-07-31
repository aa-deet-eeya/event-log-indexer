const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const EventSchema = new Schema({
    blockNumber: {
        type: Number,
		required: true
    },
    name: {
        type: String,
		required: true
    },
    user: {
        type: String,
		required: true
    },
    betAmount: {
        type: Number,
		required: true
    },
    amountLost: {
        type: Number,
		required: true
    },
    amountWon: {
        type: Number,
		required: true
    },
    userChoice: {
        type: Number,
		required: true
    },
    finalNum: {
        type: Number,
		required: true
    },
},{
	timestamps: true
});

const Events = mongoose.model('Events', EventSchema);

module.exports = Events;
