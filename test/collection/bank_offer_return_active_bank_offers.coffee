assert = chai.assert


sdk = LoyaltyRtrSdk
modelName = 'BankOffer'
collectionName = 'BankOfferReturnActiveBankOffers'


describe 'Scope Collection Class:  LoyaltyRtrSdk.collections.BankOfferReturnActiveBankOffers', ->
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
  
  it 'uses the model `BankOffer`', ->
    assert.equal modelClass, collectionClass::model
  
  
