assert = chai.assert


sdk = LoyaltyRtrSdk
modelName = 'Message'
collectionName = 'MessageCountExactMatch'


describe 'Aggregate Collection Class:  LoyaltyRtrSdk.collections.MessageCountExactMatch', ->
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
