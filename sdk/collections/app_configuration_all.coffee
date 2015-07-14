###*
AppConfigurationAllis a scope collection for application `LoyaltyRtrSdk`.  See
`AP.collection.ScopeCollection` for more information about scopes.

@module LoyaltyRtrSdk
@submodule collections
@class AppConfigurationAll
@extends AP.collection.ScopeCollection
###
class LoyaltyRtrSdk.collections.AppConfigurationAll extends AP.collection.ScopeCollection
  ###*
  The collection ID may be used to look-up a collection from an
  application class.
  @property collectionId
  @type String
  @static
  ###
  @collectionId: '21632'
  
  ###*
  The model associated with this collection.  Results returned by server
  requests for this collection are converted into instances of this model.
  @property model
  @type AP.model.Model
  ###
  model: LoyaltyRtrSdk.models.AppConfiguration
  
  ###*
  Server requests for this collection use this URL.
  @property apiEndpoint
  @type String
  ###
  apiEndpoint: '/api/v10/app_configurations.json'
  
  ###*
  Name/value pairs included with every server request.  Extra parameters are
  converted to URL parameters at request-time.
  @property extraParams
  @type Object
  ###
  extraParams:
    scope: 'all'
  
  ###*
  Array of query field configurations.  Query fields map model field names onto
  URL parameter names.  See `AP.collection.ScopeCollection` to learn more
  about query fields.
  @property queryFields
  @type Array
  ###
  queryFields: [
  
  ]
