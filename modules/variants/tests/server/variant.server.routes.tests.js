'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Variant = mongoose.model('Variant'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  variant;

/**
 * Variant routes tests
 */
describe('Variant CRUD tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new Variant
    user.save(function () {
      variant = {
        name: 'Variant name'
      };

      done();
    });
  });

  it('should be able to save a Variant if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Variant
        agent.post('/api/variants')
          .send(variant)
          .expect(200)
          .end(function (variantSaveErr, variantSaveRes) {
            // Handle Variant save error
            if (variantSaveErr) {
              return done(variantSaveErr);
            }

            // Get a list of Variants
            agent.get('/api/variants')
              .end(function (variantsGetErr, variantsGetRes) {
                // Handle Variants save error
                if (variantsGetErr) {
                  return done(variantsGetErr);
                }

                // Get Variants list
                var variants = variantsGetRes.body;

                // Set assertions
                (variants[0].user._id).should.equal(userId);
                (variants[0].name).should.match('Variant name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Variant if not logged in', function (done) {
    agent.post('/api/variants')
      .send(variant)
      .expect(403)
      .end(function (variantSaveErr, variantSaveRes) {
        // Call the assertion callback
        done(variantSaveErr);
      });
  });

  it('should not be able to save an Variant if no name is provided', function (done) {
    // Invalidate name field
    variant.name = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Variant
        agent.post('/api/variants')
          .send(variant)
          .expect(400)
          .end(function (variantSaveErr, variantSaveRes) {
            // Set message assertion
            (variantSaveRes.body.message).should.match('Please fill Variant name');

            // Handle Variant save error
            done(variantSaveErr);
          });
      });
  });

  it('should be able to update an Variant if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Variant
        agent.post('/api/variants')
          .send(variant)
          .expect(200)
          .end(function (variantSaveErr, variantSaveRes) {
            // Handle Variant save error
            if (variantSaveErr) {
              return done(variantSaveErr);
            }

            // Update Variant name
            variant.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Variant
            agent.put('/api/variants/' + variantSaveRes.body._id)
              .send(variant)
              .expect(200)
              .end(function (variantUpdateErr, variantUpdateRes) {
                // Handle Variant update error
                if (variantUpdateErr) {
                  return done(variantUpdateErr);
                }

                // Set assertions
                (variantUpdateRes.body._id).should.equal(variantSaveRes.body._id);
                (variantUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Variants if not signed in', function (done) {
    // Create new Variant model instance
    var variantObj = new Variant(variant);

    // Save the variant
    variantObj.save(function () {
      // Request Variants
      request(app).get('/api/variants')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Variant if not signed in', function (done) {
    // Create new Variant model instance
    var variantObj = new Variant(variant);

    // Save the Variant
    variantObj.save(function () {
      request(app).get('/api/variants/' + variantObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', variant.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Variant with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/variants/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Variant is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Variant which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Variant
    request(app).get('/api/variants/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Variant with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Variant if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Variant
        agent.post('/api/variants')
          .send(variant)
          .expect(200)
          .end(function (variantSaveErr, variantSaveRes) {
            // Handle Variant save error
            if (variantSaveErr) {
              return done(variantSaveErr);
            }

            // Delete an existing Variant
            agent.delete('/api/variants/' + variantSaveRes.body._id)
              .send(variant)
              .expect(200)
              .end(function (variantDeleteErr, variantDeleteRes) {
                // Handle variant error error
                if (variantDeleteErr) {
                  return done(variantDeleteErr);
                }

                // Set assertions
                (variantDeleteRes.body._id).should.equal(variantSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Variant if not signed in', function (done) {
    // Set Variant user
    variant.user = user;

    // Create new Variant model instance
    var variantObj = new Variant(variant);

    // Save the Variant
    variantObj.save(function () {
      // Try deleting Variant
      request(app).delete('/api/variants/' + variantObj._id)
        .expect(403)
        .end(function (variantDeleteErr, variantDeleteRes) {
          // Set message assertion
          (variantDeleteRes.body.message).should.match('User is not authorized');

          // Handle Variant error error
          done(variantDeleteErr);
        });

    });
  });

  it('should be able to get a single Variant that has an orphaned user reference', function (done) {
    // Create orphan user creds
    var _creds = {
      username: 'orphan',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create orphan user
    var _orphan = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'orphan@test.com',
      username: _creds.username,
      password: _creds.password,
      provider: 'local'
    });

    _orphan.save(function (err, orphan) {
      // Handle save error
      if (err) {
        return done(err);
      }

      agent.post('/api/auth/signin')
        .send(_creds)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var orphanId = orphan._id;

          // Save a new Variant
          agent.post('/api/variants')
            .send(variant)
            .expect(200)
            .end(function (variantSaveErr, variantSaveRes) {
              // Handle Variant save error
              if (variantSaveErr) {
                return done(variantSaveErr);
              }

              // Set assertions on new Variant
              (variantSaveRes.body.name).should.equal(variant.name);
              should.exist(variantSaveRes.body.user);
              should.equal(variantSaveRes.body.user._id, orphanId);

              // force the Variant to have an orphaned user reference
              orphan.remove(function () {
                // now signin with valid user
                agent.post('/api/auth/signin')
                  .send(credentials)
                  .expect(200)
                  .end(function (err, res) {
                    // Handle signin error
                    if (err) {
                      return done(err);
                    }

                    // Get the Variant
                    agent.get('/api/variants/' + variantSaveRes.body._id)
                      .expect(200)
                      .end(function (variantInfoErr, variantInfoRes) {
                        // Handle Variant error
                        if (variantInfoErr) {
                          return done(variantInfoErr);
                        }

                        // Set assertions
                        (variantInfoRes.body._id).should.equal(variantSaveRes.body._id);
                        (variantInfoRes.body.name).should.equal(variant.name);
                        should.equal(variantInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Variant.remove().exec(done);
    });
  });
});
