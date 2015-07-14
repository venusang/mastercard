class AP.controller.component.Main extends AP.controller.Controller
  initialize: ->
    super
    @initializeSettings()


    
    # initialize controller instances
    new AP.controller.component.Authentication
    


    # instantiate viewport and root view
    AP.Viewport = new AP.view.Viewport()
    



    # instantiate app router and start history listening
    AP.router = new AP.router.Router
    Backbone.history.start()
  




  ###*
  Configures UnderscoreJS templating to use `{{x}}` django-style template tags.
  ###
  initializeSettings: ->
    # enable mustache/django-style template tags
    _.templateSettings =
      _.extend {}, _.templateSettings,
        escape: /\{%-([\s\S]+?)%\}/g
        evaluate: /\{%([\s\S]+?)%\}/g
        interpolate: /\{\{(.+?)\}\}/g
