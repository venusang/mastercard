assert = chai.assert


sdk = LoyaltyRtrSdk
modelName = 'User'
collectionName = 'UserCount'


describe 'Aggregate Collection Class:  LoyaltyRtrSdk.collections.UserCount', ->
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
  
  it 'uses the model `User`', ->
    assert.equal modelClass, collectionClass::model
