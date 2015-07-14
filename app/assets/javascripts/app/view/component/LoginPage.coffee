class AP.view.component.LoginPage extends AP.view.Page
  className: ''
  title: ''
  
  initialize: ->
    super
    @add new AP.view.component.LoginForm
