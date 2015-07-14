assert = chai.assert


sdk = LoyaltyRtrSdk
modelName = 'BankRanac'
collectionName = 'BankRanacCountExactMatch'


describe 'Aggregate Collection Class:  LoyaltyRtrSdk.collections.BankRanacCountExactMatch', ->
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
