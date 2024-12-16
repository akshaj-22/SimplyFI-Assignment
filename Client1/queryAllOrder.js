const { clientApplication } = require('./client')

let userClient = new clientApplication()
userClient.submitTxn(
    "hospital",
    "pharmachannel",
    "PharmaChaincode",
    "OrderContract",
    "queryTxn",
    "",
    "queryAllOrders"
).then(result => {
            // Decode the Uint8Array to a string
            const decodedString = new TextDecoder().decode(result);
    
            // Parse the string as JSON
            const jsonObject = JSON.parse(decodedString);
            
            console.log("Drug details: ")
            // Log the JSON object
            console.log(jsonObject);
});


