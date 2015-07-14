(function() {
  var assert, collectionName, modelName, sdk;

  assert = chai.assert;

  sdk = LoyaltyRtrSdk;

  modelName = 'BankOffer';

  collectionName = 'BankOfferReturnActiveBankOffers';

  describe('Scope Collection Class:  LoyaltyRtrSdk.collections.BankOfferReturnActiveBankOffers', function() {
    var collectionClass, collectionInstance, modelClass, modelInstance;
    modelClass = void 0;
    collectionClass = void 0;
    modelInstance = void 0;
    collectionInstance = void 0;
    beforeEach(function() {
      sdk.mockServer.resetDatastore();
      modelClass = sdk.getModel(modelName);
      return collectionClass = sdk.getCollection(collectionName);
    });
    afterEach(function() {
      modelClass = void 0;
      collectionClass = void 0;
      modelInstance = void 0;
      return collectionInstance = void 0;
    });
    it('exists', function() {
      return assert.isDefined(collectionClass);
    });
    return it('uses the model `BankOffer`', function() {
      return assert.equal(modelClass, collectionClass.prototype.model);
    });
  });

}).call(this);
