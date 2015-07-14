assert = chai.assert


sdk = LoyaltyRtrSdk
modelName = 'Bank'
collectionName = 'BankGetBankInformation'


describe 'Scope Collection Class:  LoyaltyRtrSdk.collections.BankGetBankInformation', ->
  modelClass = undefined
  collectionClass = undefined
  modelInstance = undefined
  collectionInstance = undefined
  
  beforeEach ->
    sdk.mockServer.resetDatastore()
    modelClass = sdk.getModel modelName
    collectionClass = sdk.getCollection collectionName
  
  afterEach ->
    modelClass = undefined
    collectionClass = undefined
    modelInstance = undefined
    collectionInstance = undefined
  
  it 'exists', ->
    assert.isDefined collectionClass
  
  it 'uses the model `Bank`', ->
    assert.equal modelClass, collectionClass::model
  
  
