class AP.view.PanelGroup extends AP.view.View
  className: 'ap-panel-group panel-group'
  
  constructor: ->
    @id = _.uniqueId('panel-') if !@id
    super