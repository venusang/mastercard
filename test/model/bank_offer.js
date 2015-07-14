(function() {
  var assert, modelName, sdk;

  assert = chai.assert;

  sdk = LoyaltyRtrSdk;

  modelName = 'BankOffer';

  describe('Model Class:  LoyaltyRtrSdk.models.BankOffer', function() {
    var fieldDefinition, instance, modelClass, relatedModelClass, relationshipDefinition;
    modelClass = void 0;
    instance = void 0;
    fieldDefinition = void 0;
    relationshipDefinition = void 0;
    relatedModelClass = void 0;
    beforeEach(function() {
      sdk.mockServer.resetDatastore();
      return modelClass = sdk.getModel(modelName);
    });
    afterEach(function() {
      modelClass = void 0;
      instance = void 0;
      fieldDefinition = void 0;
      relationshipDefinition = void 0;
      return relatedModelClass = void 0;
    });
    it('exists', function() {
      return assert.isDefined(modelClass);
    });
    describe('fields', function() {
      it('has a field `id` of type `integer`', function() {
        fieldDefinition = _.findWhere(modelClass.prototype.fieldDefinitions, {
          name: 'id'
        });
        assert.isDefined(fieldDefinition);
        return assert.equal(fieldDefinition.type, 'integer');
      });
      it('has a field `base_conversion_factor` of type `float`', function() {
        fieldDefinition = _.findWhere(modelClass.prototype.fieldDefinitions, {
          name: 'base_conversion_factor'
        });
        assert.isDefined(fieldDefinition);
        return assert.equal(fieldDefinition.type, 'float');
      });
      it('has a field `category` of type `string`', function() {
        fieldDefinition = _.findWhere(modelClass.prototype.fieldDefinitions, {
          name: 'category'
        });
        assert.isDefined(fieldDefinition);
        return assert.equal(fieldDefinition.type, 'string');
      });
      it('has a field `end_date` of type `date`', function() {
        fieldDefinition = _.findWhere(modelClass.prototype.fieldDefinitions, {
          name: 'end_date'
        });
        assert.isDefined(fieldDefinition);
        return assert.equal(fieldDefinition.type, 'date');
      });
      it('has a field `image` of type `string`', function() {
        fieldDefinition = _.findWhere(modelClass.prototype.fieldDefinitions, {
          name: 'image'
        });
        assert.isDefined(fieldDefinition);
        return assert.equal(fieldDefinition.type, 'string');
      });
      it('has a field `language_code` of type `string`', function() {
        fieldDefinition = _.findWhere(modelClass.prototype.fieldDefinitions, {
          name: 'language_code'
        });
        assert.isDefined(fieldDefinition);
        return assert.equal(fieldDefinition.type, 'string');
      });
      it('has a field `line_one` of type `string`', function() {
        fieldDefinition = _.findWhere(modelClass.prototype.fieldDefinitions, {
          name: 'line_one'
        });
        assert.isDefined(fieldDefinition);
        return assert.equal(fieldDefinition.type, 'string');
      });
      it('has a field `line_three` of type `string`', function() {
        fieldDefinition = _.findWhere(modelClass.prototype.fieldDefinitions, {
          name: 'line_three'
        });
        assert.isDefined(fieldDefinition);
        return assert.equal(fieldDefinition.type, 'string');
      });
      it('has a field `line_two` of type `string`', function() {
        fieldDefinition = _.findWhere(modelClass.prototype.fieldDefinitions, {
          name: 'line_two'
        });
        assert.isDefined(fieldDefinition);
        return assert.equal(fieldDefinition.type, 'string');
      });
      it('has a field `program_level_id` of type `string`', function() {
        fieldDefinition = _.findWhere(modelClass.prototype.fieldDefinitions, {
          name: 'program_level_id'
        });
        assert.isDefined(fieldDefinition);
        return assert.equal(fieldDefinition.type, 'string');
      });
      it('has a field `promo_conversion_rate` of type `float`', function() {
        fieldDefinition = _.findWhere(modelClass.prototype.fieldDefinitions, {
          name: 'promo_conversion_rate'
        });
        assert.isDefined(fieldDefinition);
        return assert.equal(fieldDefinition.type, 'float');
      });
      return it('has a field `start_date` of type `date`', function() {
        fieldDefinition = _.findWhere(modelClass.prototype.fieldDefinitions, {
          name: 'start_date'
        });
        assert.isDefined(fieldDefinition);
        return assert.equal(fieldDefinition.type, 'date');
      });
    });
    describe('relationships', function() {});
    describe('creating', function() {
      return it('performs POST requests and, on success, contains an additional model instance', function(done) {
        var collectionClass, collectionInstance, modelInstance;
        modelInstance = AP.utility.MockServer.Collections.createInstanceFor(modelClass);
        modelInstance.set(modelClass.prototype.idAttribute, void 0);
        collectionClass = AP.getActiveApp().getCollection("" + modelClass.name + "All");
        collectionInstance = AP.getActiveApp().mockServer.getOrCreateCollectionInstanceFor(collectionClass);
        return modelInstance.save(null, {
          success: function() {
            assert.equal(collectionInstance.length, 4);
            assert.equal(collectionInstance.last().get(modelClass.prototype.idAttribute), modelInstance.get(modelClass.prototype.idAttribute));
            return done();
          },
          error: function() {
            return done(new Error);
          }
        });
      });
    });
    describe('updating', function() {
      return it('performs PUT requests and, on success, contains an updated model instance with correct field values', function(done) {
        var collectionClass, collectionInstance, data, length, modelInstance;
        collectionClass = AP.getActiveApp().getCollection("" + modelClass.name + "All");
        collectionInstance = AP.getActiveApp().mockServer.getOrCreateCollectionInstanceFor(collectionClass);
        length = collectionInstance.length;
        modelInstance = collectionInstance.first();
        data = AP.utility.MockServer.Models.generateRandomInstanceDataFor(modelClass);
        delete data[modelClass.prototype.idAttribute];
        return modelInstance.save(data, {
          success: function() {
            assert.equal(collectionInstance.length, length);
            assert.equal(collectionInstance.first().get(modelClass.prototype.idAttribute), modelInstance.get(modelClass.prototype.idAttribute));
            return done();
          },
          error: function() {
            return done(new Error);
          }
        });
      });
    });
    return describe('deleting', function() {
      return it('performs DELETE requests and, on success, removes instance from datastore', function(done) {
        var collectionClass, collectionInstance, length, modelInstance;
        collectionClass = AP.getActiveApp().getCollection("" + modelClass.name + "All");
        collectionInstance = AP.getActiveApp().mockServer.getOrCreateCollectionInstanceFor(collectionClass);
        length = collectionInstance.length;
        modelInstance = collectionInstance.last().clone();
        return modelInstance["delete"]({
          success: function() {
            assert.equal(collectionInstance.length, length - 1);
            return done();
          },
          error: function() {
            return done(new Error);
          }
        });
      });
    });
  });

}).call(this);
