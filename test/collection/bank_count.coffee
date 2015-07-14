assert = chai.assert


sdk = LoyaltyRtrSdk
modelName = 'Bank'
collectionName = 'BankCount'


describe 'Aggregate Collection Class:  LoyaltyRtrSdk.collections.BankCount', ->
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
  
  it 'uses the model `Bank`', ->
    assert.equal modelClass, collectionClass::model
