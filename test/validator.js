(function() {
  var assert;

  assert = chai.assert;

  describe('AP.utility.Validator', function() {
    var data, validations, validator;
    validator = null;
    data = {
      name: 'John Doe',
      age: 36,
      hasDog: true,
      netWorth: -1.50,
      amount: '1.5'
    };
    validations = [
      {
        field: 'name',
        validate: 'required'
      }, {
        field: 'name',
        validate: 'type',
        is: 'string'
      }, {
        field: 'age',
        validate: 'type',
        is: 'integer'
      }, {
        field: 'age',
        validate: 'numericality'
      }, {
        field: 'hasDog',
        validate: 'type',
        is: 'boolean'
      }, {
        field: 'netWorth',
        validate: 'type',
        is: 'float'
      }, {
        field: 'netWorth',
        validate: 'numericality'
      }, {
        field: 'amount',
        validate: 'numericality'
      }
    ];
    beforeEach(function() {
      return validator = new AP.utility.Validator(data, validations);
    });
    describe('constructor()', function() {
      return it('should accept data and validations', function() {
        assert.deepEqual(data, validator.data);
        return assert.deepEqual(validations, validator.validations);
      });
    });
    describe('isValid()', function() {
      it('should return true for valid data', function() {
        validator.validate();
        return assert.isTrue(validator.isValid());
      });
      return it('should return false for invalid data', function() {
        validator.data = {
          hasDog: false
        };
        validator.validate();
        return assert.isFalse(validator.isValid());
      });
    });
    describe('validate()', function() {
      it('should return the value of isValid() if validate is called first', function() {
        assert.equal(validator.validate(), validator.isValid());
        validator.data = {
          hasDog: false
        };
        return assert.equal(validator.validate(), validator.isValid());
      });
      return it('should run sepcified validations', function() {
        var calledRequiredValidation, calledTypeValidation;
        calledRequiredValidation = false;
        calledTypeValidation = false;
        validator.required = function() {
          return calledRequiredValidation = true;
        };
        validator.type = function() {
          return calledTypeValidation = true;
        };
        validator.validate();
        assert.isTrue(calledRequiredValidation);
        return assert.isTrue(calledTypeValidation);
      });
    });
    describe('addError()', function() {
      return it('should add errors to the errors array', function() {
        assert.lengthOf(validator.errors(), 0);
        validator.addError('name', 'required');
        return assert.lengthOf(validator.errors(), 1);
      });
    });
    describe('errors()', function() {
      return it('should be an array of 0 or more length', function() {
        validator.validate();
        assert.isArray(validator.errors());
        assert.lengthOf(validator.errors(), 0);
        validator.data = {
          hasDog: false
        };
        validator.validate();
        assert.isArray(validator.errors());
        return assert.lengthOf(validator.errors(), 1);
      });
    });
    describe('required()', function() {
      return it('should validate the presence of a field', function() {
        assert.lengthOf(validator.errors(), 0);
        validator.required('hello world', {
          field: 'title'
        });
        assert.lengthOf(validator.errors(), 0);
        validator.required(void 0, {
          field: 'title'
        });
        assert.lengthOf(validator.errors(), 1);
        validator.required('', {
          field: 'title'
        });
        return assert.lengthOf(validator.errors(), 1);
      });
    });
    describe('numericality()', function() {
      return it('should validate the numericality of a field of both string and number types', function() {
        assert.lengthOf(validator.errors(), 0);
        validator.numericality('-1.693', {
          field: 'amount'
        });
        assert.lengthOf(validator.errors(), 0);
        validator.numericality('+3057.693', {
          field: 'amount'
        });
        assert.lengthOf(validator.errors(), 0);
        validator.numericality('500', {
          field: 'amount'
        });
        assert.lengthOf(validator.errors(), 0);
        validator.numericality(-1.693, {
          field: 'amount'
        });
        assert.lengthOf(validator.errors(), 0);
        validator.numericality(3057.693, {
          field: 'amount'
        });
        assert.lengthOf(validator.errors(), 0);
        validator.numericality(500, {
          field: 'amount'
        });
        assert.lengthOf(validator.errors(), 0);
        validator.numericality('hello world', {
          field: 'amount'
        });
        return assert.lengthOf(validator.errors(), 1);
      });
    });
    describe('type()', function() {
      return it('should validate the type of a field', function() {
        assert.lengthOf(validator.errors(), 0);
        validator.type('hello world', {
          is: 'string',
          field: 'title'
        });
        assert.lengthOf(validator.errors(), 0);
        validator.type('hello world', {
          is: 'number',
          field: 'title'
        });
        assert.lengthOf(validator.errors(), 1);
        validator.type(1, {
          is: 'number',
          field: 'title'
        });
        return assert.lengthOf(validator.errors(), 1);
      });
    });
    describe('booleanType()', function() {
      return it('should validate that the type of a field is boolean', function() {
        assert.lengthOf(validator.errors(), 0);
        validator.type(true, {
          is: 'boolean',
          field: 'title'
        });
        assert.lengthOf(validator.errors(), 0);
        validator.type('hello world', {
          is: 'boolean',
          field: 'title'
        });
        return assert.lengthOf(validator.errors(), 1);
      });
    });
    describe('stringType()', function() {
      return it('should validate that the type of a field is string', function() {
        assert.lengthOf(validator.errors(), 0);
        validator.type('hello world', {
          is: 'string',
          field: 'title'
        });
        assert.lengthOf(validator.errors(), 0);
        validator.type(true, {
          is: 'string',
          field: 'title'
        });
        return assert.lengthOf(validator.errors(), 1);
      });
    });
    describe('numberType()', function() {
      return it('should validate that the type of a field is number', function() {
        assert.lengthOf(validator.errors(), 0);
        validator.type(1, {
          is: 'number',
          field: 'title'
        });
        validator.type(1.5, {
          is: 'number',
          field: 'title'
        });
        assert.lengthOf(validator.errors(), 0);
        validator.type('hello world', {
          is: 'number',
          field: 'title'
        });
        return assert.lengthOf(validator.errors(), 1);
      });
    });
    describe('floatType()', function() {
      return it('should validate that the type of a field is number', function() {
        assert.lengthOf(validator.errors(), 0);
        validator.type(1, {
          is: 'float',
          field: 'title'
        });
        validator.type(1.5, {
          is: 'float',
          field: 'title'
        });
        assert.lengthOf(validator.errors(), 0);
        validator.type('hello world', {
          is: 'float',
          field: 'title'
        });
        return assert.lengthOf(validator.errors(), 1);
      });
    });
    describe('integerField()', function() {
      return it('should validate that the type of a field is number and integer', function() {
        assert.lengthOf(validator.errors(), 0);
        validator.type(1, {
          is: 'integer',
          field: 'title'
        });
        assert.lengthOf(validator.errors(), 0);
        validator.type(1.5, {
          is: 'integer',
          field: 'title'
        });
        validator.type('hello world', {
          is: 'integer',
          field: 'title'
        });
        return assert.lengthOf(validator.errors(), 2);
      });
    });
    describe('dateType()', function() {
      return it('should validate that the type of a field is date (with time 00:00:00)');
    });
    return describe('timeType()', function() {
      return it('should validate that the type of a field is date');
    });
  });

}).call(this);
