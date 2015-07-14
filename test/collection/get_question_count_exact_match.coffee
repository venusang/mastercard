assert = chai.assert


sdk = LoyaltyRtrSdk
modelName = 'GetQuestion'
collectionName = 'GetQuestionCountExactMatch'


describe 'Aggregate Collection Class:  LoyaltyRtrSdk.collections.GetQuestionCountExactMatch', ->
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
  
  it 'uses the model `GetQuestion`', ->
    assert.equal modelClass, collectionClass::model
