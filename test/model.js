(function() {
  var assert,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  assert = chai.assert;

  describe('AP.model.Model', function() {
    describe('CRUD', function() {
      var instance, server;
      instance = null;
      server = null;
      beforeEach(function() {
        var ModelClass, _ref;
        server = sinon.fakeServer.create();
        ModelClass = (function(_super) {
          __extends(ModelClass, _super);

          function ModelClass() {
            _ref = ModelClass.__super__.constructor.apply(this, arguments);
            return _ref;
          }

          ModelClass.prototype.urlRoot = '/model';

          return ModelClass;

        })(AP.model.Model);
        return instance = new ModelClass({
          name: 'John Doe',
          age: 36,
          hasDog: true
        });
      });
      afterEach(function() {
        return server.restore();
      });
      describe('reload()', function() {
        beforeEach(function() {
          return sinon.stub(instance, 'fetch');
        });
        afterEach(function() {
          return instance.fetch.restore();
        });
        return it('should fetch the model', function() {
          instance.reload();
          return assert.isTrue(instance.fetch.called);
        });
      });
      describe('fetch()', function() {
        it('should make a GET request replace instance values with those from the response', function() {
          server.respondWith('GET', '/model/12345.json', [
            200, {
              'Content-Type': 'application/json'
            }, '{"age": 40, "hasDog": false}'
          ]);
          assert.equal(instance.get('age'), 36);
          assert.isTrue(instance.get('hasDog'));
          instance.set('id', '12345');
          instance.fetch();
          server.respond();
          assert.equal(server.requests[0].method, 'GET');
          assert.equal(instance.get('age'), 40);
          return assert.isFalse(instance.get('hasDog'));
        });
        return it('should properly load fields of any type', function() {
          server.respondWith('GET', '/model/12345.json', [
            200, {
              'Content-Type': 'application/json'
            }, '{"id": "12345", "string": "string", "integer": 1, "float": 1.5, "boolean": true, "array": [1, 2, 3], "hash": {"string": "string", "integer": 1, "float": 1.5, "boolean": true}}'
          ]);
          instance.set('id', '12345');
          instance.fetch();
          server.respond();
          assert.isString(instance.get('string'));
          assert.isNumber(instance.get('integer'));
          assert.equal(instance.get('integer'), 1);
          assert.isNumber(instance.get('float'));
          assert.equal(instance.get('float'), 1.5);
          assert.isBoolean(instance.get('boolean'));
          assert.isArray(instance.get('array'));
          return assert.isObject(instance.get('hash'));
        });
      });
      describe('save()', function() {
        it('should make a POST request if instance is new', function() {
          server.respondWith('POST', '/model.json', [
            201, {
              'Content-Type': 'application/json'
            }, '{"id": "12345", "name": "John Doe", "age": 36, "hasDog": true}'
          ]);
          assert.isTrue(instance.isNew());
          assert.isUndefined(instance.get('id'));
          instance.save();
          server.respond();
          assert.equal(server.requests[0].method, 'POST');
          return assert.isFalse(instance.isNew());
        });
        it('should make a PUT request if instance exists', function() {
          server.respondWith('PUT', '/model/12345.json', [
            200, {
              'Content-Type': 'application/json'
            }, '{"id": "12345", "name": "John Doe", "age": 40, "hasDog": false}'
          ]);
          assert.equal(instance.get('age'), 36);
          assert.isTrue(instance.get('hasDog'));
          instance.set('id', '12345');
          instance.set('age', 40);
          instance.set('hasDog', false);
          assert.isFalse(instance.isNew());
          instance.save();
          server.respond();
          assert.equal(server.requests[0].method, 'PUT');
          assert.isFalse(instance.isNew());
          assert.equal(instance.get('age'), 40);
          return assert.isFalse(instance.get('hasDog'));
        });
        it('should fire `before_change` ahead of attribute changes', function() {
          assert.equal(instance.get('age'), 36);
          assert.isTrue(instance.get('hasDog'));
          instance.on('before_change', function(record, attributes) {
            assert.equal(instance.get('age'), 36);
            return assert.isTrue(instance.get('hasDog'));
          });
          instance.set({
            age: 37,
            hasDog: false
          });
          assert.equal(instance.get('age'), 37);
          return assert.isFalse(instance.get('hasDog'));
        });
        return it('should fire `before_save` ahead of the server request', function() {
          server.respondWith('POST', '/model.json', [
            201, {
              'Content-Type': 'application/json'
            }, '{"id": "12345", "name": "John Doe", "age": 36, "hasDog": true}'
          ]);
          assert.isTrue(instance.isNew());
          assert.equal(server.requests.length, 0);
          instance.on('before_save', function() {
            assert.isTrue(instance.isNew());
            return assert.equal(server.requests.length, 0);
          });
          instance.save();
          server.respond();
          assert.isFalse(instance.isNew());
          return assert.equal(server.requests.length, 1);
        });
      });
      describe('delete()', function() {
        beforeEach(function() {
          return sinon.stub(instance, 'destroy');
        });
        afterEach(function() {
          return instance.destroy.restore();
        });
        return it('should call destroy on the model', function() {
          instance["delete"]();
          return assert.isTrue(instance.destroy.called);
        });
      });
      return describe('destroy()', function() {
        it('should make a DELETE request if instance exists', function() {
          server.respondWith('DELETE', '/model/12345.json', [
            204, {
              'Content-Type': 'application/json'
            }, ''
          ]);
          instance.set('id', '12345');
          assert.isFalse(instance.isNew());
          instance.destroy();
          server.respond();
          return assert.equal(server.requests[0].method, 'DELETE');
        });
        it('should do nothing if instance is new', function() {
          server.respondWith('DELETE', '/model/', [
            204, {
              'Content-Type': 'application/json'
            }, ''
          ]);
          assert.isTrue(instance.isNew());
          instance.destroy();
          server.respond();
          assert.isTrue(instance.isNew());
          return assert.lengthOf(server.requests, 0);
        });
        return it('should fire `before_delete` ahead of the server request', function() {
          server.respondWith('DELETE', '/model/12345.json', [
            204, {
              'Content-Type': 'application/json'
            }, ''
          ]);
          instance.set('id', '12345');
          assert.isFalse(instance.isNew());
          assert.equal(server.requests.length, 0);
          instance.on('before_delete', function() {
            return assert.equal(server.requests.length, 0);
          });
          instance.destroy();
          server.respond();
          assert.equal(server.requests.length, 1);
          return assert.equal(server.requests[0].method, 'DELETE');
        });
      });
    });
    describe('relationship', function() {
      var instance, server;
      instance = null;
      server = null;
      beforeEach(function() {
        var ModelClass, RelatedModelClass, _ref, _ref1;
        server = sinon.fakeServer.create();
        RelatedModelClass = (function(_super) {
          __extends(RelatedModelClass, _super);

          function RelatedModelClass() {
            _ref = RelatedModelClass.__super__.constructor.apply(this, arguments);
            return _ref;
          }

          return RelatedModelClass;

        })(AP.model.Model);
        ModelClass = (function(_super) {
          __extends(ModelClass, _super);

          function ModelClass() {
            _ref1 = ModelClass.__super__.constructor.apply(this, arguments);
            return _ref1;
          }

          ModelClass.prototype.urlRoot = '/model/';

          ModelClass.prototype.relationshipDefinitions = [
            {
              'type': 'BelongsTo',
              model: RelatedModelClass,
              name: 'belongs',
              collection: Backbone.Collection,
              foreignKey: 'belongs_id'
            }, {
              'type': 'HasMany',
              model: RelatedModelClass,
              name: 'many',
              collection: Backbone.Collection,
              foreignKey: 'many_id'
            }, {
              'type': 'HasOne',
              model: RelatedModelClass,
              name: 'one',
              collection: Backbone.Collection,
              foreignKey: 'one_id'
            }
          ];

          return ModelClass;

        })(AP.model.Model);
        return instance = new ModelClass({
          name: 'John Doe',
          age: 36,
          hasDog: true
        });
      });
      describe('relationshipDefinitions', function() {
        return it('should be initialized on model instance initialization', function() {
          assert.isArray(instance._relationships);
          return assert.lengthOf(instance._relationships, 3);
        });
      });
      return describe('getRelationship()', function() {
        return it('should return initialized relationships available by name', function() {
          assert.isFunction(instance.getRelationship);
          assert.instanceOf(instance.getRelationship('belongs'), AP.relationship.BelongsTo);
          assert.instanceOf(instance.getRelationship('belongs'), AP.relationship.Relationship);
          assert.instanceOf(instance.getRelationship('many'), AP.relationship.HasMany);
          assert.instanceOf(instance.getRelationship('many'), AP.relationship.Relationship);
          assert.instanceOf(instance.getRelationship('one'), AP.relationship.HasOne);
          return assert.instanceOf(instance.getRelationship('one'), AP.relationship.Relationship);
        });
      });
    });
    return describe('validation', function() {
      var instance;
      instance = null;
      beforeEach(function() {
        return instance = new AP.model.Model({
          name: 'John Doe',
          age: 36,
          hasDog: true
        });
      });
      describe('isValid()', function() {
        it('should return true when model has no validations', function() {
          assert.lengthOf(instance.validations, 0);
          return assert.isTrue(instance.isValid());
        });
        it('should return true when model has validations and model is valid', function() {
          instance.validations.push({
            field: 'name',
            validate: 'required'
          });
          assert.lengthOf(instance.validations, 1);
          return assert.isTrue(instance.isValid());
        });
        return it('should return false when model has validations and model is invalid', function() {
          instance.validations.push({
            field: 'hasCat',
            validate: 'required'
          });
          assert.lengthOf(instance.validations, 1);
          return assert.isFalse(instance.isValid());
        });
      });
      describe('validate()', function() {
        it('should return undefined when model is valid', function() {
          assert.isTrue(instance.isValid());
          return assert.isUndefined(instance.validate());
        });
        return it('should return non-empty array when model is invalid', function() {
          instance.validations.push({
            field: 'hasCat',
            validate: 'required'
          });
          assert.isFalse(instance.isValid());
          assert.isArray(instance.validate());
          return assert.lengthOf(instance.validate(), 1);
        });
      });
      return describe('errors()', function() {
        return it('should return an empty array when model has no validations', function() {
          assert.lengthOf(instance.validations, 0);
          assert.isArray(instance.errors());
          return assert.lengthOf(instance.errors(), 0);
        });
      });
    });
  });

}).call(this);
