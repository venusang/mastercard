class AP.view.NavPage extends AP.view.Page
  className: 'ap-navpage'
  events:
    'click .ap-nav a': 'onNavAction'
  active: 'Home'
  navItems: [
    name: 'Home'
  ,
    name: 'Test'
  ]
  template: '''
    <!-- navigation -->
    <div class="ap-nav navbar navbar-default">
      <div class="navbar-header">
        <!-- nav toggle -->
        <button class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse" type="button">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <!-- brand -->
        <div class="navbar-brand">BootstrapApp</div>
      </div>
      <!-- nav list -->
      <div class="collapse navbar-collapse">
        <ul class="nav navbar-nav">
          {% _.each(navItems, function (item) { %}
            <li data-name="{%- item.name %}"{% if (active == item.name) { %} class="active"{% } %}>
              <a href="#">{%- item.name %}</a>
            </li>
          {% }); %}
        </ul>
      </div>
    </div>
    
    <!-- main page -->
    <div class="container"></div>
  '''
  
  onNavAction: (e) ->
    e.preventDefault()
    text = $(e.currentTarget).text()
    @$el.trigger 'navigate', text
  
  doAuthVisibility: ->
    super
    for item in @navItems
      itemEl = @$el.find("li[data-name=\"#{item.name}\"]")
      if AP.auth.Authorization.isAuthorized(item.rules)
        itemEl.show()
      else
        itemEl.hide()
