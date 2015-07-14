class AP.view.MessagePage extends AP.view.Page
  className: 'ap-messagepage'
  backButton: true
  title: 'Message'
  message: ''
  
  initializeItems: ->
    items = super
    extraItems = []
    if @message
      extraItems.push(new AP.view.View
        template: "<div class=\"page-header\"><h2>#{@title}</h2></div>"
        record: @record
        data: @data)
      extraItems.push(new AP.view.View
        template: @message
        record: @record
        data: @data)
    @items = extraItems.concat(items)
