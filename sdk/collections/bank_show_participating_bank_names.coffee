###*
BankShowParticipatingBankNamesis a scope collection for application `LoyaltyRtrSdk`.  See
`AP.collection.ScopeCollection` for more information about scopes.

@module LoyaltyRtrSdk
@submodule collections
@class BankShowParticipatingBankNames
@extends AP.collection.ScopeCollection
###
class LoyaltyRtrSdk.collections.BankShowParticipatingBankNames extends AP.collection.ScopeCollection
  ###*
  The collection ID may be used to look-up a collection from an
  application class.
  @property collectionId
  @type String
  @static
  ###
  @collectionId: '21851'
  
  ###*
  The model associated with this collection.  Results returned by server
  requests for this collection are converted into instances of this model.
  @property model
  @type AP.model.Model
  ###
  model: LoyaltyRtrSdk.models.Bank
  
  ###*
  Server requests for this collection use this URL.
  @property apiEndpoint
  @type String
  ###
  apiEndpoint: '/api/v10/banks.json'
  
  ###*
  Name/value pairs included with every server request.  Extra parameters are
  converted to URL parameters at request-time.
  @property extraParams
  @type Object
  ###
  extraParams:
    scope: 'show_participating_bank_names'
  
  ###*
  Array of query field configurations.  Query fields map model field names onto
  URL parameter names.  See `AP.collection.ScopeCollection` to learn more
  about query fields.
  @property queryFields
  @type Array
  ###
  queryFields: [
  
    fieldName: 'is_active'
    paramName: 'is_active'
  ,
  
  ]
