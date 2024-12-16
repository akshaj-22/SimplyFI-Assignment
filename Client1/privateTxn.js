const { clientApplication } = require('./client')

let userClient = new clientApplication();

const transientData = {
    drugName: Buffer.from("Drug1"),
    drugBrand: Buffer.from("Brand1"),
    hospitalName: Buffer.from("Hospital1")
}

userClient.submitTxn(
    "hospital",
    "pharmachannel",
    "PharmaChaincode",
    "OrderContract",
    "privateTxn",
    transientData,
    "createOrder",
    "Order-01",
).then(result => {
    console.log(new TextDecoder().decode(result))
    console.log("Order successfully created")
})