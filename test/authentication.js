(function() {
  var assert;

  assert = chai.assert;

  describe('AP.auth.Authentication', function() {
    var authCreds, authHeaders, authServer, authSessionHeader, authSessionId, authSettings;
    authSettings = AP.auth.Authentication.getAuthenticationSettings();
    authServer = null;
    authSessionId = null;
    authSessionHeader = null;
    authHeaders = null;
    authCreds = null;
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
      describe('isAuthenticated()', function() {
        it('should return false before authentication', function() {
          return assert.isFalse(AP.auth.Authentication.isAuthenticated());
        });
        it('should return true after authentication', function() {
          AP.auth.Authentication.login(authCreds);
          authServer.respond();
          return assert.isTrue(AP.auth.Authentication.isAuthenticated());
        });
        return it('should return false after authentication if the session ID is missing', function() {
          delete authHeaders[authSessionHeader];
          AP.auth.Authentication.login(authCreds);
          authServer.respond();
          return assert.isFalse(AP.auth.Authentication.isAuthenticated());
        });
      });
      describe('makeHTTPBasicAuthHeader()', function() {
        return it('should return base64-encoded HTTP basic auth header', function() {
          return assert.equal('Basic dXNlcjEyMzpwYXNzd29yZDEyMw==', AP.auth.Authentication.makeHTTPBasicAuthHeader(authCreds));
        });
      });
      describe('authenticate()', function() {
        describe('failure contingency', function() {
          return it('shoud report user is unauthenticated when authentication is unsuccessful', function() {
            authServer = sinon.fakeServer.create();
            authServer.respondWith('POST', authSettings.authentication_url, [401, {}, '']);
            assert.isFalse(AP.auth.Authentication.isAuthenticated());
            AP.auth.Authentication.authenticate(authCreds);
            authServer.respond();
            return assert.isFalse(AP.auth.Authentication.isAuthenticated());
          });
        });
        return describe('success contingency', function() {
          it('should set "ap-auth-session" and "ap-auth-session-id" keys in auth store when authentication is successful', function() {
            AP.auth.Authentication.authenticate(authCreds);
            authServer.respond();
            assert.isTrue(AP.auth.Authentication.isAuthenticated());
            assert.isNotNull(AP.auth.Authentication.store.get('ap-auth-session'));
            assert.isNotNull(AP.auth.Authentication.store.get('ap-auth-session-id'));
            assert.deepEqual(authCreds, AP.auth.Authentication.getAuthSessionData());
            return assert.equal(authSessionId, AP.auth.Authentication.getAuthSessionId());
          });
          it('should return current username from getUsername() when authentication is successful', function() {
            AP.auth.Authentication.authenticate(authCreds);
            authServer.respond();
            assert.isTrue(AP.auth.Authentication.isAuthenticated());
            return assert.equal(authCreds[authSettings.lookup_field], AP.auth.Authentication.getUsername());
          });
          it('should return current user role from getUserRole() when authentication is successful', function() {
            AP.auth.Authentication.authenticate(authCreds);
            authServer.respond();
            assert.isTrue(AP.auth.Authentication.isAuthenticated());
            return assert.equal(authCreds[authSettings.role_field], AP.auth.Authentication.getUserRole());
          });
          if (authSettings.session_id_field != null) {
            it('should authenticate successfully when session ID is passed through payload instead of response headers', function() {
              authServer = sinon.fakeServer.create();
              delete authHeaders[authSessionHeader];
              authCreds[authSettings.session_id_field] = authSessionId;
              authServer.respondWith('POST', authSettings.authentication_url, [201, authHeaders, JSON.stringify(authCreds)]);
              AP.auth.Authentication.authenticate(authCreds);
              authServer.respond();
              assert.isTrue(AP.auth.Authentication.isAuthenticated());
              assert.isNotNull(AP.auth.Authentication.store.get('ap-auth-session-id'));
              return assert.equal(authSessionId, AP.auth.Authentication.getAuthSessionId());
            });
          }
          it('should set an "ap-auth-session-wwwbaseurlcom" key in auth store when base URL is http://www.baseurl.com/ authentication is successful', function() {
            var baseUrl;
            baseUrl = AP.baseUrl;
            AP.baseUrl = 'http://www.baseurl.com/';
            AP.auth.Authentication.authenticate(authCreds);
            authServer.respond();
            assert.isNotNull(AP.auth.Authentication.store.get('ap-auth-wwwbaseurlcom'));
            assert.deepEqual(authCreds, AP.auth.Authentication.getAuthSessionData());
            return AP.baseUrl = baseUrl;
          });
          return it('shoud report user is authenticated when authentication is successful', function() {
            assert.isFalse(AP.auth.Authentication.isAuthenticated());
            AP.auth.Authentication.authenticate(authCreds);
            authServer.respond();
            assert.isTrue(AP.auth.Authentication.isAuthenticated());
            return assert.isObject(AP.auth.Authentication.getAuthSessionData());
          });
        });
      });
      return describe('deauthenticate()', function() {
        describe('failure contingency', function() {
          return it('should report user as unauthenticated, even on failure', function() {
            authServer.respondWith('POST', authSettings.deauthentication_url, [401, {}, '']);
            AP.auth.Authentication.authenticate(authCreds);
            authServer.respond();
            assert.isTrue(AP.auth.Authentication.isAuthenticated());
            AP.auth.Authentication.deauthenticate();
            authServer.respond();
            return assert.isFalse(AP.auth.Authentication.isAuthenticated());
          });
        });
        return describe('success contingency', function() {
          return it('should report user as unauthenticated on success', function() {
            authServer.respondWith('POST', authSettings.deauthentication_url, [200, {}, '']);
            AP.auth.Authentication.authenticate(authCreds);
            authServer.respond();
            assert.isTrue(AP.auth.Authentication.isAuthenticated());
            AP.auth.Authentication.deauthenticate();
            authServer.respond();
            return assert.isFalse(AP.auth.Authentication.isAuthenticated());
          });
        });
      });
    }
  });

}).call(this);
