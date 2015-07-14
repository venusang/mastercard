assert = chai.assert


sdk = LoyaltyRtrSdk
modelName = 'BankFaq'


describe 'Model Class:  LoyaltyRtrSdk.models.BankFaq', ->
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
    
    
    it 'has a field `bank_setting_id` of type `string`', ->
      fieldDefinition = _.findWhere(modelClass::fieldDefinitions, {name: 'bank_setting_id'})
      assert.isDefined fieldDefinition
      assert.equal fieldDefinition.type, 'string'
    
    
    it 'has a field `faq_answer` of type `string`', ->
      fieldDefinition = _.findWhere(modelClass::fieldDefinitions, {name: 'faq_answer'})
      assert.isDefined fieldDefinition
      assert.equal fieldDefinition.type, 'string'
    
    
    it 'has a field `faq_question` of type `string`', ->
      fieldDefinition = _.findWhere(modelClass::fieldDefinitions, {name: 'faq_question'})
      assert.isDefined fieldDefinition
      assert.equal fieldDefinition.type, 'string'
    
    
    it 'has a field `faq_url` of type `string`', ->
      fieldDefinition = _.findWhere(modelClass::fieldDefinitions, {name: 'faq_url'})
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
