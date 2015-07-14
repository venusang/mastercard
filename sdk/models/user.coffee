###*
User model for application `LoyaltyRtrSdk`.  See
`AP.model.Model` for more information about models.

@module LoyaltyRtrSdk
@submodule models
@class User
@extends AP.model.Model
###
class LoyaltyRtrSdk.models.User extends AP.model.Model
  # mixin Backbone events on the model class
  _.extend @, Backbone.Events
  
  ###*
  The model ID may be used to look-up a model from an application class.
  @property modelId
  @type String
  @static
  ###
  @modelId: '4520'
  
  ###*
  The model name may be used to look-up a model from an application class.
  @property name
  @type String
  ###
  name: 'User'
  
  ###*
  Server requests for model instances use this URL.
  @property urlRoot
  @type String
  ###
  urlRoot: '/api/v10/users'
  
  ###*
  Array of field definition configurations.  Field definitions describe fields
  available on this model.
  @property fieldDefinitions
  @type Array
  ###
  fieldDefinitions: [
  
    id: 39531
    name: 'id'
    label: 'id'
    
    
    type: 'string'
    required: false
    file_url: false
    file_type: 'Image'
  ,
  
    id: 39714
    name: 'answer'
    label: 'answer'
    
    
    type: 'string'
    required: false
    file_url: false
    file_type: 'Image'
  ,
  
    id: 39712
    name: 'ban'
    label: 'ban'
    
    
    type: 'string'
    required: false
    file_url: false
    file_type: 'Image'
  ,
  
    id: 39533
    name: 'password'
    label: 'password'
    
    
    type: 'string'
    required: false
    file_url: false
    file_type: 'Image'
  ,
  
    id: 39536
    name: 'password_confirmation'
    label: 'password_confirmation'
    
    
    type: 'string'
    required: false
    file_url: false
    file_type: 'Image'
  ,
  
    id: 39537
    name: 'password_digest'
    label: 'password_digest'
    
    
    type: 'string'
    required: false
    file_url: false
    file_type: 'Image'
  ,
  
    id: 39713
    name: 'question_code'
    label: 'question_code'
    
    
    type: 'string'
    required: false
    file_url: false
    file_type: 'Image'
  ,
  
    id: 39715
    name: 'ranac'
    label: 'ranac'
    
    
    type: 'string'
    required: false
    file_url: false
    file_type: 'Image'
  ,
  
    id: 39534
    name: 'role'
    label: 'role'
    
    
    type: 'string'
    required: false
    file_url: false
    file_type: 'Image'
  ,
  
    id: 39532
    name: 'username'
    label: 'username'
    
    
    type: 'string'
    required: false
    file_url: false
    file_type: 'Image'
  ,
  
    id: 39535
    name: 'x_session_id'
    label: 'x_session_id'
    
    
    type: 'string'
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
  
    'answer'
  
    'ban'
  
    'password'
  
    'password_confirmation'
  
    'password_digest'
  
    'question_code'
  
    'ranac'
  
    'role'
  
    'username'
  
    'x_session_id'
  
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
