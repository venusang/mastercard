###*
Rtr model for application `LoyaltyRtrSdk`.  See
`AP.model.Model` for more information about models.

@module LoyaltyRtrSdk
@submodule models
@class Rtr
@extends AP.model.Model
###
class LoyaltyRtrSdk.models.Rtr extends AP.model.Model
  # mixin Backbone events on the model class
  _.extend @, Backbone.Events
  
  ###*
  The model ID may be used to look-up a model from an application class.
  @property modelId
  @type String
  @static
  ###
  @modelId: '4517'
  
  ###*
  The model name may be used to look-up a model from an application class.
  @property name
  @type String
  ###
  name: 'Rtr'
  
  ###*
  Server requests for model instances use this URL.
  @property urlRoot
  @type String
  ###
  urlRoot: '/api/v10/rtrs'
  
  ###*
  Array of field definition configurations.  Field definitions describe fields
  available on this model.
  @property fieldDefinitions
  @type Array
  ###
  fieldDefinitions: [
  
    id: 39528
    name: 'id'
    label: 'id'
    
    
    type: 'integer'
    required: false
    file_url: false
    file_type: 'Image'
  ,
  
    id: 39553
    name: 'base_conversion_factor'
    label: 'base_conversion_factor'
    
    
    type: 'float'
    required: false
    file_url: false
    file_type: 'Image'
  ,
  
    id: 39550
    name: 'cardholder_threshold'
    label: 'cardholder_threshold'
    
    
    type: 'integer'
    required: false
    file_url: false
    file_type: 'Image'
  ,
  
    id: 39547
    name: 'communication_preference'
    label: 'communication_preference'
    
    
    type: 'boolean'
    required: false
    file_url: false
    file_type: 'Image'
  ,
  
    id: 39970
    name: 'current_cashback_card'
    label: 'current_cashback_card'
    
    
    type: 'string'
    required: false
    file_url: false
    file_type: 'Image'
  ,
  
    id: 39548
    name: 'current_cash_card_last_four'
    label: 'current_cash_card_last_four'
    
    
    type: 'string'
    required: false
    file_url: false
    file_type: 'Image'
  ,
  
    id: 39549
    name: 'email_address'
    label: 'email_address'
    
    
    type: 'string'
    required: false
    file_url: false
    file_type: 'Image'
  ,
  
    id: 39552
    name: 'issuer_lower_bound'
    label: 'issuer_lower_bound'
    
    
    type: 'integer'
    required: false
    file_url: false
    file_type: 'Image'
  ,
  
    id: 39551
    name: 'issuer_upper_bound'
    label: 'issuer_upper_bound'
    
    
    type: 'integer'
    required: false
    file_url: false
    file_type: 'Image'
  ,
  
    id: 39555
    name: 'next_transaction_only'
    label: 'next_transaction_only'
    
    
    type: 'boolean'
    required: false
    file_url: false
    file_type: 'Image'
  ,
  
    id: 39654
    name: 'notification_preference'
    label: 'notification_preference'
    
    
    type: 'boolean'
    required: false
    file_url: false
    file_type: 'Image'
  ,
  
    id: 39546
    name: 'opt_in_preference'
    label: 'opt_in_preference'
    
    
    type: 'boolean'
    required: false
    file_url: false
    file_type: 'Image'
  ,
  
    id: 39556
    name: 'program_level_id'
    label: 'program_level_id'
    
    
    type: 'string'
    required: false
    file_url: false
    file_type: 'Image'
  ,
  
    id: 39545
    name: 'ranac'
    label: 'ranac'
    
    
    type: 'string'
    required: true
    file_url: false
    file_type: 'Image'
  ,
  
    id: 39554
    name: 'redeemable_point_balance'
    label: 'redeemable_point_balance'
    
    
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
  
    'base_conversion_factor'
  
    'cardholder_threshold'
  
    'communication_preference'
  
    'current_cashback_card'
  
    'current_cash_card_last_four'
  
    'email_address'
  
    'issuer_lower_bound'
  
    'issuer_upper_bound'
  
    'next_transaction_only'
  
    'notification_preference'
  
    'opt_in_preference'
  
    'program_level_id'
  
    'ranac'
  
    'redeemable_point_balance'
  
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
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
    field: 'ranac'
    validate: 'required'
  ,
  
  
  
  
  ]
