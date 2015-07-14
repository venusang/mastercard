null
###*
@class AP.profile.component.Phone
@extends AP.profile.Profile
@singleton
###
class AP.profile.component.Phone extends AP.profile.Profile
  @isActive: ->
    ua = navigator.userAgent
    !!ua.match(/(iPhone|iPod)/) or !!ua.match(/Android/)
