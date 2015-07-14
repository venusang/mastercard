class AP.view.Fieldset extends AP.view.View
  className: 'ap-fieldset'
  tagName: 'fieldset'
  legend: ''
  template: '''
    {% if (legend) { %}
      <h4>{%- legend %}</h4>
    {% } %}
  '''
