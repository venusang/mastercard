assert = chai.assert


sdk = LoyaltyRtrSdk
modelName = 'BankRanac'
collectionName = 'BankRanacCount'


describe 'Aggregate Collection Class:  LoyaltyRtrSdk.collections.BankRanacCount', ->
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
  
  it 'uses the model `BankRanac`', ->
    assert.equal modelClass, collectionClass::model
