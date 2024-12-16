'use strict';

const { Contract } = require('fabric-contract-api');
const OrderContract = require('./order-contract')

class DrugContract extends Contract {
  // Function to create a drug (Manufacturer MSP check required)

  async drugExists(ctx, drugId) {
    const buffer = await ctx.stub.getState(drugId);
    return (!!buffer && buffer.length > 0);
    }

    async createDrug(ctx, drugId, drugName, drugBrand, manufacturerName, manufacturingDate, expiryDate) {
      const clientMSP = ctx.clientIdentity.getMSPID();
      if (clientMSP !== 'manufacturerMSP') {
          throw new Error('Only Manufacturer MSP can create drugs.');
      }
    
      const exists = await this.drugExists(ctx, drugId);
      if (exists) {
          throw new Error(`The drug ${drugId} already exists`);
      }
    
      // Default drugIngredients if not passed, you can modify this to whatever default ingredients you want
      const defaultIngredients = ["Unknown Ingredient"]; // This can be any default array of ingredients.
      const parsedIngredients = defaultIngredients;
    
      const drugAsset = {
          drugId,
          drugName,
          drugBrand,
          drugIngredients: parsedIngredients, // Default value or custom list of ingredients
          manufacturingDate,
          expiryDate,
          drugApproval: 'False',
          status: 'In Factory',
          ownedBy: manufacturerName,
          assetType: 'Pharmaceutical drug',
      };
    
      await ctx.stub.putState(drugId, Buffer.from(JSON.stringify(drugAsset)));
      return `Drug ${drugId} created successfully.`;
    }
    
  
  // Read created drug
  async readDrug(ctx, drugId) {
    const drugData = await ctx.stub.getState(drugId);
    if (!drugData || drugData.length === 0) {
      throw new Error(`Drug ${drugId} does not exist.`);
    }
    return JSON.parse(drugData.toString());
  }

  // Delete drug (Manufacturer MSP check required)
  async deleteDrug(ctx, drugId) {
    const clientMSP = ctx.clientIdentity.getMSPID();
    if (clientMSP !== 'manufacturerMSP') {
      throw new Error('Only Manufacturer MSP can delete drugs.');
    }
    const exists = await this.drugExists(ctx, drugId);
        if (!exists) {
            throw new Error(`The drug ${drugId} does not exist`);
        }
    await ctx.stub.deleteState(drugId);
    return `Drug ${drugId} deleted successfully.`;
  }

  // Add usable ingredients (DVA MSP check required)
  async addUsableIngredients(ctx, ingredients) {
    const clientMSP = ctx.clientIdentity.getMSPID();
    if (clientMSP !== 'DVAMSP') {
      throw new Error('Only DVA MSP can add usable ingredients.');
    }

    await ctx.stub.putState('usableIngredients', Buffer.from(JSON.stringify(ingredients)));
    return 'Usable ingredients added successfully.';
  }

  // Delete ingredient from usable ingredients list (DVA MSP check required)
  async deleteIngredient(ctx, ingredient) {
    const clientMSP = ctx.clientIdentity.getMSPID();
    if (clientMSP !== 'DVAMSP') {
      throw new Error('Only DVA MSP can delete ingredients.');
    }

    const ingredientsData = await ctx.stub.getState('usableIngredients');
    const ingredients = JSON.parse(ingredientsData.toString());
    const index = ingredients.indexOf(ingredient);

    if (index !== -1) {
      ingredients.splice(index, 1);
      await ctx.stub.putState('usableIngredients', Buffer.from(JSON.stringify(ingredients)));
      return `Ingredient ${ingredient} deleted successfully from usable ingredients.`;
    } else {
      throw new Error(`Ingredient ${ingredient} not found in usable ingredients.`);
    }
  }

  // Drug approval function (DVA MSP check required)
  async approveDrug(ctx, drugId) {
    const clientMSP = ctx.clientIdentity.getMSPID();
    if (clientMSP !== 'DVAMSP') {
      throw new Error('Only DVA MSP can approve drugs.');
    }

    const drugData = await ctx.stub.getState(drugId);
    if (!drugData || drugData.length === 0) {
      throw new Error(`Drug ${drugId} does not exist.`);
    }

    const drug = JSON.parse(drugData.toString());
    const oneYearInMilliseconds = 365 * 24 * 60 * 60 * 1000;
    const manufacturingDate = new Date(drug.manufacturingDate);
    const expiryDate = new Date(drug.expiryDate);

    if (expiryDate - manufacturingDate >= oneYearInMilliseconds) {
      drug.drugApproval = 'True';
      await ctx.stub.putState(drugId, Buffer.from(JSON.stringify(drug)));
      return `Drug ${drugId} approved successfully.`;
    } else {
      throw new Error("The drug cannot be approved due to the expiry date.");
    }
}


  // Transfer drug function (Manufacturer MSP check required)
  async transferDrug(ctx, drugId) {
    const clientMSP = ctx.clientIdentity.getMSPID();
    if (clientMSP !== 'manufacturerMSP') {
      throw new Error('Only Manufacturer MSP can transfer drugs.');
    }

    const drugData = await ctx.stub.getState(drugId);
    if (!drugData || drugData.length === 0) {
      throw new Error(`Drug ${drugId} does not exist.`);
    }

    const drug = JSON.parse(drugData.toString());
    if (drug.drugApproval === 'True') {
      drug.ownedBy = 'Distributor';
      drug.status = 'Assigned to distributor';
      await ctx.stub.putState(drugId, Buffer.from(JSON.stringify(drug)));
      return `Drug ${drugId} transferred to distributor successfully.`;
    } else {
      throw new Error('You cannot transfer this drug without approval.');
    }
  }

  async queryAllDrugs(ctx) {
    const queryString = {
        selector: {
            assetType: 'Pharmaceutical drug'
        }
    };

    let resultIterator = await ctx.stub.getQueryResult(JSON.stringify(queryString));
    let result = await this._getAllResults(resultIterator);
    return JSON.stringify(result)

    }

    async _getAllResults(iterator) {
        let allResult = [];

        let res = await iterator.next();
        while (!res.done) {
            if (res.value && res.value.value.toString()) {
                let jsonRes = {};
                
                    jsonRes.Key = res.value.key;
                    jsonRes.Record = JSON.parse(res.value.value.toString());
                
                allResult.push(jsonRes)
            }
            res = await iterator.next()
        }
        await iterator.close()
        return allResult
    }

  async matchOrder(ctx, drugId, orderId) {
    const orderContract = new OrderContract();

    const drugexists = await this.drugExists(ctx, drugId);
    if (!drugexists) {
        throw new Error(`The drug ${drugId} does not exist`);
    }
    const orderexists = await orderContract.orderExists(ctx, orderId);
    if (!orderexists) {
        throw new Error(`The order ${orderId} does not exist`);
    }
    const drugDetails = await this.readDrug(ctx, drugId);
    const orderDetails = await orderContract.readOrder(ctx, orderId);

    if (
        orderDetails.drugName === drugDetails.drugName &&
        orderDetails.drugBrand === drugDetails.drugBrand 
        // orderDetails.hospitalName === drugDetails.hospitalName
    ) {
        drugDetails.ownedBy = orderDetails.hospitalName;
        drugDetails.status = 'Assigned to a Hospital';

        const newDrugBuffer = Buffer.from(JSON.stringify(drugDetails));
        await ctx.stub.putState(drugId, newDrugBuffer);

        await orderContract.deleteOrder(ctx, orderId);
        return `Drug ${drugId} is assigned to ${orderDetails.hospitalName}`;
    } else {
        return 'Order is not matching';
    }
  }

  async getHistory(ctx, drugId) {
    const iterator = await ctx.stub.getHistoryForKey(drugId);
    const history = [];
    let res = await iterator.next();

    while (!res.done) {
        const record = {
            txId: res.value.txId,
            timestamp: res.value.timestamp,
            isDelete: res.value.isDelete,
            value: res.value.value.toString() ? JSON.parse(res.value.value.toString()) : null
        };
        history.push(record);
        res = await iterator.next();
    }

    await iterator.close();
    return JSON.stringify(history);
}

// Query all drugs by a specific status
async queryDrugsByStatus(ctx, status) {
  const queryString = {
      selector: {
          status: status
      }
  };
  const drugs = await this._getQueryResult(ctx, JSON.stringify(queryString));
  return JSON.stringify(drugs);
}

// Internal helper to query the ledger with a custom selector
async _getQueryResult(ctx, queryString) {
  const iterator = await ctx.stub.getQueryResult(queryString);
  const results = [];
  let res = await iterator.next();

  while (!res.done) {
      const result = res.value.value.toString('utf8');
      results.push(JSON.parse(result));
      res = await iterator.next();
  }

  await iterator.close();
  return results;
}
  
}

module.exports =DrugContract;
