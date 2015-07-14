assert = chai.assert


sdk = LoyaltyRtrSdk
modelName = 'BankOffer'
collectionName = 'BankOfferCountExactMatch'


describe 'Aggregate Collection Class:  LoyaltyRtrSdk.collections.BankOfferCountExactMatch', ->
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
  
  it 'uses the model `BankOffer`', ->
    assert.equal modelClass, collectionClass::model
