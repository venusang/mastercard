class AP.profile.Profile
  @name: -> null
  @isActive: -> false
  @toString: -> @name
  @is: (profileName) ->
    !!AP.profile.component[profileName]?.isActive()
