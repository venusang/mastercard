(function() {
  var assert;

  assert = chai.assert;

  describe('AP.collection.Collection', function() {
    var collection, data, mapped;
    collection = null;
    data = null;
    mapped = null;
    beforeEach(function() {
      collection = new AP.collection.Collection();
      data = {
        field1: 1,
        field2: 2
      };
      return mapped = collection.mapQueryParams(data);
    });
    describe('mapQueryParams()', function() {
      it('should return a new object', function() {
        assert.isObject(mapped);
        return assert.notDeepEqual(data, mapped);
      });
      return it('should map key names to the format "query[keyName]"', function() {
        assert.isUndefined(mapped.field1);
        assert.isUndefined(mapped.field2);
        assert.equal(1, mapped['query[field1]']);
        return assert.equal(2, mapped['query[field2]']);
      });
    });
    describe('fetch()', function() {
      var server;
      server = null;
      beforeEach(function() {
        server = sinon.fakeServer.create();
        return collection.url = function() {
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
        assert.equal(collection.size(), 0);
        collection.fetch();
        server.respond();
        assert.equal(collection.size(), 1);
        return assert.equal(server.requests[0].method, 'GET');
      });
    });
    describe('fetch()', function() {
      var fetchOptions;
      fetchOptions = null;
      beforeEach(function() {
        fetchOptions = [];
        return sinon.stub(Backbone.Collection.prototype, 'fetch', function(options) {
          return fetchOptions = options;
        });
      });
      afterEach(function() {
        return Backbone.Collection.prototype.fetch.restore();
      });
      it('should extend options.data with extraParams', function() {
        collection.extraParams = {
          key: 'value'
        };
        collection.fetch();
        assert.deepEqual(fetchOptions.data, {
          key: 'value'
        });
        collection.fetch({
          data: {
            test: 1
          }
        });
        return assert.deepEqual(fetchOptions.data, {
          key: 'value',
          test: 1
        });
      });
      it('should apply mapQueryParams() to options.query and add the result to options.data', function() {
        collection.fetch({
          query: {
            key: 'value'
          }
        });
        assert.deepEqual(fetchOptions.data, {
          'query[key]': 'value'
        });
        collection.fetch({
          query: {
            key: 'value'
          },
          data: {
            key: 'value'
          }
        });
        return assert.deepEqual(fetchOptions.data, {
          'query[key]': 'value',
          key: 'value'
        });
      });
      return it('should merge extraparams, options.data, and processed otions.query', function() {
        collection.extraParams = {
          test: 1
        };
        collection.fetch({
          query: {
            key: 'value'
          }
        });
        assert.deepEqual(fetchOptions.data, {
          'query[key]': 'value',
          test: 1
        });
        collection.fetch({
          query: {
            key: 'value'
          },
          data: {
            key: 'value'
          }
        });
        return assert.deepEqual(fetchOptions.data, {
          'query[key]': 'value',
          key: 'value',
          test: 1
        });
      });
    });
    return describe('query()', function() {
      beforeEach(function() {
        return sinon.stub(collection, 'fetch');
      });
      afterEach(function() {
        return collection.fetch.restore();
      });
      return it('should call fetch(), passing first argument as fetch query', function() {
        collection.query({
          name: 'John Doe',
          age: 36
        });
        assert.isTrue(collection.fetch.called);
        return assert.deepEqual(collection.fetch.firstCall.args[0].query, {
          name: 'John Doe',
          age: 36
        });
      });
    });
  });

}).call(this);
