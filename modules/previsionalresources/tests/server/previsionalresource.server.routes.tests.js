'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Previsionalresource = mongoose.model('Previsionalresource'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  previsionalresource;

/**
 * Previsionalresource routes tests
 */
describe('Previsionalresource CRUD tests', function () {

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

    // Save a user to the test db and create new Previsionalresource
    user.save(function () {
      previsionalresource = {
        name: 'Previsionalresource name'
      };

      done();
    });
  });

  it('should be able to save a Previsionalresource if logged in', function (done) {
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

        // Save a new Previsionalresource
        agent.post('/api/previsionalresources')
          .send(previsionalresource)
          .expect(200)
          .end(function (previsionalresourceSaveErr, previsionalresourceSaveRes) {
            // Handle Previsionalresource save error
            if (previsionalresourceSaveErr) {
              return done(previsionalresourceSaveErr);
            }

            // Get a list of Previsionalresources
            agent.get('/api/previsionalresources')
              .end(function (previsionalresourcesGetErr, previsionalresourcesGetRes) {
                // Handle Previsionalresources save error
                if (previsionalresourcesGetErr) {
                  return done(previsionalresourcesGetErr);
                }

                // Get Previsionalresources list
                var previsionalresources = previsionalresourcesGetRes.body;

                // Set assertions
                (previsionalresources[0].user._id).should.equal(userId);
                (previsionalresources[0].name).should.match('Previsionalresource name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Previsionalresource if not logged in', function (done) {
    agent.post('/api/previsionalresources')
      .send(previsionalresource)
      .expect(403)
      .end(function (previsionalresourceSaveErr, previsionalresourceSaveRes) {
        // Call the assertion callback
        done(previsionalresourceSaveErr);
      });
  });

  it('should not be able to save an Previsionalresource if no name is provided', function (done) {
    // Invalidate name field
    previsionalresource.name = '';

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

        // Save a new Previsionalresource
        agent.post('/api/previsionalresources')
          .send(previsionalresource)
          .expect(400)
          .end(function (previsionalresourceSaveErr, previsionalresourceSaveRes) {
            // Set message assertion
            (previsionalresourceSaveRes.body.message).should.match('Please fill Previsionalresource name');

            // Handle Previsionalresource save error
            done(previsionalresourceSaveErr);
          });
      });
  });

  it('should be able to update an Previsionalresource if signed in', function (done) {
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

        // Save a new Previsionalresource
        agent.post('/api/previsionalresources')
          .send(previsionalresource)
          .expect(200)
          .end(function (previsionalresourceSaveErr, previsionalresourceSaveRes) {
            // Handle Previsionalresource save error
            if (previsionalresourceSaveErr) {
              return done(previsionalresourceSaveErr);
            }

            // Update Previsionalresource name
            previsionalresource.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Previsionalresource
            agent.put('/api/previsionalresources/' + previsionalresourceSaveRes.body._id)
              .send(previsionalresource)
              .expect(200)
              .end(function (previsionalresourceUpdateErr, previsionalresourceUpdateRes) {
                // Handle Previsionalresource update error
                if (previsionalresourceUpdateErr) {
                  return done(previsionalresourceUpdateErr);
                }

                // Set assertions
                (previsionalresourceUpdateRes.body._id).should.equal(previsionalresourceSaveRes.body._id);
                (previsionalresourceUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Previsionalresources if not signed in', function (done) {
    // Create new Previsionalresource model instance
    var previsionalresourceObj = new Previsionalresource(previsionalresource);

    // Save the previsionalresource
    previsionalresourceObj.save(function () {
      // Request Previsionalresources
      request(app).get('/api/previsionalresources')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Previsionalresource if not signed in', function (done) {
    // Create new Previsionalresource model instance
    var previsionalresourceObj = new Previsionalresource(previsionalresource);

    // Save the Previsionalresource
    previsionalresourceObj.save(function () {
      request(app).get('/api/previsionalresources/' + previsionalresourceObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', previsionalresource.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Previsionalresource with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/previsionalresources/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Previsionalresource is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Previsionalresource which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Previsionalresource
    request(app).get('/api/previsionalresources/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Previsionalresource with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Previsionalresource if signed in', function (done) {
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

        // Save a new Previsionalresource
        agent.post('/api/previsionalresources')
          .send(previsionalresource)
          .expect(200)
          .end(function (previsionalresourceSaveErr, previsionalresourceSaveRes) {
            // Handle Previsionalresource save error
            if (previsionalresourceSaveErr) {
              return done(previsionalresourceSaveErr);
            }

            // Delete an existing Previsionalresource
            agent.delete('/api/previsionalresources/' + previsionalresourceSaveRes.body._id)
              .send(previsionalresource)
              .expect(200)
              .end(function (previsionalresourceDeleteErr, previsionalresourceDeleteRes) {
                // Handle previsionalresource error error
                if (previsionalresourceDeleteErr) {
                  return done(previsionalresourceDeleteErr);
                }

                // Set assertions
                (previsionalresourceDeleteRes.body._id).should.equal(previsionalresourceSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Previsionalresource if not signed in', function (done) {
    // Set Previsionalresource user
    previsionalresource.user = user;

    // Create new Previsionalresource model instance
    var previsionalresourceObj = new Previsionalresource(previsionalresource);

    // Save the Previsionalresource
    previsionalresourceObj.save(function () {
      // Try deleting Previsionalresource
      request(app).delete('/api/previsionalresources/' + previsionalresourceObj._id)
        .expect(403)
        .end(function (previsionalresourceDeleteErr, previsionalresourceDeleteRes) {
          // Set message assertion
          (previsionalresourceDeleteRes.body.message).should.match('User is not authorized');

          // Handle Previsionalresource error error
          done(previsionalresourceDeleteErr);
        });

    });
  });

  it('should be able to get a single Previsionalresource that has an orphaned user reference', function (done) {
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

          // Save a new Previsionalresource
          agent.post('/api/previsionalresources')
            .send(previsionalresource)
            .expect(200)
            .end(function (previsionalresourceSaveErr, previsionalresourceSaveRes) {
              // Handle Previsionalresource save error
              if (previsionalresourceSaveErr) {
                return done(previsionalresourceSaveErr);
              }

              // Set assertions on new Previsionalresource
              (previsionalresourceSaveRes.body.name).should.equal(previsionalresource.name);
              should.exist(previsionalresourceSaveRes.body.user);
              should.equal(previsionalresourceSaveRes.body.user._id, orphanId);

              // force the Previsionalresource to have an orphaned user reference
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

                    // Get the Previsionalresource
                    agent.get('/api/previsionalresources/' + previsionalresourceSaveRes.body._id)
                      .expect(200)
                      .end(function (previsionalresourceInfoErr, previsionalresourceInfoRes) {
                        // Handle Previsionalresource error
                        if (previsionalresourceInfoErr) {
                          return done(previsionalresourceInfoErr);
                        }

                        // Set assertions
                        (previsionalresourceInfoRes.body._id).should.equal(previsionalresourceSaveRes.body._id);
                        (previsionalresourceInfoRes.body.name).should.equal(previsionalresource.name);
                        should.equal(previsionalresourceInfoRes.body.user, undefined);

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
      Previsionalresource.remove().exec(done);
    });
  });
});
