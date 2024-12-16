const { clientApplication } = require('./client');

let userClient = new clientApplication();
userClient.submitTxn(
    "manufacturer",
    "pharmachannel",
    "PharmaChaincode",
    "DrugContract",
    "transferTxn",
    "",
    "transferDrug",
    "Drug-01"
).then(result => {
    console.log(new TextDecoder().decode(result))
    console.log("Drug successfully Transfered to distributor")
})