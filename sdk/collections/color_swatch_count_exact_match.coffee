null
###*
ColorSwatchCountExactMatchis an aggregate collection for application `LoyaltyRtrSdk`.  See
`AP.collection.AggregateCollection` to learn about about aggregates.
@module LoyaltyRtrSdk
@submodule collections
@class ColorSwatchCountExactMatch
@extends AP.collection.AggregateCollection
###
class LoyaltyRtrSdk.collections.ColorSwatchCountExactMatch extends AP.collection.AggregateCollection
  ###*
  The collection ID may be used to look-up a collection from an
  application class.
  @property collectionId
  @type String
  @static
  ###
  @collectionId: '21640'
  
  ###*
  The model associated with this collection.  Results returned by server
  requests for this collection are converted into instances of this model.
  @property model
  @type AP.model.Model
  ###
  model: LoyaltyRtrSdk.models.ColorSwatch
  
  ###*
  Server requests for this collection use this URL.
  @property apiEndpoint
  @type String
  ###
  apiEndpoint: '/api/v10/color_swatches.json'
  
  ###*
  Name/value pairs included with every server request.  Extra parameters are
  converted to URL parameters at request-time.
  @property extraParams
  @type Object
  ###
  extraParams:
    scope: 'count_exact_match'
  
  ###*
  Array of query field configurations.  Query fields map model field names onto
  URL parameter names.  See `AP.collection.ScopeCollection` to learn more
  about query fields.
  @property queryFields
  @type Array  
  ###
  queryFields: [
  
  ]
