assert = chai.assert


sdk = LoyaltyRtrSdk
modelName = 'Message'


describe 'Model Class:  LoyaltyRtrSdk.models.Message', ->
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
    
    it 'has a field `id` of type `string`', ->
      fieldDefinition = _.findWhere(modelClass::fieldDefinitions, {name: 'id'})
      assert.isDefined fieldDefinition
      assert.equal fieldDefinition.type, 'string'
    
    
    it 'has a field `available_points` of type `integer`', ->
      fieldDefinition = _.findWhere(modelClass::fieldDefinitions, {name: 'available_points'})
      assert.isDefined fieldDefinition
      assert.equal fieldDefinition.type, 'integer'
    
    
    it 'has a field `created_on` of type `time`', ->
      fieldDefinition = _.findWhere(modelClass::fieldDefinitions, {name: 'created_on'})
      assert.isDefined fieldDefinition
      assert.equal fieldDefinition.type, 'time'
    
    
    it 'has a field `is_read` of type `boolean`', ->
      fieldDefinition = _.findWhere(modelClass::fieldDefinitions, {name: 'is_read'})
      assert.isDefined fieldDefinition
      assert.equal fieldDefinition.type, 'boolean'
    
    
    it 'has a field `last_four_digits` of type `string`', ->
      fieldDefinition = _.findWhere(modelClass::fieldDefinitions, {name: 'last_four_digits'})
      assert.isDefined fieldDefinition
      assert.equal fieldDefinition.type, 'string'
    
    
    it 'has a field `message_field` of type `string`', ->
      fieldDefinition = _.findWhere(modelClass::fieldDefinitions, {name: 'message_field'})
      assert.isDefined fieldDefinition
      assert.equal fieldDefinition.type, 'string'
    
    
    it 'has a field `message_type` of type `string`', ->
      fieldDefinition = _.findWhere(modelClass::fieldDefinitions, {name: 'message_type'})
      assert.isDefined fieldDefinition
      assert.equal fieldDefinition.type, 'string'
    
    
    it 'has a field `points_redeemed` of type `integer`', ->
      fieldDefinition = _.findWhere(modelClass::fieldDefinitions, {name: 'points_redeemed'})
      assert.isDefined fieldDefinition
      assert.equal fieldDefinition.type, 'integer'
    
    
    it 'has a field `program_level_id` of type `string`', ->
      fieldDefinition = _.findWhere(modelClass::fieldDefinitions, {name: 'program_level_id'})
      assert.isDefined fieldDefinition
      assert.equal fieldDefinition.type, 'string'
    
    
    it 'has a field `ranac` of type `string`', ->
      fieldDefinition = _.findWhere(modelClass::fieldDefinitions, {name: 'ranac'})
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
