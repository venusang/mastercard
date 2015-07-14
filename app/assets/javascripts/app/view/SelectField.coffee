class AP.view.SelectField extends AP.view.Field
  className: 'ap-field'
  defaultOption: 'Choose One'
  collection: null
  valueField: 'value'
  textField: null
  template: '''
    {% if (label) { %}
      <!-- label-->
      <label for="{%- name %}"{% if (formGroup) { %} class="control-label"{% } %}>
        {%- label %}
      </label>
    {% } %}
    
    {% if (formGroup) { %}
      <div class="controls">
    {% } %}
    
    <select name="{%- name %}" {% if (required) { %} required="required"{% } %}>
      {% if (defaultOption) { %}
        <option value="">{%- defaultOption %}</option>
      {% } %}
    </select>
    
    {% if (help) { %}
      <span class="help-block">{%- help %}</span>
    {% } %}
    
    {% if (formGroup) { %}
      </div>
    {% } %}
  '''
  
  initialize: (options={})->
    super
    # instantiate a new collection if necessary
    if options.collection or @collection
      @setCollection(options.collection or @collection)
    setTimeout (=>
      if !@collection and @value
        options = @$el.find('option')
        selected = options.filter("[value=#{@value}]")
        selectedIndex = options.index selected
        @$el.find('select')[0].selectedIndex = selectedIndex
        @$el.find('select').trigger('change') if selectedIndex
    ), 500
  
  clearQuery: -> @query = null
  
  setQuery: (query) -> @query = query
  
  setCollection: (collection, query) ->
    # setup new collection
    collection = collection
    @collection = if !(collection instanceof AP.collection.Collection) then new collection() else collection
    @setQuery(query) if query
    if @collection instanceof AP.collection.Collection
      @collection.on 'reset', @onCollectionReset, @
      if @query
        @collection.query @query
      else
        @collection.fetch()
  
  onCollectionReset: ->
    if @collection
      selectedIndex = 0
      @removeAllOptions()
      @collection?.each (record, index) =>
        value = if _.isFunction(@valueField) then @valueField(record) else record.get(@valueField)
        @add new AP.view.Option
          text: if _.isFunction(@textField) then @textField(record) else record.get(@textField)
          value: value
        selectedIndex = index + 1 if value and (value?.valueOf().toString() == @value?.valueOf().toString())
      if !@alreadyLoaded
        @alreadyLoaded = true
        @$el.find('select')[0].selectedIndex = selectedIndex
        @$el.find('select').trigger('change') if selectedIndex
  
  append: (el) -> @$el.find('select').append el
  
  removeAllOptions: ->
    for item in @items
      @remove(item) if item instanceof AP.view.Option
