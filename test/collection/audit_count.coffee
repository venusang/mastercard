assert = chai.assert


sdk = LoyaltyRtrSdk
modelName = 'Audit'
collectionName = 'AuditCount'


describe 'Aggregate Collection Class:  LoyaltyRtrSdk.collections.AuditCount', ->
  modelClass = undefined
  collectionClass = undefined
  modelInstance = undefined
  collectionInstance = undefined
  
  beforeEach ->
    modelClass = sdk.getModel modelName
    collectionClass = sdk.getCollection collectionName
  
  afterEach ->
    modelClass = undefined
    collectionClass = undefined
    modelInstance = undefined
    collectionInstance = undefined
  
  it 'exists', ->
    assert.isDefined collectionClass
  
  it 'uses the model `Audit`', ->
    assert.equal modelClass, collectionClass::model
