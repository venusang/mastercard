assert = chai.assert


sdk = LoyaltyRtrSdk
modelName = 'Message'
collectionName = 'MessageCount'


describe 'Aggregate Collection Class:  LoyaltyRtrSdk.collections.MessageCount', ->
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
  
  it 'uses the model `Message`', ->
    assert.equal modelClass, collectionClass::model
