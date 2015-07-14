###*
Audit model for application `LoyaltyRtrSdk`.  See
`AP.model.Model` for more information about models.

@module LoyaltyRtrSdk
@submodule models
@class Audit
@extends AP.model.Model
###
class LoyaltyRtrSdk.models.Audit extends AP.model.Model
  # mixin Backbone events on the model class
  _.extend @, Backbone.Events
  
  ###*
  The model ID may be used to look-up a model from an application class.
  @property modelId
  @type String
  @static
  ###
  @modelId: '4523'
  
  ###*
  The model name may be used to look-up a model from an application class.
  @property name
  @type String
  ###
  name: 'Audit'
  
  ###*
  Server requests for model instances use this URL.
  @property urlRoot
  @type String
  ###
  urlRoot: '/api/v10/audits'
  
  ###*
  Array of field definition configurations.  Field definitions describe fields
  available on this model.
  @property fieldDefinitions
  @type Array
  ###
  fieldDefinitions: [
  
    id: 39665
    name: 'id'
    label: 'id'
    
    
    type: 'integer'
    required: false
    file_url: false
    file_type: 'Image'
  ,
  
    id: 39669
    name: 'action_desc'
    label: 'action_desc'
    
    
    type: 'string'
    required: false
    file_url: false
    file_type: 'Image'
  ,
  
    id: 39668
    name: 'after_value'
    label: 'after_value'
    
    
    type: 'hash'
    required: false
    file_url: false
    file_type: 'Image'
  ,
  
    id: 39667
    name: 'before_value'
    label: 'before_value'
    
    
    type: 'hash'
    required: false
    file_url: false
    file_type: 'Image'
  ,
  
    id: 39666
    name: 'field_name'
    label: 'field_name'
    
    
    type: 'string'
    required: false
    file_url: false
    file_type: 'Image'
  ,
  
    id: 39671
    name: 'performed_at'
    label: 'performed_at'
    
    
    type: 'time'
    required: false
    file_url: false
    file_type: 'Image'
  ,
  
    id: 40125
    name: 'program_level_id'
    label: 'program_level_id'
    
    
    type: 'string'
    required: false
    file_url: false
    file_type: 'Image'
  ,
  
    id: 39670
    name: 'user_id'
    label: 'user_id'
    
    
    type: 'integer'
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
  
    'action_desc'
  
    'after_value'
  
    'before_value'
  
    'field_name'
  
    'performed_at'
  
    'program_level_id'
  
    'user_id'
  
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
