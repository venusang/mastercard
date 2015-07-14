###*
Bank model for application `LoyaltyRtrSdk`.  See
`AP.model.Model` for more information about models.

@module LoyaltyRtrSdk
@submodule models
@class Bank
@extends AP.model.Model
###
class LoyaltyRtrSdk.models.Bank extends AP.model.Model
  # mixin Backbone events on the model class
  _.extend @, Backbone.Events
  
  ###*
  The model ID may be used to look-up a model from an application class.
  @property modelId
  @type String
  @static
  ###
  @modelId: '4515'
  
  ###*
  The model name may be used to look-up a model from an application class.
  @property name
  @type String
  ###
  name: 'Bank'
  
  ###*
  Server requests for model instances use this URL.
  @property urlRoot
  @type String
  ###
  urlRoot: '/api/v10/banks'
  
  ###*
  Array of field definition configurations.  Field definitions describe fields
  available on this model.
  @property fieldDefinitions
  @type Array
  ###
  fieldDefinitions: [
  
    id: 39526
    name: 'id'
    label: 'id'
    
    
    type: 'integer'
    required: false
    file_url: false
    file_type: 'Image'
  ,
  
    id: 39562
    name: 'android_url'
    label: 'android_url'
    
    
    type: 'string'
    required: false
    file_url: true
    file_type: 'Image'
  ,
  
    id: 39875
    name: 'burn_offer_label'
    label: 'burn_offer_label'
    
    
    type: 'string'
    required: false
    file_url: false
    file_type: 'Image'
  ,
  
    id: 40012
    name: 'contact_info'
    label: 'contact_info'
    
    
    type: 'string'
    required: false
    file_url: false
    file_type: 'Image'
  ,
  
    id: 39566
    name: 'earn_offer_label'
    label: 'earn_offer_label'
    
    
    type: 'string'
    required: false
    file_url: false
    file_type: 'Image'
  ,
  
    id: 39567
    name: 'icon'
    label: 'icon'
    
    
    type: 'string'
    required: false
    file_url: true
    file_type: 'Image'
  ,
  
    id: 39559
    name: 'image_url'
    label: 'image_url'
    
    
    type: 'string'
    required: false
    file_url: true
    file_type: 'Image'
  ,
  
    id: 39561
    name: 'ios_url'
    label: 'ios_url'
    
    
    type: 'string'
    required: false
    file_url: true
    file_type: 'Image'
  ,
  
    id: 40141
    name: 'is_active'
    label: 'is_active'
    
    
    type: 'boolean'
    required: false
    file_url: false
    file_type: 'Image'
  ,
  
    id: 40011
    name: 'loading_image_url'
    label: 'loading_image_url'
    
    
    type: 'string'
    required: false
    file_url: false
    file_type: 'Image'
  ,
  
    id: 39560
    name: 'mobile_site_url'
    label: 'mobile_site_url'
    
    
    type: 'string'
    required: false
    file_url: true
    file_type: 'Image'
  ,
  
    id: 39558
    name: 'name'
    label: 'name'
    
    
    type: 'string'
    required: false
    file_url: false
    file_type: 'Image'
  ,
  
    id: 40131
    name: 'program_data_language_code'
    label: 'program_data_language_code'
    
    
    type: 'string'
    required: false
    file_url: false
    file_type: 'Image'
  ,
  
    id: 40130
    name: 'program_language_code'
    label: 'program_language_code'
    
    
    type: 'string'
    required: false
    file_url: false
    file_type: 'Image'
  ,
  
    id: 39557
    name: 'program_level_id'
    label: 'program_level_id'
    
    
    type: 'string'
    required: false
    file_url: false
    file_type: 'Image'
  ,
  
    id: 39565
    name: 'tc_last_update_on'
    label: 'tc_last_update_on'
    
    
    type: 'date'
    required: false
    file_url: false
    file_type: 'Image'
  ,
  
    id: 39564
    name: 'tc_summary'
    label: 'tc_summary'
    
    
    type: 'string'
    required: false
    file_url: false
    file_type: 'Image'
  ,
  
    id: 39563
    name: 'tc_url'
    label: 'tc_url'
    
    
    type: 'string'
    required: false
    file_url: true
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
  
    'android_url'
  
    'burn_offer_label'
  
    'contact_info'
  
    'earn_offer_label'
  
    'icon'
  
    'image_url'
  
    'ios_url'
  
    'is_active'
  
    'loading_image_url'
  
    'mobile_site_url'
  
    'name'
  
    'program_data_language_code'
  
    'program_language_code'
  
    'program_level_id'
  
    'tc_last_update_on'
  
    'tc_summary'
  
    'tc_url'
  
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
