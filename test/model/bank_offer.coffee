assert = chai.assert


sdk = LoyaltyRtrSdk
modelName = 'BankOffer'


describe 'Model Class:  LoyaltyRtrSdk.models.BankOffer', ->
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
    
    
    it 'has a field `base_conversion_factor` of type `float`', ->
      fieldDefinition = _.findWhere(modelClass::fieldDefinitions, {name: 'base_conversion_factor'})
      assert.isDefined fieldDefinition
      assert.equal fieldDefinition.type, 'float'
    
    
    it 'has a field `category` of type `string`', ->
      fieldDefinition = _.findWhere(modelClass::fieldDefinitions, {name: 'category'})
      assert.isDefined fieldDefinition
      assert.equal fieldDefinition.type, 'string'
    
    
    it 'has a field `end_date` of type `date`', ->
      fieldDefinition = _.findWhere(modelClass::fieldDefinitions, {name: 'end_date'})
      assert.isDefined fieldDefinition
      assert.equal fieldDefinition.type, 'date'
    
    
    it 'has a field `image` of type `string`', ->
      fieldDefinition = _.findWhere(modelClass::fieldDefinitions, {name: 'image'})
      assert.isDefined fieldDefinition
      assert.equal fieldDefinition.type, 'string'
    
    
    it 'has a field `language_code` of type `string`', ->
      fieldDefinition = _.findWhere(modelClass::fieldDefinitions, {name: 'language_code'})
      assert.isDefined fieldDefinition
      assert.equal fieldDefinition.type, 'string'
    
    
    it 'has a field `line_one` of type `string`', ->
      fieldDefinition = _.findWhere(modelClass::fieldDefinitions, {name: 'line_one'})
      assert.isDefined fieldDefinition
      assert.equal fieldDefinition.type, 'string'
    
    
    it 'has a field `line_three` of type `string`', ->
      fieldDefinition = _.findWhere(modelClass::fieldDefinitions, {name: 'line_three'})
      assert.isDefined fieldDefinition
      assert.equal fieldDefinition.type, 'string'
    
    
    it 'has a field `line_two` of type `string`', ->
      fieldDefinition = _.findWhere(modelClass::fieldDefinitions, {name: 'line_two'})
      assert.isDefined fieldDefinition
      assert.equal fieldDefinition.type, 'string'
    
    
    it 'has a field `program_level_id` of type `string`', ->
      fieldDefinition = _.findWhere(modelClass::fieldDefinitions, {name: 'program_level_id'})
      assert.isDefined fieldDefinition
      assert.equal fieldDefinition.type, 'string'
    
    
    it 'has a field `promo_conversion_rate` of type `float`', ->
      fieldDefinition = _.findWhere(modelClass::fieldDefinitions, {name: 'promo_conversion_rate'})
      assert.isDefined fieldDefinition
      assert.equal fieldDefinition.type, 'float'
    
    
    it 'has a field `start_date` of type `date`', ->
      fieldDefinition = _.findWhere(modelClass::fieldDefinitions, {name: 'start_date'})
      assert.isDefined fieldDefinition
      assert.equal fieldDefinition.type, 'date'
    
    
  
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
