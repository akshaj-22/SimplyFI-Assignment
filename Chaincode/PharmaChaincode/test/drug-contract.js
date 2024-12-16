'use strict';

const { ChaincodeStub, ClientIdentity } = require('fabric-shim');
const { DrugContract } = require('../lib/drug-contract');  // Import the DrugContract
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
    }
}

describe('DrugContract', () => {
    let contract;
    let ctx;

    beforeEach(() => {
        contract = new DrugContract();
        ctx = new TestContext();
    });

    describe('#createDrug', () => {
        it('should create a drug if client MSP is Manufacturer', async () => {
            ctx.clientIdentity.getMSPID.returns('manufacturerMSP');
            ctx.stub.putState.resolves();

            await contract.createDrug(
                ctx, 'drug1', 'Aspirin', 'BrandA', JSON.stringify(['ingredient1', 'ingredient2']),
                'Manufacturer Inc.', '2023-01-01', '2024-01-01'
            );

            ctx.stub.putState.should.have.been.calledOnceWithExactly('drug1', sinon.match.any);
        });

        it('should throw an error if client MSP is not Manufacturer', async () => {
            ctx.clientIdentity.getMSPID.returns('nonManufacturerMSP');

            await contract.createDrug(
                ctx, 'drug1', 'Aspirin', 'BrandA', JSON.stringify(['ingredient1', 'ingredient2']),
                'Manufacturer Inc.', '2023-01-01', '2024-01-01'
            ).should.be.rejectedWith('Only Manufacturer MSP can create drugs.');
        });
    });

    describe('#readDrug', () => {
        it('should return a drug asset', async () => {
            ctx.stub.getState.withArgs('drug1').resolves(Buffer.from(JSON.stringify({ drugName: 'Aspirin' })));

            const result = await contract.readDrug(ctx, 'drug1');
            result.should.deep.equal({ drugName: 'Aspirin' });
        });

        it('should throw an error if the drug does not exist', async () => {
            ctx.stub.getState.withArgs('drug1').resolves(null);

            await contract.readDrug(ctx, 'drug1').should.be.rejectedWith('Drug drug1 does not exist.');
        });
    });

    describe('#deleteDrug', () => {
        it('should delete a drug if client MSP is Manufacturer', async () => {
            ctx.clientIdentity.getMSPID.returns('manufacturerMSP');
            ctx.stub.deleteState.resolves();

            await contract.deleteDrug(ctx, 'drug1');
            ctx.stub.deleteState.should.have.been.calledOnceWithExactly('drug1');
        });

        it('should throw an error if client MSP is not Manufacturer', async () => {
            ctx.clientIdentity.getMSPID.returns('nonManufacturerMSP');

            await contract.deleteDrug(ctx, 'drug1').should.be.rejectedWith('Only Manufacturer MSP can delete drugs.');
        });
    });

    describe('#addUsableIngredients', () => {
        it('should add usable ingredients if client MSP is DVA', async () => {
            ctx.clientIdentity.getMSPID.returns('DVA_MSP');
            ctx.stub.putState.resolves();

            await contract.addUsableIngredients(ctx, ['ingredient1', 'ingredient2']);
            ctx.stub.putState.should.have.been.calledOnceWithExactly('usableIngredients', sinon.match.any);
        });

        it('should throw an error if client MSP is not DVA', async () => {
            ctx.clientIdentity.getMSPID.returns('nonDVA_MSP');

            await contract.addUsableIngredients(ctx, ['ingredient1', 'ingredient2']).should.be.rejectedWith('Only DVA MSP can add usable ingredients.');
        });
    });

    describe('#deleteIngredient', () => {
        it('should delete an ingredient if client MSP is DVA', async () => {
            ctx.clientIdentity.getMSPID.returns('DVA_MSP');
            ctx.stub.getState.withArgs('usableIngredients').resolves(Buffer.from(JSON.stringify(['ingredient1', 'ingredient2'])));
            ctx.stub.putState.resolves();

            await contract.deleteIngredient(ctx, 'ingredient1');
            ctx.stub.putState.should.have.been.calledOnceWithExactly('usableIngredients', sinon.match.any);
        });

        it('should throw an error if client MSP is not DVA', async () => {
            ctx.clientIdentity.getMSPID.returns('nonDVA_MSP');

            await contract.deleteIngredient(ctx, 'ingredient1').should.be.rejectedWith('Only DVA MSP can delete ingredients.');
        });
    });

    describe('#approveDrug', () => {
        it('should approve a drug if client MSP is DVA and conditions are met', async () => {
            ctx.clientIdentity.getMSPID.returns('DVA_MSP');
            ctx.stub.getState.withArgs('drug1').resolves(Buffer.from(JSON.stringify({
                drugIngredients: ['ingredient1'],
                manufacturingDate: '2023-01-01',
                expiryDate: '2024-01-01'
            })));
            ctx.stub.getState.withArgs('usableIngredients').resolves(Buffer.from(JSON.stringify(['ingredient1'])));
            ctx.stub.putState.resolves();

            await contract.approveDrug(ctx, 'drug1');
            ctx.stub.putState.should.have.been.calledOnceWithExactly('drug1', sinon.match.any);
        });

        it('should throw an error if client MSP is not DVA', async () => {
            ctx.clientIdentity.getMSPID.returns('nonDVA_MSP');

            await contract.approveDrug(ctx, 'drug1').should.be.rejectedWith('Only DVA MSP can approve drugs.');
        });
    });

    describe('#transferDrug', () => {
        it('should transfer a drug if client MSP is Manufacturer and drug is approved', async () => {
            ctx.clientIdentity.getMSPID.returns('manufacturerMSP');
            ctx.stub.getState.withArgs('drug1').resolves(Buffer.from(JSON.stringify({ drugApproval: 'True' })));
            ctx.stub.putState.resolves();

            await contract.transferDrug(ctx, 'drug1');
            ctx.stub.putState.should.have.been.calledOnceWithExactly('drug1', sinon.match.any);
        });

        it('should throw an error if client MSP is not Manufacturer', async () => {
            ctx.clientIdentity.getMSPID.returns('nonManufacturerMSP');

            await contract.transferDrug(ctx, 'drug1').should.be.rejectedWith('Only Manufacturer MSP can transfer drugs.');
        });

        it('should throw an error if drug is not approved', async () => {
            ctx.clientIdentity.getMSPID.returns('manufacturerMSP');
            ctx.stub.getState.withArgs('drug1').resolves(Buffer.from(JSON.stringify({ drugApproval: 'False' })));

            await contract.transferDrug(ctx, 'drug1').should.be.rejectedWith('You cannot transfer this drug without approval.');
        });
    });
});
