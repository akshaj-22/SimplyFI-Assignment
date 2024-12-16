/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

// Function to get collection name for storing private data
async function getCollectionName(ctx) {
    return 'pharmaCollection';
}

class OrderContract extends Contract {

    // Check if an order already exists in the private data collection
    async orderExists(ctx, orderId) {
        const collectionName = await getCollectionName(ctx);
        const data = await ctx.stub.getPrivateDataHash(collectionName, orderId);
        return (!!data && data.length > 0);
    }

    // Create an order, restricted to hospitalMSP
    async createOrder(ctx, orderId) {
        const mspid = ctx.clientIdentity.getMSPID();
        if (mspid === 'hospitalMSP') {
            const exists = await this.orderExists(ctx, orderId);
            if (exists) {
                throw new Error(`The order ${orderId} already exists`);
            }

            const OrderAsset = {};
            const transientData = ctx.stub.getTransient();

            if (!transientData.has('drugName') || !transientData.has('drugBrand') || !transientData.has('hospitalName')) {
                throw new Error('Required fields are missing in transient data');
            }

            // Set the order parameters based on transient data
            OrderAsset.drugName = transientData.get('drugName').toString();
            OrderAsset.drugBrand = transientData.get('drugBrand').toString();
            OrderAsset.hospitalName = transientData.get('hospitalName').toString();
            OrderAsset.assetType = 'order';

            const collectionName = await getCollectionName(ctx);
            await ctx.stub.putPrivateData(collectionName, orderId, Buffer.from(JSON.stringify(OrderAsset)));
        } else {
            return `Organization with MSP ID ${mspid} cannot perform this action`;
        }
    }

    // Read an order by orderId
    async readOrder(ctx, orderId) {
        const exists = await this.orderExists(ctx, orderId);
        if (!exists) {
            throw new Error(`The asset order ${orderId} does not exist`);
        }

        const collectionName = await getCollectionName(ctx);
        const privateData = await ctx.stub.getPrivateData(collectionName, orderId);
        return JSON.parse(privateData.toString());
    }

    // Delete an order, restricted to hospitalMSP
    async deleteOrder(ctx, orderId) {
        const mspid = ctx.clientIdentity.getMSPID();
        if (mspid === 'hospitalMSP') {
            const exists = await this.orderExists(ctx, orderId);
            if (!exists) {
                throw new Error(`The asset order ${orderId} does not exist`);
            }
            const collectionName = await getCollectionName(ctx);
            await ctx.stub.deletePrivateData(collectionName, orderId);
        } else {
            throw new Error(`Organization with MSP ID ${mspid} cannot perform this action.`);
        }
    }

    // Utility function to get all results from the iterator for queries
    async queryAllOrders(ctx) {
        const queryString = {
            selector: {
                assetType: 'order'
            }
        };
        const collectionName = await getCollectionName(ctx);
        let resultIterator = await ctx.stub.getPrivateDataQueryResult(collectionName, JSON.stringify(queryString));
        let result = await this._getAllResults(resultIterator.iterator);
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
        iterator.close()
        return allResult
    }

}

module.exports = OrderContract;
