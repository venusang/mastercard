class AP.view.TableRow extends AP.view.View
  className: 'ap-tablerow'
  tagName: 'tr'
  
  initialize: ->
    super
    if @record
      @record.on 'savesuccess', => @render()
  
  render: ->
    super
    if @record
      @$el.data 'record', @record
      @$el.attr 'data-id', @record.get('id')
    @
