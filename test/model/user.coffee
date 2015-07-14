assert = chai.assert


sdk = LoyaltyRtrSdk
modelName = 'User'


describe 'Model Class:  LoyaltyRtrSdk.models.User', ->
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
    
    
    it 'has a field `answer` of type `string`', ->
      fieldDefinition = _.findWhere(modelClass::fieldDefinitions, {name: 'answer'})
      assert.isDefined fieldDefinition
      assert.equal fieldDefinition.type, 'string'
    
    
    it 'has a field `ban` of type `string`', ->
      fieldDefinition = _.findWhere(modelClass::fieldDefinitions, {name: 'ban'})
      assert.isDefined fieldDefinition
      assert.equal fieldDefinition.type, 'string'
    
    
    it 'has a field `password` of type `string`', ->
      fieldDefinition = _.findWhere(modelClass::fieldDefinitions, {name: 'password'})
      assert.isDefined fieldDefinition
      assert.equal fieldDefinition.type, 'string'
    
    
    it 'has a field `password_confirmation` of type `string`', ->
      fieldDefinition = _.findWhere(modelClass::fieldDefinitions, {name: 'password_confirmation'})
      assert.isDefined fieldDefinition
      assert.equal fieldDefinition.type, 'string'
    
    
    it 'has a field `password_digest` of type `string`', ->
      fieldDefinition = _.findWhere(modelClass::fieldDefinitions, {name: 'password_digest'})
      assert.isDefined fieldDefinition
      assert.equal fieldDefinition.type, 'string'
    
    
    it 'has a field `question_code` of type `string`', ->
      fieldDefinition = _.findWhere(modelClass::fieldDefinitions, {name: 'question_code'})
      assert.isDefined fieldDefinition
      assert.equal fieldDefinition.type, 'string'
    
    
    it 'has a field `ranac` of type `string`', ->
      fieldDefinition = _.findWhere(modelClass::fieldDefinitions, {name: 'ranac'})
      assert.isDefined fieldDefinition
      assert.equal fieldDefinition.type, 'string'
    
    
    it 'has a field `role` of type `string`', ->
      fieldDefinition = _.findWhere(modelClass::fieldDefinitions, {name: 'role'})
      assert.isDefined fieldDefinition
      assert.equal fieldDefinition.type, 'string'
    
    
    it 'has a field `username` of type `string`', ->
      fieldDefinition = _.findWhere(modelClass::fieldDefinitions, {name: 'username'})
      assert.isDefined fieldDefinition
      assert.equal fieldDefinition.type, 'string'
    
    
    it 'has a field `x_session_id` of type `string`', ->
      fieldDefinition = _.findWhere(modelClass::fieldDefinitions, {name: 'x_session_id'})
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
