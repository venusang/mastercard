(function() {
  var assert, modelName, sdk;

  assert = chai.assert;

  sdk = LoyaltyRtrSdk;

  modelName = 'Rtr';

  describe('Model Class:  LoyaltyRtrSdk.models.Rtr', function() {
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
      it('has a field `cardholder_threshold` of type `integer`', function() {
        fieldDefinition = _.findWhere(modelClass.prototype.fieldDefinitions, {
          name: 'cardholder_threshold'
        });
        assert.isDefined(fieldDefinition);
        return assert.equal(fieldDefinition.type, 'integer');
      });
      it('has a field `communication_preference` of type `boolean`', function() {
        fieldDefinition = _.findWhere(modelClass.prototype.fieldDefinitions, {
          name: 'communication_preference'
        });
        assert.isDefined(fieldDefinition);
        return assert.equal(fieldDefinition.type, 'boolean');
      });
      it('has a field `current_cashback_card` of type `string`', function() {
        fieldDefinition = _.findWhere(modelClass.prototype.fieldDefinitions, {
          name: 'current_cashback_card'
        });
        assert.isDefined(fieldDefinition);
        return assert.equal(fieldDefinition.type, 'string');
      });
      it('has a field `current_cash_card_last_four` of type `string`', function() {
        fieldDefinition = _.findWhere(modelClass.prototype.fieldDefinitions, {
          name: 'current_cash_card_last_four'
        });
        assert.isDefined(fieldDefinition);
        return assert.equal(fieldDefinition.type, 'string');
      });
      it('has a field `email_address` of type `string`', function() {
        fieldDefinition = _.findWhere(modelClass.prototype.fieldDefinitions, {
          name: 'email_address'
        });
        assert.isDefined(fieldDefinition);
        return assert.equal(fieldDefinition.type, 'string');
      });
      it('has a field `issuer_lower_bound` of type `integer`', function() {
        fieldDefinition = _.findWhere(modelClass.prototype.fieldDefinitions, {
          name: 'issuer_lower_bound'
        });
        assert.isDefined(fieldDefinition);
        return assert.equal(fieldDefinition.type, 'integer');
      });
      it('has a field `issuer_upper_bound` of type `integer`', function() {
        fieldDefinition = _.findWhere(modelClass.prototype.fieldDefinitions, {
          name: 'issuer_upper_bound'
        });
        assert.isDefined(fieldDefinition);
        return assert.equal(fieldDefinition.type, 'integer');
      });
      it('has a field `next_transaction_only` of type `boolean`', function() {
        fieldDefinition = _.findWhere(modelClass.prototype.fieldDefinitions, {
          name: 'next_transaction_only'
        });
        assert.isDefined(fieldDefinition);
        return assert.equal(fieldDefinition.type, 'boolean');
      });
      it('has a field `notification_preference` of type `boolean`', function() {
        fieldDefinition = _.findWhere(modelClass.prototype.fieldDefinitions, {
          name: 'notification_preference'
        });
        assert.isDefined(fieldDefinition);
        return assert.equal(fieldDefinition.type, 'boolean');
      });
      it('has a field `opt_in_preference` of type `boolean`', function() {
        fieldDefinition = _.findWhere(modelClass.prototype.fieldDefinitions, {
          name: 'opt_in_preference'
        });
        assert.isDefined(fieldDefinition);
        return assert.equal(fieldDefinition.type, 'boolean');
      });
      it('has a field `program_level_id` of type `string`', function() {
        fieldDefinition = _.findWhere(modelClass.prototype.fieldDefinitions, {
          name: 'program_level_id'
        });
        assert.isDefined(fieldDefinition);
        return assert.equal(fieldDefinition.type, 'string');
      });
      it('has a field `ranac` of type `string`', function() {
        fieldDefinition = _.findWhere(modelClass.prototype.fieldDefinitions, {
          name: 'ranac'
        });
        assert.isDefined(fieldDefinition);
        return assert.equal(fieldDefinition.type, 'string');
      });
      it('validates a required field `ranac`', function() {
        instance = AP.utility.MockServer.Collections.createInstanceFor(modelClass);
        fieldDefinition = _.findWhere(modelClass.prototype.fieldDefinitions, {
          name: 'ranac'
        });
        assert.isTrue(fieldDefinition.required);
        assert.isTrue(instance.isValid());
        instance.set('ranac', void 0);
        return assert.isFalse(instance.isValid());
      });
      return it('has a field `redeemable_point_balance` of type `integer`', function() {
        fieldDefinition = _.findWhere(modelClass.prototype.fieldDefinitions, {
          name: 'redeemable_point_balance'
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
