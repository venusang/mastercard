assert = chai.assert


sdk = LoyaltyRtrSdk
modelName = 'LanguageString'
collectionName = 'LanguageStringCount'


describe 'Aggregate Collection Class:  LoyaltyRtrSdk.collections.LanguageStringCount', ->
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
  
  it 'uses the model `LanguageString`', ->
    assert.equal modelClass, collectionClass::model
