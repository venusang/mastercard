###*
Simple namespace class for this application.

Example application look-up:
@example
    app = AP.getApp('LoyaltyRtrSdk')

Example model and collection look-ups:
@example
    modelClass = app.getModel('modelName')
    collectionClass = app.getCollection('collectionName')

@class LoyaltyRtrSdk
@extends AP.Application
@static
###
class window.LoyaltyRtrSdk extends AP.Application
  @setup()
  
  ###*
  Application name.
  @static
  @property name
  @type String
  ###
  @name: 'LoyaltyRtrSdk'
  
  ###*
  Application description.
  @static
  @property description
  @type String
  ###
  @description: 'MasterCard Loyalty RTR'
  
  @init: ->
    window.AP.activeAppName = 'LoyaltyRtr'
    super
