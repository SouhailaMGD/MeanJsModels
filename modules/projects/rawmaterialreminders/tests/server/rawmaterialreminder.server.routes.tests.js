'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Rawmaterialreminder = mongoose.model('Rawmaterialreminder'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  rawmaterialreminder;

/**
 * Rawmaterialreminder routes tests
 */
describe('Rawmaterialreminder CRUD tests', function () {

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

    // Save a user to the test db and create new Rawmaterialreminder
    user.save(function () {
      rawmaterialreminder = {
        name: 'Rawmaterialreminder name'
      };

      done();
    });
  });

  it('should be able to save a Rawmaterialreminder if logged in', function (done) {
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

        // Save a new Rawmaterialreminder
        agent.post('/api/rawmaterialreminders')
          .send(rawmaterialreminder)
          .expect(200)
          .end(function (rawmaterialreminderSaveErr, rawmaterialreminderSaveRes) {
            // Handle Rawmaterialreminder save error
            if (rawmaterialreminderSaveErr) {
              return done(rawmaterialreminderSaveErr);
            }

            // Get a list of Rawmaterialreminders
            agent.get('/api/rawmaterialreminders')
              .end(function (rawmaterialremindersGetErr, rawmaterialremindersGetRes) {
                // Handle Rawmaterialreminders save error
                if (rawmaterialremindersGetErr) {
                  return done(rawmaterialremindersGetErr);
                }

                // Get Rawmaterialreminders list
                var rawmaterialreminders = rawmaterialremindersGetRes.body;

                // Set assertions
                (rawmaterialreminders[0].user._id).should.equal(userId);
                (rawmaterialreminders[0].name).should.match('Rawmaterialreminder name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Rawmaterialreminder if not logged in', function (done) {
    agent.post('/api/rawmaterialreminders')
      .send(rawmaterialreminder)
      .expect(403)
      .end(function (rawmaterialreminderSaveErr, rawmaterialreminderSaveRes) {
        // Call the assertion callback
        done(rawmaterialreminderSaveErr);
      });
  });

  it('should not be able to save an Rawmaterialreminder if no name is provided', function (done) {
    // Invalidate name field
    rawmaterialreminder.name = '';

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

        // Save a new Rawmaterialreminder
        agent.post('/api/rawmaterialreminders')
          .send(rawmaterialreminder)
          .expect(400)
          .end(function (rawmaterialreminderSaveErr, rawmaterialreminderSaveRes) {
            // Set message assertion
            (rawmaterialreminderSaveRes.body.message).should.match('Please fill Rawmaterialreminder name');

            // Handle Rawmaterialreminder save error
            done(rawmaterialreminderSaveErr);
          });
      });
  });

  it('should be able to update an Rawmaterialreminder if signed in', function (done) {
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

        // Save a new Rawmaterialreminder
        agent.post('/api/rawmaterialreminders')
          .send(rawmaterialreminder)
          .expect(200)
          .end(function (rawmaterialreminderSaveErr, rawmaterialreminderSaveRes) {
            // Handle Rawmaterialreminder save error
            if (rawmaterialreminderSaveErr) {
              return done(rawmaterialreminderSaveErr);
            }

            // Update Rawmaterialreminder name
            rawmaterialreminder.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Rawmaterialreminder
            agent.put('/api/rawmaterialreminders/' + rawmaterialreminderSaveRes.body._id)
              .send(rawmaterialreminder)
              .expect(200)
              .end(function (rawmaterialreminderUpdateErr, rawmaterialreminderUpdateRes) {
                // Handle Rawmaterialreminder update error
                if (rawmaterialreminderUpdateErr) {
                  return done(rawmaterialreminderUpdateErr);
                }

                // Set assertions
                (rawmaterialreminderUpdateRes.body._id).should.equal(rawmaterialreminderSaveRes.body._id);
                (rawmaterialreminderUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Rawmaterialreminders if not signed in', function (done) {
    // Create new Rawmaterialreminder model instance
    var rawmaterialreminderObj = new Rawmaterialreminder(rawmaterialreminder);

    // Save the rawmaterialreminder
    rawmaterialreminderObj.save(function () {
      // Request Rawmaterialreminders
      request(app).get('/api/rawmaterialreminders')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Rawmaterialreminder if not signed in', function (done) {
    // Create new Rawmaterialreminder model instance
    var rawmaterialreminderObj = new Rawmaterialreminder(rawmaterialreminder);

    // Save the Rawmaterialreminder
    rawmaterialreminderObj.save(function () {
      request(app).get('/api/rawmaterialreminders/' + rawmaterialreminderObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', rawmaterialreminder.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Rawmaterialreminder with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/rawmaterialreminders/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Rawmaterialreminder is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Rawmaterialreminder which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Rawmaterialreminder
    request(app).get('/api/rawmaterialreminders/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Rawmaterialreminder with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Rawmaterialreminder if signed in', function (done) {
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

        // Save a new Rawmaterialreminder
        agent.post('/api/rawmaterialreminders')
          .send(rawmaterialreminder)
          .expect(200)
          .end(function (rawmaterialreminderSaveErr, rawmaterialreminderSaveRes) {
            // Handle Rawmaterialreminder save error
            if (rawmaterialreminderSaveErr) {
              return done(rawmaterialreminderSaveErr);
            }

            // Delete an existing Rawmaterialreminder
            agent.delete('/api/rawmaterialreminders/' + rawmaterialreminderSaveRes.body._id)
              .send(rawmaterialreminder)
              .expect(200)
              .end(function (rawmaterialreminderDeleteErr, rawmaterialreminderDeleteRes) {
                // Handle rawmaterialreminder error error
                if (rawmaterialreminderDeleteErr) {
                  return done(rawmaterialreminderDeleteErr);
                }

                // Set assertions
                (rawmaterialreminderDeleteRes.body._id).should.equal(rawmaterialreminderSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Rawmaterialreminder if not signed in', function (done) {
    // Set Rawmaterialreminder user
    rawmaterialreminder.user = user;

    // Create new Rawmaterialreminder model instance
    var rawmaterialreminderObj = new Rawmaterialreminder(rawmaterialreminder);

    // Save the Rawmaterialreminder
    rawmaterialreminderObj.save(function () {
      // Try deleting Rawmaterialreminder
      request(app).delete('/api/rawmaterialreminders/' + rawmaterialreminderObj._id)
        .expect(403)
        .end(function (rawmaterialreminderDeleteErr, rawmaterialreminderDeleteRes) {
          // Set message assertion
          (rawmaterialreminderDeleteRes.body.message).should.match('User is not authorized');

          // Handle Rawmaterialreminder error error
          done(rawmaterialreminderDeleteErr);
        });

    });
  });

  it('should be able to get a single Rawmaterialreminder that has an orphaned user reference', function (done) {
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

          // Save a new Rawmaterialreminder
          agent.post('/api/rawmaterialreminders')
            .send(rawmaterialreminder)
            .expect(200)
            .end(function (rawmaterialreminderSaveErr, rawmaterialreminderSaveRes) {
              // Handle Rawmaterialreminder save error
              if (rawmaterialreminderSaveErr) {
                return done(rawmaterialreminderSaveErr);
              }

              // Set assertions on new Rawmaterialreminder
              (rawmaterialreminderSaveRes.body.name).should.equal(rawmaterialreminder.name);
              should.exist(rawmaterialreminderSaveRes.body.user);
              should.equal(rawmaterialreminderSaveRes.body.user._id, orphanId);

              // force the Rawmaterialreminder to have an orphaned user reference
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

                    // Get the Rawmaterialreminder
                    agent.get('/api/rawmaterialreminders/' + rawmaterialreminderSaveRes.body._id)
                      .expect(200)
                      .end(function (rawmaterialreminderInfoErr, rawmaterialreminderInfoRes) {
                        // Handle Rawmaterialreminder error
                        if (rawmaterialreminderInfoErr) {
                          return done(rawmaterialreminderInfoErr);
                        }

                        // Set assertions
                        (rawmaterialreminderInfoRes.body._id).should.equal(rawmaterialreminderSaveRes.body._id);
                        (rawmaterialreminderInfoRes.body.name).should.equal(rawmaterialreminder.name);
                        should.equal(rawmaterialreminderInfoRes.body.user, undefined);

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
      Rawmaterialreminder.remove().exec(done);
    });
  });
});
