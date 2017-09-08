'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Customfield = mongoose.model('Customfield'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  customfield;

/**
 * Customfield routes tests
 */
describe('Customfield CRUD tests', function () {

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

    // Save a user to the test db and create new Customfield
    user.save(function () {
      customfield = {
        name: 'Customfield name'
      };

      done();
    });
  });

  it('should be able to save a Customfield if logged in', function (done) {
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

        // Save a new Customfield
        agent.post('/api/customfields')
          .send(customfield)
          .expect(200)
          .end(function (customfieldSaveErr, customfieldSaveRes) {
            // Handle Customfield save error
            if (customfieldSaveErr) {
              return done(customfieldSaveErr);
            }

            // Get a list of Customfields
            agent.get('/api/customfields')
              .end(function (customfieldsGetErr, customfieldsGetRes) {
                // Handle Customfields save error
                if (customfieldsGetErr) {
                  return done(customfieldsGetErr);
                }

                // Get Customfields list
                var customfields = customfieldsGetRes.body;

                // Set assertions
                (customfields[0].user._id).should.equal(userId);
                (customfields[0].name).should.match('Customfield name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Customfield if not logged in', function (done) {
    agent.post('/api/customfields')
      .send(customfield)
      .expect(403)
      .end(function (customfieldSaveErr, customfieldSaveRes) {
        // Call the assertion callback
        done(customfieldSaveErr);
      });
  });

  it('should not be able to save an Customfield if no name is provided', function (done) {
    // Invalidate name field
    customfield.name = '';

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

        // Save a new Customfield
        agent.post('/api/customfields')
          .send(customfield)
          .expect(400)
          .end(function (customfieldSaveErr, customfieldSaveRes) {
            // Set message assertion
            (customfieldSaveRes.body.message).should.match('Please fill Customfield name');

            // Handle Customfield save error
            done(customfieldSaveErr);
          });
      });
  });

  it('should be able to update an Customfield if signed in', function (done) {
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

        // Save a new Customfield
        agent.post('/api/customfields')
          .send(customfield)
          .expect(200)
          .end(function (customfieldSaveErr, customfieldSaveRes) {
            // Handle Customfield save error
            if (customfieldSaveErr) {
              return done(customfieldSaveErr);
            }

            // Update Customfield name
            customfield.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Customfield
            agent.put('/api/customfields/' + customfieldSaveRes.body._id)
              .send(customfield)
              .expect(200)
              .end(function (customfieldUpdateErr, customfieldUpdateRes) {
                // Handle Customfield update error
                if (customfieldUpdateErr) {
                  return done(customfieldUpdateErr);
                }

                // Set assertions
                (customfieldUpdateRes.body._id).should.equal(customfieldSaveRes.body._id);
                (customfieldUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Customfields if not signed in', function (done) {
    // Create new Customfield model instance
    var customfieldObj = new Customfield(customfield);

    // Save the customfield
    customfieldObj.save(function () {
      // Request Customfields
      request(app).get('/api/customfields')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Customfield if not signed in', function (done) {
    // Create new Customfield model instance
    var customfieldObj = new Customfield(customfield);

    // Save the Customfield
    customfieldObj.save(function () {
      request(app).get('/api/customfields/' + customfieldObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', customfield.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Customfield with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/customfields/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Customfield is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Customfield which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Customfield
    request(app).get('/api/customfields/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Customfield with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Customfield if signed in', function (done) {
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

        // Save a new Customfield
        agent.post('/api/customfields')
          .send(customfield)
          .expect(200)
          .end(function (customfieldSaveErr, customfieldSaveRes) {
            // Handle Customfield save error
            if (customfieldSaveErr) {
              return done(customfieldSaveErr);
            }

            // Delete an existing Customfield
            agent.delete('/api/customfields/' + customfieldSaveRes.body._id)
              .send(customfield)
              .expect(200)
              .end(function (customfieldDeleteErr, customfieldDeleteRes) {
                // Handle customfield error error
                if (customfieldDeleteErr) {
                  return done(customfieldDeleteErr);
                }

                // Set assertions
                (customfieldDeleteRes.body._id).should.equal(customfieldSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Customfield if not signed in', function (done) {
    // Set Customfield user
    customfield.user = user;

    // Create new Customfield model instance
    var customfieldObj = new Customfield(customfield);

    // Save the Customfield
    customfieldObj.save(function () {
      // Try deleting Customfield
      request(app).delete('/api/customfields/' + customfieldObj._id)
        .expect(403)
        .end(function (customfieldDeleteErr, customfieldDeleteRes) {
          // Set message assertion
          (customfieldDeleteRes.body.message).should.match('User is not authorized');

          // Handle Customfield error error
          done(customfieldDeleteErr);
        });

    });
  });

  it('should be able to get a single Customfield that has an orphaned user reference', function (done) {
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

          // Save a new Customfield
          agent.post('/api/customfields')
            .send(customfield)
            .expect(200)
            .end(function (customfieldSaveErr, customfieldSaveRes) {
              // Handle Customfield save error
              if (customfieldSaveErr) {
                return done(customfieldSaveErr);
              }

              // Set assertions on new Customfield
              (customfieldSaveRes.body.name).should.equal(customfield.name);
              should.exist(customfieldSaveRes.body.user);
              should.equal(customfieldSaveRes.body.user._id, orphanId);

              // force the Customfield to have an orphaned user reference
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

                    // Get the Customfield
                    agent.get('/api/customfields/' + customfieldSaveRes.body._id)
                      .expect(200)
                      .end(function (customfieldInfoErr, customfieldInfoRes) {
                        // Handle Customfield error
                        if (customfieldInfoErr) {
                          return done(customfieldInfoErr);
                        }

                        // Set assertions
                        (customfieldInfoRes.body._id).should.equal(customfieldSaveRes.body._id);
                        (customfieldInfoRes.body.name).should.equal(customfield.name);
                        should.equal(customfieldInfoRes.body.user, undefined);

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
      Customfield.remove().exec(done);
    });
  });
});
