null
###*
@class AP.view.Viewport
@alternateClassName AP.Viewport
@singleton
A view instance for the current viewport, the `body` element.
###
class AP.view.Viewport extends AP.view.View
  _currentItem: null
  
  ###*
  @property
  The viewport's element is always the document body.
  ###
  el: 'body'
  
  ###*
  Hides every item in the viewport's items.
  ###
  hideAll: -> item.hide() for item in @items
  
  showItemByClass: ->
    view = super
    @_currentItem = view
    view
  
  getCurrentItem: -> @_currentItem
  
  setCurrentItem: (page) -> @_currentItem = page

