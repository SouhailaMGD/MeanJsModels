'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Manufacturelinetype = mongoose.model('Manufacturelinetype');

/**
 * Globals
 */
var user,
  manufacturelinetype;

/**
 * Unit tests
 */
describe('Manufacturelinetype Model Unit Tests:', function() {
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
      manufacturelinetype = new Manufacturelinetype({
        name: 'Manufacturelinetype Name',
        user: user
      });

      done();
    });
  });

  describe('Method Save', function() {
    it('should be able to save without problems', function(done) {
      this.timeout(0);
      return manufacturelinetype.save(function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without name', function(done) {
      manufacturelinetype.name = '';

      return manufacturelinetype.save(function(err) {
        should.exist(err);
        done();
      });
    });
  });

  afterEach(function(done) {
    Manufacturelinetype.remove().exec(function() {
      User.remove().exec(function() {
        done();
      });
    });
  });
});
