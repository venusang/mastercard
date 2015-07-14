assert = chai.assert


sdk = LoyaltyRtrSdk
modelName = 'GetQuestion'
collectionName = 'GetQuestionCount'


describe 'Aggregate Collection Class:  LoyaltyRtrSdk.collections.GetQuestionCount', ->
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
