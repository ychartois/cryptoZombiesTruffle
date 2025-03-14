async function increase(duration) {
    // First, increase time
    await new Promise((resolve, reject) => {
        web3.currentProvider.send({
            jsonrpc: "2.0",
            method: "evm_increaseTime",
            params: [duration], // Increase time by 'duration' seconds
            id: new Date().getTime()
        }, (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });

    // Next, mine a new block
    await new Promise((resolve, reject) => {
        web3.currentProvider.send({
            jsonrpc: "2.0",
            method: "evm_mine",
            params: [],
            id: new Date().getTime()
        }, (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
}

const duration = {

    seconds: function (val) {
        return val;
    },
    minutes: function (val) {
        return val * this.seconds(60);
    },
    hours: function (val) {
        return val * this.minutes(60);
    },
    days: function (val) {
        return val * this.hours(24);
    },
}

module.exports = {
    increase,
    duration,
};
