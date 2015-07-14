assert = chai.assert


sdk = LoyaltyRtrSdk
modelName = 'AppConfiguration'


describe 'Model Class:  LoyaltyRtrSdk.models.AppConfiguration', ->
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
    
    
    it 'has a field `colors` of type `hash`', ->
      fieldDefinition = _.findWhere(modelClass::fieldDefinitions, {name: 'colors'})
      assert.isDefined fieldDefinition
      assert.equal fieldDefinition.type, 'hash'
    
    
    it 'has a field `strings` of type `hash`', ->
      fieldDefinition = _.findWhere(modelClass::fieldDefinitions, {name: 'strings'})
      assert.isDefined fieldDefinition
      assert.equal fieldDefinition.type, 'hash'
    
    
  
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
