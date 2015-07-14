assert = chai.assert


sdk = LoyaltyRtrSdk
modelName = 'Rtr'


describe 'Model Class:  LoyaltyRtrSdk.models.Rtr', ->
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
    
    
    it 'has a field `cardholder_threshold` of type `integer`', ->
      fieldDefinition = _.findWhere(modelClass::fieldDefinitions, {name: 'cardholder_threshold'})
      assert.isDefined fieldDefinition
      assert.equal fieldDefinition.type, 'integer'
    
    
    it 'has a field `communication_preference` of type `boolean`', ->
      fieldDefinition = _.findWhere(modelClass::fieldDefinitions, {name: 'communication_preference'})
      assert.isDefined fieldDefinition
      assert.equal fieldDefinition.type, 'boolean'
    
    
    it 'has a field `current_cashback_card` of type `string`', ->
      fieldDefinition = _.findWhere(modelClass::fieldDefinitions, {name: 'current_cashback_card'})
      assert.isDefined fieldDefinition
      assert.equal fieldDefinition.type, 'string'
    
    
    it 'has a field `current_cash_card_last_four` of type `string`', ->
      fieldDefinition = _.findWhere(modelClass::fieldDefinitions, {name: 'current_cash_card_last_four'})
      assert.isDefined fieldDefinition
      assert.equal fieldDefinition.type, 'string'
    
    
    it 'has a field `email_address` of type `string`', ->
      fieldDefinition = _.findWhere(modelClass::fieldDefinitions, {name: 'email_address'})
      assert.isDefined fieldDefinition
      assert.equal fieldDefinition.type, 'string'
    
    
    it 'has a field `issuer_lower_bound` of type `integer`', ->
      fieldDefinition = _.findWhere(modelClass::fieldDefinitions, {name: 'issuer_lower_bound'})
      assert.isDefined fieldDefinition
      assert.equal fieldDefinition.type, 'integer'
    
    
    it 'has a field `issuer_upper_bound` of type `integer`', ->
      fieldDefinition = _.findWhere(modelClass::fieldDefinitions, {name: 'issuer_upper_bound'})
      assert.isDefined fieldDefinition
      assert.equal fieldDefinition.type, 'integer'
    
    
    it 'has a field `next_transaction_only` of type `boolean`', ->
      fieldDefinition = _.findWhere(modelClass::fieldDefinitions, {name: 'next_transaction_only'})
      assert.isDefined fieldDefinition
      assert.equal fieldDefinition.type, 'boolean'
    
    
    it 'has a field `notification_preference` of type `boolean`', ->
      fieldDefinition = _.findWhere(modelClass::fieldDefinitions, {name: 'notification_preference'})
      assert.isDefined fieldDefinition
      assert.equal fieldDefinition.type, 'boolean'
    
    
    it 'has a field `opt_in_preference` of type `boolean`', ->
      fieldDefinition = _.findWhere(modelClass::fieldDefinitions, {name: 'opt_in_preference'})
      assert.isDefined fieldDefinition
      assert.equal fieldDefinition.type, 'boolean'
    
    
    it 'has a field `program_level_id` of type `string`', ->
      fieldDefinition = _.findWhere(modelClass::fieldDefinitions, {name: 'program_level_id'})
      assert.isDefined fieldDefinition
      assert.equal fieldDefinition.type, 'string'
    
    
    it 'has a field `ranac` of type `string`', ->
      fieldDefinition = _.findWhere(modelClass::fieldDefinitions, {name: 'ranac'})
      assert.isDefined fieldDefinition
      assert.equal fieldDefinition.type, 'string'
    
    it 'validates a required field `ranac`', ->
      instance = AP.utility.MockServer.Collections.createInstanceFor modelClass
      fieldDefinition = _.findWhere(modelClass::fieldDefinitions, {name: 'ranac'})
      assert.isTrue fieldDefinition.required
      assert.isTrue instance.isValid()
      instance.set 'ranac', undefined
      assert.isFalse instance.isValid()
    
    
    it 'has a field `redeemable_point_balance` of type `integer`', ->
      fieldDefinition = _.findWhere(modelClass::fieldDefinitions, {name: 'redeemable_point_balance'})
      assert.isDefined fieldDefinition
      assert.equal fieldDefinition.type, 'integer'
    
    
  
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
