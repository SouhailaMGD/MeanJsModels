'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Manufacturelinetype = mongoose.model('Manufacturelinetype'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  manufacturelinetype;

/**
 * Manufacturelinetype routes tests
 */
describe('Manufacturelinetype CRUD tests', function () {

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

    // Save a user to the test db and create new Manufacturelinetype
    user.save(function () {
      manufacturelinetype = {
        name: 'Manufacturelinetype name'
      };

      done();
    });
  });

  it('should be able to save a Manufacturelinetype if logged in', function (done) {
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

        // Save a new Manufacturelinetype
        agent.post('/api/manufacturelinetypes')
          .send(manufacturelinetype)
          .expect(200)
          .end(function (manufacturelinetypeSaveErr, manufacturelinetypeSaveRes) {
            // Handle Manufacturelinetype save error
            if (manufacturelinetypeSaveErr) {
              return done(manufacturelinetypeSaveErr);
            }

            // Get a list of Manufacturelinetypes
            agent.get('/api/manufacturelinetypes')
              .end(function (manufacturelinetypesGetErr, manufacturelinetypesGetRes) {
                // Handle Manufacturelinetypes save error
                if (manufacturelinetypesGetErr) {
                  return done(manufacturelinetypesGetErr);
                }

                // Get Manufacturelinetypes list
                var manufacturelinetypes = manufacturelinetypesGetRes.body;

                // Set assertions
                (manufacturelinetypes[0].user._id).should.equal(userId);
                (manufacturelinetypes[0].name).should.match('Manufacturelinetype name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Manufacturelinetype if not logged in', function (done) {
    agent.post('/api/manufacturelinetypes')
      .send(manufacturelinetype)
      .expect(403)
      .end(function (manufacturelinetypeSaveErr, manufacturelinetypeSaveRes) {
        // Call the assertion callback
        done(manufacturelinetypeSaveErr);
      });
  });

  it('should not be able to save an Manufacturelinetype if no name is provided', function (done) {
    // Invalidate name field
    manufacturelinetype.name = '';

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

        // Save a new Manufacturelinetype
        agent.post('/api/manufacturelinetypes')
          .send(manufacturelinetype)
          .expect(400)
          .end(function (manufacturelinetypeSaveErr, manufacturelinetypeSaveRes) {
            // Set message assertion
            (manufacturelinetypeSaveRes.body.message).should.match('Please fill Manufacturelinetype name');

            // Handle Manufacturelinetype save error
            done(manufacturelinetypeSaveErr);
          });
      });
  });

  it('should be able to update an Manufacturelinetype if signed in', function (done) {
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

        // Save a new Manufacturelinetype
        agent.post('/api/manufacturelinetypes')
          .send(manufacturelinetype)
          .expect(200)
          .end(function (manufacturelinetypeSaveErr, manufacturelinetypeSaveRes) {
            // Handle Manufacturelinetype save error
            if (manufacturelinetypeSaveErr) {
              return done(manufacturelinetypeSaveErr);
            }

            // Update Manufacturelinetype name
            manufacturelinetype.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Manufacturelinetype
            agent.put('/api/manufacturelinetypes/' + manufacturelinetypeSaveRes.body._id)
              .send(manufacturelinetype)
              .expect(200)
              .end(function (manufacturelinetypeUpdateErr, manufacturelinetypeUpdateRes) {
                // Handle Manufacturelinetype update error
                if (manufacturelinetypeUpdateErr) {
                  return done(manufacturelinetypeUpdateErr);
                }

                // Set assertions
                (manufacturelinetypeUpdateRes.body._id).should.equal(manufacturelinetypeSaveRes.body._id);
                (manufacturelinetypeUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Manufacturelinetypes if not signed in', function (done) {
    // Create new Manufacturelinetype model instance
    var manufacturelinetypeObj = new Manufacturelinetype(manufacturelinetype);

    // Save the manufacturelinetype
    manufacturelinetypeObj.save(function () {
      // Request Manufacturelinetypes
      request(app).get('/api/manufacturelinetypes')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Manufacturelinetype if not signed in', function (done) {
    // Create new Manufacturelinetype model instance
    var manufacturelinetypeObj = new Manufacturelinetype(manufacturelinetype);

    // Save the Manufacturelinetype
    manufacturelinetypeObj.save(function () {
      request(app).get('/api/manufacturelinetypes/' + manufacturelinetypeObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', manufacturelinetype.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Manufacturelinetype with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/manufacturelinetypes/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Manufacturelinetype is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Manufacturelinetype which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Manufacturelinetype
    request(app).get('/api/manufacturelinetypes/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Manufacturelinetype with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Manufacturelinetype if signed in', function (done) {
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

        // Save a new Manufacturelinetype
        agent.post('/api/manufacturelinetypes')
          .send(manufacturelinetype)
          .expect(200)
          .end(function (manufacturelinetypeSaveErr, manufacturelinetypeSaveRes) {
            // Handle Manufacturelinetype save error
            if (manufacturelinetypeSaveErr) {
              return done(manufacturelinetypeSaveErr);
            }

            // Delete an existing Manufacturelinetype
            agent.delete('/api/manufacturelinetypes/' + manufacturelinetypeSaveRes.body._id)
              .send(manufacturelinetype)
              .expect(200)
              .end(function (manufacturelinetypeDeleteErr, manufacturelinetypeDeleteRes) {
                // Handle manufacturelinetype error error
                if (manufacturelinetypeDeleteErr) {
                  return done(manufacturelinetypeDeleteErr);
                }

                // Set assertions
                (manufacturelinetypeDeleteRes.body._id).should.equal(manufacturelinetypeSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Manufacturelinetype if not signed in', function (done) {
    // Set Manufacturelinetype user
    manufacturelinetype.user = user;

    // Create new Manufacturelinetype model instance
    var manufacturelinetypeObj = new Manufacturelinetype(manufacturelinetype);

    // Save the Manufacturelinetype
    manufacturelinetypeObj.save(function () {
      // Try deleting Manufacturelinetype
      request(app).delete('/api/manufacturelinetypes/' + manufacturelinetypeObj._id)
        .expect(403)
        .end(function (manufacturelinetypeDeleteErr, manufacturelinetypeDeleteRes) {
          // Set message assertion
          (manufacturelinetypeDeleteRes.body.message).should.match('User is not authorized');

          // Handle Manufacturelinetype error error
          done(manufacturelinetypeDeleteErr);
        });

    });
  });

  it('should be able to get a single Manufacturelinetype that has an orphaned user reference', function (done) {
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

          // Save a new Manufacturelinetype
          agent.post('/api/manufacturelinetypes')
            .send(manufacturelinetype)
            .expect(200)
            .end(function (manufacturelinetypeSaveErr, manufacturelinetypeSaveRes) {
              // Handle Manufacturelinetype save error
              if (manufacturelinetypeSaveErr) {
                return done(manufacturelinetypeSaveErr);
              }

              // Set assertions on new Manufacturelinetype
              (manufacturelinetypeSaveRes.body.name).should.equal(manufacturelinetype.name);
              should.exist(manufacturelinetypeSaveRes.body.user);
              should.equal(manufacturelinetypeSaveRes.body.user._id, orphanId);

              // force the Manufacturelinetype to have an orphaned user reference
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

                    // Get the Manufacturelinetype
                    agent.get('/api/manufacturelinetypes/' + manufacturelinetypeSaveRes.body._id)
                      .expect(200)
                      .end(function (manufacturelinetypeInfoErr, manufacturelinetypeInfoRes) {
                        // Handle Manufacturelinetype error
                        if (manufacturelinetypeInfoErr) {
                          return done(manufacturelinetypeInfoErr);
                        }

                        // Set assertions
                        (manufacturelinetypeInfoRes.body._id).should.equal(manufacturelinetypeSaveRes.body._id);
                        (manufacturelinetypeInfoRes.body.name).should.equal(manufacturelinetype.name);
                        should.equal(manufacturelinetypeInfoRes.body.user, undefined);

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
      Manufacturelinetype.remove().exec(done);
    });
  });
});
