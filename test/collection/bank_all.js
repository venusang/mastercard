(function() {
  var assert, collectionName, modelName, sdk;

  assert = chai.assert;

  sdk = LoyaltyRtrSdk;

  modelName = 'Bank';

  collectionName = 'BankAll';

  describe('Scope Collection Class:  LoyaltyRtrSdk.collections.BankAll', function() {
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
    it('uses the model `Bank`', function() {
      return assert.equal(modelClass, collectionClass.prototype.model);
    });
    it('performs GET requests and, on success, contains model instances of `Bank`', function(done) {
      collectionInstance = new collectionClass();
      return collectionInstance.fetch({
        success: function() {
          assert.equal(collectionInstance.length, 3);
          collectionInstance.each(function(modelInstance) {
            return assert.instanceOf(modelInstance, modelClass);
          });
          return done();
        },
        error: function() {
          return done(new Error);
        }
      });
    });
    return it('caches successful GET requests and, on AJAX failure, succeeds with cached response', function(done) {
      var collectionInstance1;
      collectionInstance1 = new collectionClass();
      return collectionInstance1.fetch({
        success: function() {
          var collectionInstance2, server, url;
          assert.equal(collectionInstance1.length, 3);
          collectionInstance1.each(function(modelInstance) {
            return assert.instanceOf(modelInstance, modelClass);
          });
          sdk.mockServer.server.restore();
          server = sinon.fakeServer.create();
          server.autoRespond = true;
          url = sdk.mockServer.getEndpointRegexWithQueryStringFor(collectionClass);
          server.respondWith('GET', url, [500, null, '']);
          collectionInstance2 = new collectionClass();
          return collectionInstance2.fetch({
            success: function() {
              assert.equal(server.requests.length, 1);
              assert.equal(server.requests[0].method, 'GET');
              assert.equal(server.requests[0].status, 500);
              assert.equal(collectionInstance2.length, 3);
              collectionInstance2.each(function(modelInstance, i) {
                assert.instanceOf(modelInstance, modelClass);
                return assert.deepEqual(modelInstance.toJSON(), collectionInstance1.at(i).toJSON());
              });
              if (AP.useMockServer) {
                sdk.mockServer = new AP.utility.MockServer(sdk);
              }
              return done();
            },
            error: function() {
              return done(new Error);
            }
          });
        }
      });
    });
  });

}).call(this);
