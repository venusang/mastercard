assert = chai.assert


sdk = LoyaltyRtrSdk
modelName = 'AppConfiguration'
collectionName = 'AppConfigurationCount'


describe 'Aggregate Collection Class:  LoyaltyRtrSdk.collections.AppConfigurationCount', ->
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
  
  it 'uses the model `AppConfiguration`', ->
    assert.equal modelClass, collectionClass::model
