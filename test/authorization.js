(function() {
  var assert;

  assert = chai.assert;

  describe('AP.auth.Authorization', function() {
    var authCreds, authHeaders, authServer, authSessionHeader, authSessionId, authSettings;
    authSettings = AP.auth.Authentication.getAuthenticationSettings();
    authServer = null;
    authSessionId = null;
    authSessionHeader = null;
    authHeaders = null;
    authCreds = null;
    if (!authSettings) {
      describe('isAuthorized()', function() {
        return it('should return true when user is unauthenticated and there are no rules', function() {
          assert.isFalse(AP.auth.Authentication.isAuthenticated());
          return assert.isTrue(AP.auth.Authorization.isAuthorized([]));
        });
      });
    }
    if (authSettings) {
      beforeEach(function() {
        AP.auth.Authentication.store = new AP.utility.TransientStore();
        authServer = sinon.fakeServer.create();
        authSessionId = _.uniqueId('x-session-id-');
        authCreds = {
          id: _.uniqueId('auth-id-')
        };
        authCreds[authSettings.match_field] = 'password123';
        authCreds[authSettings.lookup_field] = 'user123';
        authCreds[authSettings.role_field] = 'admin,manager,editor';
        authSessionHeader = AP.auth.Authentication.getAuthSessionIdHeaderName();
        authHeaders = {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Expose-Headers': authSessionHeader
        };
        authHeaders[authSessionHeader] = authSessionId;
        return authServer.respondWith('POST', authSettings.authentication_url, [201, authHeaders, JSON.stringify(authCreds)]);
      });
      afterEach(function() {
        return authServer.restore();
      });
      return describe('isAuthorized()', function() {
        it('should return false when user is unauthenticated', function() {
          assert.isFalse(AP.auth.Authentication.isAuthenticated());
          assert.isFalse(AP.auth.Authorization.isAuthorized([
            {
              roles: 'admin,manager,editor'
            }
          ]));
          assert.isFalse(AP.auth.Authorization.isAuthorized([
            {
              roles: 'admin,role123'
            }
          ]));
          return assert.isFalse(AP.auth.Authorization.isAuthorized([
            {
              roles: 'admin'
            }
          ]));
        });
        it('should return false when authenticated user has no roles', function() {
          authServer = sinon.fakeServer.create();
          delete authCreds[authSettings.role_field];
          authServer.respondWith('POST', authSettings.authentication_url, [201, authHeaders, JSON.stringify(authCreds)]);
          AP.auth.Authentication.login(authCreds);
          authServer.respond();
          assert.isTrue(AP.auth.Authentication.isAuthenticated());
          assert.isFalse(AP.auth.Authorization.isAuthorized([
            {
              roles: 'admin,manager,editor'
            }
          ]));
          assert.isFalse(AP.auth.Authorization.isAuthorized([
            {
              roles: 'admin,role123'
            }
          ]));
          return assert.isFalse(AP.auth.Authorization.isAuthorized([
            {
              roles: 'admin'
            }
          ]));
        });
        it('should return false when authenticated user has no matching roles', function() {
          AP.auth.Authentication.login(authCreds);
          authServer.respond();
          assert.isTrue(AP.auth.Authentication.isAuthenticated());
          assert.isFalse(AP.auth.Authorization.isAuthorized([
            {
              roles: 'role123,viewer,superuser'
            }
          ]));
          assert.isFalse(AP.auth.Authorization.isAuthorized([
            {
              roles: 'superuser,role123'
            }
          ]));
          return assert.isFalse(AP.auth.Authorization.isAuthorized([
            {
              roles: 'viewer'
            }
          ]));
        });
        it('should return true when user is authenticated and there are no rules', function() {
          AP.auth.Authentication.login(authCreds);
          authServer.respond();
          assert.isTrue(AP.auth.Authentication.isAuthenticated());
          return assert.isTrue(AP.auth.Authorization.isAuthorized([]));
        });
        return it('should return true when authenticated user has at least one matching role', function() {
          authServer = sinon.fakeServer.create();
          authCreds[authSettings.role_field] = 'admin';
          authServer.respondWith('POST', authSettings.authentication_url, [201, authHeaders, JSON.stringify(authCreds)]);
          AP.auth.Authentication.login(authCreds);
          authServer.respond();
          assert.isTrue(AP.auth.Authentication.isAuthenticated());
          assert.isTrue(AP.auth.Authorization.isAuthorized([
            {
              roles: 'admin,manager,editor'
            }
          ]));
          assert.isTrue(AP.auth.Authorization.isAuthorized([
            {
              roles: 'admin,role123'
            }
          ]));
          return assert.isTrue(AP.auth.Authorization.isAuthorized([
            {
              roles: 'admin'
            }
          ]));
        });
      });
    }
  });

}).call(this);
