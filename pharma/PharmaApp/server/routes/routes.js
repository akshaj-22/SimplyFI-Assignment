const express = require("express");
const router = express.Router();
const { clientApplication } = require("./client");

const userClient = new clientApplication();

// Route to create a drug (already provided)
router.post("/createdrug", async (req, res) => {
  try {
    const { drugId, drugName, drugBrand, manufacturerName, manufacturingDate, expiryDate } = req.body;

    let manufacturerClient = new clientApplication();

    const result = await manufacturerClient.submitTxn(
      "manufacturer",  // The MSP (Manufacturer)
      "pharmachannel", // The channel name
      "PharmaChaincode",     // The chaincode name
      "DrugContract",  // The name of the contract
      "invokeTxn",     // The function to call in the contract
      "",              // Optional, could be used for transient data
      "createDrug",    // The name of the function in the chaincode
      drugId,          // Drug ID
      drugName,        // Drug Name
      drugBrand,       // Drug Brand
      manufacturerName,  // Manufacturer Name
      manufacturingDate, // Manufacturing Date
      expiryDate         // Expiry Date
    );

    res.status(201).json({
      success: true,
      message: "Drug created successfully!",
      data: { result },
    });
  } catch (error) {
    console.error("Error creating drug:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create drug. Please check the details.",
      data: { error: error.message || "Unknown error occurred" },
    });
  }
});

// Route to read drug details
router.post("/readdrug", async (req, res) => {
  try {
      const { drugId } = req.body;

      if (!drugId) {
          return res.status(400).json({ success: false, message: "Drug ID is required." });
      }

      let userClient = new clientApplication();
      let drugDetails = await userClient.submitTxn(
          "manufacturer",  // The MSP (Manufacturer)
          "pharmachannel", // The channel name
          "PharmaChaincode",     // The chaincode name
          "DrugContract",  // The name of the contract
          "queryTxn",      // The function to call in the contract
          "",              // Optional, could be used for transient data
          "readDrug",      // The name of the function in the chaincode
          drugId           // Drug ID
      );

      // Decode the Uint8Array result to a string
      const data = new TextDecoder().decode(drugDetails);

      // Parse the string into a JSON object
      const value = JSON.parse(data);

      res.status(200).json({ success: true, message: "Drug details read successfully!", data: { value } });
  } catch (error) {
      console.error("Error reading drug:", error);
      res.status(500).json({ success: false, message: "Please check the Drug ID!", data: { error: error.message } });
  }
});

router.post('/approveDrug/:drugId', async (req, res) => {
  try {
    const { drugId } = req.params;

    if (!drugId) {
      return res.status(400).json({ success: false, message: "Drug ID is required." });
    }

    const manufacturerClient = new clientApplication();

    // Call the chaincode function
    const result = await manufacturerClient.submitTxn(
      "DVA",               // Channel name
      "pharmachannel",     // Channel ID
      "PharmaChaincode",   // Chaincode name
      "DrugContract", 
      "approveTxn",        // Function name
      "",
      "approveDrug",       // Arguments
      drugId               // Drug ID to approve
    );

    if (!result) {
      return res.status(500).json({
        success: false,
        message: "No response received from the chaincode.",
      });
    }

    // Convert the result to a readable format
    const decodedResult = Buffer.from(result).toString();
    res.status(200).json({
      success: true,
      message: decodedResult,
    });
  } catch (error) {
    console.error("Error approving drug:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while approving the drug.",
      error: error.message,
    });
  }
});

router.post('/transferDrug', async (req, res) => {
  try {
    
    const { drugId } = req.body;
    console.log("reached");
    if (!drugId) {
      return res.status(400).json({ success: false, message: "Drug ID is required." });
    }

    let manufacturerClient = new clientApplication();

    // Submit the transaction to transfer the drug
    let transferResult = await manufacturerClient.submitTxn(
      "manufacturer",         // Channel name (e.g., manufacturer)
      "pharmachannel",        // Channel ID
      "PharmaChaincode",            // Chaincode name
      "DrugContract",         // Contract name
      "transferTxn",          // Transaction type
      "",                     // Arguments
      "transferDrug",         // Function name (to transfer the drug)
      drugId                  // Drug ID to transfer
    );

    const transferData = new TextDecoder().decode(transferResult);
    res.status(200).json({
      success: true,
      message: 'Drug successfully transferred to distributor.',
      data: transferData,
    });
  } catch (error) {
    console.error("Error transferring drug:", error);
    res.status(500).json({ success: false, message: "An error occurred while transferring the drug.", error: error.message });
  }
});

router.post("/queryAllDrugs", async (req, res) => {
  try {
    let DVAClient = new clientApplication();
    let drug = await DVAClient.submitTxn(
      "DVA",
      "pharmachannel",
      "PharmaChaincode",
      "DrugContract",
      "queryTxn",
      "",
      "queryAllDrugs"
    );
    const data = new TextDecoder().decode(drug);
    const value = JSON.parse(data);

    res.status(200).json({
      success: true,
      message: "data query successfully!",
      data: { value },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Please check the ID!",
      data: { error },
    });
  }
});

// Create Order
router.post("/createorder", async (req, res) => {
  const { orderId, drugName,drugBrand,hospitalName } = req.body;

  if (!orderId || !drugName || !drugBrand || !hospitalName) {
      return res.status(400).json({ message: "All fields are required." });
  }

  try {
      const transientData = {
          drugName: Buffer.from(drugName),
          drugBrand:Buffer.from(drugBrand),
          hospitalName:Buffer.from(hospitalName)

          
      };

      const result = await userClient.submitTxn(
          "hospital",
          "pharmachannel",
          "PharmaChaincode",
          "OrderContract",
          "privateTxn",
          transientData,
          "createOrder",
          orderId
      );

      res.status(200).json({ message: "Order created successfully.", result: new TextDecoder().decode(result) });
  } catch (error) {
      console.error("Error creating order:", error);
      res.status(500).json({ message: "Error creating order.", error: error.message });
  }
});

router.get("/readOrder/:orderId", async (req, res) => {
  const { orderId } = req.params;

  try {
      const result = await userClient.submitTxn(
          "hospital",
          "pharmachannel",
          "PharmaChaincode",
          "OrderContract",
          "queryTxn",
          "",
          "readOrder",
          orderId
      );

      const decodedResult = new TextDecoder().decode(result);
      res.status(200).json(JSON.parse(decodedResult));
  } catch (error) {
      console.error("Error reading order:", error);
      res.status(500).json({ message: `Error reading order ${orderId}.`, error: error.message });
  }
});

router.post("/queryAllOrders", async (req, res) => {
  try {
    let hospitalClient = new clientApplication();
    let order = await hospitalClient.submitTxn(
      "hospital",
      "pharmachannel",
      "PharmaChaincode",
      "OrderContract",
      "queryTxn",
      "",
      "queryAllOrders"
    );
    const data = new TextDecoder().decode(order);
    const value = JSON.parse(data);

    res.status(200).json({
      success: true,
      message: "data query successfully!",
      data: { value },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Please check the ID!",
      data: { error },
    });
  }
});


module.exports = router;
