assert = chai.assert


sdk = LoyaltyRtrSdk
modelName = 'Bank'


describe 'Model Class:  LoyaltyRtrSdk.models.Bank', ->
  modelClass = undefined
  instance = undefined
  fieldDefinition = undefined
  relationshipDefinition = undefined
  relatedModelClass = undefined
  
  beforeEach ->
    sdk.mockServer.resetDatastore()
    modelClass = sdk.getModel modelName
  
  afterEach ->
    modelClass = undefined
    instance = undefined
    fieldDefinition = undefined
    relationshipDefinition = undefined
    relatedModelClass = undefined
  
  it 'exists', ->
    assert.isDefined modelClass
  
  describe 'fields', ->
    
    it 'has a field `id` of type `integer`', ->
      fieldDefinition = _.findWhere(modelClass::fieldDefinitions, {name: 'id'})
      assert.isDefined fieldDefinition
      assert.equal fieldDefinition.type, 'integer'
    
    
    it 'has a field `android_url` of type `string`', ->
      fieldDefinition = _.findWhere(modelClass::fieldDefinitions, {name: 'android_url'})
      assert.isDefined fieldDefinition
      assert.equal fieldDefinition.type, 'string'
    
    
    it 'has a field `burn_offer_label` of type `string`', ->
      fieldDefinition = _.findWhere(modelClass::fieldDefinitions, {name: 'burn_offer_label'})
      assert.isDefined fieldDefinition
      assert.equal fieldDefinition.type, 'string'
    
    
    it 'has a field `contact_info` of type `string`', ->
      fieldDefinition = _.findWhere(modelClass::fieldDefinitions, {name: 'contact_info'})
      assert.isDefined fieldDefinition
      assert.equal fieldDefinition.type, 'string'
    
    
    it 'has a field `earn_offer_label` of type `string`', ->
      fieldDefinition = _.findWhere(modelClass::fieldDefinitions, {name: 'earn_offer_label'})
      assert.isDefined fieldDefinition
      assert.equal fieldDefinition.type, 'string'
    
    
    it 'has a field `icon` of type `string`', ->
      fieldDefinition = _.findWhere(modelClass::fieldDefinitions, {name: 'icon'})
      assert.isDefined fieldDefinition
      assert.equal fieldDefinition.type, 'string'
    
    
    it 'has a field `image_url` of type `string`', ->
      fieldDefinition = _.findWhere(modelClass::fieldDefinitions, {name: 'image_url'})
      assert.isDefined fieldDefinition
      assert.equal fieldDefinition.type, 'string'
    
    
    it 'has a field `ios_url` of type `string`', ->
      fieldDefinition = _.findWhere(modelClass::fieldDefinitions, {name: 'ios_url'})
      assert.isDefined fieldDefinition
      assert.equal fieldDefinition.type, 'string'
    
    
    it 'has a field `is_active` of type `boolean`', ->
      fieldDefinition = _.findWhere(modelClass::fieldDefinitions, {name: 'is_active'})
      assert.isDefined fieldDefinition
      assert.equal fieldDefinition.type, 'boolean'
    
    
    it 'has a field `loading_image_url` of type `string`', ->
      fieldDefinition = _.findWhere(modelClass::fieldDefinitions, {name: 'loading_image_url'})
      assert.isDefined fieldDefinition
      assert.equal fieldDefinition.type, 'string'
    
    
    it 'has a field `mobile_site_url` of type `string`', ->
      fieldDefinition = _.findWhere(modelClass::fieldDefinitions, {name: 'mobile_site_url'})
      assert.isDefined fieldDefinition
      assert.equal fieldDefinition.type, 'string'
    
    
    it 'has a field `name` of type `string`', ->
      fieldDefinition = _.findWhere(modelClass::fieldDefinitions, {name: 'name'})
      assert.isDefined fieldDefinition
      assert.equal fieldDefinition.type, 'string'
    
    
    it 'has a field `program_data_language_code` of type `string`', ->
      fieldDefinition = _.findWhere(modelClass::fieldDefinitions, {name: 'program_data_language_code'})
      assert.isDefined fieldDefinition
      assert.equal fieldDefinition.type, 'string'
    
    
    it 'has a field `program_language_code` of type `string`', ->
      fieldDefinition = _.findWhere(modelClass::fieldDefinitions, {name: 'program_language_code'})
      assert.isDefined fieldDefinition
      assert.equal fieldDefinition.type, 'string'
    
    
    it 'has a field `program_level_id` of type `string`', ->
      fieldDefinition = _.findWhere(modelClass::fieldDefinitions, {name: 'program_level_id'})
      assert.isDefined fieldDefinition
      assert.equal fieldDefinition.type, 'string'
    
    
    it 'has a field `tc_last_update_on` of type `date`', ->
      fieldDefinition = _.findWhere(modelClass::fieldDefinitions, {name: 'tc_last_update_on'})
      assert.isDefined fieldDefinition
      assert.equal fieldDefinition.type, 'date'
    
    
    it 'has a field `tc_summary` of type `string`', ->
      fieldDefinition = _.findWhere(modelClass::fieldDefinitions, {name: 'tc_summary'})
      assert.isDefined fieldDefinition
      assert.equal fieldDefinition.type, 'string'
    
    
    it 'has a field `tc_url` of type `string`', ->
      fieldDefinition = _.findWhere(modelClass::fieldDefinitions, {name: 'tc_url'})
      assert.isDefined fieldDefinition
      assert.equal fieldDefinition.type, 'string'
    
    
  
  describe 'relationships', ->
    
  
  describe 'creating', ->
    it 'performs POST requests and, on success, contains an additional model instance', (done) ->
      modelInstance = AP.utility.MockServer.Collections.createInstanceFor(modelClass)
      modelInstance.set(modelClass::idAttribute, undefined)
      collectionClass = AP.getActiveApp().getCollection("#{modelClass.name}All")
      collectionInstance = AP.getActiveApp().mockServer.getOrCreateCollectionInstanceFor(collectionClass)
      modelInstance.save null,
        success: ->
          assert.equal collectionInstance.length, 4
          assert.equal collectionInstance.last().get(modelClass::idAttribute), modelInstance.get(modelClass::idAttribute)
          done()
        error: -> done(new Error)
  
  describe 'updating', ->
    it 'performs PUT requests and, on success, contains an updated model instance with correct field values', (done) ->
      collectionClass = AP.getActiveApp().getCollection("#{modelClass.name}All")
      collectionInstance = AP.getActiveApp().mockServer.getOrCreateCollectionInstanceFor(collectionClass)
      length = collectionInstance.length
      modelInstance = collectionInstance.first()
      data = AP.utility.MockServer.Models.generateRandomInstanceDataFor(modelClass)
      delete data[modelClass::idAttribute]
      modelInstance.save data,
        success: ->
          assert.equal collectionInstance.length, length
          assert.equal collectionInstance.first().get(modelClass::idAttribute), modelInstance.get(modelClass::idAttribute)
          done()
        error: -> done(new Error)
        
  describe 'deleting', ->
    it 'performs DELETE requests and, on success, removes instance from datastore', (done) ->
      collectionClass = AP.getActiveApp().getCollection("#{modelClass.name}All")
      collectionInstance = AP.getActiveApp().mockServer.getOrCreateCollectionInstanceFor(collectionClass)
      length = collectionInstance.length
      modelInstance = collectionInstance.last().clone()
      modelInstance.delete
        success: ->
          assert.equal collectionInstance.length, (length - 1)
          done()
        error: -> done(new Error)
