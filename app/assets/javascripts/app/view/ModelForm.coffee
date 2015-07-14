class AP.view.ModelForm extends AP.view.Form
  className: 'ap-form ap-modelform'
  ui: null
  programId: null #custom variable for LoyaltyRtr app
  recordId: null
  collection: null
  model: null
  formFields: null
  showIdField: false
  thisTestField: true
  showCancelButton: false
  showDeleteButton: null
  fieldTypes:
    language_code: 'language_code'
    fallback: 'fallback'
    default_currency: 'default_currency'
    is_active: 'is_active'
    category: 'category'
    boolean: 'checkbox'
    integer: 'number'
    float: 'number'
    string: 'text'
    date: 'date'
    time: 'datetime'
    password: 'text'
    textarea: 'textarea'
  fieldTypesByNameContains:
    phone: 'tel'
    #email: 'email'
    password: 'password'
  events:
    'click #delete-btn': 'onDeleteButtonAction'
    submit: 'onSubmit'
    delete: 'onDelete'
  
  initialize: (options = {}) ->
    super
    # console.debug('MODEL FORM '+@programId)
    @addFormFields()
    buttons = [
      new AP.view.Button
        tagName: 'button'
        ui: 'primary'
        text: 'Save'
        preventDefaultClickAction: false
    ]
    if @showCancelButton
      buttons.push new AP.view.Button
        className: 'ap-button ap-cancel btn'
        text: 'Cancel'
    if @record and @showDeleteButton
      buttons.push new AP.view.Button
        className: 'btn pull-right'
        id: 'delete-btn'
        ui: 'danger'
        text: 'Delete'
    @add new AP.view.View
      className: 'form-actions'
      items: buttons
  
  getFieldDefs: ->
    model = @model or @record?.collection?.model
    if !@formFields
      fieldDefs = model::fieldDefinitions if model
    else
      fieldDefs = []
      for name, config of @formFields
        field = _.extend {}, _.where(model::fieldDefinitions, {name: name})?[0], config
        fieldDefs.push field
    fieldDefs
  
  addFormFields: ->
    fieldDefs = @getFieldDefs()

    if fieldDefs
      fields = for field in fieldDefs
        if !(field.name == 'id' and !@showIdField)
          # Populate the Program Level ID field and make it read only
          if (field.name == 'program_level_id' && @programId)
            @add new AP.view.Field
              label: field.label
              name: field.name
              value: @programId
              readonly: 'true'
              hidden: field.hidden

          else
            fieldType = @fieldTypes[field.type]
            for item, itemType of @fieldTypesByNameContains
              if field.name.toString().toLowerCase().indexOf(item) > -1
                fieldType = itemType
            @add new AP.view.Field
              type: fieldType
              label: field.label + (if field.required then '*' else '')
              name: field.name
              value: @record?.get field.name
              required: field.required
              checked: @record?.get(field.name) if field.type == 'boolean'
              step: 0.0000001 if field.type == 'float'
              min: -100000000 if field.type == 'float' or field.type == 'integer'
              span: field.span
              prepend: field.prepend
              append: field.append
              formGroup: true
              help: field.help
              readonly: field.readonly
  
  castValues: (values) ->
    castValues = {}
    fieldDefs = @getFieldDefs()
    for key, value of values
      type = _.where(fieldDefs, {name: key})[0]?.type
      # cast values by type
      # except for the case of NaN values, which validate as true for
      # float and integer fields (but probably shouldn't)
      castValues[key] = null
      if value
        switch type
          when 'float'
            castValues[key] = parseFloat value.toString()
            castValues[key] = value.toString() if _.isNaN castValues[key]
          when 'integer'
            castValues[key] = parseInt value.toString(), 10
            castValues[key] = value.toString() if _.isNaN castValues[key]
          when 'string' then castValues[key] = value.toString()
          when 'boolean' then castValues[key] = (value.toString() == 'on' or value.toString() == 'true')
          else castValues[key] = value
    castValues
  
  setValues: (record) ->
    values = @getValues()
    castValues = @castValues values

    if record
      id = record.id
      record.clear()
      castValues.id = id if id
      record.set(castValues, silent: true)
  
  save: ->
    record = @record
    record = (new @model()) if !record and @model
    if @setValues(record)
      if record.isValid()
        options =
          success: =>
            @$el.trigger 'savesuccess', record
            record.trigger 'savesuccess'
            @collection?.trigger 'reset'
          error: (record, response) =>
            @$el.trigger 'savefailure', [record, response]
        if @collection and record?.isNew()
          @collection.create record, options
        else
          record.save null, options
      else
        @$el.trigger 'savefailure', record
        record.set(record.previousAttributes, silent: true)
    else
      @$el.trigger 'savefailure', record
  
  onDeleteButtonAction: (e) ->
    e.preventDefault()
    @$el.trigger 'delete'
  
  onDelete: ->
    record = @record
    if record
      record.destroy
        success: =>
          @$el.trigger 'deletesuccess', record
          record.trigger 'deletesuccess'
          @collection?.trigger 'deletesuccess'
        error: => @$el.trigger 'deletefailure', recordz
