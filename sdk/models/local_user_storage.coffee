###*
LocalUserStorage model for application `LoyaltyRtrSdk`.  See
`AP.model.Model` for more information about models.

@module LoyaltyRtrSdk
@submodule models
@class LocalUserStorage
@extends AP.model.Model
###
class LoyaltyRtrSdk.models.LocalUserStorage extends AP.model.Model
  # mixin Backbone events on the model class
  _.extend @, Backbone.Events
  
  ###*
  The model ID may be used to look-up a model from an application class.
  @property modelId
  @type String
  @static
  ###
  @modelId: '4558'
  
  ###*
  The model name may be used to look-up a model from an application class.
  @property name
  @type String
  ###
  name: 'LocalUserStorage'
  
  ###*
  Server requests for model instances use this URL.
  @property urlRoot
  @type String
  ###
  urlRoot: '/api/v10/local_user_storages'
  
  ###*
  Array of field definition configurations.  Field definitions describe fields
  available on this model.
  @property fieldDefinitions
  @type Array
  ###
  fieldDefinitions: [
  
    id: 40009
    name: 'id'
    label: 'id'
    
    
    type: 'string'
    required: false
    file_url: false
    file_type: 'Image'
  ,
  
    id: 40010
    name: 'ranacs'
    label: 'ranacs'
    
    
    type: 'hash'
    required: false
    file_url: false
    file_type: 'Image'
  ,
  
  ]
  
  ###*
  Array of field names.  Auto keys, generally such as `id`, have their values
  filled automatically by the server.  Non-auto keys are all other fields.
  @property nonAutoKeyFields
  @type Array
  ###
  nonAutoKeyFields: [
  
    'ranacs'
  
  ]
  
  ###*
  Array of relationship definitions.
  @property relationshipDefinitions
  @type Array
  ###
  relationshipDefinitions: [
    
  ]
  
  ###*
  Array of validation configurations.  See `AP.model.Model` for more information
  about validations.
  @property validations
  @type Array
  ###
  validations: [
  
  
  
  
  
  ]
