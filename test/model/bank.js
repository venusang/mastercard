(function() {
  var assert, modelName, sdk;

  assert = chai.assert;

  sdk = LoyaltyRtrSdk;

  modelName = 'Bank';

  describe('Model Class:  LoyaltyRtrSdk.models.Bank', function() {
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
      it('has a field `android_url` of type `string`', function() {
        fieldDefinition = _.findWhere(modelClass.prototype.fieldDefinitions, {
          name: 'android_url'
        });
        assert.isDefined(fieldDefinition);
        return assert.equal(fieldDefinition.type, 'string');
      });
      it('has a field `burn_offer_label` of type `string`', function() {
        fieldDefinition = _.findWhere(modelClass.prototype.fieldDefinitions, {
          name: 'burn_offer_label'
        });
        assert.isDefined(fieldDefinition);
        return assert.equal(fieldDefinition.type, 'string');
      });
      it('has a field `contact_info` of type `string`', function() {
        fieldDefinition = _.findWhere(modelClass.prototype.fieldDefinitions, {
          name: 'contact_info'
        });
        assert.isDefined(fieldDefinition);
        return assert.equal(fieldDefinition.type, 'string');
      });
      it('has a field `earn_offer_label` of type `string`', function() {
        fieldDefinition = _.findWhere(modelClass.prototype.fieldDefinitions, {
          name: 'earn_offer_label'
        });
        assert.isDefined(fieldDefinition);
        return assert.equal(fieldDefinition.type, 'string');
      });
      it('has a field `icon` of type `string`', function() {
        fieldDefinition = _.findWhere(modelClass.prototype.fieldDefinitions, {
          name: 'icon'
        });
        assert.isDefined(fieldDefinition);
        return assert.equal(fieldDefinition.type, 'string');
      });
      it('has a field `image_url` of type `string`', function() {
        fieldDefinition = _.findWhere(modelClass.prototype.fieldDefinitions, {
          name: 'image_url'
        });
        assert.isDefined(fieldDefinition);
        return assert.equal(fieldDefinition.type, 'string');
      });
      it('has a field `ios_url` of type `string`', function() {
        fieldDefinition = _.findWhere(modelClass.prototype.fieldDefinitions, {
          name: 'ios_url'
        });
        assert.isDefined(fieldDefinition);
        return assert.equal(fieldDefinition.type, 'string');
      });
      it('has a field `is_active` of type `boolean`', function() {
        fieldDefinition = _.findWhere(modelClass.prototype.fieldDefinitions, {
          name: 'is_active'
        });
        assert.isDefined(fieldDefinition);
        return assert.equal(fieldDefinition.type, 'boolean');
      });
      it('has a field `loading_image_url` of type `string`', function() {
        fieldDefinition = _.findWhere(modelClass.prototype.fieldDefinitions, {
          name: 'loading_image_url'
        });
        assert.isDefined(fieldDefinition);
        return assert.equal(fieldDefinition.type, 'string');
      });
      it('has a field `mobile_site_url` of type `string`', function() {
        fieldDefinition = _.findWhere(modelClass.prototype.fieldDefinitions, {
          name: 'mobile_site_url'
        });
        assert.isDefined(fieldDefinition);
        return assert.equal(fieldDefinition.type, 'string');
      });
      it('has a field `name` of type `string`', function() {
        fieldDefinition = _.findWhere(modelClass.prototype.fieldDefinitions, {
          name: 'name'
        });
        assert.isDefined(fieldDefinition);
        return assert.equal(fieldDefinition.type, 'string');
      });
      it('has a field `program_data_language_code` of type `string`', function() {
        fieldDefinition = _.findWhere(modelClass.prototype.fieldDefinitions, {
          name: 'program_data_language_code'
        });
        assert.isDefined(fieldDefinition);
        return assert.equal(fieldDefinition.type, 'string');
      });
      it('has a field `program_language_code` of type `string`', function() {
        fieldDefinition = _.findWhere(modelClass.prototype.fieldDefinitions, {
          name: 'program_language_code'
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
      it('has a field `tc_last_update_on` of type `date`', function() {
        fieldDefinition = _.findWhere(modelClass.prototype.fieldDefinitions, {
          name: 'tc_last_update_on'
        });
        assert.isDefined(fieldDefinition);
        return assert.equal(fieldDefinition.type, 'date');
      });
      it('has a field `tc_summary` of type `string`', function() {
        fieldDefinition = _.findWhere(modelClass.prototype.fieldDefinitions, {
          name: 'tc_summary'
        });
        assert.isDefined(fieldDefinition);
        return assert.equal(fieldDefinition.type, 'string');
      });
      return it('has a field `tc_url` of type `string`', function() {
        fieldDefinition = _.findWhere(modelClass.prototype.fieldDefinitions, {
          name: 'tc_url'
        });
        assert.isDefined(fieldDefinition);
        return assert.equal(fieldDefinition.type, 'string');
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
