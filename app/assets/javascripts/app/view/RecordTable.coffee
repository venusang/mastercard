class AP.view.RecordTable extends AP.view.Table
  className: 'ap-recordtable table'
  striped: true
  template: '''
    {% if (head) { %}<thead></thead>{% } %}
    <tbody>
      {% _.each(getFields(), function (field, key) { %}
        <tr>
          <td>{%- field.label %}</td>
          {% if (field.type == 'boolean') { %}
            <td>{% if (record.get(field.name)) { %}<i class="icon-ok"></i>{% } else { %}{% } %}</td>
          {% } else if (field.type == 'time') { %}
            <td>{%- AP.formatDateTime(record.get(field.name))  %}</td>
          {% } else { %}
            <td>{%- record.get(field.name) %}</td>
          {% } %}
        </tr>
      {% }) %}
    </tbody>
  '''
  
  initialize: ->
    super
    @record.on 'savesuccess', => @render()
  
  getFields: ->
    model = @model or @record?.collection?.model
    if !@formFields
      fieldDefs = model::fieldDefinitions if model
    else
      fieldDefs = []
      for name, config of @formFields
        field = _.extend {name: name}, _.where(model::fieldDefinitions, {name: name})?[0], config
        field.name = field.name.replace(/_id/, '')
        fieldDefs.push field
    fieldDefs
