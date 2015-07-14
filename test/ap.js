(function() {
  var assert;

  assert = chai.assert;

  describe('AP', function() {
    beforeEach(function() {
      return AP.registerApp({}, 'App1');
    });
    describe('registerApp()', function() {
      return it('should add an object to the apps object', function() {
        return assert.deepEqual(AP.apps.App1, {});
      });
    });
    return describe('getApp()', function() {
      return it('should return an app by name', function() {
        return assert.deepEqual(AP.getApp('App1'), {});
      });
    });
  });

}).call(this);
