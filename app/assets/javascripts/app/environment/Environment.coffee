class AP.environment.Environment
  @title: -> null
  @active: -> null
  @activate: (title) ->
    if _.isString title
      environments = _.map AP.environment.component, (value, key) -> value
      @active = _.find environments, (env) ->
        env.title == title
    else if _.isObject title and title instanceOf @
      @active = title
    
    AP.baseUrl = @active.baseUrl
    AP.googleAnalyticsId = @active.googleAnalyticsId
    
    @active
