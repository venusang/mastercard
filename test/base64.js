(function() {
  var assert;

  assert = chai.assert;

  describe('AP.utility.Base64', function() {
    describe('encode()', function() {
      return it('should return an base64-encoded string', function() {
        assert.notEqual('hello world', AP.utility.Base64.encode('hello world'));
        return assert.equal('aGVsbG8gd29ybGQ=', AP.utility.Base64.encode('hello world'));
      });
    });
    return describe('decode()', function() {
      return it('should return an base64-decoded string', function() {
        assert.notEqual('aGVsbG8gd29ybGQ=', AP.utility.Base64.decode('aGVsbG8gd29ybGQ='));
        return assert.equal('hello world', AP.utility.Base64.decode('aGVsbG8gd29ybGQ='));
      });
    });
  });

}).call(this);
