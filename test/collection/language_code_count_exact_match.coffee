assert = chai.assert


sdk = LoyaltyRtrSdk
modelName = 'LanguageCode'
collectionName = 'LanguageCodeCountExactMatch'


describe 'Aggregate Collection Class:  LoyaltyRtrSdk.collections.LanguageCodeCountExactMatch', ->
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
  
  it 'uses the model `LanguageCode`', ->
    assert.equal modelClass, collectionClass::model
