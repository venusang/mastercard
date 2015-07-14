(function() {
  var assert, collectionName, modelName, sdk;

  assert = chai.assert;

  sdk = LoyaltyRtrSdk;

  modelName = 'BankFaq';

  collectionName = 'BankFaqGetBankRanac';

  describe('Scope Collection Class:  LoyaltyRtrSdk.collections.BankFaqGetBankRanac', function() {
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
    return it('uses the model `BankFaq`', function() {
      return assert.equal(modelClass, collectionClass.prototype.model);
    });
  });

}).call(this);
