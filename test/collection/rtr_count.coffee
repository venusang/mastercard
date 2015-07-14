assert = chai.assert


sdk = LoyaltyRtrSdk
modelName = 'Rtr'
collectionName = 'RtrCount'


describe 'Aggregate Collection Class:  LoyaltyRtrSdk.collections.RtrCount', ->
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
  
  it 'uses the model `Rtr`', ->
    assert.equal modelClass, collectionClass::model
