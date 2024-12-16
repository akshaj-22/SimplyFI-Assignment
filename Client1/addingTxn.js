const { clientApplication } = require('./client');

let userClient = new clientApplication();
userClient.submitTxn(
    "DVA",
    "pharmachannel",
    "pharmanet",
    "DrugContract",
    "addingTxn",
    "",
    "addUsableIngredients",
    "[\"Acetylsalicylic Acid\",\"Starch\", \"Hypromellose\", \"ing1\"]"
).then(result => {
    console.log(new TextDecoder().decode(result))
    console.log("Adding Usable ingredients created successfully")
})