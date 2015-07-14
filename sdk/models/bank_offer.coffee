###*
BankOffer model for application `LoyaltyRtrSdk`.  See
`AP.model.Model` for more information about models.

@module LoyaltyRtrSdk
@submodule models
@class BankOffer
@extends AP.model.Model
###
class LoyaltyRtrSdk.models.BankOffer extends AP.model.Model
  # mixin Backbone events on the model class
  _.extend @, Backbone.Events
  
  ###*
  The model ID may be used to look-up a model from an application class.
  @property modelId
  @type String
  @static
  ###
  @modelId: '4516'
  
  ###*
  The model name may be used to look-up a model from an application class.
  @property name
  @type String
  ###
  name: 'BankOffer'
  
  ###*
  Server requests for model instances use this URL.
  @property urlRoot
  @type String
  ###
  urlRoot: '/api/v10/bank_offers'
  
  ###*
  Array of field definition configurations.  Field definitions describe fields
  available on this model.
  @property fieldDefinitions
  @type Array
  ###
  fieldDefinitions: [
  
    id: 39527
    name: 'id'
    label: 'id'
    
    
    type: 'integer'
    required: false
    file_url: false
    file_type: 'Image'
  ,
  
    id: 39652
    name: 'base_conversion_factor'
    label: 'base_conversion_factor'
    
    
    type: 'float'
    required: false
    file_url: false
    file_type: 'Image'
  ,
  
    id: 39648
    name: 'category'
    label: 'category'
    
    
    type: 'string'
    required: false
    file_url: false
    file_type: 'Image'
  ,
  
    id: 39569
    name: 'end_date'
    label: 'end_date'
    
    
    type: 'date'
    required: false
    file_url: false
    file_type: 'Image'
  ,
  
    id: 39570
    name: 'image'
    label: 'image'
    
    
    type: 'string'
    required: false
    file_url: true
    file_type: 'Image'
  ,
  
    id: 40129
    name: 'language_code'
    label: 'language_code'
    
    
    type: 'string'
    required: false
    file_url: false
    file_type: 'Image'
  ,
  
    id: 39571
    name: 'line_one'
    label: 'line_one'
    
    
    type: 'string'
    required: false
    file_url: false
    file_type: 'Image'
  ,
  
    id: 39968
    name: 'line_three'
    label: 'line_three'
    
    
    type: 'string'
    required: false
    file_url: false
    file_type: 'Image'
  ,
  
    id: 39967
    name: 'line_two'
    label: 'line_two'
    
    
    type: 'string'
    required: false
    file_url: false
    file_type: 'Image'
  ,
  
    id: 39966
    name: 'program_level_id'
    label: 'program_level_id'
    
    
    type: 'string'
    required: false
    file_url: false
    file_type: 'Image'
  ,
  
    id: 39655
    name: 'promo_conversion_rate'
    label: 'promo_conversion_rate'
    
    
    type: 'float'
    required: false
    file_url: false
    file_type: 'Image'
  ,
  
    id: 39568
    name: 'start_date'
    label: 'start_date'
    
    
    type: 'date'
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
  
    'base_conversion_factor'
  
    'category'
  
    'end_date'
  
    'image'
  
    'language_code'
  
    'line_one'
  
    'line_three'
  
    'line_two'
  
    'program_level_id'
  
    'promo_conversion_rate'
  
    'start_date'
  
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
