/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { ChaincodeStub, ClientIdentity } = require('fabric-shim');
const { OrderContract } = require('../lib/order-contract');
const winston = require('winston');

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.should();
chai.use(chaiAsPromised);
chai.use(sinonChai);

class TestContext {
    constructor() {
        this.stub = sinon.createStubInstance(ChaincodeStub);
        this.clientIdentity = sinon.createStubInstance(ClientIdentity);
        this.logger = {
            getLogger: sinon.stub().returns(sinon.createStubInstance(winston.createLogger().constructor)),
            setLevel: sinon.stub(),
        };
    }
}

describe('OrderContract', () => {
    let contract;
    let ctx;

    beforeEach(() => {
        contract = new OrderContract();
        ctx = new TestContext();

        ctx.stub.getPrivateDataHash.withArgs('pharmaCollection', '1001').resolves(Buffer.from('mockdata'));
        ctx.stub.getPrivateData.withArgs('pharmaCollection', '1001').resolves(Buffer.from('{"drugName":"Aspirin","drugBrand":"Bayer","hospitalName":"City Hospital","assetType":"order"}'));
        
        ctx.clientIdentity.getMSPID.returns('hospitalMSP');
    });

    describe('#orderExists', () => {
        it('should return true if order exists', async () => {
            await contract.orderExists(ctx, '1001').should.eventually.be.true;
        });

        it('should return false if order does not exist', async () => {
            await contract.orderExists(ctx, '1003').should.eventually.be.false;
        });
    });

    describe('#createOrder', () => {
        it('should create an order if MSP ID is hospitalMSP', async () => {
            ctx.stub.getTransient.returns(new Map([
                ['drugName', Buffer.from('Aspirin')],
                ['drugBrand', Buffer.from('Bayer')],
                ['hospitalName', Buffer.from('City Hospital')],
            ]));

            await contract.createOrder(ctx, '1002');
            ctx.stub.putPrivateData.should.have.been.calledOnceWithExactly(
                'pharmaCollection',
                '1002',
                Buffer.from('{"drugName":"Aspirin","drugBrand":"Bayer","hospitalName":"City Hospital","assetType":"order"}')
            );
        });

        it('should throw an error if order already exists', async () => {
            ctx.stub.getTransient.returns(new Map([
                ['drugName', Buffer.from('Aspirin')],
                ['drugBrand', Buffer.from('Bayer')],
                ['hospitalName', Buffer.from('City Hospital')],
            ]));
            
            await contract.createOrder(ctx, '1001').should.be.rejectedWith(/The asset order 1001 already exists/);
        });

        it('should throw an error if MSP ID is not hospitalMSP', async () => {
            ctx.clientIdentity.getMSPID.returns('otherMSP');
            
            await contract.createOrder(ctx, '1003').should.be.rejectedWith(/Organisation with MSP ID otherMSP cannot perform this action/);
        });
    });

    describe('#readOrder', () => {
        it('should return an order if it exists', async () => {
            await contract.readOrder(ctx, '1001').should.eventually.deep.equal({
                drugName: 'Aspirin',
                drugBrand: 'Bayer',
                hospitalName: 'City Hospital',
                assetType: 'order',
            });
        });

        it('should throw an error if order does not exist', async () => {
            await contract.readOrder(ctx, '1003').should.be.rejectedWith(/The asset order 1003 does not exist/);
        });
    });

    describe('#deleteOrder', () => {
        it('should delete an order if MSP ID is hospitalMSP', async () => {
            await contract.deleteOrder(ctx, '1001');
            ctx.stub.deletePrivateData.should.have.been.calledOnceWithExactly('pharmaCollection', '1001');
        });

        it('should throw an error if order does not exist', async () => {
            await contract.deleteOrder(ctx, '1003').should.be.rejectedWith(/The asset order 1003 does not exist/);
        });

        it('should throw an error if MSP ID is not hospitalMSP', async () => {
            ctx.clientIdentity.getMSPID.returns('otherMSP');
            
            await contract.deleteOrder(ctx, '1001').should.be.rejectedWith(/Organization with MSP ID otherMSP cannot perform this action/);
        });
    });
});
