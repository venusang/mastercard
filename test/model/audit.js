(function() {
  var assert, modelName, sdk;

  assert = chai.assert;

  sdk = LoyaltyRtrSdk;

  modelName = 'Audit';

  describe('Model Class:  LoyaltyRtrSdk.models.Audit', function() {
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
      it('has a field `action_desc` of type `string`', function() {
        fieldDefinition = _.findWhere(modelClass.prototype.fieldDefinitions, {
          name: 'action_desc'
        });
        assert.isDefined(fieldDefinition);
        return assert.equal(fieldDefinition.type, 'string');
      });
      it('has a field `after_value` of type `hash`', function() {
        fieldDefinition = _.findWhere(modelClass.prototype.fieldDefinitions, {
          name: 'after_value'
        });
        assert.isDefined(fieldDefinition);
        return assert.equal(fieldDefinition.type, 'hash');
      });
      it('has a field `before_value` of type `hash`', function() {
        fieldDefinition = _.findWhere(modelClass.prototype.fieldDefinitions, {
          name: 'before_value'
        });
        assert.isDefined(fieldDefinition);
        return assert.equal(fieldDefinition.type, 'hash');
      });
      it('has a field `field_name` of type `string`', function() {
        fieldDefinition = _.findWhere(modelClass.prototype.fieldDefinitions, {
          name: 'field_name'
        });
        assert.isDefined(fieldDefinition);
        return assert.equal(fieldDefinition.type, 'string');
      });
      it('has a field `performed_at` of type `time`', function() {
        fieldDefinition = _.findWhere(modelClass.prototype.fieldDefinitions, {
          name: 'performed_at'
        });
        assert.isDefined(fieldDefinition);
        return assert.equal(fieldDefinition.type, 'time');
      });
      it('has a field `program_level_id` of type `string`', function() {
        fieldDefinition = _.findWhere(modelClass.prototype.fieldDefinitions, {
          name: 'program_level_id'
        });
        assert.isDefined(fieldDefinition);
        return assert.equal(fieldDefinition.type, 'string');
      });
      return it('has a field `user_id` of type `integer`', function() {
        fieldDefinition = _.findWhere(modelClass.prototype.fieldDefinitions, {
          name: 'user_id'
        });
        assert.isDefined(fieldDefinition);
        return assert.equal(fieldDefinition.type, 'integer');
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
