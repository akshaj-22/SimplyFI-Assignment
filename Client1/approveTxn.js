const { clientApplication } = require('./client');

let userClient = new clientApplication();
userClient.submitTxn(
    "DVA",
    "pharmachannel",
    "PharmaChaincode",
    "DrugContract",
    "approveTxn",
    "",
    "approveDrug",
    "Drug-01"
).then(result => {
    console.log(new TextDecoder().decode(result))
    console.log("Drug approved successfully")
})