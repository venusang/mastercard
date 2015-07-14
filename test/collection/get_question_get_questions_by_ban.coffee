assert = chai.assert


sdk = LoyaltyRtrSdk
modelName = 'GetQuestion'
collectionName = 'GetQuestionGetQuestionsByBan'


describe 'Scope Collection Class:  LoyaltyRtrSdk.collections.GetQuestionGetQuestionsByBan', ->
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
  
  it 'uses the model `GetQuestion`', ->
    assert.equal modelClass, collectionClass::model
  
  
