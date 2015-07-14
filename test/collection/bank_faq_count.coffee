assert = chai.assert


sdk = LoyaltyRtrSdk
modelName = 'BankFaq'
collectionName = 'BankFaqCount'


describe 'Aggregate Collection Class:  LoyaltyRtrSdk.collections.BankFaqCount', ->
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
  
  it 'uses the model `BankFaq`', ->
    assert.equal modelClass, collectionClass::model
