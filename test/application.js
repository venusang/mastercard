(function() {
  var assert,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  assert = chai.assert;

  describe('AP.Application', function() {
    var AppClass, _ref;
    AppClass = (function(_super) {
      __extends(AppClass, _super);

      function AppClass() {
        _ref = AppClass.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      AppClass.setup();

      AppClass.prototype.models = {
        model1: {
          modelId: '1234',
          name: 'MyModel1'
        },
        model2: {
          modelId: '0987',
          name: 'MyModel2'
        }
      };

      AppClass.prototype.collections = {
        collection1: {
          collectionId: '1234',
          name: 'MyCollection1'
        },
        collection2: {
          collectionId: '0987',
          name: 'MyCollection2'
        }
      };

      return AppClass;

    })(AP.Application);
    describe('getModel()', function() {
      it('should return a model by ID', function() {
        assert.deepEqual(AppClass.getModel('1234'), AppClass.models.model1);
        return assert.deepEqual(AppClass.getModel('0987'), AppClass.models.model2);
      });
      it('should return a model by name', function() {
        assert.deepEqual(AppClass.getModel('MyModel1'), AppClass.models.model1);
        return assert.deepEqual(AppClass.getModel('MyModel2'), AppClass.models.model2);
      });
      return it('should return a model by key', function() {
        assert.deepEqual(AppClass.getModel('model1'), AppClass.models.model1);
        return assert.deepEqual(AppClass.getModel('model2'), AppClass.models.model2);
      });
    });
    return describe('getCollection()', function() {
      it('should return a collection by ID', function() {
        assert.deepEqual(AppClass.getCollection('1234'), AppClass.models.collection1);
        return assert.deepEqual(AppClass.getCollection('0987'), AppClass.models.collection2);
      });
      it('should return a collection by name', function() {
        assert.deepEqual(AppClass.getCollection('MyCollection1'), AppClass.models.collection1);
        return assert.deepEqual(AppClass.getCollection('MyCollection2'), AppClass.models.collection2);
      });
      return it('should return a collection by key', function() {
        assert.deepEqual(AppClass.getCollection('collection1'), AppClass.models.collection1);
        return assert.deepEqual(AppClass.getCollection('collection2'), AppClass.models.collection2);
      });
    });
  });

}).call(this);
