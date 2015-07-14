/**
Provides the global namespace for SDK framework classes.  Provides convenience
methods for app management.
@module AP
@static
*/


(function() {
  var AP, _ref, _ref1, _ref10, _ref11, _ref12, _ref13, _ref14, _ref15, _ref16, _ref17, _ref18, _ref19, _ref2, _ref20, _ref21, _ref22, _ref23, _ref24, _ref25, _ref26, _ref27, _ref28, _ref29, _ref3, _ref30, _ref31, _ref32, _ref33, _ref34, _ref35, _ref36, _ref37, _ref38, _ref39, _ref4, _ref40, _ref41, _ref42, _ref43, _ref44, _ref45, _ref46, _ref47, _ref48, _ref49, _ref5, _ref50, _ref51, _ref52, _ref53, _ref54, _ref55, _ref56, _ref57, _ref58, _ref59, _ref6, _ref60, _ref61, _ref62, _ref63, _ref64, _ref65, _ref66, _ref67, _ref68, _ref69, _ref7, _ref70, _ref71, _ref72, _ref73, _ref74, _ref75, _ref76, _ref77, _ref78, _ref79, _ref8, _ref80, _ref81, _ref82, _ref83, _ref84, _ref85, _ref86, _ref87, _ref9,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  AP = (function() {
    function AP() {}

    /**
    Name of the active application.
    @property activeAppName
    @type String
    */


    AP.activeAppName = null;

    /**
    Namespace for authentication/authorization classes.
    @property auth
    @type Object
    */


    AP.auth = {};

    /**
    Namespace for general utility classes.
    @property utility
    	@type Object
    */


    AP.utility = {};

    /**
    Namespace for SDK model superclasses.
    @property model
    	@type Object
    */


    AP.model = {};

    /**
    Namespace for SDK collection superclasses.
    @property collection
    	@type Object
    */


    AP.collection = {};

    /**
    Namespace for model relationship classes.
    @property relationship
    	@type Object
    */


    AP.relationship = {};

    /**
    Namespace for apps.  In most cases only one app is present.
    @property apps
    	@type Object
    */


    AP.apps = {};

    /**
    Base URL for all XHR requests.
    @property baseUrl
    	@type String
    */


    AP.baseUrl = null;

    /**
    Enables mock server in all applications.  SinonJS is required if
    `useMockServer` is `true`.
    @property useMockServer
    	@type Boolean
    */


    AP.useMockServer = false;

    /**
    Enables offline caching of successful `GET` requests.
    @property useOfflineCache
    	@type Boolean
    */


    AP.useOfflineCache = true;

    /**
    Offline cache storage capacity in bytes.
    @property offlineStorageCapacity
    @type Number
    */


    AP.offlineStorageCapacity = 4 * 1024 * 1024;

    /**
    Registers an app class with a given name.  The name may be used later
    for look-up.  Registering an app with a duplicate name replaces any
    existing app.
    @method registerApp
    @param {AP.Application} app the application class
    @param {String} name the name of the application
    */


    AP.registerApp = function(app, name) {
      if (app && name) {
        return this.apps[name] = app;
      }
    };

    /**
    Returns an app class registered under the given name.
    @method getApp
    @param {String} name the name of the application to look up
    @return {AP.Application} the application class
    */


    AP.getApp = function(name) {
      return this.apps[name];
    };

    /**
    Returns the currently active app, if any.
    @method getActiveApp
    @return {AP.Application} the active application class, if any.
    */


    AP.getActiveApp = function() {
      return AP.getApp(this.activeAppName);
    };

    return AP;

  })();

  window.AP = AP;

  /**
  Utility singleton for encoding and decoding Base64 strings.
  @module AP
  @submodule utility
  @class Base64
  @static
  @private
  */


  AP.utility.Base64 = (function() {
    function Base64() {}

    /**
    @property _keyStr
    @type String
    @static
    @private
    */


    Base64._keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

    /**
    Encodes an input string to Base64.
    @method encode
    @static
    @param {String} input the string to be Base64-encoded
    @return {String} a Base64-encoded string
    */


    Base64.encode = function(input) {
      var chr1, chr2, chr3, enc1, enc2, enc3, enc4, i, output;
      output = '';
      i = 0;
      input = Base64._utf8_encode(input);
      while (i < input.length) {
        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);
        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;
        if (isNaN(chr2)) {
          enc3 = enc4 = 64;
        } else {
          if (isNaN(chr3)) {
            enc4 = 64;
          }
        }
        output = output + this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) + this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
      }
      return output;
    };

    /**
    Decodes an input string from Base64.
    @method decode
    @static
    @param {String} input the string to be Base64-decoded
    @return {String} a string decoded from Base64
    */


    Base64.decode = function(input) {
      var chr1, chr2, chr3, enc1, enc2, enc3, enc4, i, output;
      output = '';
      i = 0;
      input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');
      while (i < input.length) {
        enc1 = this._keyStr.indexOf(input.charAt(i++));
        enc2 = this._keyStr.indexOf(input.charAt(i++));
        enc3 = this._keyStr.indexOf(input.charAt(i++));
        enc4 = this._keyStr.indexOf(input.charAt(i++));
        chr1 = (enc1 << 2) | (enc2 >> 4);
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        chr3 = ((enc3 & 3) << 6) | enc4;
        output = output + String.fromCharCode(chr1);
        if (enc3 !== 64) {
          output = output + String.fromCharCode(chr2);
        }
        if (enc4 !== 64) {
          output = output + String.fromCharCode(chr3);
        }
      }
      output = Base64._utf8_decode(output);
      return output;
    };

    /**
    @private
    @method _utf8_encode
    @static
    */


    Base64._utf8_encode = function(string) {
      var c, n, utftext;
      string = string.replace(/\r\n/g, '\n');
      utftext = '';
      n = 0;
      while (n < string.length) {
        c = string.charCodeAt(n);
        if (c < 128) {
          utftext += String.fromCharCode(c);
        } else if ((c > 127) && (c < 2048)) {
          utftext += String.fromCharCode((c >> 6) | 192);
          utftext += String.fromCharCode((c & 63) | 128);
        } else {
          utftext += String.fromCharCode((c >> 12) | 224);
          utftext += String.fromCharCode(((c >> 6) & 63) | 128);
          utftext += String.fromCharCode((c & 63) | 128);
        }
        n++;
      }
      return utftext;
    };

    /**
    @private
    @method _utf8_decode
    @static
    */


    Base64._utf8_decode = function(utftext) {
      var c, c1, c2, c3, i, string;
      string = '';
      i = 0;
      c = c1 = c2 = 0;
      while (i < utftext.length) {
        c = utftext.charCodeAt(i);
        if (c < 128) {
          string += String.fromCharCode(c);
          i++;
        } else if ((c > 191) && (c < 224)) {
          c2 = utftext.charCodeAt(i + 1);
          string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
          i += 2;
        } else {
          c2 = utftext.charCodeAt(i + 1);
          c3 = utftext.charCodeAt(i + 2);
          string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
          i += 3;
        }
      }
      return string;
    };

    return Base64;

  })();

  /**
  Simplifies interaction with browser cookies.
  @module AP
  @submodule utility
  @class Cookie
  @static
  */


  AP.utility.Cookie = (function() {
    function Cookie() {}

    /**
    @method getFromCookieStorage
    @static
    @return {String} a copy of the raw cookie string
    */


    Cookie.getFromCookieStorage = function() {
      return document.cookie.toString();
    };

    /**
    Saves cookie to document cookies.
    @method saveToCookieStorage
    @static
    @param {String} cookie a formatted cookie-string to save to document cookies
    */


    Cookie.saveToCookieStorage = function(cookie) {
      return document.cookie = cookie;
    };

    /**
    Formats an expiration date for a cookie string.
    @method formatCookieStorageDate
    @static
    @param {Integer/Date} expiration number of days from today after which to
    expire cookie *or* a JavaScript `Date` of the absolute expiration date.
    */


    Cookie.formatCookieStorageDate = function(expiration) {
      var d;
      if (_.isNumber(expiration)) {
        d = new Date();
        d.setTime(d.getTime() + (expiration * 86400000));
        expiration = d;
      }
      if (_.isDate(expiration)) {
        return expiration.toGMTString();
      }
    };

    /**
    Builds a formatted cookie-string for saving to `document.cookies`.
    @method buildCookieStorageString
    @static
    @param {String} n name of cookie
    @param {String} v value of cookie
    @param {Integer/Date} expiration optional number of days from today after
    which to expire cookie *or* a JavaScript `Date` of the absolute
    expiration date.
    */


    Cookie.buildCookieStorageString = function(n, v, expiration) {
      var e;
      e = '';
      if (expiration) {
        e = '; expires=' + this.formatCookieStorageDate(expiration);
      }
      return n + '=' + v + e + '; path=/';
    };

    /**
    Saves a cookie to `document.cookies`.
    @method set
    @static
    @param {String} n name of cookie
    @param {String} v value of cookie
    @param {Integer/Date} expiration optional number of days from today after
    which to expire cookie *or* a JavaScript `Date` of the absolute
    expiration date.
    */


    Cookie.set = function(n, v, expiration) {
      var cookie;
      cookie = this.buildCookieStorageString(n, v, expiration);
      return this.saveToCookieStorage(cookie);
    };

    /**
    Returns a cookie with name `n` from underlaying cookie
    storage, `document.cookie`.
    @method get
    @static
    @param {String} n name of cookie
    @return {String} the cookie value, if any
    */


    Cookie.get = function(n) {
      var c, ca, i, match;
      ca = this.getFromCookieStorage().split(';');
      match = n + '=';
      c = '';
      i = 0;
      while (i < ca.length) {
        c = ca[i].replace(/^\s*/, '');
        if (c.indexOf(match) === 0) {
          return c.substring(match.length, c.length);
        }
        i++;
      }
      return null;
    };

    /**
    Deletes a cookie with name `n` from underlaying cookie storage.
    @method del
    @static
    @param {String} n name of cookie
    */


    Cookie.del = function(n) {
      return this.set(n, '', -1);
    };

    return Cookie;

  })();

  /**
  Utility singleton for working with URLs and paths.
  @module AP
  @submodule utility
  @class Url
  @static
  @private
  */


  AP.utility.Url = (function() {
    function Url() {}

    /**
    @method parseUrl
    @static
    @param {String} url the URL to parse
    @return {Object} the bits and pieces of a URL as key/value pairs
    */


    Url.parseUrl = function(url) {
      var matches, path;
      path = {
        urlParseRE: /^\s*(((([^:\/#\?]+:)?(?:(\/\/)((?:(([^:@\/#\?]+)(?:\:([^:@\/#\?]+))?)@)?(([^:\/#\?\]\[]+|\[[^\/\]@#?]+\])(?:\:([0-9]+))?))?)?)?((\/?(?:[^\/\?#]+\/+)*)([^\?#]*)))?(\?[^#]+)?)(#.*)?/,
        getLocation: function(url) {
          var hash, uri;
          uri = url ? this.parseUrl(url) : location;
          hash = this.parseUrl(url || location.href).hash;
          hash = hash === '#' ? '' : hash;
          return uri.protocol + '//' + uri.host + uri.pathname + uri.search + hash;
        }
      };
      if ($.type(url) === 'object') {
        return url;
      }
      matches = path.urlParseRE.exec(url || '') || [];
      return {
        href: matches[0] || '',
        hrefNoHash: matches[1] || '',
        hrefNoSearch: matches[2] || '',
        domain: matches[3] || '',
        protocol: matches[4] || '',
        doubleSlash: matches[5] || '',
        authority: matches[6] || '',
        username: matches[8] || '',
        password: matches[9] || '',
        host: matches[10] || '',
        hostname: matches[11] || '',
        port: matches[12] || '',
        pathname: matches[13] || '',
        directory: matches[14] || '',
        filename: matches[15] || '',
        search: matches[16] || '',
        hash: matches[17] || ''
      };
    };

    return Url;

  })();

  /**
  Mock server instances are used by the test framework to intercept XHR requests
  and simulate the functionality of an API backend, entirely offline.  A mock
  server handles all requests matching collections within the application within
  which it is instantiated.
  
  To enable a mock server in an application, simply enable the global
  `useMockServer` flag:
  @example
      AP.useMockServer = true
  
  @module AP
  @submodule utility
  @class MockServer
  */


  AP.utility.MockServer = (function() {
    /**
    @module AP
    @submodule utility
    @submodule MockServer
    @class Collections
    @static
    */

    MockServer.Collections = (function() {
      function Collections() {}

      /**
      Number of model instances with which to prepopulate a collection
      instantiated via `AP.utility.MockServer.Collections.createCollectionInstanceFor`.
      @property instancesPerCollection
      @type Number
      @static
      */


      Collections.instancesPerCollection = 3;

      /**
      Generates an `AP.collection.Collection` collection instance from the given
      collection class.  The instance is prepopulated with a number of model
      instances appropriate to the collection, the number of which is defined
      by {@link #instancesPerCollection}.
      @method createCollectionInstanceFor
      @static
      @param {AP.collection.Collection} collectionClass a class object
      @return {AP.collection.Collection} prepopulated collection instance
      */


      Collections.createCollectionInstanceFor = function(collectionClass) {
        var collection, instances;
        collection = new collectionClass;
        instances = this.createInstancesFor(collectionClass.prototype.model);
        collection.add(instances);
        return collection;
      };

      /**
      Generates a number of `AP.model.Model` model instances from the given model
      class.  The number generated
      @method createInstancesFor
      @static
      @param {AP.model.Model} modelClass a class object
      @return {AP.model.Model[]} array of model instances
      */


      Collections.createInstancesFor = function(modelClass) {
        var idAttribute, instance, num, _i, _ref, _results;
        _results = [];
        for (num = _i = 0, _ref = this.instancesPerCollection; 0 <= _ref ? _i < _ref : _i > _ref; num = 0 <= _ref ? ++_i : --_i) {
          instance = this.createInstanceFor(modelClass, num);
          idAttribute = modelClass.prototype.idAttribute;
          instance.set(idAttribute, "" + modelClass.name + "-" + num);
          _results.push(instance);
        }
        return _results;
      };

      /**
      Generates a single `AP.model.Model` model instance from the given model
      class, prepopulated with random field data
      via {@link AP.utility.MockServer.Models.generateRandomInstanceDataFor}.
      @method createInstanceFor
      @static
      @param {AP.model.Model} modelClass a class object
      @return {AP.model.Model} a model instance
      */


      Collections.createInstanceFor = function(modelClass) {
        var instanceData;
        instanceData = AP.utility.MockServer.Models.generateRandomInstanceDataFor(modelClass);
        return new modelClass(instanceData);
      };

      return Collections;

    })();

    /**
    @module AP
    @submodule utility
    @submodule MockServer
    @class Models
    @static
    */


    MockServer.Models = (function() {
      function Models() {}

      /**
      Generates random field data for a model class based on that class'
      field definitions.
      @method generateRandomInstanceDataFor
      @static
      @param {AP.model.Model} modelClass a class object
      @return {Object} key/value hash of field names and randomly generated values
      appropriate for use in instantiating the model class
      */


      Models.generateRandomInstanceDataFor = function(modelClass) {
        var _this = this;
        return _.object(_.map(modelClass.prototype.fieldDefinitions, function(fieldDef) {
          var name, value;
          name = fieldDef.name;
          value = _this.generateRandomFieldDataFor(fieldDef);
          return [name, value];
        }));
      };

      /**
      Generates random field data for a model class based on that class'
      field definitions.
      @method generateRandomFieldDataFor
      @static
      @param {AP.model.Model} fieldDef a class object
      @return {Object} key/value hash of field names and randomly generated values
      appropriate for use in instantiating the model class
      */


      Models.generateRandomFieldDataFor = function(fieldDef) {
        switch (fieldDef.type) {
          case 'string':
            return _.uniqueId("" + fieldDef.name + "_");
          case 'boolean':
            return (Math.random() * 100) < 50;
          case 'integer':
            return _.random(0, 1000000000);
          case 'float':
            return Math.random() * 1000000000;
          case 'date':
          case 'time':
            return (new Date()).toISOString();
          case 'array':
            return [_.random(0, 1000000000), _.random(0, 1000000000), _.random(0, 1000000000)];
          case 'hash':
            return {
              "field1": _.uniqueId('field1'),
              "field2": _.uniqueId('field2'),
              "field3": _.uniqueId('field3')
            };
        }
      };

      return Models;

    })();

    /**
    The application class with which this mock server as instantiated.
    See {@link #initialize}.
    @property application
    @type AP.Application
    */


    MockServer.prototype.application = null;

    /**
    A sinon fake server instance, automatically instantiated.  The sinon fake
    server intercepts XHR requests and handles the low-level request/response
    cycle.  See [Sinon.JS](http://sinonjs.org) for more information.
    @private
    @property server
    @type sinon.fakeServer
    */


    MockServer.prototype.server = null;

    /**
    The collections property is an internal datastore used by the mock server to
    simulate a database.  The collections property is a collection (database) of
    collections (tables) with additional metadata for ease of use.
    @private
    @property collections
    @type Backbone.Collection
    */


    MockServer.prototype.collections = null;

    function MockServer() {
      this.initialize.apply(this, arguments);
    }

    /**
    Constructs a mock server instance.
    @method initialize
    @param {AP.Application} application an application class to which this
    mock server applies
    */


    MockServer.prototype.initialize = function(application) {
      this.application = application;
      this.server = sinon.fakeServer.create();
      this.server.autoRespond = true;
      this.collections = new Backbone.Collection;
      return this.initResponses();
    };

    /**
    Initializes XHR request interceptors via sinon for requests originating from
    any collection within the application.
    @method initResponses
    */


    MockServer.prototype.initResponses = function() {
      var responseUrls,
        _this = this;
      responseUrls = [];
      return _.each(this.application.collections, function(collectionClass) {
        var url, urlWithQueryString;
        url = _this.getEndpointUrlFor(collectionClass);
        urlWithQueryString = _this.getEndpointRegexWithQueryStringFor(collectionClass);
        _this.server.respondWith('GET', urlWithQueryString, function(xhr) {
          return _this.handleRequest(xhr, collectionClass);
        });
        if (_.indexOf(responseUrls, url) < 0) {
          responseUrls.push(url);
          url = _this.getEndpointRegexFor(collectionClass);
          _this.server.respondWith('POST', url, function(xhr) {
            return _this.handleRequest(xhr, collectionClass);
          });
          _this.server.respondWith('PUT', url, function(xhr) {
            return _this.handleRequest(xhr, collectionClass);
          });
          return _this.server.respondWith('DELETE', url, function(xhr) {
            return _this.handleRequest(xhr, collectionClass);
          });
        }
      });
    };

    /**
    Returns the API endpoint URL associated with a given collection class.
    @method getEndpointUrlFor
    @param {AP.collection.Collection} collectionClass a collection class
    @return {String} the API enpoint URL for the collection class
    */


    MockServer.prototype.getEndpointUrlFor = function(collectionClass) {
      return collectionClass.prototype.apiEndpoint;
    };

    /**
    Returns a regular expression used to match URLs for the given
    collection class.
    @method getEndpointRegexFor
    @param {AP.collection.Collection} collectionClass a collection class
    @return {RegExp} a regular expression matching the API endpoint URL of the
    collection class
    */


    MockServer.prototype.getEndpointRegexFor = function(collectionClass) {
      return new RegExp(("" + (this.getEndpointUrlFor(collectionClass).replace('.json', ''))).replace('.', '\\.'));
    };

    /**
    Returns a regular expression used to match URLs for the given
    collection class with respect for URL query parameters matching the collection
    class' `extraParams`.
    @method getEndpointRegexWithQueryStringFor
    @param {AP.collection.Collection} collectionClass a collection class
    @return {RegExp} a regular expression matching the API endpoint URL of the
    collection class with respect for `extraParams` as query parameters
    */


    MockServer.prototype.getEndpointRegexWithQueryStringFor = function(collectionClass) {
      return new RegExp(("" + (this.getEndpointUrlFor(collectionClass)) + "?" + ($.param(collectionClass.prototype.extraParams))).replace('?', '\\?').replace('&', '\\&').replace('.', '\\.'));
    };

    /**
    Gets the previously instantiated collection matching the given colleciton
    class, if one exists in the internal datastore, otherwise instantiates one.
    @method getOrCreateCollectionInstanceFor
    @param {AP.collection.Collection} collectionClass a collection class
    @return {AP.collection.Collection} a collection instance from the datastore
    */


    MockServer.prototype.getOrCreateCollectionInstanceFor = function(collectionClass) {
      var collection, name;
      name = collectionClass.prototype.model.name;
      collection = this.collections.findWhere({
        name: name
      });
      if (!collection) {
        collection = AP.utility.MockServer.Collections.createCollectionInstanceFor(collectionClass);
        this.collections.add({
          id: collectionClass.prototype.collectionId,
          name: name,
          instance: collection
        });
      }
      return (collection != null ? collection.get('instance') : void 0) || collection;
    };

    /**
    Resets internal datastore.
    This is useful when tests require consistent datastore behavior across runs.
    @method resetDatastore
    */


    MockServer.prototype.resetDatastore = function() {
      return this.collections.reset([]);
    };

    /**
    Parses query parameters out of URL, if any, and transforms them according to
    the given collection class' query fields, if any.
    See `AP.collection.ScopeCollection`.
    @method parseQuery
    @param {AP.collection.Collection} collectionClass a collection class
    @return {Object} query parameters parsed from a URL with respect to the given
    collection class' query fields
    */


    MockServer.prototype.parseQuery = function(url, collectionClass) {
      var modelClass, parsed, query, queryFields,
        _this = this;
      modelClass = collectionClass.prototype.model;
      queryFields = collectionClass.prototype.queryFields;
      parsed = _.map(url.split('?')[1].split('&'), function(bits) {
        bits = bits.split('=');
        return [decodeURIComponent(bits[0]), decodeURIComponent(bits[1])];
      });
      query = _.filter(parsed, function(pair) {
        return pair[0].indexOf('query') === 0;
      });
      if (query.length) {
        query = _.map(query, function(pair) {
          var key, value;
          key = pair[0].replace(/query\[(.*)\]/, '$1');
          value = pair[1];
          return [key, value];
        });
        query = _.map(query, function(pair) {
          var queryField;
          queryField = _.findWhere(queryFields, {
            paramName: pair[0]
          });
          if (queryField) {
            pair[0] = queryField.fieldName;
          }
          return pair;
        });
        query = _.map(query, function(pair) {
          var key, value;
          key = pair[0];
          value = _this.castValue(modelClass, key, pair[1]);
          return [key, value];
        });
        return _.object(query);
      } else {
        return null;
      }
    };

    /**
    @method castValue
    @param {AP.model.Model} modelClass a model class
    @param {String} fieldName name of field in `modelClass`
    @param {String} fieldValue uncast value of field
    */


    MockServer.prototype.castValue = function(modelClass, fieldName, fieldValue) {
      var fieldDef;
      fieldDef = _.findWhere(modelClass.prototype.fieldDefinitions, {
        name: fieldName
      });
      switch (fieldDef.type) {
        case 'integer':
          return parseInt(fieldValue, 10);
        case 'float':
          return parseFloat(fieldValue);
        default:
          return fieldValue;
      }
    };

    /**
    Delegates an intercepted XHR request to the appropriate method, depending on
    the request method.  `GET`, `POST`, and `PUT` are supported at this time, but
    `DELETE` is not.
    @method handleRequest
    @param {AP.collection.Collection} collectionClass a collection class
    @return {Object} query parameters parsed from a URL with respect to the given
    collection class' query fields
    */


    MockServer.prototype.handleRequest = function(xhr, collectionClass) {
      switch (xhr.method.toLowerCase()) {
        case 'get':
          return this.handleGetRequest(xhr, collectionClass);
        case 'post':
          return this.handlePostRequest(xhr, collectionClass);
        case 'put':
          return this.handlePutRequest(xhr, collectionClass);
        case 'delete':
          return this.handleDeleteRequest(xhr, collectionClass);
      }
    };

    /**
    Handles an intercepted XHR `GET` request for the given collection class.  If
    no query is passed, all model instances in the appropriate collection are
    serialized to JSON and returned via a mock XHR `200` response.
    
    If a query is passed, only matching models are returned.
    
    @method handleGetRequest
    @param {Object} xhr mock XHR request object generated by sinon
    @param {AP.collection.Collection} collectionClass the collection class to
    which this request applies
    */


    MockServer.prototype.handleGetRequest = function(xhr, collectionClass) {
      var collectionInstance, query, responseBody, results;
      query = this.parseQuery(xhr.url, collectionClass);
      collectionInstance = this.getOrCreateCollectionInstanceFor(collectionClass);
      if (query) {
        results = collectionInstance.where(query);
      }
      responseBody = JSON.stringify(results || collectionInstance.toJSON());
      return xhr.respond(200, {
        "Content-Type": "application/json"
      }, responseBody);
    };

    /**
    Handles an intercepted XHR `POST` request for the given collection class.  The
    passed request body must be valid JSON.  It is parsed and used to instantiate
    a new model instance of the appropriate type using a randomly generated ID.
    The new model instance is added to the internal datastore and will be returned
    by future requests to the collection.  The resulting model instances is JSON
    serialized and returned via a mock XHR `201` response.
    @method handlePostRequest
    @param {Object} xhr mock XHR request object generated by sinon
    @param {AP.collection.Collection} collectionClass the collection class to
    which this request applies
    */


    MockServer.prototype.handlePostRequest = function(xhr, collectionClass) {
      var collectionInstance, data, idFieldDef, instance, model, responseBody;
      collectionInstance = this.getOrCreateCollectionInstanceFor(collectionClass);
      model = collectionInstance.model;
      data = JSON.parse(xhr.requestBody);
      instance = new model(data);
      idFieldDef = _.findWhere(instance.fieldDefinitions, {
        name: model.prototype.idAttribute
      });
      instance.set(model.prototype.idAttribute, AP.utility.MockServer.Models.generateRandomFieldDataFor(idFieldDef));
      collectionInstance.add(instance);
      responseBody = JSON.stringify(instance.toJSON());
      return xhr.respond(201, {
        "Content-Type": "application/json"
      }, responseBody);
    };

    /**
    Handles an intercepted XHR `PUT` request for the given collection class.  The
    passed request body must be valid JSON and must contain an ID attribute.
    It is parsed and used to update an existing model instance of the appropriate
    type within the datastore.
    
    If the requested instance exists, it is JSON  serialized and returned via a
    mock XHR `200` response.
    
    If the requested instance does not exist, a mock XHR `404` response is sent.
    
    @method handlePutRequest
    @param {Object} xhr mock XHR request object generated by sinon
    @param {AP.collection.Collection} collectionClass the collection class to
    which this request applies
    */


    MockServer.prototype.handlePutRequest = function(xhr, collectionClass) {
      var collectionInstance, data, id, idAttribute, instance, model, responseBody, whereClause;
      collectionInstance = this.getOrCreateCollectionInstanceFor(collectionClass);
      model = collectionInstance.model;
      data = JSON.parse(xhr.requestBody);
      id = xhr.url.split('/').reverse()[0].replace('.json', '');
      idAttribute = model.prototype.idAttribute;
      whereClause = {};
      whereClause[idAttribute] = this.castValue(model, idAttribute, id);
      instance = collectionInstance.findWhere(whereClause);
      if (instance) {
        instance.set(data);
        responseBody = JSON.stringify(instance.toJSON());
        return xhr.respond(200, {
          "Content-Type": "application/json"
        }, responseBody);
      } else {
        return xhr.respond(404);
      }
    };

    /**
    Handles an intercepted XHR `DELETE` request for the given collection class.
    The passed request body must be valid JSON and must contain an ID attribute.
    It is parsed and used to remove an existing model instance from the datastore.
    
    If the requested instance exists, an empty XHR `204` response is returned.
    
    If the requested instance does not exist, a mock XHR `404` response is sent.
    
    @method handleDeleteRequest
    @param {Object} xhr mock XHR request object generated by sinon
    @param {AP.collection.Collection} collectionClass the collection class to
    which this request applies
    */


    MockServer.prototype.handleDeleteRequest = function(xhr, collectionClass) {
      var collectionInstance, id, idAttribute, instance, model, responseBody, whereClause;
      collectionInstance = this.getOrCreateCollectionInstanceFor(collectionClass);
      model = collectionInstance.model;
      id = xhr.url.split('/').reverse()[0].replace('.json', '');
      idAttribute = model.prototype.idAttribute;
      whereClause = {};
      whereClause[idAttribute] = this.castValue(model, idAttribute, id);
      instance = collectionInstance.findWhere(whereClause);
      if (instance) {
        collectionInstance.remove(instance);
        responseBody = '';
        return xhr.respond(204, {
          "Content-Type": "application/json"
        }, responseBody);
      } else {
        return xhr.respond(404);
      }
    };

    return MockServer;

  }).call(this);

  /**
  Provides an extensible facility for validating arbitrary data.  While validator
  is used primarily by {@link AP.model.Model}, it may be used to
  validate any data object.
  
  Subclass validator to implement additional validation types.  Built-in
  validation types include:
  
  - `required`:  field must have a non-null value
  - `type`:  field type is consistent with the type specified in `is`
  
  Example usage:
  @example
      validator = new AP.utility.Validator();
      validator.data = {
        name: 'John Doe',
        age: 46
      };
      validator.validations = [{
        field: 'name',
        validate: 'required'
      }, {
        field: 'age',
        validate: 'type',
        is: 'integer'
      }];
  
      validator.validate();
      // true
      validator.data.age = null;
      validator.validate();
      // true
      // age is not required:  although "null" is not an integer, it is valid
      // because the type validator ignores null values.
      
      validator.data.name = '';
      validator.validate();
      // false
  
  @module AP
  @submodule utility
  @class Validator
  */


  AP.utility.Validator = (function() {
    /**
    Internal errors array.  If the errors array contains any errors then the
    validator is considered to be in an invalid state.
    @private
    @property _errors
    @type Object[]
    */

    Validator.prototype._errors = [];

    /**
    Internal hash of error messages.  Each key is an error type where its value
    is an error message string.
    @private
    @property _errorMessages
    @type Object
    */


    Validator.prototype._errorMessages = {
      required: 'this field is required',
      numericality: 'this field must resemble a number',
      booleanType: 'this field must be a boolean',
      stringType: 'this field must be a string',
      numberType: 'this field must be a number',
      integer: 'this field must be an integer',
      float: 'this field must be a float',
      missingType: 'this field cannot be validated as type {0}'
    };

    /**
    The data object to validate.
    @property data
    @type Object
    */


    Validator.prototype.data = {};

    /**
    A list of validations to apply.  Validations is an array of validation
    configuration objects.  Validation configuration objects must contain at least
    the following members:
    
    - `field`:  a key in the {@link #data} object
    - `validate`:  a string reprenting the validation type
    
    Certain validations may require additional information.  For example, the
    `type` validation requires an `is` member, the data type.
    
    For example:
    @example
        [
          field: 'name'
          validate: 'required'
        ,
          field: 'amount'
          validate: 'numericality'
        ,
          field: 'age'
          validate: 'type'
          is: 'integer'
        ]
    
    @property validations
    @type Object[]
    */


    Validator.prototype.validations = [];

    function Validator(data, validations) {
      this.data = data;
      this.validations = validations;
      this._errors = [];
      this.data = _.clone(this.data);
      this.validations = _.clone(this.validations);
    }

    /**
    Returns true if the validator has no errors.  **Note**:  {@link #validate}
    should be executed before calling `isValid`.  Always returns `true` if
    executed before `validate`.
    @method isValid
    @return {Boolean} `true` if there
    */


    Validator.prototype.isValid = function() {
      return !this.errors().length;
    };

    /**
    Applies the validations specified in {@link #validations} to {@link #data},
    clearing any existing errors first.
    @method validate
    @return {Boolean} the return value of {@link #isValid}.
    */


    Validator.prototype.validate = function() {
      var validation, _i, _len, _ref;
      this._errors = [];
      _ref = this.validations;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        validation = _ref[_i];
        if (this[validation.validate]) {
          this[validation.validate](this.data[validation.field], validation);
        }
      }
      return this.isValid();
    };

    /**
    Adds an error of `type` for field `fieldName` to the validator where `type` is
    a key in the internal {@link #_errorMessages error messages hash}.  Additional
    data may be passed as an array via `extra` which is interpolated into the
    error message.
    @method addError
    @param {String} fieldName the field to which the error applies
    @param {String} type the error type, corresponding to a key in the internal
    error messages hash.
    @param {String[]} [extra] optional array of strings to be interpolated into
    the error message
    */


    Validator.prototype.addError = function(fieldName, type, extra) {
      var i, message, value, _i, _len;
      message = this._errorMessages[type] || 'is invalid';
      if (extra) {
        for (i = _i = 0, _len = extra.length; _i < _len; i = ++_i) {
          value = extra[i];
          message = message.replace("{" + i + "}", value);
        }
      }
      return this._errors.push({
        field: fieldName,
        message: message
      });
    };

    /**
    Returns the internal errors array.
    @method errors
    @return {String[]} the internal errors array.
    */


    Validator.prototype.errors = function() {
      return this._errors;
    };

    /**
    Validates that the value is non-null.  If null or undefined, adds an error.
    @method required
    @param value the value to validate
    @param {Object} options a validation configuration object, for example:
        {field: 'title', validate: 'required'}
    */


    Validator.prototype.required = function(value, options) {
      if (value === null || value === void 0) {
        return this.addError(options.field, 'required');
      }
    };

    /**
    Validates that the value looks like a number.  The value is allowed to be
    either a strict string or number type, as long as it looks like a number.
    @method numericality
    @param value the value to valiate as numerical
    @param {Object} options a validation configuration object, for example:
        {field: 'amount', validate: 'numericality'}
    */


    Validator.prototype.numericality = function(value, options) {
      if ((value != null) && !value.toString().match(/^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$/)) {
        return this.addError(options.field, 'numericality');
      }
    };

    /**
    Validates that the value is of a specified type.  Adds an error if the value
    is not of the specified type.
    @method type
    @param value the value to validate
    @param {Object} options a validation configuration object with an extra `is`
    member to specify type, for example:
        {field: 'title', validate: 'type', is: 'string'}
    */


    Validator.prototype.type = function(value, options) {
      var type;
      type = options.is.toLowerCase();
      if (this["" + type + "Type"]) {
        return this["" + type + "Type"](value, options);
      } else {
        return this.addError(options.field, 'missingType', [type]);
      }
    };

    /**
    Validates that `value` is a boolean.  Adds an error if `value` is present but
    not of type boolean.
    @method booleanType
    @param value the value to validate
    @param {Object} options a validation configuration object with an extra `is`
    member to specify type, for example:
        {field: 'title', validate: 'type', is: 'boolean'}
    */


    Validator.prototype.booleanType = function(value, options) {
      if (((typeof value) !== 'boolean') && (value !== null && value !== void 0)) {
        return this.addError(options.field, 'booleanType');
      }
    };

    /**
    Validates that `value` is a string.  Adds an error if `value` is present but
    not of type string.
    @method stringType
    @param value the value to validate
    @param {Object} options a validation configuration object with an extra `is`
    member to specify type, for example:
        {field: 'title', validate: 'type', is: 'string'}
    */


    Validator.prototype.stringType = function(value, options) {
      if (((typeof value) !== 'string') && (value !== null && value !== void 0)) {
        return this.addError(options.field, 'stringType');
      }
    };

    /**
    Validates that `value` is a number.  Adds an error if `value` is present but
    not of type number.
    @method numberType
    @param value the value to validate
    @param {Object} options a validation configuration object with an extra `is`
    member to specify type, for example:
        {field: 'title', validate: 'type', is: 'number'}
    */


    Validator.prototype.numberType = function(value, options) {
      if (((typeof value) !== 'number') && (value !== null && value !== void 0)) {
        return this.addError(options.field, 'numberType');
      }
    };

    /**
    Validates that `value` is a number.  Adds an error if `value` is present but
    not of type number.
    @method floatType
    @param value the value to validate
    @param {Object} options a validation configuration object with an extra `is`
    member to specify type, for example:
        {field: 'title', validate: 'type', is: 'float'}
    */


    Validator.prototype.floatType = function(value, options) {
      if (((typeof value) !== 'number') && (value !== null && value !== void 0)) {
        return this.addError(options.field, 'floatType');
      }
    };

    /**
    Validates that `value` is a whole number.  Adds an error if `value` is present
    but not of a whole number.
    @method integerType
    @param value the value to validate
    @param {Object} options a validation configuration object with an extra `is`
    member to specify type, for example:
        {field: 'title', validate: 'type', is: 'integer'}
    */


    Validator.prototype.integerType = function(value, options) {
      if (value !== null && value !== void 0) {
        if (!(((typeof value) === 'number') && (value.toString().indexOf('.') === -1))) {
          return this.addError(options.field, 'integerType');
        }
      }
    };

    /**
    **UNIMPLEMENTED***
    Validates that `value` is a data.
    @method dateType
    @beta
    @param value the value to validate
    @param {Object} options a validation configuration object with an extra `is`
    member to specify type, for example:
        {field: 'title', validate: 'type', is: 'date'}
    */


    Validator.prototype.dateType = function(value, options) {};

    /**
    **UNIMPLEMENTED***
    Validates that `value` is a time.
    @method timeType
    @beta
    @param value the value to validate
    @param {Object} options a validation configuration object with an extra `is`
    member to specify type, for example:
        {field: 'title', validate: 'type', is: 'time'}
    */


    Validator.prototype.timeType = function(value, options) {};

    return Validator;

  })();

  AP.utility.TransientStore = (function() {
    TransientStore.prototype.namespace = 'ap';

    TransientStore.prototype.expiresAfter = 7;

    TransientStore.prototype._data = null;

    function TransientStore(options) {
      if (options == null) {
        options = {};
      }
      this.namespace = (options != null ? options.namespace : void 0) || this.namespace;
      this.expiresAfter = (options != null ? options.expiresAfter : void 0) || this.expiresAfter;
      this._data = {};
    }

    TransientStore.prototype.getFromUnderlayingStorage = function(qualifiedKey) {
      return this._data[qualifiedKey];
    };

    TransientStore.prototype.setToUnderlayingStorage = function(qualifiedKey, value, expirationDate) {
      return this._data[qualifiedKey] = value;
    };

    TransientStore.prototype.removeFromUnderlayingStorage = function(qualifiedKey) {
      return delete this._data[qualifiedKey];
    };

    TransientStore.prototype.encodeValue = function(value) {
      var encoded;
      encoded = JSON.stringify([value]);
      return AP.utility.Base64.encode(encoded);
    };

    TransientStore.prototype.decodeValue = function(value) {
      var decoded, error;
      if (value) {
        decoded = AP.utility.Base64.decode(value);
      }
      try {
        decoded = JSON.parse(decoded);
      } catch (_error) {
        error = _error;
      }
      return decoded != null ? decoded[0] : void 0;
    };

    TransientStore.prototype.getKeyString = function(key) {
      var strKey;
      strKey = this.encodeValue(key);
      return strKey;
    };

    TransientStore.prototype.getQualifiedKey = function(key) {
      var strKey;
      strKey = this.getKeyString(key);
      return "" + this.namespace + "-" + strKey;
    };

    TransientStore.prototype.getQualifiedExpireKey = function(key) {
      var strKey;
      strKey = this.getKeyString(key);
      return "" + this.namespace + "-expire-" + strKey;
    };

    TransientStore.prototype.getExpirationDate = function(days) {
      var d;
      d = new Date();
      d.setTime(d.getTime() + (days * 86400000));
      return d;
    };

    TransientStore.prototype.get = function(key) {
      var expire, expireKey, qKey, record;
      qKey = this.getQualifiedKey(key);
      expireKey = this.getQualifiedExpireKey(key);
      record = this.getFromUnderlayingStorage(qKey);
      if (this.getFromUnderlayingStorage(expireKey)) {
        expire = parseInt(this.decodeValue(this.getFromUnderlayingStorage(expireKey)), 10);
      }
      if (_.isNumber(expire) && (expire <= Date.now())) {
        this.remove(key);
        record = this.getFromUnderlayingStorage(qKey);
      }
      return this.decodeValue(record);
    };

    TransientStore.prototype.set = function(key, value, expiresAfter) {
      var expirationDate, expireKey, qKey;
      qKey = this.getQualifiedKey(key);
      expireKey = this.getQualifiedExpireKey(key);
      expirationDate = this.getExpirationDate(expiresAfter || this.expiresAfter);
      this.setToUnderlayingStorage(qKey, this.encodeValue(value), expirationDate);
      return this.setToUnderlayingStorage(expireKey, this.encodeValue(expirationDate.getTime()), expirationDate);
    };

    TransientStore.prototype.remove = function(key) {
      var expireKey, qKey;
      qKey = this.getQualifiedKey(key);
      expireKey = this.getQualifiedExpireKey(key);
      this.removeFromUnderlayingStorage(qKey);
      return this.removeFromUnderlayingStorage(expireKey);
    };

    return TransientStore;

  })();

  AP.utility.TransientCookieStore = (function(_super) {
    __extends(TransientCookieStore, _super);

    function TransientCookieStore() {
      _ref = TransientCookieStore.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    TransientCookieStore.supported = (function() {
      var actualValue, key, supported, value;
      supported = window.document.cookie != null;
      if (supported) {
        key = _.uniqueId('ap-cookie-support-test');
        value = 'success';
        AP.utility.Cookie.set(key, value);
        actualValue = AP.utility.Cookie.get(key);
        if (value !== actualValue) {
          supported = false;
        }
      }
      return supported;
    })();

    TransientCookieStore.prototype.getFromUnderlayingStorage = function(qualifiedKey) {
      var value;
      value = TransientCookieStore.__super__.getFromUnderlayingStorage.apply(this, arguments);
      if (AP.utility.TransientCookieStore.supported) {
        value = AP.utility.Cookie.get(qualifiedKey);
      }
      return value;
    };

    TransientCookieStore.prototype.setToUnderlayingStorage = function(qualifiedKey, value, expirationDate) {
      TransientCookieStore.__super__.setToUnderlayingStorage.apply(this, arguments);
      if (AP.utility.TransientCookieStore.supported) {
        return AP.utility.Cookie.set(qualifiedKey, value, expirationDate);
      }
    };

    TransientCookieStore.prototype.removeFromUnderlayingStorage = function(qualifiedKey) {
      TransientCookieStore.__super__.removeFromUnderlayingStorage.apply(this, arguments);
      if (AP.utility.TransientCookieStore.supported) {
        return AP.utility.Cookie.del(qualifiedKey);
      }
    };

    return TransientCookieStore;

  })(AP.utility.TransientStore);

  AP.utility.TransientLocalStore = (function(_super) {
    __extends(TransientLocalStore, _super);

    function TransientLocalStore() {
      _ref1 = TransientLocalStore.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    TransientLocalStore.supported = window.localStorage != null;

    TransientLocalStore.prototype.storage = window.localStorage;

    TransientLocalStore.prototype.getFromUnderlayingStorage = function(qualifiedKey) {
      var value;
      value = TransientLocalStore.__super__.getFromUnderlayingStorage.apply(this, arguments);
      if (AP.utility.TransientLocalStore.supported) {
        value = this.storage.getItem(qualifiedKey);
      }
      return value;
    };

    TransientLocalStore.prototype.setToUnderlayingStorage = function(qualifiedKey, value, expirationDate) {
      TransientLocalStore.__super__.setToUnderlayingStorage.apply(this, arguments);
      if (AP.utility.TransientLocalStore.supported) {
        return this.storage.setItem(qualifiedKey, value);
      }
    };

    TransientLocalStore.prototype.removeFromUnderlayingStorage = function(qualifiedKey) {
      TransientLocalStore.__super__.removeFromUnderlayingStorage.apply(this, arguments);
      if (AP.utility.TransientLocalStore.supported) {
        return this.storage.removeItem(qualifiedKey);
      }
    };

    return TransientLocalStore;

  })(AP.utility.TransientStore);

  AP.utility.TransientLargeLocalStore = (function(_super) {
    __extends(TransientLargeLocalStore, _super);

    TransientLargeLocalStore.supported = window.LargeLocalStorage != null;

    TransientLargeLocalStore.prototype.storage = null;

    TransientLargeLocalStore.prototype.storageCapacity = 64 * 1024 * 1024;

    TransientLargeLocalStore.prototype.storageName = 'large-local-storage';

    function TransientLargeLocalStore(options) {
      if (options == null) {
        options = {};
      }
      TransientLargeLocalStore.__super__.constructor.apply(this, arguments);
      this.storageCapacity = (options != null ? options.storageCapacity : void 0) || this.storageCapacity;
      this.storageName = (options != null ? options.storageName : void 0) || this.storageName;
      if (AP.utility.TransientLargeLocalStore.supported) {
        this.storage = new LargeLocalStorage({
          size: this.storageCapacity,
          name: "" + this.namespace + "-" + this.storageName
        });
      }
    }

    TransientLargeLocalStore.prototype.getFromUnderlayingStorage = function(qualifiedKey) {
      var _this = this;
      if ((this.storage != null) && AP.utility.TransientLargeLocalStore.supported) {
        return this.storage.initialized.then(function() {
          return _this.storage.getContents(qualifiedKey);
        });
      } else {
        return TransientLargeLocalStore.__super__.getFromUnderlayingStorage.apply(this, arguments);
      }
    };

    TransientLargeLocalStore.prototype.setToUnderlayingStorage = function(qualifiedKey, value, expirationDate) {
      var _this = this;
      if ((this.storage != null) && AP.utility.TransientLargeLocalStore.supported) {
        return this.storage.initialized.then(function() {
          return _this.storage.setContents(qualifiedKey, value);
        });
      } else {
        return TransientLargeLocalStore.__super__.setToUnderlayingStorage.apply(this, arguments);
      }
    };

    TransientLargeLocalStore.prototype.removeFromUnderlayingStorage = function(qualifiedKey) {
      var _this = this;
      if ((this.storage != null) && AP.utility.TransientLargeLocalStore.supported) {
        return this.storage.initialized.then(function() {
          return _this.storage.rm(qualifiedKey);
        });
      } else {
        return TransientLargeLocalStore.__super__.removeFromUnderlayingStorage.apply(this, arguments);
      }
    };

    TransientLargeLocalStore.prototype.get = function(key, options) {
      var callback, expireKey, qKey, _ref2,
        _this = this;
      if (options == null) {
        options = {};
      }
      qKey = this.getQualifiedKey(key);
      expireKey = this.getQualifiedExpireKey(key);
      callback = function(value) {
        if (value != null) {
          if (_.isFunction(options.success)) {
            return options.success(value);
          }
        } else if (_.isFunction(options.error)) {
          return options.error();
        }
      };
      if ((this.storage != null) && (_.isFunction(options.success || _.isFunction(options.error)))) {
        return (_ref2 = this.storage) != null ? _ref2.initialized.then(function() {
          return _this.getFromUnderlayingStorage(qKey).then(function(record) {
            return _this.getFromUnderlayingStorage(expireKey).then(function(expireRecord) {
              var expire, value;
              if (expireRecord) {
                expire = +_this.decodeValue(expireRecord);
              }
              if (_.isNumber(expire) && (expire <= Date.now())) {
                _this.remove(key);
                record = null;
              }
              value = _this.decodeValue(record);
              return callback(value);
            });
          });
        }) : void 0;
      } else {
        return callback(TransientLargeLocalStore.__super__.get.apply(this, arguments));
      }
    };

    return TransientLargeLocalStore;

  })(AP.utility.TransientStore);

  if (AP.auth == null) {
    AP.auth = {};
  }

  /**
  Provides methods for user authentication and deauthentication.
  
  To login (Coffeescript):
  @example
      AP.auth.Authentication.login
        username: 'johndoe'
        password: 'doe123'
      
      AP.auth.Authentication.isAuthenticated()
      # true
  
  To logout:
  @example
      AP.auth.Authentication.logout()
      
      AP.auth.Authentication.isAuthenticated()
      # false
  
  @module AP
  @submodule auth
  @class Authentication
  @static
  */


  AP.auth.Authentication = (function() {
    var _this = this;

    function Authentication() {}

    _.extend(Authentication, Backbone.Events);

    $.ajaxSetup({
      complete: _.debounce((function(xhr, result) {
        if (xhr.status === 401 && result === 'error') {
          return Authentication.destroySession();
        }
      }), 150)
    });

    /**
    Stores details about authentication and authorization.
    @property authenticationSettings
    @type Object
    */


    Authentication.authenticationSettings = {
      /**
      The object definition ID of the designated authenticatable object.
      @property authenticationSettings.object_definition_id
      @type String
      */

      object_definition_id: '4520',
      /**
      The name of the field to match for authentication.  Only one value is used
      at this time:  `password`.
      @property authenticationSettings.match_field
      @type String
      */

      match_field: 'password',
      /**
      The name of the field used to find a user.  For example:  `username`.
      @property authenticationSettings.lookup_field
      @type String
      */

      lookup_field: 'username',
      /**
      The name of the field on the object returned after authenticating that
      stores user roles.  The role field is used by `AP.auth.Authorization`.
      @property authenticationSettings.role_field
      @type String
      */

      role_field: 'role',
      /**
      The name of the field on the object returned after authenticating that
      stores the session ID.  For example:  `x-session-id`.
      @property authenticationSettings.session_id_field
      @type String
      */

      session_id_field: 'x_session_id',
      /**
      `true` if authentication uses secure passwords.  Secure passwords should be
      masked in the UI.
      @property authenticationSettings.has_secure_password
      @type Boolean
      */

      has_secure_password: true,
      /**
      `true` if {@link #lookup_field} should be all lowercase.
      @property authenticationSettings.downcase_lookup_field
      @type Boolean
      */

      downcase_lookup_field: true,
      /**
      @property authenticationSettings.authentication_url
      @type String
      URL of login API endpoint.  Login requests must be made to this URL.
      */

      authentication_url: '/auth/password/callback',
      /**
      URL of logout API endpoint.  Logout requests must be made to this URL.
      @property authenticationSettings.deauthentication_url
      @type String
      */

      deauthentication_url: '/auth/signout'
    };

    /**
    Custom header to send/retrieve the session ID when using CORS.
    @private
    @property _authSessionIdHeaderName
    @type String
    */


    Authentication._authSessionIdHeaderName = 'X-Session-Id';

    /**
    Transient storage instance for persisting session data.
    @private
    @property store
    @type AP.utility.TransientStore
    */


    Authentication.store = AP.utility.TransientLocalStore.supported ? new AP.utility.TransientLocalStore({
      namespace: 'ap-auth'
    }) : new AP.utility.TransientCookieStore({
      namespace: 'ap-auth'
    });

    /**
    Executes login request with passed `credentials`.
    @method login
    @static
    @param {Object} credentials the user credentials
    */


    Authentication.login = function(credentials) {
      if (!this.isAuthenticated()) {
        return this.authenticate(credentials);
      }
    };

    /**
    Executes logout request.
    @method logout
    @static
    */


    Authentication.logout = function() {
      if (this.isAuthenticated()) {
        return this.deauthenticate();
      }
    };

    /**
    @method isAuthenticatable
    @static
    @return {Boolean} `true` if authentication is enabled
    */


    Authentication.isAuthenticatable = function() {
      return !!this.authenticationSettings;
    };

    /**
    @method isAuthenticated
    @static
    @return {Boolean} `true` if a user is logged-in
    */


    Authentication.isAuthenticated = function() {
      return !!(this.getAuthSessionData() && this.getAuthSessionId());
    };

    /**
    Performs authentication request with HTTP basic auth.  Upon a successful
    login the user object returned by the API is stored for later use.
    @method authenticate
    @static
    @param {Object} credentials user credentials object, for example:
    `{"username": "johndoe", "password": "doe123"}`.
    */


    Authentication.authenticate = function(credentials) {
      var settings,
        _this = this;
      AP = window.AP;
      settings = this.getAuthenticationSettings();
      return $.ajax({
        url: settings.authentication_url,
        type: 'POST',
        dataType: 'json',
        data: credentials,
        beforeSend: function(request, settings) {
          var bits;
          request.setRequestHeader('Authorization', _this.makeHTTPBasicAuthHeader(credentials));
          if (!AP.useMockServer && AP.baseUrl) {
            bits = AP.utility.Url.parseUrl(settings.url);
            if (!(bits.host && bits.protocol)) {
              return _.extend(settings, {
                crossDomain: true,
                url: "" + AP.baseUrl + settings.url,
                xhrFields: _.extend({}, settings.xhrFields, {
                  withCredentials: true
                })
              });
            }
          }
        },
        success: function(response, status, xhr) {
          var sessionId;
          if (response) {
            _this.store.set(_this.getAuthSessionDataKey(), response, 7);
          }
          sessionId = xhr.getResponseHeader(_this.getAuthSessionIdHeaderName());
          if (!sessionId && (settings.session_id_field != null)) {
            sessionId = response != null ? response[settings.session_id_field] : void 0;
          }
          if (sessionId) {
            _this.store.set(_this.getAuthSessionIdKey(), sessionId, 7);
          }
          if (response && sessionId) {
            /**
            @event 'auth:authenticated'
            An authenticated event is triggered after a successful login.
            */

            return _this.trigger('auth:authenticated');
          } else {
            return _this.trigger('auth:error');
          }
        },
        error: function() {
          /**
          @event 'auth:error'
          An auth error event is triggered if a login or logout fails for
          any reason.
          */

          return _this.trigger('auth:error');
        }
      });
    };

    /**
    Performs deauthentication request.  Upon a successful logout, stored user data
    is removed.
    @method deauthenticate
    @static
    */


    Authentication.deauthenticate = function() {
      var settings,
        _this = this;
      AP = window.AP;
      settings = this.getAuthenticationSettings();
      return $.ajax({
        url: settings.deauthentication_url,
        type: 'POST',
        dataType: 'text',
        beforeSend: function(request, settings) {
          var authSessionId, authSessionIdHeader, bits;
          authSessionIdHeader = _this.getAuthSessionIdHeaderName();
          authSessionId = _this.getAuthSessionId();
          if (authSessionId) {
            request.setRequestHeader(authSessionIdHeader, authSessionId);
          }
          if (!AP.useMockServer && AP.baseUrl) {
            bits = AP.utility.Url.parseUrl(settings.url);
            if (!(bits.host && bits.protocol)) {
              return _.extend(settings, {
                crossDomain: true,
                url: "" + AP.baseUrl + settings.url,
                xhrFields: _.extend({}, settings.xhrFields, {
                  withCredentials: true
                })
              });
            }
          }
        },
        complete: function(response) {
          return _this.destroySession();
        }
      });
    };

    /**
    Destroys session by deleting data in auth store.
    @private
    @method destroySession
    @static
    */


    Authentication.destroySession = function() {
      this.store.remove(this.getAuthSessionDataKey());
      this.store.remove(this.getAuthSessionIdKey());
      /**
      @event auth:deauthenticated
      A deauthenticated event is triggered after the session is destroyed.
      */

      return this.trigger('auth:deauthenticated');
    };

    /**
    Returns the name of the custom session ID header.
    @method getAuthSessionIdHeaderName
    @static
    */


    Authentication.getAuthSessionIdHeaderName = function() {
      return this._authSessionIdHeaderName;
    };

    /**
    Builds a base-URL-specific auth key.  Since multiple apps may
    sometimes be served from the same domain, auth keys must include the name
    of the base URL (API server) in the key name for uniqueness.
    @private
    @method getAuthSessionDataKey
    @static
    @return {String} auth store key, unique by base URL
    */


    Authentication.getAuthSessionDataKey = function() {
      var baseName, baseUrl;
      baseName = 'session';
      if (AP.baseUrl) {
        baseUrl = AP.baseUrl.replace(/[^a-zA-Z\-0-9]/g, '');
      }
      if (baseUrl) {
        return "" + baseName + "-" + baseUrl;
      } else {
        return baseName;
      }
    };

    /**
    Builds a key name from `getAuthSessionDataKey` with `-session-id` appended.
    @private
    @static
    @method getAuthSessionIdKey
    @return {String} auth session ID key name
    */


    Authentication.getAuthSessionIdKey = function() {
      return "" + (this.getAuthSessionDataKey()) + "-id";
    };

    /**
    Returns the auth session data (a user) from auth store if logged in.
    @method getAuthSessionData
    @static
    @return {Object/null} the authenticated user object
    */


    Authentication.getAuthSessionData = function() {
      return this.store.get(this.getAuthSessionDataKey());
    };

    /**
    Returns the lookup field value (username) of the currently logged-in user.
    @return {Object/null} the authenticated user's lookup field value (username)
    */


    Authentication.getUsername = function() {
      var credentials, settings;
      settings = this.getAuthenticationSettings();
      credentials = this.getAuthSessionData();
      return credentials != null ? credentials[settings != null ? settings.lookup_field : void 0] : void 0;
    };

    /**
    Returns the role(s) of the currently logged-in user.
    @return {Object/null} the authenticated user's role(s)
    */


    Authentication.getUserRole = function() {
      var credentials, settings;
      settings = this.getAuthenticationSettings();
      credentials = this.getAuthSessionData();
      return credentials != null ? credentials[settings != null ? settings.role_field : void 0] : void 0;
    };

    /**
    Returns the auth ID from auth store.
    @private
    @static
    @method getAuthSessionId
    @return {String/null} the current session ID
    */


    Authentication.getAuthSessionId = function() {
      var data;
      return data = this.store.get(this.getAuthSessionIdKey());
    };

    /**
    @private
    @static
    @method getAuthenticationSettings
    @return {Object/null} the authenticatable object if one is specified.
    Otherwise null.
    */


    Authentication.getAuthenticationSettings = function() {
      return this.authenticationSettings || null;
    };

    /**
    @private
    @static
    @method getAuthenticatableObject
    @return {Object/null} the model specified as the authenticatable object if one
    is specified.  Otherwise null.
    */


    Authentication.getAuthenticatableObject = function() {
      var _ref2;
      return window.AP.getActiveApp().getModel((_ref2 = this.getAuthenticationSettings()) != null ? _ref2.object_definition_id : void 0);
    };

    /**
    Builds a Base64-encoded HTTP basic auth header for use in an
    authentication request.
    @private
    @static
    @method makeHTTPBasicAuthHeader
    @param {Object} credentials the user credentials
    @return {String} Base-64 encoded HTTP basic auth header with user credentials
    */


    Authentication.makeHTTPBasicAuthHeader = function(credentials) {
      var lookup, match, settings;
      settings = this.getAuthenticationSettings();
      lookup = credentials[settings.lookup_field];
      match = credentials[settings.match_field];
      return "Basic " + (AP.utility.Base64.encode([lookup, match].join(':')));
    };

    return Authentication;

  }).call(this);

  if (AP.auth == null) {
    AP.auth = {};
  }

  /**
  Authorizes arbitrary objects against the currently logged-in user (see
  `AP.auth.Authentication`).  Any object may be made permission-based by adding
  an auth rules field.  If the currently logged-in user has _any role_ specified
  in the rules array, it is considered authorized.
  
  Example arbitrary permission-based object (Coffeescript):
  @example
      myObject1 =
        member1: 'foo'
        rules: [{roles: 'manager'}, {roles: 'admin'}]
      # authorized if logged-in user has _either_ `manager` _or_ `admin` roles
      
      myObject2 =
        member: 'bar'
        rules: [{roles: 'manager,admin'}]
      # authorized if logged-in user has both `manager` and `admin` roles
  
  Example usage (Coffeescript):
  @example
      AP.auth.Authorization.isAuthorized(myObject1.rules)
      AP.auth.Authorization.isAuthorized(myObject2.rules)
  
  @module AP
  @submodule auth
  @class Authorization
  @static
  */


  AP.auth.Authorization = (function() {
    function Authorization() {}

    /**
    @method isAuthorized
    @static
    @param {String} rules array of rule objects
    @return {Boolean} `true` if logged-in user has any role in at least one
    rule _or_ there are no rules
    */


    Authorization.isAuthorized = function(rules) {
      if ((rules == null) || rules.length === 0) {
        return true;
      }
      return this._passesAnyRule(rules);
    };

    /**
    @private
    @method _passesAnyRule
    @static
    @param {String} rules array of rule objects
    @return {Boolean} `true` if logged-in user has any role in at least
    one rule
    */


    Authorization._passesAnyRule = function(rules) {
      var rule, _i, _len;
      for (_i = 0, _len = rules.length; _i < _len; _i++) {
        rule = rules[_i];
        if (this._passesRule(rule)) {
          return true;
        }
      }
      return false;
    };

    /**
    @private
    @method _passesRule
    @static
    @param {String} rule rule object
    @return {Boolean} `true` if logged-in user has any roles in rule object or
    rule has no roles specified
    */


    Authorization._passesRule = function(rule) {
      return this._ruleHasNoRoles(rule) || this._hasAnyRole(rule.roles);
    };

    /**
    @private
    @static
    @method _ruleHasNoRoles
    @param {String} rule rule object
    @return {Boolean} `true` if rule has no `roles` field
    */


    Authorization._ruleHasNoRoles = function(rule) {
      return !rule.hasOwnProperty('roles');
    };

    /**
    @private
    @static
    @method _hasAnyRole
    @param {String} roles_string string containing comma-separated role names
    @return {Boolean} `true` if logged-in user has any role in the roles string
    */


    Authorization._hasAnyRole = function(roles_string) {
      var role, user_roles, _i, _len, _ref2;
      user_roles = this._getRoles();
      _ref2 = roles_string.split(',');
      for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
        role = _ref2[_i];
        if (user_roles.indexOf($.trim(role)) >= 0) {
          return true;
        }
      }
      if (!roles_string && AP.auth.Authentication.isAuthenticated()) {
        return true;
      }
      return false;
    };

    /**
    @private
    @static
    @method _getRoles
    @return {String[]} array of roles for the currently logged-in user.  Returns
    an empty array if no user is logged in.
    */


    Authorization._getRoles = function() {
      var authSettings, data, roles, rolesField;
      authSettings = AP.auth.Authentication.getAuthenticationSettings();
      rolesField = authSettings.role_field;
      data = AP.auth.Authentication.getUserRole();
      roles = data != null ? data.split(',') : [];
      roles.map(function(x) {
        return $.trim(x);
      });
      return roles;
    };

    return Authorization;

  })();

  /**
  Base model class.  In addition to the standard methods provided by the
  [BackboneJS model class](http://backbonejs.org/#Model), this base model
  implements full validations support.
  
  This model should be subclassed, not used directly.  For example (Coffeescript):
  @example
      class Person extends AP.model.Model
        @modelId: 'person'
        name: 'Person'
        urlRoot: '/person/'
        fieldDefinitions: [
          name: 'name'
          type: 'string'
        ,
          name: 'age'
          type: 'integer'
        ]
        validations: [
          field: 'name'
          validate: 'type'
          is: 'string'
        ,
          field: 'name'
          validate: 'required'
        ,
          field: 'age'
          validate: 'type'
          is: 'integer'
        ]
  
  For full model usage documentation,
  refer to [Backbone JS](http://backbonejs.org/#Model).
  
  @module AP
  @submodule model
  @class Model 
  @extends Backbone.Model
  */


  AP.model.Model = (function(_super) {
    __extends(Model, _super);

    function Model() {
      _ref2 = Model.__super__.constructor.apply(this, arguments);
      return _ref2;
    }

    /**
    An internal reference to initialized relationship instances for this
    model instance.
    @property _relationships
    @type AP.relationship.Relationship[]
    @private
    */


    Model.prototype._relationships = null;

    /**
    An internal reference to the validator instance used by the model instance.
    @property _validator
    @type AP.utility.Validator
    @private
    */


    Model.prototype._validator = null;

    /**
    An array of validation configurations.  For more information about
    validations, refer to
    the {@link AP.utility.Validator Validator documentation}.
    @property validations
    @type Object[]
    */


    Model.prototype.validations = [];

    Model.prototype.initialize = function() {
      var _this = this;
      this.initializeRelationships();
      this.initializeValidations();
      return this.on('sync', function() {
        var _ref3;
        return (_ref3 = _this.constructor.trigger) != null ? _ref3.apply(_this.constructor, ['sync'].concat(_.toArray(arguments))) : void 0;
      });
    };

    Model.prototype.initializeRelationships = function() {
      var _this = this;
      this._relationships = [];
      return _.each(this.relationshipDefinitions, function(definition) {
        var relationship;
        relationship = new AP.relationship[definition.type](_this, definition);
        return _this._relationships.push(relationship);
      });
    };

    Model.prototype.initializeValidations = function() {
      this.validations = _.clone(this.validations);
      return this._validator = new AP.utility.Validator;
    };

    /**
    Retrieves the initialized relationship instance of the given name.
    @method getRelationship
    @param {String} name the name of the relationship
    @return {AP.relationship.Relationship} matching relationship instance
    */


    Model.prototype.getRelationship = function(name) {
      return _.where(this._relationships, {
        name: name
      })[0];
    };

    /**
    Performs a `fetch` on the specified relationship.
    @method fetchRelated
    @param {String} name the name of the relationship
    @param {Function} callback called when fetching completes
    */


    Model.prototype.fetchRelated = function(name, callback) {
      var _ref3;
      return (_ref3 = this.getRelationship(name)) != null ? _ref3.fetch(callback) : void 0;
    };

    /**
    Appends `.json` to the end of the default URL.
    @method url
    @return {String} the URL for this model instance
    */


    Model.prototype.url = function() {
      return "" + Model.__super__.url.apply(this, arguments) + ".json";
    };

    /**
    Simple proxy to the model's underlaying `fetch` method inherited
    from Backbone JS `Model`.
    @method reload
    */


    Model.prototype.reload = function() {
      return this.fetch.apply(this, arguments);
    };

    /**
    Simple override of the built-in Backbone.js `destroy` method to enable
    `before_delete` event handlers.
    @method destroy
    */


    Model.prototype.destroy = function() {
      /**
      @event 'before_delete'
      Triggered on a model instance immediately before being destroyed.
      */

      this.trigger('before_delete');
      return Model.__super__.destroy.apply(this, arguments);
    };

    /**
    Simple proxy to the model's underlaying `destroy` method inherited
    from Backbone JS `Model`.
    @method delete
    */


    Model.prototype["delete"] = function() {
      return this.destroy.apply(this, arguments);
    };

    /**
    Simple override of the built-in Backbone.js `set` method to enable
    `before_change` event handlers.
    @method set
    */


    Model.prototype.set = function(key, val, options) {
      var attrs;
      if (options == null) {
        options = {};
      }
      if (_.isObject(key)) {
        attrs = key;
        options = val || {};
      } else {
        attrs = {};
        attrs[key] = val;
      }
      if (attrs) {
        /**
        @event 'before_change'
        Triggered on a model instance immediately before being changed.
        */

        this.trigger('before_change', this, attrs);
      }
      return Model.__super__.set.apply(this, arguments);
    };

    /**
    Simple override of the built-in Backbone.js `save` method to enable
    `before_save` event handlers.
    @method save
    */


    Model.prototype.save = function() {
      /**
      @event 'before_save'
      Triggered on a model instance immediately before being saved.
      */

      this.trigger('before_save');
      return Model.__super__.save.apply(this, arguments);
    };

    /**
    Validates the model instance and returns any errors reported by the instance's
    validator instance.
    @method errors
    @return {String[]} the errors array reported by the validator
    instance's {@link AP.utility.Validator#errors errors method}.
    */


    Model.prototype.errors = function() {
      this.validate();
      return this._validator.errors();
    };

    /**
    Validates the model instance and returns `true` if the instance is valid,
    otherwise `false`.
    @method isValid
    @return {Boolean} the value reported by the validator
    instance's {@link AP.utility.Validator#isValid isValid method}.
    */


    Model.prototype.isValid = function() {
      this.validate();
      return this._validator.isValid();
    };

    /**
    Copies the instance data (or optional `values` argument) and the instance
    validations into the {@link #_validator validator instance}.  Returns
    `undefined` if values are valid, otherwise returns
    an {@link #errors errors array}.
    @method validate
    @param {Object} values optional hash of field name/value pairs to validate 
    against this instance's validations.  Pass `values` to validate arbitrary
    data instead of instance data.
    @return {String[]/undefined} if valid, returns `undefined` as expected by
    the underlaying [Backbone JS model class](http://backbonejs.org/#Model).
    If invalid, returns the {@link #errors errors array}.
    */


    Model.prototype.validate = function(values) {
      this._validator.data = _.extend({}, values || this.attributes);
      this._validator.validations = this.validations.slice();
      if (this._validator.validate()) {
        return void 0;
      } else {
        return this._validator.errors();
      }
    };

    /**
    Recurses into nested models and calls toJSON.
    @method toJSON
    @return {Object} JSON representation of this model instance
    */


    Model.prototype.toJSON = function() {
      var json, key, value;
      json = Model.__super__.toJSON.apply(this, arguments);
      for (key in json) {
        value = json[key];
        if (_.isFunction(value != null ? value.toJSON : void 0)) {
          json[key] = value.toJSON();
        }
      }
      return json;
    };

    return Model;

  })(Backbone.Model);

  /**
  Base relationship class.  Provides attributes and simple initialization common
  to all relationships.  This class should not be used directly but subclassed.
  
  Three relationship types are provided for convience.  Please refer to the
  relationship documentation pages for more information:
  
  - {@link AP.relationship.BelongsTo BelongsTo}
  - {@link AP.relationship.HasMany HasMany}
  - {@link AP.relationship.HasOne HasOne}
  
  Relationships should not be instantiated directly.  Please see
  {@link AP.model.Model#relationshipDefinitions} for more information on
  declaring relationships.
  
  @module AP
  @submodule relationship
  @class Relationship
  @extends Backbone.Events
  */


  AP.relationship.Relationship = (function() {
    _.extend(Relationship.prototype, Backbone.Events);

    /**
    The owning model instance of this relationship.
    @property owner
    @type AP.model.Model
    */


    Relationship.prototype.owner = null;

    /**
    The field name for this relationship.  A relationship inserts a field into the
    owner model instance with a default value of {@link #getDefault}.
    The field name is preferably a variant of {@link #foreignKey}.  For instance,
    if `foreignKey` is `user_id`, then `name` should be `user` (or `users` for
    has-many relationships).
    @property name
    @type String
    */


    Relationship.prototype.name = null;

    /**
    Field name where the value of the relationship may be found.  In belongs-to
    relationships, `foreignKey` is found on the owner model instance.  In has-many
    and has-one relationships, `foreignKey` is found on the target model
    instance(s).  See {@link #model}.
    @property foreignKey
    @type String
    */


    Relationship.prototype.foreignKey = null;

    /**
    A string representing the class name of a model or a proper model class.  The
    model class is the target for this relationship.  Related instances must be of
    this model.
    @property model
    @type String/AP.model.Model
    */


    Relationship.prototype.model = null;

    /**
    A string representing the class name of a collection or a proper collection
    class.  The collection class is used by this relationship to store the related
    instance(s).  On initialization of this relationship, the collection is
    instantiated and this property becomes a reference to that instance.
    @property collection
    @type String/AP.collection.Collection
    */


    Relationship.prototype.collection = null;

    function Relationship() {
      this.initialize.apply(this, arguments);
    }

    Relationship.prototype.initialize = function(owner, options) {
      var _base;
      this.options = options != null ? options : {};
      this.app = typeof (_base = window.AP).getActiveApp === "function" ? _base.getActiveApp() : void 0;
      this.owner = owner || this.owner;
      this.name = this.options.name || this.name;
      this.foreignKey = this.options.foreignKey || this.foreignKey;
      this.initializeModel();
      this.initializeCollection();
      this.initializeDefault();
      return this.initializeEvents();
    };

    Relationship.prototype.initializeModel = function() {
      var _ref3;
      this.model = this.options.model || this.model;
      return this.model = ((_ref3 = this.app) != null ? _ref3.getModel(this.model) : void 0) || this.model;
    };

    Relationship.prototype.initializeCollection = function() {
      var _ref3;
      this.collection = this.options.collection || this.collection;
      return this.collection = new (((_ref3 = this.app) != null ? _ref3.getCollection(this.collection) : void 0) || this.collection);
    };

    Relationship.prototype.initializeEvents = function() {
      this.listenTo(this.collection, 'add', this.onCollectionAdd);
      this.listenTo(this.collection, 'remove', this.onCollectionRemove);
      this.listenTo(this.collection, 'sync', this.onCollectionSync);
      return this.listenTo(this.collection, 'change', this.onRelatedChange);
    };

    Relationship.prototype.initializeDefault = function() {
      return this.owner.set(this.name, this.getDefault(), {
        silent: true
      });
    };

    /**
    Handles the addition of instances into {@link #collection}.  Subclasses should
    implement this method if necessary.
    @method onCollectionAdd
    @param {AP.model.Model} record a model instance added to the collection
    */


    Relationship.prototype.onCollectionAdd = function(record) {};

    /**
    Handles the addition of instances into {@link #collection}.  Subclasses should
    implement this method if necessary.
    @method onCollectionRemove
    @param {AP.model.Model} record a model instance added to the collection
    */


    Relationship.prototype.onCollectionRemove = function(record) {};

    /**
    Called whenever {@link #collection} is synced with the server.  Subclasses
    should implement this method if necessary.
    @method onCollectionSync
    */


    Relationship.prototype.onCollectionSync = function() {};

    /**
    Called whenever an instance in {@link #collection} is changed.  By default,
    this method triggers a change event on the owner's {@link #name} field, the
    field generated by the relationship.
    @method onRelatedChange
    */


    Relationship.prototype.onRelatedChange = function() {
      return this.owner.trigger("change:" + this.name);
    };

    /**
    Returns a default value for the generated {@link #name} field on
    {@link #owner}.  The generated field is created using the default value as
    soon as the relationship is initialized.
    @method getDefault
    @return {Object} default value for generated field on owner
    */


    Relationship.prototype.getDefault = function() {
      return null;
    };

    /**
    Returns a hash of parameters passed to the {@link #collection} `query` method.
    @method getQuery
    @return {Object} parameters passed to collection's query method
    */


    Relationship.prototype.getQuery = function() {
      return {};
    };

    /**
    Query the underlaying {@link #collection} and execute `callback` upon success.
    The fetch method gets the model instance(s) for this relationship from the
    server.  Depending on the relationship type, the value of the {@link #name}
    field may be a single model instance or the {@link #collection} itself.  No
    default implementation of this method is provided.  Subclasses should provide
    an implementation.
    @method fetch
    @param {Function} callback function to execute upon fetch success.
    */


    Relationship.prototype.fetch = function(callback) {
      return null;
    };

    return Relationship;

  })();

  /**
  A belongs-to relationship is one where the owner model instance is related to
  no more than one other model instance.  In this scheme, the relationship
  information is stored in a foreign key on the owner model.  The related instance
  is stored in a generated field {@link #name} once fetched.
  
  For example, if the foreign key is `user_id` and the relationship name is `user`
  then the related instance may be obtained by calling:
  @example
      ownerInstance.get('user')
      // set related instance
      ownerInstance.set('user', userInstance)
      // or set foreign key
      ownerInstance.set('user_id', 4)
      // setting the foreign key directly will null the related instance:
      ownerInstance.get('user') == null // evaluates to true
  
  A has-one relationship is similar, except the relationship information is stored
  in a foreign key on the target model, not the owner.  See
  {@link AP.relationship.HasOne} for more information about has-one relationships.
  
  Relationships should not be instantiated directly.  Please see
  {@link AP.model.Model#relationshipDefinitions} for more information on
  declaring relationships.
  
  @module AP
  @submodule relationship
  @class BelongsTo
  @extends AP.relationship.Relationship
  */


  AP.relationship.BelongsTo = (function(_super) {
    __extends(BelongsTo, _super);

    function BelongsTo() {
      _ref3 = BelongsTo.__super__.constructor.apply(this, arguments);
      return _ref3;
    }

    BelongsTo.prototype.initialize = function() {
      BelongsTo.__super__.initialize.apply(this, arguments);
      this.listenTo(this.owner, "change:" + this.foreignKey, this.onForeignKeyChange);
      return this.listenTo(this.owner, "change:" + this.name, this.onFieldForRelatedInstanceChange);
    };

    /**
    Sets the {@link #name} generated field on the owner model to the first model
    instance in the collection after syncing.
    @method onCollectionSync
    */


    BelongsTo.prototype.onCollectionSync = function() {
      return this.owner.set(this.name, this.collection.first());
    };

    /**
    Called whenever the owner instance's {@link #foreignKey} field is changed.
    If the foreign key is different than the related instance in the generated
    {@link #name} field, the {@link #name} field is set to null.  To obtain the
    related instance, the relationship must be fetched again.
    @method onForeignKeyChange
    */


    BelongsTo.prototype.onForeignKeyChange = function() {
      var _ref4;
      if (this.owner.get(this.foreignKey) !== ((_ref4 = this.owner.get(this.name)) != null ? _ref4.get(this.model.prototype.idAttribute) : void 0)) {
        return this.owner.set(this.name, null);
      }
    };

    /**
    Called whenever the owner instance's {@link #name} field is changed.  If the
    ID of the related instance is different than the value of {@link #foreignKey},
    the foreign key field is updated with the related instance's ID.
    @method onFieldForRelatedInstanceChange
    */


    BelongsTo.prototype.onFieldForRelatedInstanceChange = function() {
      var relatedId, _ref4;
      relatedId = (_ref4 = this.owner.get(this.name)) != null ? _ref4.get(this.model.prototype.idAttribute) : void 0;
      if (relatedId && (this.owner.get(this.foreignKey) !== relatedId)) {
        return this.owner.set(this.foreignKey, relatedId);
      }
    };

    /**
    Returns a query used to obtain the related instance from the server.
    @method getQuery
    @return {Object} parameters used to query server for the related instance
    */


    BelongsTo.prototype.getQuery = function() {
      var query;
      query = BelongsTo.__super__.getQuery.apply(this, arguments);
      query[this.model.prototype.idAttribute] = this.owner.get(this.foreignKey);
      return query;
    };

    /**
    Querys the server for related instances.
    @method fetch
    @param {Function} callback function executed upon query success; called with
    one argument:  the related instance (if any)
    */


    BelongsTo.prototype.fetch = function(callback) {
      var _this = this;
      return this.collection.query(this.getQuery(), {
        reset: true,
        success: function() {
          if (_.isFunction(callback)) {
            return callback(_this.owner, _this.collection.first());
          }
        }
      });
    };

    return BelongsTo;

  })(AP.relationship.Relationship);

  /**
  A has-many relationship is one where the owner model instance is related to
  any number of related instances.  In this scheme, the relationship
  information is stored in a foreign key on the related instance(s).  The related
  instances are stored in the {@link #collection} on a generated field
  {@link #name} once fetched.
  
  Relationships should not be instantiated directly.  Please see
  {@link AP.model.Model#relationshipDefinitions} for more information on
  declaring relationships.
  
  @module AP
  @submodule relationship
  @class HasMany
  @extends AP.relationship.Relationship
  */


  AP.relationship.HasMany = (function(_super) {
    __extends(HasMany, _super);

    function HasMany() {
      _ref4 = HasMany.__super__.constructor.apply(this, arguments);
      return _ref4;
    }

    HasMany.prototype.initialize = function() {
      HasMany.__super__.initialize.apply(this, arguments);
      this.listenTo(this.collection, "reset", this.onCollectionReset);
      return this.listenTo(this.collection, "change:" + this.foreignKey, this.onRelatedInstanceForeignKeyChange);
    };

    /**
    Sets the {@link #foreignKey} of the related instance to the ID of the owner
    instance when added to the collection.  Triggers a change event on the
    generated relationship field {@link #name}.
    @method onCollectionAdd
    @param {Object} record the added model instance
    */


    HasMany.prototype.onCollectionAdd = function(record) {
      record.set(this.foreignKey, this.owner.get(this.owner.idAttribute));
      return this.owner.trigger("change:" + this.name);
    };

    /**
    Unset the {@link #foreignKey} of the related instance when removed from
    the collection.  Triggers a change event on the generated relationship
    field {@link #name}.
    @method onCollectionRemove
    @param {Object} record the removed model instance
    */


    HasMany.prototype.onCollectionRemove = function(record) {
      if (record.get(this.foreignKey) === this.owner.get(this.owner.idAttribute)) {
        record.set(this.foreignKey, null);
      }
      return this.owner.trigger("change:" + this.name);
    };

    /**
    Triggers a change event on the generated relationship field {@link #name} when
    the collection is reset.  See {@link #filterCollection}.
    @method onCollectionReset
    */


    HasMany.prototype.onCollectionReset = function() {
      return this.owner.trigger("change:" + this.name);
    };

    /**
    Calls {@link #filterCollection} whenever the foreign key field of a related
    instance is changed.
    @method onRelatedInstanceForeignKeyChange
    */


    HasMany.prototype.onRelatedInstanceForeignKeyChange = function() {
      return this.filterCollection();
    };

    /**
    Removes any stale related instances from the collection.  Stale instances are
    instances with foreign keys that no longer refer to the owner instance.
    See {@link #onCollectionReset}.
    @method filterCollection
    */


    HasMany.prototype.filterCollection = function() {
      var filtered, whereClause;
      whereClause = {};
      whereClause[this.foreignKey] = this.owner.get(this.owner.idAttribute);
      filtered = this.collection.where(whereClause);
      return this.collection.reset(filtered, {
        reset: true
      });
    };

    /**
    Returns the default value of the generated field {@link #name}.  For many-to-
    many relationships, the value is always the {@link #collection} instance.
    @method getDefault
    @return {AP.collection.Collection} the collection instance declared
    by {@link #collection}.
    */


    HasMany.prototype.getDefault = function() {
      return this.collection;
    };

    /**
    Returns a query used to obtain the related instances from the server.
    @method getQuery
    @return {Object} parameters used to query server for the related instances
    */


    HasMany.prototype.getQuery = function() {
      var query;
      query = HasMany.__super__.getQuery.apply(this, arguments);
      query[this.foreignKey] = this.owner.get(this.owner.idAttribute);
      return query;
    };

    /**
    Querys the server for related instances.
    @method fetch
    @param {Function} callback function executed upon query success; called with
    one argument:  the collection of related instances
    */


    HasMany.prototype.fetch = function(callback) {
      var _this = this;
      return this.collection.query(this.getQuery(), {
        reset: true,
        success: function() {
          if (_.isFunction(callback)) {
            return callback(_this.owner, _this.collection);
          }
        }
      });
    };

    return HasMany;

  })(AP.relationship.Relationship);

  /**
  A has-one relationship is simlar to a {@link AP.relationship.BelongsTo}
  relationship except that the relationship information is stored in foreign key
  fields on the related instances instead of on owner instances.
  
  In implementation, a has-one relationship functions like has-many, except that
  the value of the generated {@link #name} field is a related
  {@link #model model instance} instead of a collection.
  
  Relationships should not be instantiated directly.  Please see
  {@link AP.model.Model#relationshipDefinitions} for more information on
  declaring relationships.
  
  @module AP
  @submodule relationship
  @class HasOne
  @extends AP.relationship.HasMany
  */


  AP.relationship.HasOne = (function(_super) {
    __extends(HasOne, _super);

    function HasOne() {
      _ref5 = HasOne.__super__.constructor.apply(this, arguments);
      return _ref5;
    }

    HasOne.prototype.initializeEvents = function() {
      this.listenTo(this.collection, "change:" + this.foreignKey, this.onForeignKeyChange);
      this.listenTo(this.owner, "change:" + this.name, this.onFieldForRelatedInstanceChange);
      return HasOne.__super__.initializeEvents.apply(this, arguments);
    };

    /**
    Sets the {@link #name} generated field on the owner model to the first model
    instance in the collection after syncing.
    @method onCollectionSync
    */


    HasOne.prototype.onCollectionSync = function() {
      return this.owner.set(this.name, this.collection.first());
    };

    /**
    Called whenever the related instance's {@link #foreignKey} field is changed.
    If the foreign key of the related instance referes to a different owner, then
    the {@link #name} field is set to null.  To obtain the related instance after
    the field is nulled, the relationship must be fetched again.
    @method onForeignKeyChange
    */


    HasOne.prototype.onForeignKeyChange = function() {
      var related;
      related = this.owner.get(this.name);
      if (related && (related.get(this.foreignKey) !== this.owner.get(this.owner.idAttribute))) {
        return this.owner.set(this.name, null);
      }
    };

    /**
    Called whenever the owner instance's {@link #name} field is changed.  If the
    foreign key of the new related instance is different than the ID of the owner,
    the foreign key field of the related instance is set to the ID of the owner.
    @method onFieldForRelatedInstanceChange
    */


    HasOne.prototype.onFieldForRelatedInstanceChange = function() {
      var ownerId, related;
      related = this.owner.get(this.name);
      ownerId = this.owner.get(this.owner.idAttribute);
      if (related && (related.get(this.foreignKey) !== ownerId)) {
        return related.set(this.foreignKey, ownerId);
      }
    };

    /**
    The default value for a has-one relationship is null like belongs-to.
    @method getDefault
    @return {Object} null
    */


    HasOne.prototype.getDefault = function() {
      return null;
    };

    /**
    Querys the server for related instances.
    @method fetch
    @param {Function} callback function executed upon query success; called with
    one argument:  the related instance (if any)
    */


    HasOne.prototype.fetch = function(callback) {
      var _this = this;
      return this.collection.query(this.getQuery(), {
        reset: true,
        success: function() {
          if (_.isFunction(callback)) {
            return callback(_this.owner, _this.collection.first());
          }
        }
      });
    };

    return HasOne;

  })(AP.relationship.HasMany);

  /**
  Base collection class.  In addition to the standard methods provided by the
  [Backbone JS collection class](http://backbonejs.org/#Collection), this base
  collection implements paginaton and query parameter mapping.
  
  This class should be subclassed, not used directly.  For example (Coffeescript):
  @example
      class People extends AP.collection.Collection
        @collectionId: 'people'
        model: Person
        apiEndpoint: '/person/'
        extraParams:
          format: 'json'
  
  For full collection usage documentation,
  refer to [Backbone JS](http://backbonejs.org/#Collection).
  
  @module AP
  @submodule collection
  @class Collection
  @extends Backbone.Collection
  */


  AP.collection.Collection = (function(_super) {
    __extends(Collection, _super);

    function Collection() {
      _ref6 = Collection.__super__.constructor.apply(this, arguments);
      return _ref6;
    }

    /**
    Name/value pairs appended to URL of requests to server.  For example, extra
    parameters `{format: 'json'}` is passed to server as:  `/url/?format=json`.
    @property extraParams
    @type Object
    */


    Collection.prototype.extraParams = {};

    Collection.prototype.initialize = function() {
      return this.extraParams = _.clone(this.extraParams || {});
    };

    /**
    Returns the URL for this collection.  By default this is the value of the
    `apiEndpoint` member of the collection.
    @method url
    @return {String} URL of this collection
    */


    Collection.prototype.url = function() {
      return this.apiEndpoint;
    };

    /**
    Copies keys in object to keys of the format `query[key_name]`  in a new
    object, where `key_name` is the original key.  Returns a new object leaving
    the original intact.  For example, an input object `{foo: 'bar'}` would
    result in an output object `{query[foo]: 'bar'}`.
    @method mapQueryParams
    @param {Object} data name/value pairs to map to query-format
    @return {Object} a new object with mapped keys
    */


    Collection.prototype.mapQueryParams = function(data) {
      var key, query, value;
      query = {};
      for (key in data) {
        value = data[key];
        if (value) {
          query["query[" + key + "]"] = value;
        }
      }
      return query;
    };

    /**
    Fetches objects from the collection instance's URL.  Calls the underlaying
    [Backbone Collection.fetch method](http://backbonejs.org/#Collection-fetch).
    Note:  data from the collection's optional {@link #extraParams} is passed
    through the URL of every request.
    @method fetch
    @param {Object} options optional request data
    @param {Object} options.data optional request parameters are passed through
    request URL as-is
    @param {Object} options.query optional query parameters are passed through
    request URL after being transformed by {@link #mapQuerParams}.
    @param args... optional additional arguments passed-through to underlaying
    [Backbone Collection.fetch method](http://backbonejs.org/#Collection-fetch).
    */


    Collection.prototype.fetch = function() {
      var args, options, query;
      options = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      if (options == null) {
        options = {};
      }
      if (options != null ? options.query : void 0) {
        query = this.mapQueryParams(options.query);
      }
      options.data = _.extend({}, this.extraParams, options.data, query);
      return Backbone.Collection.prototype.fetch.apply(this, [options].concat(args));
    };

    /**
    Convenience method calls {@link #fetch} passing `query` as query parameters.
    @method query
    @param {Object} query name/value pairs passed to {@link #fetch} as query data
    */


    Collection.prototype.query = function(query, options) {
      return this.fetch(_.extend({
        query: query
      }, options));
    };

    return Collection;

  })(Backbone.Collection);

  /**
  Similar to `AP.collection.Collection` except that query data are
  optionally mapped to alternative parameter names.  Specify query fields when
  request parameters have different names than model fields.
  
  For example (Coffeescript):
  @example
      class PeopleScope extends AP.collection.ScopeCollection
        @collectionId: 'people_scope'
        model: Person
        apiEndpoint: '/person/'
        extraParams:
          scope: 'scoped'
        queryFields: [
          fieldName: 'name'
          paramName: 'person_name'
        ]
  
  @module AP
  @submodule collection
  @class ScopeCollection
  @extends AP.collection.Collection
  */


  AP.collection.ScopeCollection = (function(_super) {
    __extends(ScopeCollection, _super);

    function ScopeCollection() {
      _ref7 = ScopeCollection.__super__.constructor.apply(this, arguments);
      return _ref7;
    }

    /**
    Copies `data` to new object and replaces keys which match any `queryFields`
    mapping configurations with the alternative parameter name.  For example,
    with `queryFields` `[{fieldName: 'name', paramName: 'person_name'}] and
    input object `{name: 'John', age: 35}`, output object
    is `{person_name: 'John', age: 35}`.
    @method mapQueryFieldKeys
    @param {Object} data name/value pairs to map
    @return {Object} a new object with mapped keys
    */


    ScopeCollection.prototype.mapQueryFieldKeys = function(data) {
      'Maps key names in data to equivalent param names in @queryFields if\nany match.  On match, original key names are not retained.  Returns a new\nobject leaving original intact.';
      var key, mapped, mappedKey, paramName, value;
      mapped = {};
      for (key in data) {
        value = data[key];
        paramName = (_.find(this.queryFields, function(field) {
          return field.fieldName === key;
        }) || {}).paramName;
        mappedKey = paramName || key;
        if (value) {
          mapped[mappedKey] = value;
        }
      }
      return mapped;
    };

    /**
    Fetches objects from the collection instance's URL.  All arguments are passed-
    through to {@link AP.collection.Collection#fetch}, except for `options.query`
    which is transformed first by {@link #mapQueryFieldKeys}.
    @method fetch
    @param {Object} options optional request data
    @param {Object} options.query optional query parameters are passed through
    request URL after being transformed by {@link #mapQuerParams}
    @param args... optional additional arguments passed-through
    to {@link AP.collection.Collection#fetch}
    */


    ScopeCollection.prototype.fetch = function() {
      var args, options, query;
      options = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      if (options == null) {
        options = {};
      }
      if (options != null ? options.query : void 0) {
        query = this.mapQueryFieldKeys(options.query);
      }
      if (query) {
        options.query = query;
      }
      return AP.collection.Collection.prototype.fetch.apply(this, [options].concat(args));
    };

    return ScopeCollection;

  })(AP.collection.Collection);

  /**
  Unlike a normal `AP.collection.Collection`, aggregate collections expect a
  simple integer-only response from the server.  Aggregate collections are always
  zero-length (they have no members).  They have an extra member `value`.
  @module AP
  @submodule collection
  @class AggregateCollection
  @extends AP.collection.ScopeCollection
  */


  AP.collection.AggregateCollection = (function(_super) {
    __extends(AggregateCollection, _super);

    function AggregateCollection() {
      _ref8 = AggregateCollection.__super__.constructor.apply(this, arguments);
      return _ref8;
    }

    /**
    The value last returned by this collection's URL.
    @property value
    @type Number
    */


    AggregateCollection.prototype.value = null;

    /**
    @method valueOf
    @return {Number} the value of {@link #value}
    */


    AggregateCollection.prototype.valueOf = function() {
      return this.value;
    };

    /**
    Called automatically whenever {@link AP.collection.Collection#fetch} returns.
    The response is parsed as an integer and stored in {@link #value}.  `parse`
    ignores any other data returned by the server.
    @method parse
    @param {String} response the value returned by the server
    */


    AggregateCollection.prototype.parse = function(response) {
      this.value = parseInt(response, 10);
      return [];
    };

    return AggregateCollection;

  })(AP.collection.ScopeCollection);

  /**
  Provides convenience methods common to apps.  Generally, apps are
  namespaces not intended for instantiation.
  
  All apps should inherit from this class and execute setup.  It is important to
  execute setup before adding members.
  
  For example (Coffeescript):
  @example
      class AppClass extends AP.Application
        @setup()
  
  @module AP
  @class Application
  @static
  */


  AP.Application = (function() {
    function Application() {}

    /**
    Adds static members to the class:
    
    - `name`
    - `description`
    - `models`
    - `collections`
    
    It is important to execute setup before adding members.
    @method setup
    @static
    */


    Application.setup = function() {
      this.name = this.name || '';
      this.description = this.description || '';
      this.models = {};
      this.collections = {};
      return this.mockServer = null;
    };

    /**
    @method init
    @static
    */


    Application.init = function() {
      AP = window.AP;
      if (AP.useMockServer) {
        this.mockServer = new AP.utility.MockServer(this);
      }
      if (AP.useOfflineCache) {
        this.initOfflineCache();
      }
      return this.initAjaxSetup();
    };

    /**
    @method initOfflineCache
    @static
    */


    Application.initOfflineCache = function() {
      AP = window.AP;
      AP.offlineDataStore = new AP.utility.TransientLargeLocalStore({
        storageName: 'ap-offline-data-store',
        storageCapacity: AP.offlineStorageCapacity
      });
      Backbone._sync = Backbone.sync;
      return Backbone.sync = function(method, obj, options) {
        var cacheKey, data, oldError, oldSuccess, url, user,
          _this = this;
        url = options.url || _.result(obj, 'url');
        if (url && method === 'read') {
          data = options.data || JSON.stringify(options.attrs || (obj != null ? obj.toJSON(options) : void 0));
          oldSuccess = options.success;
          oldError = options.error;
          user = null;
          if (AP.auth.Authentication.isAuthenticated()) {
            user = {
              username: AP.auth.Authentication.getUsername(),
              role: AP.auth.Authentication.getUserRole()
            };
          }
          cacheKey = [AP.baseUrl, url, data, user];
          options.success = function(response) {
            AP.offlineDataStore.set(cacheKey, response);
            return oldSuccess.apply(_this, arguments);
          };
          options.error = function(xhr) {
            var status;
            status = +xhr.status;
            if (status < 400 || status >= 500) {
              return AP.offlineDataStore.get(cacheKey, {
                success: function(cached) {
                  return oldSuccess.apply(_this, [cached]);
                },
                error: function() {
                  return oldError.apply(_this, arguments);
                }
              });
            } else {
              return oldError.apply(_this, arguments);
            }
          };
        }
        return Backbone._sync.apply(this, arguments);
      };
    };

    /**
    @method initAjaxSetup
    @static
    */


    Application.initAjaxSetup = function() {
      return $.ajaxSetup({
        beforeSend: function(request, settings) {
          var authSessionId, authSessionIdHeader, bits;
          AP = window.AP;
          authSessionIdHeader = AP.auth.Authentication.getAuthSessionIdHeaderName();
          authSessionId = AP.auth.Authentication.getAuthSessionId();
          if (authSessionId) {
            request.setRequestHeader(authSessionIdHeader, authSessionId);
          }
          if (!AP.useMockServer && AP.baseUrl) {
            bits = AP.utility.Url.parseUrl(settings.url);
            if (!(bits.host && bits.protocol)) {
              return _.extend(settings, {
                crossDomain: true,
                url: "" + AP.baseUrl + settings.url,
                xhrFields: _.extend({}, settings.xhrFields, {
                  withCredentials: true
                })
              });
            }
          }
        }
      });
    };

    /**
    @method proxy
    @static
    */


    Application.proxy = function(fn) {
      var _this = this;
      return function() {
        return fn.apply(_this, arguments);
      };
    };

    /**
    Returns a model class for this application by name or model ID.
    @method getModel
    @static
    @param {String} str the name or ID of a model
    @return {AP.model.Model} a model class
    */


    Application.getModel = function(str) {
      return _.find(this.models, function(val, key) {
        return key === str || val.modelId === str || val.name === str;
      });
    };

    /**
    Returns a collection class for this application by name or collection ID.
    @param {String} str the name or ID of a collection
    @return {AP.collection.Collection} a collection class
    @method getCollection
    @static
    */


    Application.getCollection = function(str) {
      return _.find(this.collections, function(val, key) {
        return key === str || val.collectionId === str || val.name === str;
      });
    };

    return Application;

  })();

  /**
  Simple namespace class for this application.
  
  Example application look-up:
  @example
      app = AP.getApp('LoyaltyRtrSdk')
  
  Example model and collection look-ups:
  @example
      modelClass = app.getModel('modelName')
      collectionClass = app.getCollection('collectionName')
  
  @class LoyaltyRtrSdk
  @extends AP.Application
  @static
  */


  window.LoyaltyRtrSdk = (function(_super) {
    __extends(LoyaltyRtrSdk, _super);

    function LoyaltyRtrSdk() {
      _ref9 = LoyaltyRtrSdk.__super__.constructor.apply(this, arguments);
      return _ref9;
    }

    LoyaltyRtrSdk.setup();

    /**
    Application name.
    @static
    @property name
    @type String
    */


    LoyaltyRtrSdk.name = 'LoyaltyRtrSdk';

    /**
    Application description.
    @static
    @property description
    @type String
    */


    LoyaltyRtrSdk.description = 'MasterCard Loyalty RTR';

    LoyaltyRtrSdk.init = function() {
      window.AP.activeAppName = 'LoyaltyRtr';
      return LoyaltyRtrSdk.__super__.constructor.init.apply(this, arguments);
    };

    return LoyaltyRtrSdk;

  })(AP.Application);

  /*
  Registers the app with the global {@link AP AP namespace}.
  */


  AP.registerApp(LoyaltyRtrSdk, 'LoyaltyRtr');

  /**
  AppConfiguration model for application `LoyaltyRtrSdk`.  See
  `AP.model.Model` for more information about models.
  
  @module LoyaltyRtrSdk
  @submodule models
  @class AppConfiguration
  @extends AP.model.Model
  */


  LoyaltyRtrSdk.models.AppConfiguration = (function(_super) {
    __extends(AppConfiguration, _super);

    function AppConfiguration() {
      _ref10 = AppConfiguration.__super__.constructor.apply(this, arguments);
      return _ref10;
    }

    _.extend(AppConfiguration, Backbone.Events);

    /**
    The model ID may be used to look-up a model from an application class.
    @property modelId
    @type String
    @static
    */


    AppConfiguration.modelId = '4524';

    /**
    The model name may be used to look-up a model from an application class.
    @property name
    @type String
    */


    AppConfiguration.prototype.name = 'AppConfiguration';

    /**
    Server requests for model instances use this URL.
    @property urlRoot
    @type String
    */


    AppConfiguration.prototype.urlRoot = '/api/v10/app_configurations';

    /**
    Array of field definition configurations.  Field definitions describe fields
    available on this model.
    @property fieldDefinitions
    @type Array
    */


    AppConfiguration.prototype.fieldDefinitions = [
      {
        id: 39672,
        name: 'id',
        label: 'id',
        type: 'integer',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39674,
        name: 'colors',
        label: 'colors',
        type: 'hash',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39673,
        name: 'strings',
        label: 'strings',
        type: 'hash',
        required: false,
        file_url: false,
        file_type: 'Image'
      }
    ];

    /**
    Array of field names.  Auto keys, generally such as `id`, have their values
    filled automatically by the server.  Non-auto keys are all other fields.
    @property nonAutoKeyFields
    @type Array
    */


    AppConfiguration.prototype.nonAutoKeyFields = ['colors', 'strings'];

    /**
    Array of relationship definitions.
    @property relationshipDefinitions
    @type Array
    */


    AppConfiguration.prototype.relationshipDefinitions = [];

    /**
    Array of validation configurations.  See `AP.model.Model` for more information
    about validations.
    @property validations
    @type Array
    */


    AppConfiguration.prototype.validations = [];

    return AppConfiguration;

  })(AP.model.Model);

  /**
  Audit model for application `LoyaltyRtrSdk`.  See
  `AP.model.Model` for more information about models.
  
  @module LoyaltyRtrSdk
  @submodule models
  @class Audit
  @extends AP.model.Model
  */


  LoyaltyRtrSdk.models.Audit = (function(_super) {
    __extends(Audit, _super);

    function Audit() {
      _ref11 = Audit.__super__.constructor.apply(this, arguments);
      return _ref11;
    }

    _.extend(Audit, Backbone.Events);

    /**
    The model ID may be used to look-up a model from an application class.
    @property modelId
    @type String
    @static
    */


    Audit.modelId = '4523';

    /**
    The model name may be used to look-up a model from an application class.
    @property name
    @type String
    */


    Audit.prototype.name = 'Audit';

    /**
    Server requests for model instances use this URL.
    @property urlRoot
    @type String
    */


    Audit.prototype.urlRoot = '/api/v10/audits';

    /**
    Array of field definition configurations.  Field definitions describe fields
    available on this model.
    @property fieldDefinitions
    @type Array
    */


    Audit.prototype.fieldDefinitions = [
      {
        id: 39665,
        name: 'id',
        label: 'id',
        type: 'integer',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39669,
        name: 'action_desc',
        label: 'action_desc',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39668,
        name: 'after_value',
        label: 'after_value',
        type: 'hash',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39667,
        name: 'before_value',
        label: 'before_value',
        type: 'hash',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39666,
        name: 'field_name',
        label: 'field_name',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39671,
        name: 'performed_at',
        label: 'performed_at',
        type: 'time',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 40125,
        name: 'program_level_id',
        label: 'program_level_id',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39670,
        name: 'user_id',
        label: 'user_id',
        type: 'integer',
        required: false,
        file_url: false,
        file_type: 'Image'
      }
    ];

    /**
    Array of field names.  Auto keys, generally such as `id`, have their values
    filled automatically by the server.  Non-auto keys are all other fields.
    @property nonAutoKeyFields
    @type Array
    */


    Audit.prototype.nonAutoKeyFields = ['action_desc', 'after_value', 'before_value', 'field_name', 'performed_at', 'program_level_id', 'user_id'];

    /**
    Array of relationship definitions.
    @property relationshipDefinitions
    @type Array
    */


    Audit.prototype.relationshipDefinitions = [];

    /**
    Array of validation configurations.  See `AP.model.Model` for more information
    about validations.
    @property validations
    @type Array
    */


    Audit.prototype.validations = [];

    return Audit;

  })(AP.model.Model);

  /**
  Bank model for application `LoyaltyRtrSdk`.  See
  `AP.model.Model` for more information about models.
  
  @module LoyaltyRtrSdk
  @submodule models
  @class Bank
  @extends AP.model.Model
  */


  LoyaltyRtrSdk.models.Bank = (function(_super) {
    __extends(Bank, _super);

    function Bank() {
      _ref12 = Bank.__super__.constructor.apply(this, arguments);
      return _ref12;
    }

    _.extend(Bank, Backbone.Events);

    /**
    The model ID may be used to look-up a model from an application class.
    @property modelId
    @type String
    @static
    */


    Bank.modelId = '4515';

    /**
    The model name may be used to look-up a model from an application class.
    @property name
    @type String
    */


    Bank.prototype.name = 'Bank';

    /**
    Server requests for model instances use this URL.
    @property urlRoot
    @type String
    */


    Bank.prototype.urlRoot = '/api/v10/banks';

    /**
    Array of field definition configurations.  Field definitions describe fields
    available on this model.
    @property fieldDefinitions
    @type Array
    */


    Bank.prototype.fieldDefinitions = [
      {
        id: 39526,
        name: 'id',
        label: 'id',
        type: 'integer',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39562,
        name: 'android_url',
        label: 'android_url',
        type: 'string',
        required: false,
        file_url: true,
        file_type: 'Image'
      }, {
        id: 39875,
        name: 'burn_offer_label',
        label: 'burn_offer_label',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 40012,
        name: 'contact_info',
        label: 'contact_info',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39566,
        name: 'earn_offer_label',
        label: 'earn_offer_label',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39567,
        name: 'icon',
        label: 'icon',
        type: 'string',
        required: false,
        file_url: true,
        file_type: 'Image'
      }, {
        id: 39559,
        name: 'image_url',
        label: 'image_url',
        type: 'string',
        required: false,
        file_url: true,
        file_type: 'Image'
      }, {
        id: 39561,
        name: 'ios_url',
        label: 'ios_url',
        type: 'string',
        required: false,
        file_url: true,
        file_type: 'Image'
      }, {
        id: 40141,
        name: 'is_active',
        label: 'is_active',
        type: 'boolean',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 40011,
        name: 'loading_image_url',
        label: 'loading_image_url',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39560,
        name: 'mobile_site_url',
        label: 'mobile_site_url',
        type: 'string',
        required: false,
        file_url: true,
        file_type: 'Image'
      }, {
        id: 39558,
        name: 'name',
        label: 'name',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 40131,
        name: 'program_data_language_code',
        label: 'program_data_language_code',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 40130,
        name: 'program_language_code',
        label: 'program_language_code',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39557,
        name: 'program_level_id',
        label: 'program_level_id',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39565,
        name: 'tc_last_update_on',
        label: 'tc_last_update_on',
        type: 'date',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39564,
        name: 'tc_summary',
        label: 'tc_summary',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39563,
        name: 'tc_url',
        label: 'tc_url',
        type: 'string',
        required: false,
        file_url: true,
        file_type: 'Image'
      }
    ];

    /**
    Array of field names.  Auto keys, generally such as `id`, have their values
    filled automatically by the server.  Non-auto keys are all other fields.
    @property nonAutoKeyFields
    @type Array
    */


    Bank.prototype.nonAutoKeyFields = ['android_url', 'burn_offer_label', 'contact_info', 'earn_offer_label', 'icon', 'image_url', 'ios_url', 'is_active', 'loading_image_url', 'mobile_site_url', 'name', 'program_data_language_code', 'program_language_code', 'program_level_id', 'tc_last_update_on', 'tc_summary', 'tc_url'];

    /**
    Array of relationship definitions.
    @property relationshipDefinitions
    @type Array
    */


    Bank.prototype.relationshipDefinitions = [];

    /**
    Array of validation configurations.  See `AP.model.Model` for more information
    about validations.
    @property validations
    @type Array
    */


    Bank.prototype.validations = [];

    return Bank;

  })(AP.model.Model);

  /**
  BankFaq model for application `LoyaltyRtrSdk`.  See
  `AP.model.Model` for more information about models.
  
  @module LoyaltyRtrSdk
  @submodule models
  @class BankFaq
  @extends AP.model.Model
  */


  LoyaltyRtrSdk.models.BankFaq = (function(_super) {
    __extends(BankFaq, _super);

    function BankFaq() {
      _ref13 = BankFaq.__super__.constructor.apply(this, arguments);
      return _ref13;
    }

    _.extend(BankFaq, Backbone.Events);

    /**
    The model ID may be used to look-up a model from an application class.
    @property modelId
    @type String
    @static
    */


    BankFaq.modelId = '4518';

    /**
    The model name may be used to look-up a model from an application class.
    @property name
    @type String
    */


    BankFaq.prototype.name = 'BankFaq';

    /**
    Server requests for model instances use this URL.
    @property urlRoot
    @type String
    */


    BankFaq.prototype.urlRoot = '/api/v10/bank_faqs';

    /**
    Array of field definition configurations.  Field definitions describe fields
    available on this model.
    @property fieldDefinitions
    @type Array
    */


    BankFaq.prototype.fieldDefinitions = [
      {
        id: 39529,
        name: 'id',
        label: 'id',
        type: 'integer',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39653,
        name: 'bank_setting_id',
        label: 'bank_setting_id',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39576,
        name: 'faq_answer',
        label: 'faq_answer',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39575,
        name: 'faq_question',
        label: 'faq_question',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39577,
        name: 'faq_url',
        label: 'faq_url',
        type: 'string',
        required: false,
        file_url: true,
        file_type: 'Image'
      }, {
        id: 40127,
        name: 'program_data_language_code',
        label: 'program_data_language_code',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 40126,
        name: 'program_language_code',
        label: 'program_language_code',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }
    ];

    /**
    Array of field names.  Auto keys, generally such as `id`, have their values
    filled automatically by the server.  Non-auto keys are all other fields.
    @property nonAutoKeyFields
    @type Array
    */


    BankFaq.prototype.nonAutoKeyFields = ['bank_setting_id', 'faq_answer', 'faq_question', 'faq_url', 'program_data_language_code', 'program_language_code'];

    /**
    Array of relationship definitions.
    @property relationshipDefinitions
    @type Array
    */


    BankFaq.prototype.relationshipDefinitions = [];

    /**
    Array of validation configurations.  See `AP.model.Model` for more information
    about validations.
    @property validations
    @type Array
    */


    BankFaq.prototype.validations = [];

    return BankFaq;

  })(AP.model.Model);

  /**
  BankOffer model for application `LoyaltyRtrSdk`.  See
  `AP.model.Model` for more information about models.
  
  @module LoyaltyRtrSdk
  @submodule models
  @class BankOffer
  @extends AP.model.Model
  */


  LoyaltyRtrSdk.models.BankOffer = (function(_super) {
    __extends(BankOffer, _super);

    function BankOffer() {
      _ref14 = BankOffer.__super__.constructor.apply(this, arguments);
      return _ref14;
    }

    _.extend(BankOffer, Backbone.Events);

    /**
    The model ID may be used to look-up a model from an application class.
    @property modelId
    @type String
    @static
    */


    BankOffer.modelId = '4516';

    /**
    The model name may be used to look-up a model from an application class.
    @property name
    @type String
    */


    BankOffer.prototype.name = 'BankOffer';

    /**
    Server requests for model instances use this URL.
    @property urlRoot
    @type String
    */


    BankOffer.prototype.urlRoot = '/api/v10/bank_offers';

    /**
    Array of field definition configurations.  Field definitions describe fields
    available on this model.
    @property fieldDefinitions
    @type Array
    */


    BankOffer.prototype.fieldDefinitions = [
      {
        id: 39527,
        name: 'id',
        label: 'id',
        type: 'integer',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39652,
        name: 'base_conversion_factor',
        label: 'base_conversion_factor',
        type: 'float',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39648,
        name: 'category',
        label: 'category',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39569,
        name: 'end_date',
        label: 'end_date',
        type: 'date',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39570,
        name: 'image',
        label: 'image',
        type: 'string',
        required: false,
        file_url: true,
        file_type: 'Image'
      }, {
        id: 40129,
        name: 'language_code',
        label: 'language_code',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39571,
        name: 'line_one',
        label: 'line_one',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39968,
        name: 'line_three',
        label: 'line_three',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39967,
        name: 'line_two',
        label: 'line_two',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39966,
        name: 'program_level_id',
        label: 'program_level_id',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39655,
        name: 'promo_conversion_rate',
        label: 'promo_conversion_rate',
        type: 'float',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39568,
        name: 'start_date',
        label: 'start_date',
        type: 'date',
        required: false,
        file_url: false,
        file_type: 'Image'
      }
    ];

    /**
    Array of field names.  Auto keys, generally such as `id`, have their values
    filled automatically by the server.  Non-auto keys are all other fields.
    @property nonAutoKeyFields
    @type Array
    */


    BankOffer.prototype.nonAutoKeyFields = ['base_conversion_factor', 'category', 'end_date', 'image', 'language_code', 'line_one', 'line_three', 'line_two', 'program_level_id', 'promo_conversion_rate', 'start_date'];

    /**
    Array of relationship definitions.
    @property relationshipDefinitions
    @type Array
    */


    BankOffer.prototype.relationshipDefinitions = [];

    /**
    Array of validation configurations.  See `AP.model.Model` for more information
    about validations.
    @property validations
    @type Array
    */


    BankOffer.prototype.validations = [];

    return BankOffer;

  })(AP.model.Model);

  /**
  BankRanac model for application `LoyaltyRtrSdk`.  See
  `AP.model.Model` for more information about models.
  
  @module LoyaltyRtrSdk
  @submodule models
  @class BankRanac
  @extends AP.model.Model
  */


  LoyaltyRtrSdk.models.BankRanac = (function(_super) {
    __extends(BankRanac, _super);

    function BankRanac() {
      _ref15 = BankRanac.__super__.constructor.apply(this, arguments);
      return _ref15;
    }

    _.extend(BankRanac, Backbone.Events);

    /**
    The model ID may be used to look-up a model from an application class.
    @property modelId
    @type String
    @static
    */


    BankRanac.modelId = '4568';

    /**
    The model name may be used to look-up a model from an application class.
    @property name
    @type String
    */


    BankRanac.prototype.name = 'BankRanac';

    /**
    Server requests for model instances use this URL.
    @property urlRoot
    @type String
    */


    BankRanac.prototype.urlRoot = '/api/v10/bank_ranacs';

    /**
    Array of field definition configurations.  Field definitions describe fields
    available on this model.
    @property fieldDefinitions
    @type Array
    */


    BankRanac.prototype.fieldDefinitions = [
      {
        id: 40136,
        name: 'id',
        label: 'id',
        type: 'integer',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 40140,
        name: 'language_code',
        label: 'language_code',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 40139,
        name: 'program_level_id',
        label: 'program_level_id',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 40138,
        name: 'ranac',
        label: 'ranac',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }
    ];

    /**
    Array of field names.  Auto keys, generally such as `id`, have their values
    filled automatically by the server.  Non-auto keys are all other fields.
    @property nonAutoKeyFields
    @type Array
    */


    BankRanac.prototype.nonAutoKeyFields = ['language_code', 'program_level_id', 'ranac'];

    /**
    Array of relationship definitions.
    @property relationshipDefinitions
    @type Array
    */


    BankRanac.prototype.relationshipDefinitions = [];

    /**
    Array of validation configurations.  See `AP.model.Model` for more information
    about validations.
    @property validations
    @type Array
    */


    BankRanac.prototype.validations = [];

    return BankRanac;

  })(AP.model.Model);

  /**
  ColorSwatch model for application `LoyaltyRtrSdk`.  See
  `AP.model.Model` for more information about models.
  
  @module LoyaltyRtrSdk
  @submodule models
  @class ColorSwatch
  @extends AP.model.Model
  */


  LoyaltyRtrSdk.models.ColorSwatch = (function(_super) {
    __extends(ColorSwatch, _super);

    function ColorSwatch() {
      _ref16 = ColorSwatch.__super__.constructor.apply(this, arguments);
      return _ref16;
    }

    _.extend(ColorSwatch, Backbone.Events);

    /**
    The model ID may be used to look-up a model from an application class.
    @property modelId
    @type String
    @static
    */


    ColorSwatch.modelId = '4525';

    /**
    The model name may be used to look-up a model from an application class.
    @property name
    @type String
    */


    ColorSwatch.prototype.name = 'ColorSwatch';

    /**
    Server requests for model instances use this URL.
    @property urlRoot
    @type String
    */


    ColorSwatch.prototype.urlRoot = '/api/v10/color_swatches';

    /**
    Array of field definition configurations.  Field definitions describe fields
    available on this model.
    @property fieldDefinitions
    @type Array
    */


    ColorSwatch.prototype.fieldDefinitions = [
      {
        id: 39675,
        name: 'id',
        label: 'id',
        type: 'integer',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39677,
        name: 'color_argb',
        label: 'color_argb',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39678,
        name: 'color_id',
        label: 'color_id',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39679,
        name: 'program_level_id',
        label: 'program_level_id',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }
    ];

    /**
    Array of field names.  Auto keys, generally such as `id`, have their values
    filled automatically by the server.  Non-auto keys are all other fields.
    @property nonAutoKeyFields
    @type Array
    */


    ColorSwatch.prototype.nonAutoKeyFields = ['color_argb', 'color_id', 'program_level_id'];

    /**
    Array of relationship definitions.
    @property relationshipDefinitions
    @type Array
    */


    ColorSwatch.prototype.relationshipDefinitions = [];

    /**
    Array of validation configurations.  See `AP.model.Model` for more information
    about validations.
    @property validations
    @type Array
    */


    ColorSwatch.prototype.validations = [];

    return ColorSwatch;

  })(AP.model.Model);

  /**
  GetQuestion model for application `LoyaltyRtrSdk`.  See
  `AP.model.Model` for more information about models.
  
  @module LoyaltyRtrSdk
  @submodule models
  @class GetQuestion
  @extends AP.model.Model
  */


  LoyaltyRtrSdk.models.GetQuestion = (function(_super) {
    __extends(GetQuestion, _super);

    function GetQuestion() {
      _ref17 = GetQuestion.__super__.constructor.apply(this, arguments);
      return _ref17;
    }

    _.extend(GetQuestion, Backbone.Events);

    /**
    The model ID may be used to look-up a model from an application class.
    @property modelId
    @type String
    @static
    */


    GetQuestion.modelId = '4514';

    /**
    The model name may be used to look-up a model from an application class.
    @property name
    @type String
    */


    GetQuestion.prototype.name = 'GetQuestion';

    /**
    Server requests for model instances use this URL.
    @property urlRoot
    @type String
    */


    GetQuestion.prototype.urlRoot = '/api/v10/get_questions';

    /**
    Array of field definition configurations.  Field definitions describe fields
    available on this model.
    @property fieldDefinitions
    @type Array
    */


    GetQuestion.prototype.fieldDefinitions = [
      {
        id: 39525,
        name: 'id',
        label: 'id',
        type: 'integer',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39538,
        name: 'ban',
        label: 'ban',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39540,
        name: 'question_code',
        label: 'question_code',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39539,
        name: 'question_text',
        label: 'question_text',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }
    ];

    /**
    Array of field names.  Auto keys, generally such as `id`, have their values
    filled automatically by the server.  Non-auto keys are all other fields.
    @property nonAutoKeyFields
    @type Array
    */


    GetQuestion.prototype.nonAutoKeyFields = ['ban', 'question_code', 'question_text'];

    /**
    Array of relationship definitions.
    @property relationshipDefinitions
    @type Array
    */


    GetQuestion.prototype.relationshipDefinitions = [];

    /**
    Array of validation configurations.  See `AP.model.Model` for more information
    about validations.
    @property validations
    @type Array
    */


    GetQuestion.prototype.validations = [];

    return GetQuestion;

  })(AP.model.Model);

  /**
  LanguageCode model for application `LoyaltyRtrSdk`.  See
  `AP.model.Model` for more information about models.
  
  @module LoyaltyRtrSdk
  @submodule models
  @class LanguageCode
  @extends AP.model.Model
  */


  LoyaltyRtrSdk.models.LanguageCode = (function(_super) {
    __extends(LanguageCode, _super);

    function LanguageCode() {
      _ref18 = LanguageCode.__super__.constructor.apply(this, arguments);
      return _ref18;
    }

    _.extend(LanguageCode, Backbone.Events);

    /**
    The model ID may be used to look-up a model from an application class.
    @property modelId
    @type String
    @static
    */


    LanguageCode.modelId = '4569';

    /**
    The model name may be used to look-up a model from an application class.
    @property name
    @type String
    */


    LanguageCode.prototype.name = 'LanguageCode';

    /**
    Server requests for model instances use this URL.
    @property urlRoot
    @type String
    */


    LanguageCode.prototype.urlRoot = '/api/v10/language_codes';

    /**
    Array of field definition configurations.  Field definitions describe fields
    available on this model.
    @property fieldDefinitions
    @type Array
    */


    LanguageCode.prototype.fieldDefinitions = [
      {
        id: 40142,
        name: 'id',
        label: 'id',
        type: 'integer',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 40143,
        name: 'code',
        label: 'code',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }
    ];

    /**
    Array of field names.  Auto keys, generally such as `id`, have their values
    filled automatically by the server.  Non-auto keys are all other fields.
    @property nonAutoKeyFields
    @type Array
    */


    LanguageCode.prototype.nonAutoKeyFields = ['code'];

    /**
    Array of relationship definitions.
    @property relationshipDefinitions
    @type Array
    */


    LanguageCode.prototype.relationshipDefinitions = [];

    /**
    Array of validation configurations.  See `AP.model.Model` for more information
    about validations.
    @property validations
    @type Array
    */


    LanguageCode.prototype.validations = [];

    return LanguageCode;

  })(AP.model.Model);

  /**
  LanguageString model for application `LoyaltyRtrSdk`.  See
  `AP.model.Model` for more information about models.
  
  @module LoyaltyRtrSdk
  @submodule models
  @class LanguageString
  @extends AP.model.Model
  */


  LoyaltyRtrSdk.models.LanguageString = (function(_super) {
    __extends(LanguageString, _super);

    function LanguageString() {
      _ref19 = LanguageString.__super__.constructor.apply(this, arguments);
      return _ref19;
    }

    _.extend(LanguageString, Backbone.Events);

    /**
    The model ID may be used to look-up a model from an application class.
    @property modelId
    @type String
    @static
    */


    LanguageString.modelId = '4519';

    /**
    The model name may be used to look-up a model from an application class.
    @property name
    @type String
    */


    LanguageString.prototype.name = 'LanguageString';

    /**
    Server requests for model instances use this URL.
    @property urlRoot
    @type String
    */


    LanguageString.prototype.urlRoot = '/api/v10/language_strings';

    /**
    Array of field definition configurations.  Field definitions describe fields
    available on this model.
    @property fieldDefinitions
    @type Array
    */


    LanguageString.prototype.fieldDefinitions = [
      {
        id: 39530,
        name: 'id',
        label: 'id',
        type: 'integer',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39663,
        name: 'fallback',
        label: 'fallback',
        type: 'boolean',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39662,
        name: 'global',
        label: 'global',
        type: 'boolean',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39660,
        name: 'label_id',
        label: 'label_id',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39659,
        name: 'language_code',
        label: 'language_code',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39661,
        name: 'program_level_id',
        label: 'program_level_id',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39664,
        name: 'value',
        label: 'value',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }
    ];

    /**
    Array of field names.  Auto keys, generally such as `id`, have their values
    filled automatically by the server.  Non-auto keys are all other fields.
    @property nonAutoKeyFields
    @type Array
    */


    LanguageString.prototype.nonAutoKeyFields = ['fallback', 'global', 'label_id', 'language_code', 'program_level_id', 'value'];

    /**
    Array of relationship definitions.
    @property relationshipDefinitions
    @type Array
    */


    LanguageString.prototype.relationshipDefinitions = [];

    /**
    Array of validation configurations.  See `AP.model.Model` for more information
    about validations.
    @property validations
    @type Array
    */


    LanguageString.prototype.validations = [];

    return LanguageString;

  })(AP.model.Model);

  /**
  LocalUserStorage model for application `LoyaltyRtrSdk`.  See
  `AP.model.Model` for more information about models.
  
  @module LoyaltyRtrSdk
  @submodule models
  @class LocalUserStorage
  @extends AP.model.Model
  */


  LoyaltyRtrSdk.models.LocalUserStorage = (function(_super) {
    __extends(LocalUserStorage, _super);

    function LocalUserStorage() {
      _ref20 = LocalUserStorage.__super__.constructor.apply(this, arguments);
      return _ref20;
    }

    _.extend(LocalUserStorage, Backbone.Events);

    /**
    The model ID may be used to look-up a model from an application class.
    @property modelId
    @type String
    @static
    */


    LocalUserStorage.modelId = '4558';

    /**
    The model name may be used to look-up a model from an application class.
    @property name
    @type String
    */


    LocalUserStorage.prototype.name = 'LocalUserStorage';

    /**
    Server requests for model instances use this URL.
    @property urlRoot
    @type String
    */


    LocalUserStorage.prototype.urlRoot = '/api/v10/local_user_storages';

    /**
    Array of field definition configurations.  Field definitions describe fields
    available on this model.
    @property fieldDefinitions
    @type Array
    */


    LocalUserStorage.prototype.fieldDefinitions = [
      {
        id: 40009,
        name: 'id',
        label: 'id',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 40010,
        name: 'ranacs',
        label: 'ranacs',
        type: 'hash',
        required: false,
        file_url: false,
        file_type: 'Image'
      }
    ];

    /**
    Array of field names.  Auto keys, generally such as `id`, have their values
    filled automatically by the server.  Non-auto keys are all other fields.
    @property nonAutoKeyFields
    @type Array
    */


    LocalUserStorage.prototype.nonAutoKeyFields = ['ranacs'];

    /**
    Array of relationship definitions.
    @property relationshipDefinitions
    @type Array
    */


    LocalUserStorage.prototype.relationshipDefinitions = [];

    /**
    Array of validation configurations.  See `AP.model.Model` for more information
    about validations.
    @property validations
    @type Array
    */


    LocalUserStorage.prototype.validations = [];

    return LocalUserStorage;

  })(AP.model.Model);

  /**
  Message model for application `LoyaltyRtrSdk`.  See
  `AP.model.Model` for more information about models.
  
  @module LoyaltyRtrSdk
  @submodule models
  @class Message
  @extends AP.model.Model
  */


  LoyaltyRtrSdk.models.Message = (function(_super) {
    __extends(Message, _super);

    function Message() {
      _ref21 = Message.__super__.constructor.apply(this, arguments);
      return _ref21;
    }

    _.extend(Message, Backbone.Events);

    /**
    The model ID may be used to look-up a model from an application class.
    @property modelId
    @type String
    @static
    */


    Message.modelId = '4557';

    /**
    The model name may be used to look-up a model from an application class.
    @property name
    @type String
    */


    Message.prototype.name = 'Message';

    /**
    Server requests for model instances use this URL.
    @property urlRoot
    @type String
    */


    Message.prototype.urlRoot = '/api/v10/messages';

    /**
    Array of field definition configurations.  Field definitions describe fields
    available on this model.
    @property fieldDefinitions
    @type Array
    */


    Message.prototype.fieldDefinitions = [
      {
        id: 40005,
        name: 'id',
        label: 'id',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 40121,
        name: 'available_points',
        label: 'available_points',
        type: 'integer',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 40122,
        name: 'created_on',
        label: 'created_on',
        type: 'time',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 40006,
        name: 'is_read',
        label: 'is_read',
        type: 'boolean',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 40123,
        name: 'last_four_digits',
        label: 'last_four_digits',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 40124,
        name: 'message_field',
        label: 'message_field',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 40135,
        name: 'message_type',
        label: 'message_type',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 40008,
        name: 'points_redeemed',
        label: 'points_redeemed',
        type: 'integer',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 40134,
        name: 'program_level_id',
        label: 'program_level_id',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 40007,
        name: 'ranac',
        label: 'ranac',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }
    ];

    /**
    Array of field names.  Auto keys, generally such as `id`, have their values
    filled automatically by the server.  Non-auto keys are all other fields.
    @property nonAutoKeyFields
    @type Array
    */


    Message.prototype.nonAutoKeyFields = ['available_points', 'created_on', 'is_read', 'last_four_digits', 'message_field', 'message_type', 'points_redeemed', 'program_level_id', 'ranac'];

    /**
    Array of relationship definitions.
    @property relationshipDefinitions
    @type Array
    */


    Message.prototype.relationshipDefinitions = [];

    /**
    Array of validation configurations.  See `AP.model.Model` for more information
    about validations.
    @property validations
    @type Array
    */


    Message.prototype.validations = [];

    return Message;

  })(AP.model.Model);

  /**
  Rtr model for application `LoyaltyRtrSdk`.  See
  `AP.model.Model` for more information about models.
  
  @module LoyaltyRtrSdk
  @submodule models
  @class Rtr
  @extends AP.model.Model
  */


  LoyaltyRtrSdk.models.Rtr = (function(_super) {
    __extends(Rtr, _super);

    function Rtr() {
      _ref22 = Rtr.__super__.constructor.apply(this, arguments);
      return _ref22;
    }

    _.extend(Rtr, Backbone.Events);

    /**
    The model ID may be used to look-up a model from an application class.
    @property modelId
    @type String
    @static
    */


    Rtr.modelId = '4517';

    /**
    The model name may be used to look-up a model from an application class.
    @property name
    @type String
    */


    Rtr.prototype.name = 'Rtr';

    /**
    Server requests for model instances use this URL.
    @property urlRoot
    @type String
    */


    Rtr.prototype.urlRoot = '/api/v10/rtrs';

    /**
    Array of field definition configurations.  Field definitions describe fields
    available on this model.
    @property fieldDefinitions
    @type Array
    */


    Rtr.prototype.fieldDefinitions = [
      {
        id: 39528,
        name: 'id',
        label: 'id',
        type: 'integer',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39553,
        name: 'base_conversion_factor',
        label: 'base_conversion_factor',
        type: 'float',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39550,
        name: 'cardholder_threshold',
        label: 'cardholder_threshold',
        type: 'integer',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39547,
        name: 'communication_preference',
        label: 'communication_preference',
        type: 'boolean',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39970,
        name: 'current_cashback_card',
        label: 'current_cashback_card',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39548,
        name: 'current_cash_card_last_four',
        label: 'current_cash_card_last_four',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39549,
        name: 'email_address',
        label: 'email_address',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39552,
        name: 'issuer_lower_bound',
        label: 'issuer_lower_bound',
        type: 'integer',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39551,
        name: 'issuer_upper_bound',
        label: 'issuer_upper_bound',
        type: 'integer',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39555,
        name: 'next_transaction_only',
        label: 'next_transaction_only',
        type: 'boolean',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39654,
        name: 'notification_preference',
        label: 'notification_preference',
        type: 'boolean',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39546,
        name: 'opt_in_preference',
        label: 'opt_in_preference',
        type: 'boolean',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39556,
        name: 'program_level_id',
        label: 'program_level_id',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39545,
        name: 'ranac',
        label: 'ranac',
        type: 'string',
        required: true,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39554,
        name: 'redeemable_point_balance',
        label: 'redeemable_point_balance',
        type: 'integer',
        required: false,
        file_url: false,
        file_type: 'Image'
      }
    ];

    /**
    Array of field names.  Auto keys, generally such as `id`, have their values
    filled automatically by the server.  Non-auto keys are all other fields.
    @property nonAutoKeyFields
    @type Array
    */


    Rtr.prototype.nonAutoKeyFields = ['base_conversion_factor', 'cardholder_threshold', 'communication_preference', 'current_cashback_card', 'current_cash_card_last_four', 'email_address', 'issuer_lower_bound', 'issuer_upper_bound', 'next_transaction_only', 'notification_preference', 'opt_in_preference', 'program_level_id', 'ranac', 'redeemable_point_balance'];

    /**
    Array of relationship definitions.
    @property relationshipDefinitions
    @type Array
    */


    Rtr.prototype.relationshipDefinitions = [];

    /**
    Array of validation configurations.  See `AP.model.Model` for more information
    about validations.
    @property validations
    @type Array
    */


    Rtr.prototype.validations = [
      {
        field: 'ranac',
        validate: 'required'
      }
    ];

    return Rtr;

  })(AP.model.Model);

  /**
  User model for application `LoyaltyRtrSdk`.  See
  `AP.model.Model` for more information about models.
  
  @module LoyaltyRtrSdk
  @submodule models
  @class User
  @extends AP.model.Model
  */


  LoyaltyRtrSdk.models.User = (function(_super) {
    __extends(User, _super);

    function User() {
      _ref23 = User.__super__.constructor.apply(this, arguments);
      return _ref23;
    }

    _.extend(User, Backbone.Events);

    /**
    The model ID may be used to look-up a model from an application class.
    @property modelId
    @type String
    @static
    */


    User.modelId = '4520';

    /**
    The model name may be used to look-up a model from an application class.
    @property name
    @type String
    */


    User.prototype.name = 'User';

    /**
    Server requests for model instances use this URL.
    @property urlRoot
    @type String
    */


    User.prototype.urlRoot = '/api/v10/users';

    /**
    Array of field definition configurations.  Field definitions describe fields
    available on this model.
    @property fieldDefinitions
    @type Array
    */


    User.prototype.fieldDefinitions = [
      {
        id: 39531,
        name: 'id',
        label: 'id',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39714,
        name: 'answer',
        label: 'answer',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39712,
        name: 'ban',
        label: 'ban',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39533,
        name: 'password',
        label: 'password',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39536,
        name: 'password_confirmation',
        label: 'password_confirmation',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39537,
        name: 'password_digest',
        label: 'password_digest',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39713,
        name: 'question_code',
        label: 'question_code',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39715,
        name: 'ranac',
        label: 'ranac',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39534,
        name: 'role',
        label: 'role',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39532,
        name: 'username',
        label: 'username',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }, {
        id: 39535,
        name: 'x_session_id',
        label: 'x_session_id',
        type: 'string',
        required: false,
        file_url: false,
        file_type: 'Image'
      }
    ];

    /**
    Array of field names.  Auto keys, generally such as `id`, have their values
    filled automatically by the server.  Non-auto keys are all other fields.
    @property nonAutoKeyFields
    @type Array
    */


    User.prototype.nonAutoKeyFields = ['answer', 'ban', 'password', 'password_confirmation', 'password_digest', 'question_code', 'ranac', 'role', 'username', 'x_session_id'];

    /**
    Array of relationship definitions.
    @property relationshipDefinitions
    @type Array
    */


    User.prototype.relationshipDefinitions = [];

    /**
    Array of validation configurations.  See `AP.model.Model` for more information
    about validations.
    @property validations
    @type Array
    */


    User.prototype.validations = [];

    return User;

  })(AP.model.Model);

  /**
  AppConfigurationAllis a scope collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.ScopeCollection` for more information about scopes.
  
  @module LoyaltyRtrSdk
  @submodule collections
  @class AppConfigurationAll
  @extends AP.collection.ScopeCollection
  */


  LoyaltyRtrSdk.collections.AppConfigurationAll = (function(_super) {
    __extends(AppConfigurationAll, _super);

    function AppConfigurationAll() {
      _ref24 = AppConfigurationAll.__super__.constructor.apply(this, arguments);
      return _ref24;
    }

    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
    */


    AppConfigurationAll.collectionId = '21632';

    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
    */


    AppConfigurationAll.prototype.model = LoyaltyRtrSdk.models.AppConfiguration;

    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
    */


    AppConfigurationAll.prototype.apiEndpoint = '/api/v10/app_configurations.json';

    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
    */


    AppConfigurationAll.prototype.extraParams = {
      scope: 'all'
    };

    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
    */


    AppConfigurationAll.prototype.queryFields = [];

    return AppConfigurationAll;

  })(AP.collection.ScopeCollection);

  null;

  /**
  AppConfigurationCountis an aggregate collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.AggregateCollection` to learn about about aggregates.
  @module LoyaltyRtrSdk
  @submodule collections
  @class AppConfigurationCount
  @extends AP.collection.AggregateCollection
  */


  LoyaltyRtrSdk.collections.AppConfigurationCount = (function(_super) {
    __extends(AppConfigurationCount, _super);

    function AppConfigurationCount() {
      _ref25 = AppConfigurationCount.__super__.constructor.apply(this, arguments);
      return _ref25;
    }

    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
    */


    AppConfigurationCount.collectionId = '21634';

    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
    */


    AppConfigurationCount.prototype.model = LoyaltyRtrSdk.models.AppConfiguration;

    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
    */


    AppConfigurationCount.prototype.apiEndpoint = '/api/v10/app_configurations.json';

    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
    */


    AppConfigurationCount.prototype.extraParams = {
      scope: 'count'
    };

    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
    */


    AppConfigurationCount.prototype.queryFields = [];

    return AppConfigurationCount;

  })(AP.collection.AggregateCollection);

  null;

  /**
  AppConfigurationCountExactMatchis an aggregate collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.AggregateCollection` to learn about about aggregates.
  @module LoyaltyRtrSdk
  @submodule collections
  @class AppConfigurationCountExactMatch
  @extends AP.collection.AggregateCollection
  */


  LoyaltyRtrSdk.collections.AppConfigurationCountExactMatch = (function(_super) {
    __extends(AppConfigurationCountExactMatch, _super);

    function AppConfigurationCountExactMatch() {
      _ref26 = AppConfigurationCountExactMatch.__super__.constructor.apply(this, arguments);
      return _ref26;
    }

    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
    */


    AppConfigurationCountExactMatch.collectionId = '21635';

    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
    */


    AppConfigurationCountExactMatch.prototype.model = LoyaltyRtrSdk.models.AppConfiguration;

    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
    */


    AppConfigurationCountExactMatch.prototype.apiEndpoint = '/api/v10/app_configurations.json';

    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
    */


    AppConfigurationCountExactMatch.prototype.extraParams = {
      scope: 'count_exact_match'
    };

    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
    */


    AppConfigurationCountExactMatch.prototype.queryFields = [];

    return AppConfigurationCountExactMatch;

  })(AP.collection.AggregateCollection);

  /**
  AppConfigurationExactMatchis a scope collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.ScopeCollection` for more information about scopes.
  
  @module LoyaltyRtrSdk
  @submodule collections
  @class AppConfigurationExactMatch
  @extends AP.collection.ScopeCollection
  */


  LoyaltyRtrSdk.collections.AppConfigurationExactMatch = (function(_super) {
    __extends(AppConfigurationExactMatch, _super);

    function AppConfigurationExactMatch() {
      _ref27 = AppConfigurationExactMatch.__super__.constructor.apply(this, arguments);
      return _ref27;
    }

    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
    */


    AppConfigurationExactMatch.collectionId = '21633';

    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
    */


    AppConfigurationExactMatch.prototype.model = LoyaltyRtrSdk.models.AppConfiguration;

    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
    */


    AppConfigurationExactMatch.prototype.apiEndpoint = '/api/v10/app_configurations.json';

    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
    */


    AppConfigurationExactMatch.prototype.extraParams = {
      scope: 'exact_match'
    };

    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
    */


    AppConfigurationExactMatch.prototype.queryFields = [];

    return AppConfigurationExactMatch;

  })(AP.collection.ScopeCollection);

  /**
  AppConfigurationGetLanguageSettingsis a scope collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.ScopeCollection` for more information about scopes.
  
  @module LoyaltyRtrSdk
  @submodule collections
  @class AppConfigurationGetLanguageSettings
  @extends AP.collection.ScopeCollection
  */


  LoyaltyRtrSdk.collections.AppConfigurationGetLanguageSettings = (function(_super) {
    __extends(AppConfigurationGetLanguageSettings, _super);

    function AppConfigurationGetLanguageSettings() {
      _ref28 = AppConfigurationGetLanguageSettings.__super__.constructor.apply(this, arguments);
      return _ref28;
    }

    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
    */


    AppConfigurationGetLanguageSettings.collectionId = '21636';

    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
    */


    AppConfigurationGetLanguageSettings.prototype.model = LoyaltyRtrSdk.models.AppConfiguration;

    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
    */


    AppConfigurationGetLanguageSettings.prototype.apiEndpoint = '/api/v10/app_configurations.json';

    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
    */


    AppConfigurationGetLanguageSettings.prototype.extraParams = {
      scope: 'get_language_settings'
    };

    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
    */


    AppConfigurationGetLanguageSettings.prototype.queryFields = [];

    return AppConfigurationGetLanguageSettings;

  })(AP.collection.ScopeCollection);

  /**
  AuditAllis a scope collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.ScopeCollection` for more information about scopes.
  
  @module LoyaltyRtrSdk
  @submodule collections
  @class AuditAll
  @extends AP.collection.ScopeCollection
  */


  LoyaltyRtrSdk.collections.AuditAll = (function(_super) {
    __extends(AuditAll, _super);

    function AuditAll() {
      _ref29 = AuditAll.__super__.constructor.apply(this, arguments);
      return _ref29;
    }

    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
    */


    AuditAll.collectionId = '21628';

    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
    */


    AuditAll.prototype.model = LoyaltyRtrSdk.models.Audit;

    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
    */


    AuditAll.prototype.apiEndpoint = '/api/v10/audits.json';

    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
    */


    AuditAll.prototype.extraParams = {
      scope: 'all'
    };

    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
    */


    AuditAll.prototype.queryFields = [];

    return AuditAll;

  })(AP.collection.ScopeCollection);

  null;

  /**
  AuditCountis an aggregate collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.AggregateCollection` to learn about about aggregates.
  @module LoyaltyRtrSdk
  @submodule collections
  @class AuditCount
  @extends AP.collection.AggregateCollection
  */


  LoyaltyRtrSdk.collections.AuditCount = (function(_super) {
    __extends(AuditCount, _super);

    function AuditCount() {
      _ref30 = AuditCount.__super__.constructor.apply(this, arguments);
      return _ref30;
    }

    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
    */


    AuditCount.collectionId = '21630';

    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
    */


    AuditCount.prototype.model = LoyaltyRtrSdk.models.Audit;

    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
    */


    AuditCount.prototype.apiEndpoint = '/api/v10/audits.json';

    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
    */


    AuditCount.prototype.extraParams = {
      scope: 'count'
    };

    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
    */


    AuditCount.prototype.queryFields = [];

    return AuditCount;

  })(AP.collection.AggregateCollection);

  null;

  /**
  AuditCountExactMatchis an aggregate collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.AggregateCollection` to learn about about aggregates.
  @module LoyaltyRtrSdk
  @submodule collections
  @class AuditCountExactMatch
  @extends AP.collection.AggregateCollection
  */


  LoyaltyRtrSdk.collections.AuditCountExactMatch = (function(_super) {
    __extends(AuditCountExactMatch, _super);

    function AuditCountExactMatch() {
      _ref31 = AuditCountExactMatch.__super__.constructor.apply(this, arguments);
      return _ref31;
    }

    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
    */


    AuditCountExactMatch.collectionId = '21631';

    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
    */


    AuditCountExactMatch.prototype.model = LoyaltyRtrSdk.models.Audit;

    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
    */


    AuditCountExactMatch.prototype.apiEndpoint = '/api/v10/audits.json';

    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
    */


    AuditCountExactMatch.prototype.extraParams = {
      scope: 'count_exact_match'
    };

    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
    */


    AuditCountExactMatch.prototype.queryFields = [];

    return AuditCountExactMatch;

  })(AP.collection.AggregateCollection);

  /**
  AuditExactMatchis a scope collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.ScopeCollection` for more information about scopes.
  
  @module LoyaltyRtrSdk
  @submodule collections
  @class AuditExactMatch
  @extends AP.collection.ScopeCollection
  */


  LoyaltyRtrSdk.collections.AuditExactMatch = (function(_super) {
    __extends(AuditExactMatch, _super);

    function AuditExactMatch() {
      _ref32 = AuditExactMatch.__super__.constructor.apply(this, arguments);
      return _ref32;
    }

    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
    */


    AuditExactMatch.collectionId = '21629';

    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
    */


    AuditExactMatch.prototype.model = LoyaltyRtrSdk.models.Audit;

    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
    */


    AuditExactMatch.prototype.apiEndpoint = '/api/v10/audits.json';

    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
    */


    AuditExactMatch.prototype.extraParams = {
      scope: 'exact_match'
    };

    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
    */


    AuditExactMatch.prototype.queryFields = [];

    return AuditExactMatch;

  })(AP.collection.ScopeCollection);

  /**
  BankAllis a scope collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.ScopeCollection` for more information about scopes.
  
  @module LoyaltyRtrSdk
  @submodule collections
  @class BankAll
  @extends AP.collection.ScopeCollection
  */


  LoyaltyRtrSdk.collections.BankAll = (function(_super) {
    __extends(BankAll, _super);

    function BankAll() {
      _ref33 = BankAll.__super__.constructor.apply(this, arguments);
      return _ref33;
    }

    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
    */


    BankAll.collectionId = '21588';

    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
    */


    BankAll.prototype.model = LoyaltyRtrSdk.models.Bank;

    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
    */


    BankAll.prototype.apiEndpoint = '/api/v10/banks.json';

    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
    */


    BankAll.prototype.extraParams = {
      scope: 'all'
    };

    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
    */


    BankAll.prototype.queryFields = [];

    return BankAll;

  })(AP.collection.ScopeCollection);

  null;

  /**
  BankCountis an aggregate collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.AggregateCollection` to learn about about aggregates.
  @module LoyaltyRtrSdk
  @submodule collections
  @class BankCount
  @extends AP.collection.AggregateCollection
  */


  LoyaltyRtrSdk.collections.BankCount = (function(_super) {
    __extends(BankCount, _super);

    function BankCount() {
      _ref34 = BankCount.__super__.constructor.apply(this, arguments);
      return _ref34;
    }

    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
    */


    BankCount.collectionId = '21590';

    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
    */


    BankCount.prototype.model = LoyaltyRtrSdk.models.Bank;

    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
    */


    BankCount.prototype.apiEndpoint = '/api/v10/banks.json';

    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
    */


    BankCount.prototype.extraParams = {
      scope: 'count'
    };

    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
    */


    BankCount.prototype.queryFields = [];

    return BankCount;

  })(AP.collection.AggregateCollection);

  null;

  /**
  BankCountExactMatchis an aggregate collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.AggregateCollection` to learn about about aggregates.
  @module LoyaltyRtrSdk
  @submodule collections
  @class BankCountExactMatch
  @extends AP.collection.AggregateCollection
  */


  LoyaltyRtrSdk.collections.BankCountExactMatch = (function(_super) {
    __extends(BankCountExactMatch, _super);

    function BankCountExactMatch() {
      _ref35 = BankCountExactMatch.__super__.constructor.apply(this, arguments);
      return _ref35;
    }

    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
    */


    BankCountExactMatch.collectionId = '21591';

    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
    */


    BankCountExactMatch.prototype.model = LoyaltyRtrSdk.models.Bank;

    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
    */


    BankCountExactMatch.prototype.apiEndpoint = '/api/v10/banks.json';

    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
    */


    BankCountExactMatch.prototype.extraParams = {
      scope: 'count_exact_match'
    };

    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
    */


    BankCountExactMatch.prototype.queryFields = [];

    return BankCountExactMatch;

  })(AP.collection.AggregateCollection);

  /**
  BankExactMatchis a scope collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.ScopeCollection` for more information about scopes.
  
  @module LoyaltyRtrSdk
  @submodule collections
  @class BankExactMatch
  @extends AP.collection.ScopeCollection
  */


  LoyaltyRtrSdk.collections.BankExactMatch = (function(_super) {
    __extends(BankExactMatch, _super);

    function BankExactMatch() {
      _ref36 = BankExactMatch.__super__.constructor.apply(this, arguments);
      return _ref36;
    }

    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
    */


    BankExactMatch.collectionId = '21589';

    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
    */


    BankExactMatch.prototype.model = LoyaltyRtrSdk.models.Bank;

    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
    */


    BankExactMatch.prototype.apiEndpoint = '/api/v10/banks.json';

    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
    */


    BankExactMatch.prototype.extraParams = {
      scope: 'exact_match'
    };

    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
    */


    BankExactMatch.prototype.queryFields = [];

    return BankExactMatch;

  })(AP.collection.ScopeCollection);

  /**
  BankFaqAllis a scope collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.ScopeCollection` for more information about scopes.
  
  @module LoyaltyRtrSdk
  @submodule collections
  @class BankFaqAll
  @extends AP.collection.ScopeCollection
  */


  LoyaltyRtrSdk.collections.BankFaqAll = (function(_super) {
    __extends(BankFaqAll, _super);

    function BankFaqAll() {
      _ref37 = BankFaqAll.__super__.constructor.apply(this, arguments);
      return _ref37;
    }

    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
    */


    BankFaqAll.collectionId = '21600';

    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
    */


    BankFaqAll.prototype.model = LoyaltyRtrSdk.models.BankFaq;

    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
    */


    BankFaqAll.prototype.apiEndpoint = '/api/v10/bank_faqs.json';

    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
    */


    BankFaqAll.prototype.extraParams = {
      scope: 'all'
    };

    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
    */


    BankFaqAll.prototype.queryFields = [];

    return BankFaqAll;

  })(AP.collection.ScopeCollection);

  null;

  /**
  BankFaqCountis an aggregate collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.AggregateCollection` to learn about about aggregates.
  @module LoyaltyRtrSdk
  @submodule collections
  @class BankFaqCount
  @extends AP.collection.AggregateCollection
  */


  LoyaltyRtrSdk.collections.BankFaqCount = (function(_super) {
    __extends(BankFaqCount, _super);

    function BankFaqCount() {
      _ref38 = BankFaqCount.__super__.constructor.apply(this, arguments);
      return _ref38;
    }

    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
    */


    BankFaqCount.collectionId = '21602';

    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
    */


    BankFaqCount.prototype.model = LoyaltyRtrSdk.models.BankFaq;

    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
    */


    BankFaqCount.prototype.apiEndpoint = '/api/v10/bank_faqs.json';

    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
    */


    BankFaqCount.prototype.extraParams = {
      scope: 'count'
    };

    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
    */


    BankFaqCount.prototype.queryFields = [];

    return BankFaqCount;

  })(AP.collection.AggregateCollection);

  null;

  /**
  BankFaqCountExactMatchis an aggregate collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.AggregateCollection` to learn about about aggregates.
  @module LoyaltyRtrSdk
  @submodule collections
  @class BankFaqCountExactMatch
  @extends AP.collection.AggregateCollection
  */


  LoyaltyRtrSdk.collections.BankFaqCountExactMatch = (function(_super) {
    __extends(BankFaqCountExactMatch, _super);

    function BankFaqCountExactMatch() {
      _ref39 = BankFaqCountExactMatch.__super__.constructor.apply(this, arguments);
      return _ref39;
    }

    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
    */


    BankFaqCountExactMatch.collectionId = '21603';

    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
    */


    BankFaqCountExactMatch.prototype.model = LoyaltyRtrSdk.models.BankFaq;

    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
    */


    BankFaqCountExactMatch.prototype.apiEndpoint = '/api/v10/bank_faqs.json';

    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
    */


    BankFaqCountExactMatch.prototype.extraParams = {
      scope: 'count_exact_match'
    };

    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
    */


    BankFaqCountExactMatch.prototype.queryFields = [];

    return BankFaqCountExactMatch;

  })(AP.collection.AggregateCollection);

  /**
  BankFaqExactMatchis a scope collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.ScopeCollection` for more information about scopes.
  
  @module LoyaltyRtrSdk
  @submodule collections
  @class BankFaqExactMatch
  @extends AP.collection.ScopeCollection
  */


  LoyaltyRtrSdk.collections.BankFaqExactMatch = (function(_super) {
    __extends(BankFaqExactMatch, _super);

    function BankFaqExactMatch() {
      _ref40 = BankFaqExactMatch.__super__.constructor.apply(this, arguments);
      return _ref40;
    }

    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
    */


    BankFaqExactMatch.collectionId = '21601';

    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
    */


    BankFaqExactMatch.prototype.model = LoyaltyRtrSdk.models.BankFaq;

    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
    */


    BankFaqExactMatch.prototype.apiEndpoint = '/api/v10/bank_faqs.json';

    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
    */


    BankFaqExactMatch.prototype.extraParams = {
      scope: 'exact_match'
    };

    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
    */


    BankFaqExactMatch.prototype.queryFields = [];

    return BankFaqExactMatch;

  })(AP.collection.ScopeCollection);

  /**
  BankFaqGetBankRanacis a scope collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.ScopeCollection` for more information about scopes.
  
  @module LoyaltyRtrSdk
  @submodule collections
  @class BankFaqGetBankRanac
  @extends AP.collection.ScopeCollection
  */


  LoyaltyRtrSdk.collections.BankFaqGetBankRanac = (function(_super) {
    __extends(BankFaqGetBankRanac, _super);

    function BankFaqGetBankRanac() {
      _ref41 = BankFaqGetBankRanac.__super__.constructor.apply(this, arguments);
      return _ref41;
    }

    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
    */


    BankFaqGetBankRanac.collectionId = '21850';

    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
    */


    BankFaqGetBankRanac.prototype.model = LoyaltyRtrSdk.models.BankFaq;

    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
    */


    BankFaqGetBankRanac.prototype.apiEndpoint = '/api/v10/bank_faqs.json';

    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
    */


    BankFaqGetBankRanac.prototype.extraParams = {
      scope: 'get_bank_ranac'
    };

    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
    */


    BankFaqGetBankRanac.prototype.queryFields = [
      {
        fieldName: 'bank_setting_id',
        paramName: 'bank_setting_id'
      }
    ];

    return BankFaqGetBankRanac;

  })(AP.collection.ScopeCollection);

  /**
  BankGetBankInformationis a scope collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.ScopeCollection` for more information about scopes.
  
  @module LoyaltyRtrSdk
  @submodule collections
  @class BankGetBankInformation
  @extends AP.collection.ScopeCollection
  */


  LoyaltyRtrSdk.collections.BankGetBankInformation = (function(_super) {
    __extends(BankGetBankInformation, _super);

    function BankGetBankInformation() {
      _ref42 = BankGetBankInformation.__super__.constructor.apply(this, arguments);
      return _ref42;
    }

    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
    */


    BankGetBankInformation.collectionId = '21780';

    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
    */


    BankGetBankInformation.prototype.model = LoyaltyRtrSdk.models.Bank;

    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
    */


    BankGetBankInformation.prototype.apiEndpoint = '/api/v10/banks.json';

    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
    */


    BankGetBankInformation.prototype.extraParams = {
      scope: 'get_bank_information'
    };

    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
    */


    BankGetBankInformation.prototype.queryFields = [
      {
        fieldName: 'program_level_id',
        paramName: 'program_level_id'
      }
    ];

    return BankGetBankInformation;

  })(AP.collection.ScopeCollection);

  /**
  BankOfferAllis a scope collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.ScopeCollection` for more information about scopes.
  
  @module LoyaltyRtrSdk
  @submodule collections
  @class BankOfferAll
  @extends AP.collection.ScopeCollection
  */


  LoyaltyRtrSdk.collections.BankOfferAll = (function(_super) {
    __extends(BankOfferAll, _super);

    function BankOfferAll() {
      _ref43 = BankOfferAll.__super__.constructor.apply(this, arguments);
      return _ref43;
    }

    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
    */


    BankOfferAll.collectionId = '21592';

    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
    */


    BankOfferAll.prototype.model = LoyaltyRtrSdk.models.BankOffer;

    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
    */


    BankOfferAll.prototype.apiEndpoint = '/api/v10/bank_offers.json';

    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
    */


    BankOfferAll.prototype.extraParams = {
      scope: 'all'
    };

    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
    */


    BankOfferAll.prototype.queryFields = [];

    return BankOfferAll;

  })(AP.collection.ScopeCollection);

  null;

  /**
  BankOfferCountis an aggregate collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.AggregateCollection` to learn about about aggregates.
  @module LoyaltyRtrSdk
  @submodule collections
  @class BankOfferCount
  @extends AP.collection.AggregateCollection
  */


  LoyaltyRtrSdk.collections.BankOfferCount = (function(_super) {
    __extends(BankOfferCount, _super);

    function BankOfferCount() {
      _ref44 = BankOfferCount.__super__.constructor.apply(this, arguments);
      return _ref44;
    }

    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
    */


    BankOfferCount.collectionId = '21594';

    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
    */


    BankOfferCount.prototype.model = LoyaltyRtrSdk.models.BankOffer;

    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
    */


    BankOfferCount.prototype.apiEndpoint = '/api/v10/bank_offers.json';

    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
    */


    BankOfferCount.prototype.extraParams = {
      scope: 'count'
    };

    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
    */


    BankOfferCount.prototype.queryFields = [];

    return BankOfferCount;

  })(AP.collection.AggregateCollection);

  null;

  /**
  BankOfferCountExactMatchis an aggregate collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.AggregateCollection` to learn about about aggregates.
  @module LoyaltyRtrSdk
  @submodule collections
  @class BankOfferCountExactMatch
  @extends AP.collection.AggregateCollection
  */


  LoyaltyRtrSdk.collections.BankOfferCountExactMatch = (function(_super) {
    __extends(BankOfferCountExactMatch, _super);

    function BankOfferCountExactMatch() {
      _ref45 = BankOfferCountExactMatch.__super__.constructor.apply(this, arguments);
      return _ref45;
    }

    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
    */


    BankOfferCountExactMatch.collectionId = '21595';

    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
    */


    BankOfferCountExactMatch.prototype.model = LoyaltyRtrSdk.models.BankOffer;

    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
    */


    BankOfferCountExactMatch.prototype.apiEndpoint = '/api/v10/bank_offers.json';

    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
    */


    BankOfferCountExactMatch.prototype.extraParams = {
      scope: 'count_exact_match'
    };

    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
    */


    BankOfferCountExactMatch.prototype.queryFields = [];

    return BankOfferCountExactMatch;

  })(AP.collection.AggregateCollection);

  /**
  BankOfferExactMatchis a scope collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.ScopeCollection` for more information about scopes.
  
  @module LoyaltyRtrSdk
  @submodule collections
  @class BankOfferExactMatch
  @extends AP.collection.ScopeCollection
  */


  LoyaltyRtrSdk.collections.BankOfferExactMatch = (function(_super) {
    __extends(BankOfferExactMatch, _super);

    function BankOfferExactMatch() {
      _ref46 = BankOfferExactMatch.__super__.constructor.apply(this, arguments);
      return _ref46;
    }

    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
    */


    BankOfferExactMatch.collectionId = '21593';

    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
    */


    BankOfferExactMatch.prototype.model = LoyaltyRtrSdk.models.BankOffer;

    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
    */


    BankOfferExactMatch.prototype.apiEndpoint = '/api/v10/bank_offers.json';

    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
    */


    BankOfferExactMatch.prototype.extraParams = {
      scope: 'exact_match'
    };

    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
    */


    BankOfferExactMatch.prototype.queryFields = [];

    return BankOfferExactMatch;

  })(AP.collection.ScopeCollection);

  /**
  BankOfferReturnActiveBankOffersis a scope collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.ScopeCollection` for more information about scopes.
  
  @module LoyaltyRtrSdk
  @submodule collections
  @class BankOfferReturnActiveBankOffers
  @extends AP.collection.ScopeCollection
  */


  LoyaltyRtrSdk.collections.BankOfferReturnActiveBankOffers = (function(_super) {
    __extends(BankOfferReturnActiveBankOffers, _super);

    function BankOfferReturnActiveBankOffers() {
      _ref47 = BankOfferReturnActiveBankOffers.__super__.constructor.apply(this, arguments);
      return _ref47;
    }

    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
    */


    BankOfferReturnActiveBankOffers.collectionId = '21781';

    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
    */


    BankOfferReturnActiveBankOffers.prototype.model = LoyaltyRtrSdk.models.BankOffer;

    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
    */


    BankOfferReturnActiveBankOffers.prototype.apiEndpoint = '/api/v10/bank_offers.json';

    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
    */


    BankOfferReturnActiveBankOffers.prototype.extraParams = {
      scope: 'return_active_bank_offers'
    };

    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
    */


    BankOfferReturnActiveBankOffers.prototype.queryFields = [
      {
        fieldName: 'program_level_id',
        paramName: 'program_level_id'
      }, {
        fieldName: 'start_date',
        paramName: 'start_date'
      }
    ];

    return BankOfferReturnActiveBankOffers;

  })(AP.collection.ScopeCollection);

  /**
  BankRanacAllis a scope collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.ScopeCollection` for more information about scopes.
  
  @module LoyaltyRtrSdk
  @submodule collections
  @class BankRanacAll
  @extends AP.collection.ScopeCollection
  */


  LoyaltyRtrSdk.collections.BankRanacAll = (function(_super) {
    __extends(BankRanacAll, _super);

    function BankRanacAll() {
      _ref48 = BankRanacAll.__super__.constructor.apply(this, arguments);
      return _ref48;
    }

    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
    */


    BankRanacAll.collectionId = '21846';

    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
    */


    BankRanacAll.prototype.model = LoyaltyRtrSdk.models.BankRanac;

    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
    */


    BankRanacAll.prototype.apiEndpoint = '/api/v10/bank_ranacs.json';

    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
    */


    BankRanacAll.prototype.extraParams = {
      scope: 'all'
    };

    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
    */


    BankRanacAll.prototype.queryFields = [];

    return BankRanacAll;

  })(AP.collection.ScopeCollection);

  null;

  /**
  BankRanacCountis an aggregate collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.AggregateCollection` to learn about about aggregates.
  @module LoyaltyRtrSdk
  @submodule collections
  @class BankRanacCount
  @extends AP.collection.AggregateCollection
  */


  LoyaltyRtrSdk.collections.BankRanacCount = (function(_super) {
    __extends(BankRanacCount, _super);

    function BankRanacCount() {
      _ref49 = BankRanacCount.__super__.constructor.apply(this, arguments);
      return _ref49;
    }

    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
    */


    BankRanacCount.collectionId = '21848';

    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
    */


    BankRanacCount.prototype.model = LoyaltyRtrSdk.models.BankRanac;

    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
    */


    BankRanacCount.prototype.apiEndpoint = '/api/v10/bank_ranacs.json';

    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
    */


    BankRanacCount.prototype.extraParams = {
      scope: 'count'
    };

    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
    */


    BankRanacCount.prototype.queryFields = [];

    return BankRanacCount;

  })(AP.collection.AggregateCollection);

  null;

  /**
  BankRanacCountExactMatchis an aggregate collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.AggregateCollection` to learn about about aggregates.
  @module LoyaltyRtrSdk
  @submodule collections
  @class BankRanacCountExactMatch
  @extends AP.collection.AggregateCollection
  */


  LoyaltyRtrSdk.collections.BankRanacCountExactMatch = (function(_super) {
    __extends(BankRanacCountExactMatch, _super);

    function BankRanacCountExactMatch() {
      _ref50 = BankRanacCountExactMatch.__super__.constructor.apply(this, arguments);
      return _ref50;
    }

    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
    */


    BankRanacCountExactMatch.collectionId = '21849';

    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
    */


    BankRanacCountExactMatch.prototype.model = LoyaltyRtrSdk.models.BankRanac;

    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
    */


    BankRanacCountExactMatch.prototype.apiEndpoint = '/api/v10/bank_ranacs.json';

    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
    */


    BankRanacCountExactMatch.prototype.extraParams = {
      scope: 'count_exact_match'
    };

    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
    */


    BankRanacCountExactMatch.prototype.queryFields = [];

    return BankRanacCountExactMatch;

  })(AP.collection.AggregateCollection);

  /**
  BankRanacExactMatchis a scope collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.ScopeCollection` for more information about scopes.
  
  @module LoyaltyRtrSdk
  @submodule collections
  @class BankRanacExactMatch
  @extends AP.collection.ScopeCollection
  */


  LoyaltyRtrSdk.collections.BankRanacExactMatch = (function(_super) {
    __extends(BankRanacExactMatch, _super);

    function BankRanacExactMatch() {
      _ref51 = BankRanacExactMatch.__super__.constructor.apply(this, arguments);
      return _ref51;
    }

    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
    */


    BankRanacExactMatch.collectionId = '21847';

    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
    */


    BankRanacExactMatch.prototype.model = LoyaltyRtrSdk.models.BankRanac;

    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
    */


    BankRanacExactMatch.prototype.apiEndpoint = '/api/v10/bank_ranacs.json';

    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
    */


    BankRanacExactMatch.prototype.extraParams = {
      scope: 'exact_match'
    };

    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
    */


    BankRanacExactMatch.prototype.queryFields = [];

    return BankRanacExactMatch;

  })(AP.collection.ScopeCollection);

  /**
  BankShowParticipatingBankNamesis a scope collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.ScopeCollection` for more information about scopes.
  
  @module LoyaltyRtrSdk
  @submodule collections
  @class BankShowParticipatingBankNames
  @extends AP.collection.ScopeCollection
  */


  LoyaltyRtrSdk.collections.BankShowParticipatingBankNames = (function(_super) {
    __extends(BankShowParticipatingBankNames, _super);

    function BankShowParticipatingBankNames() {
      _ref52 = BankShowParticipatingBankNames.__super__.constructor.apply(this, arguments);
      return _ref52;
    }

    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
    */


    BankShowParticipatingBankNames.collectionId = '21851';

    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
    */


    BankShowParticipatingBankNames.prototype.model = LoyaltyRtrSdk.models.Bank;

    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
    */


    BankShowParticipatingBankNames.prototype.apiEndpoint = '/api/v10/banks.json';

    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
    */


    BankShowParticipatingBankNames.prototype.extraParams = {
      scope: 'show_participating_bank_names'
    };

    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
    */


    BankShowParticipatingBankNames.prototype.queryFields = [
      {
        fieldName: 'is_active',
        paramName: 'is_active'
      }
    ];

    return BankShowParticipatingBankNames;

  })(AP.collection.ScopeCollection);

  /**
  ColorSwatchAllis a scope collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.ScopeCollection` for more information about scopes.
  
  @module LoyaltyRtrSdk
  @submodule collections
  @class ColorSwatchAll
  @extends AP.collection.ScopeCollection
  */


  LoyaltyRtrSdk.collections.ColorSwatchAll = (function(_super) {
    __extends(ColorSwatchAll, _super);

    function ColorSwatchAll() {
      _ref53 = ColorSwatchAll.__super__.constructor.apply(this, arguments);
      return _ref53;
    }

    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
    */


    ColorSwatchAll.collectionId = '21637';

    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
    */


    ColorSwatchAll.prototype.model = LoyaltyRtrSdk.models.ColorSwatch;

    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
    */


    ColorSwatchAll.prototype.apiEndpoint = '/api/v10/color_swatches.json';

    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
    */


    ColorSwatchAll.prototype.extraParams = {
      scope: 'all'
    };

    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
    */


    ColorSwatchAll.prototype.queryFields = [];

    return ColorSwatchAll;

  })(AP.collection.ScopeCollection);

  null;

  /**
  ColorSwatchCountis an aggregate collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.AggregateCollection` to learn about about aggregates.
  @module LoyaltyRtrSdk
  @submodule collections
  @class ColorSwatchCount
  @extends AP.collection.AggregateCollection
  */


  LoyaltyRtrSdk.collections.ColorSwatchCount = (function(_super) {
    __extends(ColorSwatchCount, _super);

    function ColorSwatchCount() {
      _ref54 = ColorSwatchCount.__super__.constructor.apply(this, arguments);
      return _ref54;
    }

    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
    */


    ColorSwatchCount.collectionId = '21639';

    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
    */


    ColorSwatchCount.prototype.model = LoyaltyRtrSdk.models.ColorSwatch;

    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
    */


    ColorSwatchCount.prototype.apiEndpoint = '/api/v10/color_swatches.json';

    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
    */


    ColorSwatchCount.prototype.extraParams = {
      scope: 'count'
    };

    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
    */


    ColorSwatchCount.prototype.queryFields = [];

    return ColorSwatchCount;

  })(AP.collection.AggregateCollection);

  null;

  /**
  ColorSwatchCountExactMatchis an aggregate collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.AggregateCollection` to learn about about aggregates.
  @module LoyaltyRtrSdk
  @submodule collections
  @class ColorSwatchCountExactMatch
  @extends AP.collection.AggregateCollection
  */


  LoyaltyRtrSdk.collections.ColorSwatchCountExactMatch = (function(_super) {
    __extends(ColorSwatchCountExactMatch, _super);

    function ColorSwatchCountExactMatch() {
      _ref55 = ColorSwatchCountExactMatch.__super__.constructor.apply(this, arguments);
      return _ref55;
    }

    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
    */


    ColorSwatchCountExactMatch.collectionId = '21640';

    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
    */


    ColorSwatchCountExactMatch.prototype.model = LoyaltyRtrSdk.models.ColorSwatch;

    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
    */


    ColorSwatchCountExactMatch.prototype.apiEndpoint = '/api/v10/color_swatches.json';

    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
    */


    ColorSwatchCountExactMatch.prototype.extraParams = {
      scope: 'count_exact_match'
    };

    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
    */


    ColorSwatchCountExactMatch.prototype.queryFields = [];

    return ColorSwatchCountExactMatch;

  })(AP.collection.AggregateCollection);

  /**
  ColorSwatchExactMatchis a scope collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.ScopeCollection` for more information about scopes.
  
  @module LoyaltyRtrSdk
  @submodule collections
  @class ColorSwatchExactMatch
  @extends AP.collection.ScopeCollection
  */


  LoyaltyRtrSdk.collections.ColorSwatchExactMatch = (function(_super) {
    __extends(ColorSwatchExactMatch, _super);

    function ColorSwatchExactMatch() {
      _ref56 = ColorSwatchExactMatch.__super__.constructor.apply(this, arguments);
      return _ref56;
    }

    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
    */


    ColorSwatchExactMatch.collectionId = '21638';

    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
    */


    ColorSwatchExactMatch.prototype.model = LoyaltyRtrSdk.models.ColorSwatch;

    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
    */


    ColorSwatchExactMatch.prototype.apiEndpoint = '/api/v10/color_swatches.json';

    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
    */


    ColorSwatchExactMatch.prototype.extraParams = {
      scope: 'exact_match'
    };

    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
    */


    ColorSwatchExactMatch.prototype.queryFields = [];

    return ColorSwatchExactMatch;

  })(AP.collection.ScopeCollection);

  /**
  GetQuestionAllis a scope collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.ScopeCollection` for more information about scopes.
  
  @module LoyaltyRtrSdk
  @submodule collections
  @class GetQuestionAll
  @extends AP.collection.ScopeCollection
  */


  LoyaltyRtrSdk.collections.GetQuestionAll = (function(_super) {
    __extends(GetQuestionAll, _super);

    function GetQuestionAll() {
      _ref57 = GetQuestionAll.__super__.constructor.apply(this, arguments);
      return _ref57;
    }

    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
    */


    GetQuestionAll.collectionId = '21584';

    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
    */


    GetQuestionAll.prototype.model = LoyaltyRtrSdk.models.GetQuestion;

    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
    */


    GetQuestionAll.prototype.apiEndpoint = '/api/v10/get_questions.json';

    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
    */


    GetQuestionAll.prototype.extraParams = {
      scope: 'all'
    };

    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
    */


    GetQuestionAll.prototype.queryFields = [];

    return GetQuestionAll;

  })(AP.collection.ScopeCollection);

  null;

  /**
  GetQuestionCountis an aggregate collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.AggregateCollection` to learn about about aggregates.
  @module LoyaltyRtrSdk
  @submodule collections
  @class GetQuestionCount
  @extends AP.collection.AggregateCollection
  */


  LoyaltyRtrSdk.collections.GetQuestionCount = (function(_super) {
    __extends(GetQuestionCount, _super);

    function GetQuestionCount() {
      _ref58 = GetQuestionCount.__super__.constructor.apply(this, arguments);
      return _ref58;
    }

    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
    */


    GetQuestionCount.collectionId = '21586';

    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
    */


    GetQuestionCount.prototype.model = LoyaltyRtrSdk.models.GetQuestion;

    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
    */


    GetQuestionCount.prototype.apiEndpoint = '/api/v10/get_questions.json';

    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
    */


    GetQuestionCount.prototype.extraParams = {
      scope: 'count'
    };

    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
    */


    GetQuestionCount.prototype.queryFields = [];

    return GetQuestionCount;

  })(AP.collection.AggregateCollection);

  null;

  /**
  GetQuestionCountExactMatchis an aggregate collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.AggregateCollection` to learn about about aggregates.
  @module LoyaltyRtrSdk
  @submodule collections
  @class GetQuestionCountExactMatch
  @extends AP.collection.AggregateCollection
  */


  LoyaltyRtrSdk.collections.GetQuestionCountExactMatch = (function(_super) {
    __extends(GetQuestionCountExactMatch, _super);

    function GetQuestionCountExactMatch() {
      _ref59 = GetQuestionCountExactMatch.__super__.constructor.apply(this, arguments);
      return _ref59;
    }

    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
    */


    GetQuestionCountExactMatch.collectionId = '21587';

    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
    */


    GetQuestionCountExactMatch.prototype.model = LoyaltyRtrSdk.models.GetQuestion;

    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
    */


    GetQuestionCountExactMatch.prototype.apiEndpoint = '/api/v10/get_questions.json';

    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
    */


    GetQuestionCountExactMatch.prototype.extraParams = {
      scope: 'count_exact_match'
    };

    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
    */


    GetQuestionCountExactMatch.prototype.queryFields = [];

    return GetQuestionCountExactMatch;

  })(AP.collection.AggregateCollection);

  /**
  GetQuestionExactMatchis a scope collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.ScopeCollection` for more information about scopes.
  
  @module LoyaltyRtrSdk
  @submodule collections
  @class GetQuestionExactMatch
  @extends AP.collection.ScopeCollection
  */


  LoyaltyRtrSdk.collections.GetQuestionExactMatch = (function(_super) {
    __extends(GetQuestionExactMatch, _super);

    function GetQuestionExactMatch() {
      _ref60 = GetQuestionExactMatch.__super__.constructor.apply(this, arguments);
      return _ref60;
    }

    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
    */


    GetQuestionExactMatch.collectionId = '21585';

    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
    */


    GetQuestionExactMatch.prototype.model = LoyaltyRtrSdk.models.GetQuestion;

    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
    */


    GetQuestionExactMatch.prototype.apiEndpoint = '/api/v10/get_questions.json';

    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
    */


    GetQuestionExactMatch.prototype.extraParams = {
      scope: 'exact_match'
    };

    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
    */


    GetQuestionExactMatch.prototype.queryFields = [];

    return GetQuestionExactMatch;

  })(AP.collection.ScopeCollection);

  /**
  GetQuestionGetQuestionsByBanis a scope collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.ScopeCollection` for more information about scopes.
  
  @module LoyaltyRtrSdk
  @submodule collections
  @class GetQuestionGetQuestionsByBan
  @extends AP.collection.ScopeCollection
  */


  LoyaltyRtrSdk.collections.GetQuestionGetQuestionsByBan = (function(_super) {
    __extends(GetQuestionGetQuestionsByBan, _super);

    function GetQuestionGetQuestionsByBan() {
      _ref61 = GetQuestionGetQuestionsByBan.__super__.constructor.apply(this, arguments);
      return _ref61;
    }

    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
    */


    GetQuestionGetQuestionsByBan.collectionId = '21778';

    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
    */


    GetQuestionGetQuestionsByBan.prototype.model = LoyaltyRtrSdk.models.GetQuestion;

    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
    */


    GetQuestionGetQuestionsByBan.prototype.apiEndpoint = '/api/v10/get_questions.json';

    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
    */


    GetQuestionGetQuestionsByBan.prototype.extraParams = {
      scope: 'get_questions_by_ban'
    };

    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
    */


    GetQuestionGetQuestionsByBan.prototype.queryFields = [
      {
        fieldName: 'ban',
        paramName: 'ban'
      }
    ];

    return GetQuestionGetQuestionsByBan;

  })(AP.collection.ScopeCollection);

  /**
  LanguageCodeAllis a scope collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.ScopeCollection` for more information about scopes.
  
  @module LoyaltyRtrSdk
  @submodule collections
  @class LanguageCodeAll
  @extends AP.collection.ScopeCollection
  */


  LoyaltyRtrSdk.collections.LanguageCodeAll = (function(_super) {
    __extends(LanguageCodeAll, _super);

    function LanguageCodeAll() {
      _ref62 = LanguageCodeAll.__super__.constructor.apply(this, arguments);
      return _ref62;
    }

    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
    */


    LanguageCodeAll.collectionId = '21852';

    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
    */


    LanguageCodeAll.prototype.model = LoyaltyRtrSdk.models.LanguageCode;

    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
    */


    LanguageCodeAll.prototype.apiEndpoint = '/api/v10/language_codes.json';

    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
    */


    LanguageCodeAll.prototype.extraParams = {
      scope: 'all'
    };

    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
    */


    LanguageCodeAll.prototype.queryFields = [];

    return LanguageCodeAll;

  })(AP.collection.ScopeCollection);

  null;

  /**
  LanguageCodeCountis an aggregate collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.AggregateCollection` to learn about about aggregates.
  @module LoyaltyRtrSdk
  @submodule collections
  @class LanguageCodeCount
  @extends AP.collection.AggregateCollection
  */


  LoyaltyRtrSdk.collections.LanguageCodeCount = (function(_super) {
    __extends(LanguageCodeCount, _super);

    function LanguageCodeCount() {
      _ref63 = LanguageCodeCount.__super__.constructor.apply(this, arguments);
      return _ref63;
    }

    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
    */


    LanguageCodeCount.collectionId = '21854';

    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
    */


    LanguageCodeCount.prototype.model = LoyaltyRtrSdk.models.LanguageCode;

    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
    */


    LanguageCodeCount.prototype.apiEndpoint = '/api/v10/language_codes.json';

    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
    */


    LanguageCodeCount.prototype.extraParams = {
      scope: 'count'
    };

    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
    */


    LanguageCodeCount.prototype.queryFields = [];

    return LanguageCodeCount;

  })(AP.collection.AggregateCollection);

  null;

  /**
  LanguageCodeCountExactMatchis an aggregate collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.AggregateCollection` to learn about about aggregates.
  @module LoyaltyRtrSdk
  @submodule collections
  @class LanguageCodeCountExactMatch
  @extends AP.collection.AggregateCollection
  */


  LoyaltyRtrSdk.collections.LanguageCodeCountExactMatch = (function(_super) {
    __extends(LanguageCodeCountExactMatch, _super);

    function LanguageCodeCountExactMatch() {
      _ref64 = LanguageCodeCountExactMatch.__super__.constructor.apply(this, arguments);
      return _ref64;
    }

    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
    */


    LanguageCodeCountExactMatch.collectionId = '21855';

    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
    */


    LanguageCodeCountExactMatch.prototype.model = LoyaltyRtrSdk.models.LanguageCode;

    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
    */


    LanguageCodeCountExactMatch.prototype.apiEndpoint = '/api/v10/language_codes.json';

    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
    */


    LanguageCodeCountExactMatch.prototype.extraParams = {
      scope: 'count_exact_match'
    };

    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
    */


    LanguageCodeCountExactMatch.prototype.queryFields = [];

    return LanguageCodeCountExactMatch;

  })(AP.collection.AggregateCollection);

  /**
  LanguageCodeExactMatchis a scope collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.ScopeCollection` for more information about scopes.
  
  @module LoyaltyRtrSdk
  @submodule collections
  @class LanguageCodeExactMatch
  @extends AP.collection.ScopeCollection
  */


  LoyaltyRtrSdk.collections.LanguageCodeExactMatch = (function(_super) {
    __extends(LanguageCodeExactMatch, _super);

    function LanguageCodeExactMatch() {
      _ref65 = LanguageCodeExactMatch.__super__.constructor.apply(this, arguments);
      return _ref65;
    }

    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
    */


    LanguageCodeExactMatch.collectionId = '21853';

    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
    */


    LanguageCodeExactMatch.prototype.model = LoyaltyRtrSdk.models.LanguageCode;

    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
    */


    LanguageCodeExactMatch.prototype.apiEndpoint = '/api/v10/language_codes.json';

    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
    */


    LanguageCodeExactMatch.prototype.extraParams = {
      scope: 'exact_match'
    };

    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
    */


    LanguageCodeExactMatch.prototype.queryFields = [];

    return LanguageCodeExactMatch;

  })(AP.collection.ScopeCollection);

  /**
  LanguageStringAllis a scope collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.ScopeCollection` for more information about scopes.
  
  @module LoyaltyRtrSdk
  @submodule collections
  @class LanguageStringAll
  @extends AP.collection.ScopeCollection
  */


  LoyaltyRtrSdk.collections.LanguageStringAll = (function(_super) {
    __extends(LanguageStringAll, _super);

    function LanguageStringAll() {
      _ref66 = LanguageStringAll.__super__.constructor.apply(this, arguments);
      return _ref66;
    }

    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
    */


    LanguageStringAll.collectionId = '21604';

    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
    */


    LanguageStringAll.prototype.model = LoyaltyRtrSdk.models.LanguageString;

    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
    */


    LanguageStringAll.prototype.apiEndpoint = '/api/v10/language_strings.json';

    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
    */


    LanguageStringAll.prototype.extraParams = {
      scope: 'all'
    };

    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
    */


    LanguageStringAll.prototype.queryFields = [];

    return LanguageStringAll;

  })(AP.collection.ScopeCollection);

  null;

  /**
  LanguageStringCountis an aggregate collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.AggregateCollection` to learn about about aggregates.
  @module LoyaltyRtrSdk
  @submodule collections
  @class LanguageStringCount
  @extends AP.collection.AggregateCollection
  */


  LoyaltyRtrSdk.collections.LanguageStringCount = (function(_super) {
    __extends(LanguageStringCount, _super);

    function LanguageStringCount() {
      _ref67 = LanguageStringCount.__super__.constructor.apply(this, arguments);
      return _ref67;
    }

    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
    */


    LanguageStringCount.collectionId = '21606';

    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
    */


    LanguageStringCount.prototype.model = LoyaltyRtrSdk.models.LanguageString;

    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
    */


    LanguageStringCount.prototype.apiEndpoint = '/api/v10/language_strings.json';

    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
    */


    LanguageStringCount.prototype.extraParams = {
      scope: 'count'
    };

    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
    */


    LanguageStringCount.prototype.queryFields = [];

    return LanguageStringCount;

  })(AP.collection.AggregateCollection);

  null;

  /**
  LanguageStringCountExactMatchis an aggregate collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.AggregateCollection` to learn about about aggregates.
  @module LoyaltyRtrSdk
  @submodule collections
  @class LanguageStringCountExactMatch
  @extends AP.collection.AggregateCollection
  */


  LoyaltyRtrSdk.collections.LanguageStringCountExactMatch = (function(_super) {
    __extends(LanguageStringCountExactMatch, _super);

    function LanguageStringCountExactMatch() {
      _ref68 = LanguageStringCountExactMatch.__super__.constructor.apply(this, arguments);
      return _ref68;
    }

    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
    */


    LanguageStringCountExactMatch.collectionId = '21607';

    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
    */


    LanguageStringCountExactMatch.prototype.model = LoyaltyRtrSdk.models.LanguageString;

    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
    */


    LanguageStringCountExactMatch.prototype.apiEndpoint = '/api/v10/language_strings.json';

    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
    */


    LanguageStringCountExactMatch.prototype.extraParams = {
      scope: 'count_exact_match'
    };

    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
    */


    LanguageStringCountExactMatch.prototype.queryFields = [];

    return LanguageStringCountExactMatch;

  })(AP.collection.AggregateCollection);

  /**
  LanguageStringExactMatchis a scope collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.ScopeCollection` for more information about scopes.
  
  @module LoyaltyRtrSdk
  @submodule collections
  @class LanguageStringExactMatch
  @extends AP.collection.ScopeCollection
  */


  LoyaltyRtrSdk.collections.LanguageStringExactMatch = (function(_super) {
    __extends(LanguageStringExactMatch, _super);

    function LanguageStringExactMatch() {
      _ref69 = LanguageStringExactMatch.__super__.constructor.apply(this, arguments);
      return _ref69;
    }

    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
    */


    LanguageStringExactMatch.collectionId = '21605';

    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
    */


    LanguageStringExactMatch.prototype.model = LoyaltyRtrSdk.models.LanguageString;

    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
    */


    LanguageStringExactMatch.prototype.apiEndpoint = '/api/v10/language_strings.json';

    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
    */


    LanguageStringExactMatch.prototype.extraParams = {
      scope: 'exact_match'
    };

    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
    */


    LanguageStringExactMatch.prototype.queryFields = [];

    return LanguageStringExactMatch;

  })(AP.collection.ScopeCollection);

  /**
  LocalUserStorageAllis a scope collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.ScopeCollection` for more information about scopes.
  
  @module LoyaltyRtrSdk
  @submodule collections
  @class LocalUserStorageAll
  @extends AP.collection.ScopeCollection
  */


  LoyaltyRtrSdk.collections.LocalUserStorageAll = (function(_super) {
    __extends(LocalUserStorageAll, _super);

    function LocalUserStorageAll() {
      _ref70 = LocalUserStorageAll.__super__.constructor.apply(this, arguments);
      return _ref70;
    }

    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
    */


    LocalUserStorageAll.collectionId = '21793';

    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
    */


    LocalUserStorageAll.prototype.model = LoyaltyRtrSdk.models.LocalUserStorage;

    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
    */


    LocalUserStorageAll.prototype.apiEndpoint = '/api/v10/local_user_storages.json';

    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
    */


    LocalUserStorageAll.prototype.extraParams = {
      scope: 'all'
    };

    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
    */


    LocalUserStorageAll.prototype.queryFields = [];

    return LocalUserStorageAll;

  })(AP.collection.ScopeCollection);

  null;

  /**
  LocalUserStorageCountis an aggregate collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.AggregateCollection` to learn about about aggregates.
  @module LoyaltyRtrSdk
  @submodule collections
  @class LocalUserStorageCount
  @extends AP.collection.AggregateCollection
  */


  LoyaltyRtrSdk.collections.LocalUserStorageCount = (function(_super) {
    __extends(LocalUserStorageCount, _super);

    function LocalUserStorageCount() {
      _ref71 = LocalUserStorageCount.__super__.constructor.apply(this, arguments);
      return _ref71;
    }

    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
    */


    LocalUserStorageCount.collectionId = '21795';

    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
    */


    LocalUserStorageCount.prototype.model = LoyaltyRtrSdk.models.LocalUserStorage;

    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
    */


    LocalUserStorageCount.prototype.apiEndpoint = '/api/v10/local_user_storages.json';

    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
    */


    LocalUserStorageCount.prototype.extraParams = {
      scope: 'count'
    };

    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
    */


    LocalUserStorageCount.prototype.queryFields = [];

    return LocalUserStorageCount;

  })(AP.collection.AggregateCollection);

  null;

  /**
  LocalUserStorageCountExactMatchis an aggregate collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.AggregateCollection` to learn about about aggregates.
  @module LoyaltyRtrSdk
  @submodule collections
  @class LocalUserStorageCountExactMatch
  @extends AP.collection.AggregateCollection
  */


  LoyaltyRtrSdk.collections.LocalUserStorageCountExactMatch = (function(_super) {
    __extends(LocalUserStorageCountExactMatch, _super);

    function LocalUserStorageCountExactMatch() {
      _ref72 = LocalUserStorageCountExactMatch.__super__.constructor.apply(this, arguments);
      return _ref72;
    }

    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
    */


    LocalUserStorageCountExactMatch.collectionId = '21796';

    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
    */


    LocalUserStorageCountExactMatch.prototype.model = LoyaltyRtrSdk.models.LocalUserStorage;

    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
    */


    LocalUserStorageCountExactMatch.prototype.apiEndpoint = '/api/v10/local_user_storages.json';

    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
    */


    LocalUserStorageCountExactMatch.prototype.extraParams = {
      scope: 'count_exact_match'
    };

    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
    */


    LocalUserStorageCountExactMatch.prototype.queryFields = [];

    return LocalUserStorageCountExactMatch;

  })(AP.collection.AggregateCollection);

  /**
  LocalUserStorageExactMatchis a scope collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.ScopeCollection` for more information about scopes.
  
  @module LoyaltyRtrSdk
  @submodule collections
  @class LocalUserStorageExactMatch
  @extends AP.collection.ScopeCollection
  */


  LoyaltyRtrSdk.collections.LocalUserStorageExactMatch = (function(_super) {
    __extends(LocalUserStorageExactMatch, _super);

    function LocalUserStorageExactMatch() {
      _ref73 = LocalUserStorageExactMatch.__super__.constructor.apply(this, arguments);
      return _ref73;
    }

    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
    */


    LocalUserStorageExactMatch.collectionId = '21794';

    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
    */


    LocalUserStorageExactMatch.prototype.model = LoyaltyRtrSdk.models.LocalUserStorage;

    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
    */


    LocalUserStorageExactMatch.prototype.apiEndpoint = '/api/v10/local_user_storages.json';

    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
    */


    LocalUserStorageExactMatch.prototype.extraParams = {
      scope: 'exact_match'
    };

    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
    */


    LocalUserStorageExactMatch.prototype.queryFields = [];

    return LocalUserStorageExactMatch;

  })(AP.collection.ScopeCollection);

  /**
  MessageAllis a scope collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.ScopeCollection` for more information about scopes.
  
  @module LoyaltyRtrSdk
  @submodule collections
  @class MessageAll
  @extends AP.collection.ScopeCollection
  */


  LoyaltyRtrSdk.collections.MessageAll = (function(_super) {
    __extends(MessageAll, _super);

    function MessageAll() {
      _ref74 = MessageAll.__super__.constructor.apply(this, arguments);
      return _ref74;
    }

    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
    */


    MessageAll.collectionId = '21789';

    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
    */


    MessageAll.prototype.model = LoyaltyRtrSdk.models.Message;

    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
    */


    MessageAll.prototype.apiEndpoint = '/api/v10/messages.json';

    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
    */


    MessageAll.prototype.extraParams = {
      scope: 'all'
    };

    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
    */


    MessageAll.prototype.queryFields = [];

    return MessageAll;

  })(AP.collection.ScopeCollection);

  null;

  /**
  MessageCountis an aggregate collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.AggregateCollection` to learn about about aggregates.
  @module LoyaltyRtrSdk
  @submodule collections
  @class MessageCount
  @extends AP.collection.AggregateCollection
  */


  LoyaltyRtrSdk.collections.MessageCount = (function(_super) {
    __extends(MessageCount, _super);

    function MessageCount() {
      _ref75 = MessageCount.__super__.constructor.apply(this, arguments);
      return _ref75;
    }

    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
    */


    MessageCount.collectionId = '21791';

    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
    */


    MessageCount.prototype.model = LoyaltyRtrSdk.models.Message;

    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
    */


    MessageCount.prototype.apiEndpoint = '/api/v10/messages.json';

    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
    */


    MessageCount.prototype.extraParams = {
      scope: 'count'
    };

    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
    */


    MessageCount.prototype.queryFields = [];

    return MessageCount;

  })(AP.collection.AggregateCollection);

  null;

  /**
  MessageCountExactMatchis an aggregate collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.AggregateCollection` to learn about about aggregates.
  @module LoyaltyRtrSdk
  @submodule collections
  @class MessageCountExactMatch
  @extends AP.collection.AggregateCollection
  */


  LoyaltyRtrSdk.collections.MessageCountExactMatch = (function(_super) {
    __extends(MessageCountExactMatch, _super);

    function MessageCountExactMatch() {
      _ref76 = MessageCountExactMatch.__super__.constructor.apply(this, arguments);
      return _ref76;
    }

    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
    */


    MessageCountExactMatch.collectionId = '21792';

    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
    */


    MessageCountExactMatch.prototype.model = LoyaltyRtrSdk.models.Message;

    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
    */


    MessageCountExactMatch.prototype.apiEndpoint = '/api/v10/messages.json';

    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
    */


    MessageCountExactMatch.prototype.extraParams = {
      scope: 'count_exact_match'
    };

    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
    */


    MessageCountExactMatch.prototype.queryFields = [];

    return MessageCountExactMatch;

  })(AP.collection.AggregateCollection);

  /**
  MessageExactMatchis a scope collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.ScopeCollection` for more information about scopes.
  
  @module LoyaltyRtrSdk
  @submodule collections
  @class MessageExactMatch
  @extends AP.collection.ScopeCollection
  */


  LoyaltyRtrSdk.collections.MessageExactMatch = (function(_super) {
    __extends(MessageExactMatch, _super);

    function MessageExactMatch() {
      _ref77 = MessageExactMatch.__super__.constructor.apply(this, arguments);
      return _ref77;
    }

    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
    */


    MessageExactMatch.collectionId = '21790';

    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
    */


    MessageExactMatch.prototype.model = LoyaltyRtrSdk.models.Message;

    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
    */


    MessageExactMatch.prototype.apiEndpoint = '/api/v10/messages.json';

    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
    */


    MessageExactMatch.prototype.extraParams = {
      scope: 'exact_match'
    };

    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
    */


    MessageExactMatch.prototype.queryFields = [];

    return MessageExactMatch;

  })(AP.collection.ScopeCollection);

  /**
  MessageGetMyMessagesis a scope collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.ScopeCollection` for more information about scopes.
  
  @module LoyaltyRtrSdk
  @submodule collections
  @class MessageGetMyMessages
  @extends AP.collection.ScopeCollection
  */


  LoyaltyRtrSdk.collections.MessageGetMyMessages = (function(_super) {
    __extends(MessageGetMyMessages, _super);

    function MessageGetMyMessages() {
      _ref78 = MessageGetMyMessages.__super__.constructor.apply(this, arguments);
      return _ref78;
    }

    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
    */


    MessageGetMyMessages.collectionId = '21845';

    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
    */


    MessageGetMyMessages.prototype.model = LoyaltyRtrSdk.models.Message;

    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
    */


    MessageGetMyMessages.prototype.apiEndpoint = '/api/v10/messages.json';

    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
    */


    MessageGetMyMessages.prototype.extraParams = {
      scope: 'get_my_messages'
    };

    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
    */


    MessageGetMyMessages.prototype.queryFields = [
      {
        fieldName: 'ranac',
        paramName: 'ranac'
      }
    ];

    return MessageGetMyMessages;

  })(AP.collection.ScopeCollection);

  /**
  RtrAllis a scope collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.ScopeCollection` for more information about scopes.
  
  @module LoyaltyRtrSdk
  @submodule collections
  @class RtrAll
  @extends AP.collection.ScopeCollection
  */


  LoyaltyRtrSdk.collections.RtrAll = (function(_super) {
    __extends(RtrAll, _super);

    function RtrAll() {
      _ref79 = RtrAll.__super__.constructor.apply(this, arguments);
      return _ref79;
    }

    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
    */


    RtrAll.collectionId = '21596';

    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
    */


    RtrAll.prototype.model = LoyaltyRtrSdk.models.Rtr;

    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
    */


    RtrAll.prototype.apiEndpoint = '/api/v10/rtrs.json';

    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
    */


    RtrAll.prototype.extraParams = {
      scope: 'all'
    };

    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
    */


    RtrAll.prototype.queryFields = [];

    return RtrAll;

  })(AP.collection.ScopeCollection);

  null;

  /**
  RtrCountis an aggregate collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.AggregateCollection` to learn about about aggregates.
  @module LoyaltyRtrSdk
  @submodule collections
  @class RtrCount
  @extends AP.collection.AggregateCollection
  */


  LoyaltyRtrSdk.collections.RtrCount = (function(_super) {
    __extends(RtrCount, _super);

    function RtrCount() {
      _ref80 = RtrCount.__super__.constructor.apply(this, arguments);
      return _ref80;
    }

    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
    */


    RtrCount.collectionId = '21598';

    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
    */


    RtrCount.prototype.model = LoyaltyRtrSdk.models.Rtr;

    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
    */


    RtrCount.prototype.apiEndpoint = '/api/v10/rtrs.json';

    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
    */


    RtrCount.prototype.extraParams = {
      scope: 'count'
    };

    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
    */


    RtrCount.prototype.queryFields = [];

    return RtrCount;

  })(AP.collection.AggregateCollection);

  null;

  /**
  RtrCountExactMatchis an aggregate collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.AggregateCollection` to learn about about aggregates.
  @module LoyaltyRtrSdk
  @submodule collections
  @class RtrCountExactMatch
  @extends AP.collection.AggregateCollection
  */


  LoyaltyRtrSdk.collections.RtrCountExactMatch = (function(_super) {
    __extends(RtrCountExactMatch, _super);

    function RtrCountExactMatch() {
      _ref81 = RtrCountExactMatch.__super__.constructor.apply(this, arguments);
      return _ref81;
    }

    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
    */


    RtrCountExactMatch.collectionId = '21599';

    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
    */


    RtrCountExactMatch.prototype.model = LoyaltyRtrSdk.models.Rtr;

    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
    */


    RtrCountExactMatch.prototype.apiEndpoint = '/api/v10/rtrs.json';

    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
    */


    RtrCountExactMatch.prototype.extraParams = {
      scope: 'count_exact_match'
    };

    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
    */


    RtrCountExactMatch.prototype.queryFields = [];

    return RtrCountExactMatch;

  })(AP.collection.AggregateCollection);

  /**
  RtrExactMatchis a scope collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.ScopeCollection` for more information about scopes.
  
  @module LoyaltyRtrSdk
  @submodule collections
  @class RtrExactMatch
  @extends AP.collection.ScopeCollection
  */


  LoyaltyRtrSdk.collections.RtrExactMatch = (function(_super) {
    __extends(RtrExactMatch, _super);

    function RtrExactMatch() {
      _ref82 = RtrExactMatch.__super__.constructor.apply(this, arguments);
      return _ref82;
    }

    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
    */


    RtrExactMatch.collectionId = '21597';

    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
    */


    RtrExactMatch.prototype.model = LoyaltyRtrSdk.models.Rtr;

    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
    */


    RtrExactMatch.prototype.apiEndpoint = '/api/v10/rtrs.json';

    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
    */


    RtrExactMatch.prototype.extraParams = {
      scope: 'exact_match'
    };

    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
    */


    RtrExactMatch.prototype.queryFields = [];

    return RtrExactMatch;

  })(AP.collection.ScopeCollection);

  /**
  RtrGetMyRanacis a scope collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.ScopeCollection` for more information about scopes.
  
  @module LoyaltyRtrSdk
  @submodule collections
  @class RtrGetMyRanac
  @extends AP.collection.ScopeCollection
  */


  LoyaltyRtrSdk.collections.RtrGetMyRanac = (function(_super) {
    __extends(RtrGetMyRanac, _super);

    function RtrGetMyRanac() {
      _ref83 = RtrGetMyRanac.__super__.constructor.apply(this, arguments);
      return _ref83;
    }

    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
    */


    RtrGetMyRanac.collectionId = '21779';

    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
    */


    RtrGetMyRanac.prototype.model = LoyaltyRtrSdk.models.Rtr;

    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
    */


    RtrGetMyRanac.prototype.apiEndpoint = '/api/v10/rtrs.json';

    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
    */


    RtrGetMyRanac.prototype.extraParams = {
      scope: 'get_my_ranac'
    };

    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
    */


    RtrGetMyRanac.prototype.queryFields = [
      {
        fieldName: 'ranac',
        paramName: 'ranac'
      }
    ];

    return RtrGetMyRanac;

  })(AP.collection.ScopeCollection);

  /**
  UserAllis a scope collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.ScopeCollection` for more information about scopes.
  
  @module LoyaltyRtrSdk
  @submodule collections
  @class UserAll
  @extends AP.collection.ScopeCollection
  */


  LoyaltyRtrSdk.collections.UserAll = (function(_super) {
    __extends(UserAll, _super);

    function UserAll() {
      _ref84 = UserAll.__super__.constructor.apply(this, arguments);
      return _ref84;
    }

    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
    */


    UserAll.collectionId = '21608';

    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
    */


    UserAll.prototype.model = LoyaltyRtrSdk.models.User;

    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
    */


    UserAll.prototype.apiEndpoint = '/api/v10/users.json';

    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
    */


    UserAll.prototype.extraParams = {
      scope: 'all'
    };

    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
    */


    UserAll.prototype.queryFields = [];

    return UserAll;

  })(AP.collection.ScopeCollection);

  null;

  /**
  UserCountis an aggregate collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.AggregateCollection` to learn about about aggregates.
  @module LoyaltyRtrSdk
  @submodule collections
  @class UserCount
  @extends AP.collection.AggregateCollection
  */


  LoyaltyRtrSdk.collections.UserCount = (function(_super) {
    __extends(UserCount, _super);

    function UserCount() {
      _ref85 = UserCount.__super__.constructor.apply(this, arguments);
      return _ref85;
    }

    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
    */


    UserCount.collectionId = '21610';

    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
    */


    UserCount.prototype.model = LoyaltyRtrSdk.models.User;

    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
    */


    UserCount.prototype.apiEndpoint = '/api/v10/users.json';

    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
    */


    UserCount.prototype.extraParams = {
      scope: 'count'
    };

    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
    */


    UserCount.prototype.queryFields = [];

    return UserCount;

  })(AP.collection.AggregateCollection);

  null;

  /**
  UserCountExactMatchis an aggregate collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.AggregateCollection` to learn about about aggregates.
  @module LoyaltyRtrSdk
  @submodule collections
  @class UserCountExactMatch
  @extends AP.collection.AggregateCollection
  */


  LoyaltyRtrSdk.collections.UserCountExactMatch = (function(_super) {
    __extends(UserCountExactMatch, _super);

    function UserCountExactMatch() {
      _ref86 = UserCountExactMatch.__super__.constructor.apply(this, arguments);
      return _ref86;
    }

    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
    */


    UserCountExactMatch.collectionId = '21611';

    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
    */


    UserCountExactMatch.prototype.model = LoyaltyRtrSdk.models.User;

    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
    */


    UserCountExactMatch.prototype.apiEndpoint = '/api/v10/users.json';

    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
    */


    UserCountExactMatch.prototype.extraParams = {
      scope: 'count_exact_match'
    };

    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
    */


    UserCountExactMatch.prototype.queryFields = [];

    return UserCountExactMatch;

  })(AP.collection.AggregateCollection);

  /**
  UserExactMatchis a scope collection for application `LoyaltyRtrSdk`.  See
  `AP.collection.ScopeCollection` for more information about scopes.
  
  @module LoyaltyRtrSdk
  @submodule collections
  @class UserExactMatch
  @extends AP.collection.ScopeCollection
  */


  LoyaltyRtrSdk.collections.UserExactMatch = (function(_super) {
    __extends(UserExactMatch, _super);

    function UserExactMatch() {
      _ref87 = UserExactMatch.__super__.constructor.apply(this, arguments);
      return _ref87;
    }

    /**
    The collection ID may be used to look-up a collection from an
    application class.
    @property collectionId
    @type String
    @static
    */


    UserExactMatch.collectionId = '21609';

    /**
    The model associated with this collection.  Results returned by server
    requests for this collection are converted into instances of this model.
    @property model
    @type AP.model.Model
    */


    UserExactMatch.prototype.model = LoyaltyRtrSdk.models.User;

    /**
    Server requests for this collection use this URL.
    @property apiEndpoint
    @type String
    */


    UserExactMatch.prototype.apiEndpoint = '/api/v10/users.json';

    /**
    Name/value pairs included with every server request.  Extra parameters are
    converted to URL parameters at request-time.
    @property extraParams
    @type Object
    */


    UserExactMatch.prototype.extraParams = {
      scope: 'exact_match'
    };

    /**
    Array of query field configurations.  Query fields map model field names onto
    URL parameter names.  See `AP.collection.ScopeCollection` to learn more
    about query fields.
    @property queryFields
    @type Array
    */


    UserExactMatch.prototype.queryFields = [];

    return UserExactMatch;

  })(AP.collection.ScopeCollection);

  LoyaltyRtrSdk.ExampleCustomClass = (function() {
    ExampleCustomClass.prototype.message = null;

    function ExampleCustomClass() {
      this.message = 'This is a custom class.';
    }

    ExampleCustomClass.prototype.getMessage = function() {
      return this.message;
    };

    return ExampleCustomClass;

  })();

}).call(this);
