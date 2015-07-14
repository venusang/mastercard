null
###*
@class AP.view.Form
###
class AP.view.Form extends AP.view.View
  className: 'ap-form'
  tagName: 'form'
  ui: null
  events:
    'change .datetime-date-field, .datetime-time-field': 'onDateTimeChange'
    submit: 'onSubmit'
  
  onSubmit: (e) ->
    e.preventDefault()
    e.stopPropagation()
    @fireSave()

  fireSave: _.debounce((->
    ###*
    @event 'save'
    Triggered whenever the form is submitted successfully.
    ###
    @save()
    @$el.trigger 'save'), 750, true)
 
  submit: -> @$el.submit()  
  
  onDateTimeChange: (e) ->
    forField = $(e.currentTarget).attr('data-for')
    date = $(".datetime-date-field[data-for=#{forField}]").val()
    time = $(".datetime-time-field[data-for=#{forField}]").val()
    datetime = "#{date}T#{time}"
    $("[name=#{forField}]").val(datetime)
  
  render: ->
    super
    @$el.addClass("form-#{@ui}") if @ui
    @
  
  reset: -> @$el[0].reset()
  
  save: ->
    # pass
  
  ###*
  Gets the values from all form fields.
  @return {Object} a hash of name/value pairs representing form fields
  ###
  getValues: ->
    values = {}
    for item in @$el.serializeArray()
      if $.isArray values[item.name]
        # if value is already an array, push into it
        values[item.name].push item.value
      else if values[item.name]
        # if value already exists, make it an array and add this item
        values[item.name] = [values[item.name], item.value]
      else
        # just set the value
        values[item.name] = item.value
    # serialize array won't return values for checkbox that are unset, so lets
    # loop through those manually
    for el in $('[type=checkbox]', @el).toArray()
      name = $(el).attr 'name'
      checked = $(el).is ':checked'
      values[name] = checked
    values
  
  ###*
  Sets form fields to the specified values, where values is a hash
  of name/values.
  ###
  setValues: (values) ->
    for name, value of values
      field = @$el.find("[name=#{name}]")
      if field.attr('type') == 'checkbox'
        field.attr('checked', value)
      else
        field.val(value).trigger('change')
