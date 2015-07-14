class AP.view.Button extends AP.view.View
  className: 'ap-button btn'
  id: ''
  tagName: 'a'
  attributes:
    href: '#'
  text: ''
  ui: 'default'
  size: null
  pullRight: false
  template: '{{ text }}'
  events:
    'click': 'onClick'
    'action': 'onAction'
  disabled: false
  preventDefaultClickAction: true
  
  onClick: (e) ->
    e.preventDefault() if @preventDefaultClickAction or @disabled
    @fireAction()

  fireAction: _.debounce (-> @$el.trigger('action', @) if !@disabled), 300, true

  render: ->
    super
    @$el.attr('id', @id)
    @$el.addClass("btn-#{@ui}") if @ui
    @$el.addClass("btn-#{@size}") if @size
    @$el.addClass('pull-right') if @pullRight
    @
  
  onAction: (e) ->
    # pass

  disable: ->
    @disabled = true
    @$el.addClass 'btn-disable'
  
  enable: ->
    @disabled = false
    @$el.removeClass 'btn-disable'
