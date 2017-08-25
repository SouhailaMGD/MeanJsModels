'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Manufacturing = mongoose.model('Manufacturing');

/**
 * Globals
 */
var user,
  manufacturing;

/**
 * Unit tests
 */
describe('Manufacturing Model Unit Tests:', function() {
  beforeEach(function(done) {
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: 'username',
      password: 'password'
    });

    user.save(function() {
      manufacturing = new Manufacturing({
        name: 'Manufacturing Name',
        user: user
      });

      done();
    });
  });

  describe('Method Save', function() {
    it('should be able to save without problems', function(done) {
      this.timeout(0);
      return manufacturing.save(function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without name', function(done) {
      manufacturing.name = '';

      return manufacturing.save(function(err) {
        should.exist(err);
        done();
      });
    });
  });

  afterEach(function(done) {
    Manufacturing.remove().exec(function() {
      User.remove().exec(function() {
        done();
      });
    });
  });
});
