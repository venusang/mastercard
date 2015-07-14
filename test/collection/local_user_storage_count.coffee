assert = chai.assert


sdk = LoyaltyRtrSdk
modelName = 'LocalUserStorage'
collectionName = 'LocalUserStorageCount'


describe 'Aggregate Collection Class:  LoyaltyRtrSdk.collections.LocalUserStorageCount', ->
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
