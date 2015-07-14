(function() {
  var assert;

  assert = chai.assert;

  describe('AP.utility.Cookie', function() {
    var mockCookie, oldGetFrom, oldSaveTo;
    oldGetFrom = AP.utility.Cookie.getFromCookieStorage;
    oldSaveTo = AP.utility.Cookie.saveToCookieStorage;
    mockCookie = null;
    beforeEach(function() {
      mockCookie = '';
      AP.utility.Cookie.getFromCookieStorage = function() {
        return mockCookie.toString();
      };
      return AP.utility.Cookie.saveToCookieStorage = function(cookie) {
        return mockCookie = cookie;
      };
    });
    afterEach(function() {
      AP.utility.Cookie.getFromCookieStorage = oldGetFrom;
      return AP.utility.Cookie.saveToCookieStorage = oldSaveTo;
    });
    describe('formatCookieStorageDate()', function() {
      it('should return undefined if no arguments passed', function() {
        return assert.isUndefined(AP.utility.Cookie.formatCookieStorageDate());
      });
      return it('should format a date for use with underlaying cookie storage', function() {
        return assert.match(AP.utility.Cookie.formatCookieStorageDate(1), /\w{3}, \d{2} \w{3} \d{4} \d{2}:\d{2}:\d{2} \w{3}/);
      });
    });
    describe('buildCookieStorageString()', function() {
      it('should format a string from name and value for use with underlaying cookie storage', function() {
        return assert.equal(AP.utility.Cookie.buildCookieStorageString('key', 'value'), 'key=value; path=/');
      });
      return it('should format a string from name, value, and days for use with underlaying cookie storage', function() {
        return assert.match(AP.utility.Cookie.buildCookieStorageString('key', 'value', 1), /key=value; expires=\w{3}, \d{2} \w{3} \d{4} \d{2}:\d{2}:\d{2} \w{3}; path=\//);
      });
    });
    describe('get()', function() {
      it('should return a cookie if previously set', function() {
        AP.utility.Cookie.set('key', 'value');
        return assert.equal(AP.utility.Cookie.get('key'), 'value');
      });
      return it('should return null if not previously set', function() {
        return assert.isNull(AP.utility.Cookie.get('no-such-cookie'));
      });
    });
    return describe('set()', function() {
      return it('should save a cookie to the underlaying cookie storage', function() {
        assert.equal(mockCookie, '');
        AP.utility.Cookie.set('key', 'value');
        return assert.equal(mockCookie, 'key=value; path=/');
      });
    });
  });

}).call(this);
