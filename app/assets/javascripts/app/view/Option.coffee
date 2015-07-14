class AP.view.Option extends AP.view.View
  className: 'ap-option'
  tagName: 'option'
  value: ''
  text: ''
  selected: false
  template: '{%- text %}'
  
  initialize: (options={}) ->
    super
    @$el.attr('value', @value) if @value
    @$el.attr('selected', 'selected') if @selected
