class AP.view.Panel extends AP.view.View
  className: 'ap-panel panel'
  header: 'Panel'
  ui: 'default'
  collapsed: true
  template: '''
    <div class="panel-heading">
      <h4 class="panel-title">
        <a class="{% if (collapsed) { %}collapsed{% } %}" data-toggle="collapse" data-parent="#{{ parent.id }}" href="#{{ panelBodyId }}">
          {{ header }}
        </a>
      </h4>
    </div>
    <div id="{{ panelBodyId }}" class="panel-collapse collapse{% if (!collapsed) { %} in{% } %}">
      <div class="panel-body"></div>
    </div>
  '''
  
  initialize: ->
    @panelBodyId = _.uniqueId('panel-body-')
    super
    @$el.addClass "panel-#{@ui}"
    
  
  append: (el) -> @$el.find('.panel-body').append el
