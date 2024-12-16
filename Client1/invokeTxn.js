const { clientApplication } = require('./client');

let userClient = new clientApplication();
userClient.submitTxn(
    "manufacturer",              // The MSP (Manufacturer)
    "pharmachannel",             // The channel name
    "PharmaChaincode",           // The chaincode name
    "DrugContract",              // The name of the contract
    "invokeTxn",                 // The function to call in the contract
    "",                          // Optional, could be used for transient data
    "createDrug",                // The name of the function in the chaincode
    "Drug-01",                   // Drug ID
    "Drug1",                     // Drug Name
    "Brand1",                    // Drug Brand
    "Bayer",                     // Manufacturer Name
    "2023-01-01",                // Manufacturing Date
    "2025-01-01"                 // Expiry Date
).then(result => {
    console.log(new TextDecoder().decode(result));
    console.log("Drug successfully created");
}).catch(error => {
    console.error("Error creating drug:", error);
});
