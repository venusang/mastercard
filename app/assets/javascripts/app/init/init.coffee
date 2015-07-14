$ ->
  LoyaltyRtrSdk.getView = (str) ->
    if str
      _.find(@views, (val, key) -> key == str or val::id?.toString() == str.toString()) or
      AP.getView(str)
  LoyaltyRtrSdk.init()
  # AP.baseUrl ='https://rocky-hollows-7169.herokuapp.com' 
  AP.baseUrl ='https://damp-taiga-1957.herokuapp.com'
  # AP.environment.Environment.activate 'dev'
  # instantiate main controller
  new AP.controller.component.Main

  