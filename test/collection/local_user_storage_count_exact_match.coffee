assert = chai.assert


sdk = LoyaltyRtrSdk
modelName = 'LocalUserStorage'
collectionName = 'LocalUserStorageCountExactMatch'


describe 'Aggregate Collection Class:  LoyaltyRtrSdk.collections.LocalUserStorageCountExactMatch', ->
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
  
  it 'uses the model `LocalUserStorage`', ->
    assert.equal modelClass, collectionClass::model
