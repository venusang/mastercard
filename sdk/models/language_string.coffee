###*
LanguageString model for application `LoyaltyRtrSdk`.  See
`AP.model.Model` for more information about models.

@module LoyaltyRtrSdk
@submodule models
@class LanguageString
@extends AP.model.Model
###
class LoyaltyRtrSdk.models.LanguageString extends AP.model.Model
  # mixin Backbone events on the model class
  _.extend @, Backbone.Events
  
  ###*
  The model ID may be used to look-up a model from an application class.
  @property modelId
  @type String
  @static
  ###
  @modelId: '4519'
  
  ###*
  The model name may be used to look-up a model from an application class.
  @property name
  @type String
  ###
  name: 'LanguageString'
  
  ###*
  Server requests for model instances use this URL.
  @property urlRoot
  @type String
  ###
  urlRoot: '/api/v10/language_strings'
  
  ###*
  Array of field definition configurations.  Field definitions describe fields
  available on this model.
  @property fieldDefinitions
  @type Array
  ###
  fieldDefinitions: [
  
    id: 39530
    name: 'id'
    label: 'id'
    
    
    type: 'integer'
    required: false
    file_url: false
    file_type: 'Image'
  ,
  
    id: 39663
    name: 'fallback'
    label: 'fallback'
    
    
    type: 'boolean'
    required: false
    file_url: false
    file_type: 'Image'
  ,
  
    id: 39662
    name: 'global'
    label: 'global'
    
    
    type: 'boolean'
    required: false
    file_url: false
    file_type: 'Image'
  ,
  
    id: 39660
    name: 'label_id'
    label: 'label_id'
    
    
    type: 'string'
    required: false
    file_url: false
    file_type: 'Image'
  ,
  
    id: 39659
    name: 'language_code'
    label: 'language_code'
    
    
    type: 'string'
    required: false
    file_url: false
    file_type: 'Image'
  ,
  
    id: 39661
    name: 'program_level_id'
    label: 'program_level_id'
    
    
    type: 'string'
    required: false
    file_url: false
    file_type: 'Image'
  ,
  
    id: 39664
    name: 'value'
    label: 'value'
    
    
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
  
    'fallback'
  
    'global'
  
    'label_id'
  
    'language_code'
  
    'program_level_id'
  
    'value'
  
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
