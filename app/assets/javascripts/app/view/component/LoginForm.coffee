class AP.view.component.LoginForm extends AP.view.Form
  initialize: ->
    super
  template: '''
    <div class="row">
      <div class="text-center">
        <h3 class="text-center sub-header">Administrator Login</h3>
      </div>
    </div>
    <div class="container">
          <div class="row">
          <div class="col-md-4 col-md-offset-4">
                  <form accept-charset="UTF-8" role="form">
                      <div class="form-group">
                        <label>User Name</label>
                        <input class="form-control" placeholder="Username" name="username" type="text">
                      </div>
                      <div class="form-group">
                          <label>Password</label>
                          <input class="form-control" placeholder="Password" name="password" type="password" value="">
                      </div>
                      <input class="btn btn-lg btn-primary btn-block" type="submit" value="Login">
                    </form>
          </div>
        </div>
      </div>
    '''
  save: ->
    values = @getValues()
    AP.auth.Authentication.login
      username: values.username
      password: values.password





