assert = chai.assert


sdk = LoyaltyRtrSdk
modelName = 'ColorSwatch'
collectionName = 'ColorSwatchCountExactMatch'


describe 'Aggregate Collection Class:  LoyaltyRtrSdk.collections.ColorSwatchCountExactMatch', ->
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
  
  it 'uses the model `ColorSwatch`', ->
    assert.equal modelClass, collectionClass::model
