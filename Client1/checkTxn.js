const { clientApplication } = require('./client')

let userClient = new clientApplication()
userClient.submitTxn(
    "manufacturer",
    "pharmachannel",
    "PharmaChaincode",
    "DrugContract",
    "queryTxn",
    "",
    "readDrug",
    "Drug-01",
).then(result => {
            // Decode the Uint8Array to a string
            const decodedString = new TextDecoder().decode(result);
    
            // Parse the string as JSON
            const jsonObject = JSON.parse(decodedString);
            
            console.log("Drug details: ")
            // Log the JSON object
            console.log(jsonObject);
});


