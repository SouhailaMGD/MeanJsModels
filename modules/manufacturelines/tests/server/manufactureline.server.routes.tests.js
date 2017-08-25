'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Manufactureline = mongoose.model('Manufactureline'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  manufactureline;

/**
 * Manufactureline routes tests
 */
describe('Manufactureline CRUD tests', function () {

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

    // Save a user to the test db and create new Manufactureline
    user.save(function () {
      manufactureline = {
        name: 'Manufactureline name'
      };

      done();
    });
  });

  it('should be able to save a Manufactureline if logged in', function (done) {
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

        // Save a new Manufactureline
        agent.post('/api/manufacturelines')
          .send(manufactureline)
          .expect(200)
          .end(function (manufacturelineSaveErr, manufacturelineSaveRes) {
            // Handle Manufactureline save error
            if (manufacturelineSaveErr) {
              return done(manufacturelineSaveErr);
            }

            // Get a list of Manufacturelines
            agent.get('/api/manufacturelines')
              .end(function (manufacturelinesGetErr, manufacturelinesGetRes) {
                // Handle Manufacturelines save error
                if (manufacturelinesGetErr) {
                  return done(manufacturelinesGetErr);
                }

                // Get Manufacturelines list
                var manufacturelines = manufacturelinesGetRes.body;

                // Set assertions
                (manufacturelines[0].user._id).should.equal(userId);
                (manufacturelines[0].name).should.match('Manufactureline name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Manufactureline if not logged in', function (done) {
    agent.post('/api/manufacturelines')
      .send(manufactureline)
      .expect(403)
      .end(function (manufacturelineSaveErr, manufacturelineSaveRes) {
        // Call the assertion callback
        done(manufacturelineSaveErr);
      });
  });

  it('should not be able to save an Manufactureline if no name is provided', function (done) {
    // Invalidate name field
    manufactureline.name = '';

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

        // Save a new Manufactureline
        agent.post('/api/manufacturelines')
          .send(manufactureline)
          .expect(400)
          .end(function (manufacturelineSaveErr, manufacturelineSaveRes) {
            // Set message assertion
            (manufacturelineSaveRes.body.message).should.match('Please fill Manufactureline name');

            // Handle Manufactureline save error
            done(manufacturelineSaveErr);
          });
      });
  });

  it('should be able to update an Manufactureline if signed in', function (done) {
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

        // Save a new Manufactureline
        agent.post('/api/manufacturelines')
          .send(manufactureline)
          .expect(200)
          .end(function (manufacturelineSaveErr, manufacturelineSaveRes) {
            // Handle Manufactureline save error
            if (manufacturelineSaveErr) {
              return done(manufacturelineSaveErr);
            }

            // Update Manufactureline name
            manufactureline.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Manufactureline
            agent.put('/api/manufacturelines/' + manufacturelineSaveRes.body._id)
              .send(manufactureline)
              .expect(200)
              .end(function (manufacturelineUpdateErr, manufacturelineUpdateRes) {
                // Handle Manufactureline update error
                if (manufacturelineUpdateErr) {
                  return done(manufacturelineUpdateErr);
                }

                // Set assertions
                (manufacturelineUpdateRes.body._id).should.equal(manufacturelineSaveRes.body._id);
                (manufacturelineUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Manufacturelines if not signed in', function (done) {
    // Create new Manufactureline model instance
    var manufacturelineObj = new Manufactureline(manufactureline);

    // Save the manufactureline
    manufacturelineObj.save(function () {
      // Request Manufacturelines
      request(app).get('/api/manufacturelines')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Manufactureline if not signed in', function (done) {
    // Create new Manufactureline model instance
    var manufacturelineObj = new Manufactureline(manufactureline);

    // Save the Manufactureline
    manufacturelineObj.save(function () {
      request(app).get('/api/manufacturelines/' + manufacturelineObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', manufactureline.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Manufactureline with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/manufacturelines/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Manufactureline is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Manufactureline which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Manufactureline
    request(app).get('/api/manufacturelines/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Manufactureline with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Manufactureline if signed in', function (done) {
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

        // Save a new Manufactureline
        agent.post('/api/manufacturelines')
          .send(manufactureline)
          .expect(200)
          .end(function (manufacturelineSaveErr, manufacturelineSaveRes) {
            // Handle Manufactureline save error
            if (manufacturelineSaveErr) {
              return done(manufacturelineSaveErr);
            }

            // Delete an existing Manufactureline
            agent.delete('/api/manufacturelines/' + manufacturelineSaveRes.body._id)
              .send(manufactureline)
              .expect(200)
              .end(function (manufacturelineDeleteErr, manufacturelineDeleteRes) {
                // Handle manufactureline error error
                if (manufacturelineDeleteErr) {
                  return done(manufacturelineDeleteErr);
                }

                // Set assertions
                (manufacturelineDeleteRes.body._id).should.equal(manufacturelineSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Manufactureline if not signed in', function (done) {
    // Set Manufactureline user
    manufactureline.user = user;

    // Create new Manufactureline model instance
    var manufacturelineObj = new Manufactureline(manufactureline);

    // Save the Manufactureline
    manufacturelineObj.save(function () {
      // Try deleting Manufactureline
      request(app).delete('/api/manufacturelines/' + manufacturelineObj._id)
        .expect(403)
        .end(function (manufacturelineDeleteErr, manufacturelineDeleteRes) {
          // Set message assertion
          (manufacturelineDeleteRes.body.message).should.match('User is not authorized');

          // Handle Manufactureline error error
          done(manufacturelineDeleteErr);
        });

    });
  });

  it('should be able to get a single Manufactureline that has an orphaned user reference', function (done) {
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

          // Save a new Manufactureline
          agent.post('/api/manufacturelines')
            .send(manufactureline)
            .expect(200)
            .end(function (manufacturelineSaveErr, manufacturelineSaveRes) {
              // Handle Manufactureline save error
              if (manufacturelineSaveErr) {
                return done(manufacturelineSaveErr);
              }

              // Set assertions on new Manufactureline
              (manufacturelineSaveRes.body.name).should.equal(manufactureline.name);
              should.exist(manufacturelineSaveRes.body.user);
              should.equal(manufacturelineSaveRes.body.user._id, orphanId);

              // force the Manufactureline to have an orphaned user reference
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

                    // Get the Manufactureline
                    agent.get('/api/manufacturelines/' + manufacturelineSaveRes.body._id)
                      .expect(200)
                      .end(function (manufacturelineInfoErr, manufacturelineInfoRes) {
                        // Handle Manufactureline error
                        if (manufacturelineInfoErr) {
                          return done(manufacturelineInfoErr);
                        }

                        // Set assertions
                        (manufacturelineInfoRes.body._id).should.equal(manufacturelineSaveRes.body._id);
                        (manufacturelineInfoRes.body.name).should.equal(manufactureline.name);
                        should.equal(manufacturelineInfoRes.body.user, undefined);

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
      Manufactureline.remove().exec(done);
    });
  });
});
