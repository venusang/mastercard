(function() {
  var assert,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  assert = chai.assert;

  describe('AP.relationship.Relationship', function() {
    var automobiles, oldGetActiveApp, organizations, people, server;
    oldGetActiveApp = null;
    server = null;
    organizations = null;
    people = null;
    automobiles = null;
    afterEach(function() {
      window.AP.getActiveApp = oldGetActiveApp;
      return server.restore();
    });
    beforeEach(function() {
      var activeApp, _ref, _ref1, _ref2, _ref3, _ref4, _ref5;
      oldGetActiveApp = window.AP.getActiveApp;
      activeApp = {
        getModel: function(name) {
          return AP.model[name];
        },
        getCollection: function(name) {
          return AP.collection[name];
        }
      };
      window.AP.getActiveApp = function() {
        return activeApp;
      };
      AP.model.Organization = (function(_super) {
        __extends(Organization, _super);

        function Organization() {
          _ref = Organization.__super__.constructor.apply(this, arguments);
          return _ref;
        }

        Organization.prototype.urlRoot = '/organization/';

        Organization.prototype.relationshipDefinitions = [
          {
            type: 'HasMany',
            model: 'Person',
            collection: 'PersonAll',
            name: 'people',
            foreignKey: 'organization_id'
          }
        ];

        return Organization;

      })(AP.model.Model);
      AP.model.Person = (function(_super) {
        __extends(Person, _super);

        function Person() {
          _ref1 = Person.__super__.constructor.apply(this, arguments);
          return _ref1;
        }

        Person.prototype.urlRoot = '/person/';

        Person.prototype.relationshipDefinitions = [
          {
            type: 'BelongsTo',
            model: 'Organization',
            collection: 'OrganizationAll',
            name: 'organization',
            foreignKey: 'organization_id'
          }, {
            type: 'HasOne',
            model: 'Automobile',
            collection: 'AutomobileAll',
            name: 'automobile',
            foreignKey: 'person_id'
          }
        ];

        return Person;

      })(AP.model.Model);
      AP.model.Automobile = (function(_super) {
        __extends(Automobile, _super);

        function Automobile() {
          _ref2 = Automobile.__super__.constructor.apply(this, arguments);
          return _ref2;
        }

        Automobile.prototype.urlRoot = '/automobile/';

        return Automobile;

      })(AP.model.Model);
      AP.collection.OrganizationAll = (function(_super) {
        __extends(OrganizationAll, _super);

        function OrganizationAll() {
          _ref3 = OrganizationAll.__super__.constructor.apply(this, arguments);
          return _ref3;
        }

        OrganizationAll.collectionId = 'organization';

        OrganizationAll.prototype.model = AP.model.Organization;

        OrganizationAll.prototype.url = '/organization/';

        return OrganizationAll;

      })(AP.collection.ScopeCollection);
      AP.collection.PersonAll = (function(_super) {
        __extends(PersonAll, _super);

        function PersonAll() {
          _ref4 = PersonAll.__super__.constructor.apply(this, arguments);
          return _ref4;
        }

        PersonAll.collectionId = 'person';

        PersonAll.prototype.model = AP.model.Person;

        PersonAll.prototype.apiEndpoint = '/person/';

        return PersonAll;

      })(AP.collection.ScopeCollection);
      AP.collection.AutomobileAll = (function(_super) {
        __extends(AutomobileAll, _super);

        function AutomobileAll() {
          _ref5 = AutomobileAll.__super__.constructor.apply(this, arguments);
          return _ref5;
        }

        AutomobileAll.collectionId = 'automobile';

        AutomobileAll.prototype.model = AP.model.Automobile;

        AutomobileAll.prototype.apiEndpoint = '/automobile/';

        return AutomobileAll;

      })(AP.collection.ScopeCollection);
      organizations = new AP.collection.OrganizationAll;
      people = new AP.collection.PersonAll;
      automobiles = new AP.collection.AutomobileAll;
      server = sinon.fakeServer.create();
      server.respondWith('GET', '/organization/', [
        200, {
          'Content-Type': 'application/json'
        }, '[{"id": "1", "name": "Acme Co."}, {"id": "2", "name": "Acme Co."}, {"id": "3", "name": "Acme Co."}]'
      ]);
      server.respondWith('GET', '/organization/?query%5Bid%5D=1', [
        200, {
          'Content-Type': 'application/json'
        }, '[{"id": "1", "name": "Acme Co."}]'
      ]);
      server.respondWith('GET', '/person/', [
        200, {
          'Content-Type': 'application/json'
        }, '[{"id": "1", "organization_id": "1"}, {"id": "2", "organization_id": "1"}, {"id": "3", "organization_id": "2"}, {"id": "4", "organization_id": "2"}]'
      ]);
      server.respondWith('GET', '/person/?query%5Borganization_id%5D=1', [
        200, {
          'Content-Type': 'application/json'
        }, '[{"id": "1", "organization_id": "1"}, {"id": "2", "organization_id": "1"}]'
      ]);
      server.respondWith('GET', '/automobile/', [
        200, {
          'Content-Type': 'application/json'
        }, '[{"id": "1", "person_id": "1"}, {"id": "2", "person_id": "2"}]'
      ]);
      return server.respondWith('GET', '/automobile/?query%5Bperson_id%5D=1', [
        200, {
          'Content-Type': 'application/json'
        }, '[{"id": "1", "person_id": "1"}]'
      ]);
    });
    describe('test server', function() {
      return it('should work', function() {
        var organizationPeople;
        organizations.fetch();
        people.fetch();
        server.respond();
        organizationPeople = organizations.first().get('people');
        organizations.first().fetchRelated('people');
        server.respond();
        assert.equal(organizations.size(), 3);
        assert.equal(organizationPeople.size(), 2);
        return assert.equal(people.size(), 4);
      });
    });
    describe('AP.relationship.HasMany', function() {
      describe('model serialization with toJSON()', function() {
        return it('should return a nested object', function() {
          var org;
          organizations.fetch();
          server.respond();
          org = organizations.first();
          org.fetchRelated('people');
          server.respond();
          return assert.deepEqual(org.toJSON(), {
            id: '1',
            name: 'Acme Co.',
            people: [
              {
                id: '1',
                organization_id: '1',
                organization: null,
                automobile: null
              }, {
                id: '2',
                organization_id: '1',
                organization: null,
                automobile: null
              }
            ]
          });
        });
      });
      describe('generated attribute field on owner instance', function() {
        it('should be of the specfied class', function() {
          organizations.fetch();
          server.respond();
          assert.isDefined(organizations.first().get('people'));
          return assert.instanceOf(organizations.first().get('people'), AP.collection.PersonAll);
        });
        return it('should contain only related items with foreign keys matching owner id', function() {
          var owner, ownerPeople, relationship;
          organizations.fetch();
          server.respond();
          owner = organizations.first();
          owner.fetchRelated('people');
          server.respond();
          ownerPeople = owner.get('people');
          relationship = owner.getRelationship('people');
          return ownerPeople.each(function(person) {
            return assert.equal(owner.get(owner.idAttribute), person.get(relationship.foreignKey));
          });
        });
      });
      return describe('relationship collection', function() {
        it('should set an instance foreign key to owner ID when added to collection', function() {
          var owner, ownerPeople, relationship, unrelatedPerson, whereClause;
          organizations.fetch();
          people.fetch();
          server.respond();
          owner = organizations.first();
          owner.fetchRelated('people');
          server.respond();
          ownerPeople = owner.get('people');
          relationship = owner.getRelationship('people');
          whereClause = {};
          whereClause[relationship.foreignKey] = '2';
          unrelatedPerson = people.findWhere(whereClause);
          assert.equal(owner.get(owner.idAttribute), '1');
          assert.equal(unrelatedPerson.get(relationship.foreignKey), '2');
          ownerPeople.add(unrelatedPerson);
          return assert.equal(unrelatedPerson.get(relationship.foreignKey), '1');
        });
        it('should set an instance foreign key to null when removed from collection', function() {
          var owner, ownerPeople, person, relationship;
          organizations.fetch();
          server.respond();
          owner = organizations.first();
          owner.fetchRelated('people');
          server.respond();
          ownerPeople = owner.get('people');
          relationship = owner.getRelationship('people');
          assert.equal(owner.get(owner.idAttribute), '1');
          person = ownerPeople.first();
          assert.equal(person.get(relationship.foreignKey), '1');
          ownerPeople.remove(person);
          return assert.equal(person.get(relationship.foreignKey), null);
        });
        return it('should remove an instance from collection when its foreign key is changed and no longer equal to owner ID', function() {
          var owner, ownerPeople, person, relationship;
          organizations.fetch();
          server.respond();
          owner = organizations.first();
          owner.fetchRelated('people');
          server.respond();
          ownerPeople = owner.get('people');
          relationship = owner.getRelationship('people');
          assert.equal(owner.get(owner.idAttribute), '1');
          person = ownerPeople.first();
          assert.equal(person.get(relationship.foreignKey), '1');
          person.set(relationship.foreignKey, '1');
          assert.equal(person.get(relationship.foreignKey), '1');
          assert.isTrue(ownerPeople.contains(person));
          person.set(relationship.foreignKey, '2');
          assert.equal(person.get(relationship.foreignKey), '2');
          return assert.isFalse(ownerPeople.contains(person));
        });
      });
    });
    describe('AP.relationship.HasOne', function() {
      describe('model serialization with toJSON()', function() {
        return it('should return a nested object', function() {
          var person;
          people.fetch();
          server.respond();
          person = people.first();
          person.fetchRelated('automobile');
          server.respond();
          return assert.deepEqual(person.toJSON(), {
            id: '1',
            organization_id: '1',
            organization: null,
            automobile: {
              id: '1',
              person_id: '1'
            }
          });
        });
      });
      describe('generated attribute field on owner instance', function() {
        it('should be null before load', function() {
          people.fetch();
          server.respond();
          return assert.isNull(people.first().get('automobile'));
        });
        it('should be an automobile instance after load', function() {
          var person;
          people.fetch();
          server.respond();
          person = people.first();
          person.fetchRelated('automobile');
          server.respond();
          return assert.instanceOf(person.get('automobile'), AP.model.Automobile);
        });
        return it('should be set to null when related instance foreign key is changed and no longer equal to owner ID', function() {
          var person, related, relationship;
          people.fetch();
          server.respond();
          person = people.first();
          relationship = person.getRelationship('automobile');
          person.fetchRelated('automobile');
          server.respond();
          related = person.get('automobile');
          assert.equal(person.get('automobile').get(related.idAttribute), related.get(related.idAttribute));
          assert.equal(person.get(person.idAttribute), related.get(relationship.foreignKey));
          related.set(relationship.foreignKey, 'foobars');
          assert.equal(person.get('automobile'), null);
          return assert.notEqual(person.get(person.idAttribute), related.get(relationship.foreignKey));
        });
      });
      return describe('foreign key field', function() {
        return it('should be set to the ID of instance in generated attribute field', function() {
          var auto2, person, related, relationship;
          people.fetch();
          automobiles.fetch();
          server.respond();
          person = people.first();
          auto2 = automobiles.models[1];
          relationship = person.getRelationship('automobile');
          person.fetchRelated('automobile');
          server.respond();
          related = person.get('automobile');
          assert.equal(person.get(person.idAttribute), related.get(relationship.foreignKey));
          assert.notEqual(related.get(relationship.foreignKey), auto2.get(relationship.foreignKey));
          person.set('automobile', auto2);
          return assert.equal(person.get(person.idAttribute), auto2.get(relationship.foreignKey));
        });
      });
    });
    return describe('AP.relationship.BelongsTo', function() {
      describe('model serialization with toJSON()', function() {
        return it('should return a nested object', function() {
          var person;
          people.fetch();
          server.respond();
          person = people.first();
          person.fetchRelated('organization');
          server.respond();
          return assert.deepEqual(person.toJSON(), {
            id: '1',
            organization_id: '1',
            automobile: null,
            organization: {
              id: '1',
              name: 'Acme Co.',
              people: []
            }
          });
        });
      });
      describe('generated attribute field on owner instance', function() {
        it('should be null before load', function() {
          people.fetch();
          server.respond();
          return assert.isNull(people.first().get('organization'));
        });
        it('should be an organization instance after load', function() {
          var person;
          people.fetch();
          server.respond();
          person = people.first();
          person.fetchRelated('organization');
          server.respond();
          return assert.instanceOf(person.get('organization'), AP.model.Organization);
        });
        return it('should be set to null when owner foreign key is changed and no longer equal to related instance ID', function() {
          var person, related, relationship;
          people.fetch();
          server.respond();
          person = people.first();
          relationship = person.getRelationship('organization');
          person.fetchRelated('organization');
          server.respond();
          related = person.get('organization');
          assert.equal(person.get('organization'), related);
          assert.equal(person.get(relationship.foreignKey), related.get(related.idAttribute));
          person.set(relationship.foreignKey, null);
          assert.notEqual(person.get('organization'), related);
          return assert.notEqual(person.get(relationship.foreignKey), related.get(related.idAttribute));
        });
      });
      return describe('foreign key field', function() {
        return it('should be set to the ID of instance in generated attribute field', function() {
          var org2, person, related, relationship;
          people.fetch();
          organizations.fetch();
          server.respond();
          person = people.first();
          org2 = organizations.models[1];
          relationship = person.getRelationship('organization');
          person.fetchRelated('organization');
          server.respond();
          related = person.get('organization');
          assert.equal(person.get(relationship.foreignKey), related.get(related.idAttribute));
          assert.notEqual(related.get(related.idAttribute), org2.get(org2.idAttribute));
          person.set('organization', org2);
          assert.notEqual(person.get(relationship.foreignKey), related.get(related.idAttribute));
          return assert.equal(person.get(relationship.foreignKey), org2.get(org2.idAttribute));
        });
      });
    });
  });

}).call(this);
