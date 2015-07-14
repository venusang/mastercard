(function() {
  var assert;

  assert = chai.assert;

  describe('AP.collection.ScopeCollection', function() {
    var ScopeClass, data, mapped, scope;
    ScopeClass = null;
    scope = null;
    data = null;
    mapped = null;
    beforeEach(function() {
      ScopeClass = AP.collection.ScopeCollection.extend({
        queryFields: [
          {
            fieldName: 'color',
            paramName: 'colour'
          }, {
            fieldName: 'test',
            paramName: 'testing'
          }
        ]
      });
      scope = new ScopeClass();
      data = {
        color: 'red',
        test: 123,
        hello: 'Hello World!',
        goodbye: 'Have a good day.'
      };
      return mapped = scope.mapQueryFieldKeys(data);
    });
    describe('mapQueryFieldKeys()', function() {
      it('should return a new object', function() {
        assert.isObject(mapped);
        return assert.notEqual(data, mapped);
      });
      return it('should map key names when matching query fields and not map keys when not matching query fields', function() {
        assert.isDefined(mapped.colour);
        assert.isDefined(mapped.testing);
        assert.isUndefined(mapped.color);
        assert.isUndefined(mapped.test);
        assert.equal('red', mapped.colour);
        assert.equal(123, mapped.testing);
        assert.equal('Hello World!', mapped.hello);
        return assert.equal('Have a good day.', mapped.goodbye);
      });
    });
    describe('fetch()', function() {
      var server;
      server = null;
      beforeEach(function() {
        server = sinon.fakeServer.create();
        return scope.url = function() {
          return '/models/';
        };
      });
      afterEach(function() {
        return server.restore();
      });
      return it('should make a GET request', function() {
        server.respondWith('GET', '/models/', [
          200, {
            'Content-Type': 'application/json'
          }, '[{"id": "12345", "age": 40, "hasDog": false}]'
        ]);
        assert.equal(scope.size(), 0);
        scope.fetch();
        server.respond();
        assert.equal(scope.size(), 1);
        return assert.equal(server.requests[0].method, 'GET');
      });
    });
    return describe('fetch()', function() {
      var fetchOptions;
      fetchOptions = null;
      beforeEach(function() {
        fetchOptions = [];
        return sinon.stub(AP.collection.Collection.prototype, 'fetch', function(options) {
          return fetchOptions = options;
        });
      });
      afterEach(function() {
        return AP.collection.Collection.prototype.fetch.restore();
      });
      return it('should process and replace options.query with the results of mapQueryFieldKeys()', function() {
        scope.fetch({
          query: data
        });
        return assert.deepEqual(fetchOptions.query, {
          colour: 'red',
          testing: 123,
          hello: 'Hello World!',
          goodbye: 'Have a good day.'
        });
      });
    });
  });

}).call(this);
