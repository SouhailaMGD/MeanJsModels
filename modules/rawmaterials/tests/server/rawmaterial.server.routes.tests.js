'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Rawmaterial = mongoose.model('Rawmaterial'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  rawmaterial;

/**
 * Rawmaterial routes tests
 */
describe('Rawmaterial CRUD tests', function () {

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

    // Save a user to the test db and create new Rawmaterial
    user.save(function () {
      rawmaterial = {
        name: 'Rawmaterial name'
      };

      done();
    });
  });

  it('should be able to save a Rawmaterial if logged in', function (done) {
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

        // Save a new Rawmaterial
        agent.post('/api/rawmaterials')
          .send(rawmaterial)
          .expect(200)
          .end(function (rawmaterialSaveErr, rawmaterialSaveRes) {
            // Handle Rawmaterial save error
            if (rawmaterialSaveErr) {
              return done(rawmaterialSaveErr);
            }

            // Get a list of Rawmaterials
            agent.get('/api/rawmaterials')
              .end(function (rawmaterialsGetErr, rawmaterialsGetRes) {
                // Handle Rawmaterials save error
                if (rawmaterialsGetErr) {
                  return done(rawmaterialsGetErr);
                }

                // Get Rawmaterials list
                var rawmaterials = rawmaterialsGetRes.body;

                // Set assertions
                (rawmaterials[0].user._id).should.equal(userId);
                (rawmaterials[0].name).should.match('Rawmaterial name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Rawmaterial if not logged in', function (done) {
    agent.post('/api/rawmaterials')
      .send(rawmaterial)
      .expect(403)
      .end(function (rawmaterialSaveErr, rawmaterialSaveRes) {
        // Call the assertion callback
        done(rawmaterialSaveErr);
      });
  });

  it('should not be able to save an Rawmaterial if no name is provided', function (done) {
    // Invalidate name field
    rawmaterial.name = '';

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

        // Save a new Rawmaterial
        agent.post('/api/rawmaterials')
          .send(rawmaterial)
          .expect(400)
          .end(function (rawmaterialSaveErr, rawmaterialSaveRes) {
            // Set message assertion
            (rawmaterialSaveRes.body.message).should.match('Please fill Rawmaterial name');

            // Handle Rawmaterial save error
            done(rawmaterialSaveErr);
          });
      });
  });

  it('should be able to update an Rawmaterial if signed in', function (done) {
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

        // Save a new Rawmaterial
        agent.post('/api/rawmaterials')
          .send(rawmaterial)
          .expect(200)
          .end(function (rawmaterialSaveErr, rawmaterialSaveRes) {
            // Handle Rawmaterial save error
            if (rawmaterialSaveErr) {
              return done(rawmaterialSaveErr);
            }

            // Update Rawmaterial name
            rawmaterial.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Rawmaterial
            agent.put('/api/rawmaterials/' + rawmaterialSaveRes.body._id)
              .send(rawmaterial)
              .expect(200)
              .end(function (rawmaterialUpdateErr, rawmaterialUpdateRes) {
                // Handle Rawmaterial update error
                if (rawmaterialUpdateErr) {
                  return done(rawmaterialUpdateErr);
                }

                // Set assertions
                (rawmaterialUpdateRes.body._id).should.equal(rawmaterialSaveRes.body._id);
                (rawmaterialUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Rawmaterials if not signed in', function (done) {
    // Create new Rawmaterial model instance
    var rawmaterialObj = new Rawmaterial(rawmaterial);

    // Save the rawmaterial
    rawmaterialObj.save(function () {
      // Request Rawmaterials
      request(app).get('/api/rawmaterials')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Rawmaterial if not signed in', function (done) {
    // Create new Rawmaterial model instance
    var rawmaterialObj = new Rawmaterial(rawmaterial);

    // Save the Rawmaterial
    rawmaterialObj.save(function () {
      request(app).get('/api/rawmaterials/' + rawmaterialObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', rawmaterial.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Rawmaterial with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/rawmaterials/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Rawmaterial is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Rawmaterial which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Rawmaterial
    request(app).get('/api/rawmaterials/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Rawmaterial with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Rawmaterial if signed in', function (done) {
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

        // Save a new Rawmaterial
        agent.post('/api/rawmaterials')
          .send(rawmaterial)
          .expect(200)
          .end(function (rawmaterialSaveErr, rawmaterialSaveRes) {
            // Handle Rawmaterial save error
            if (rawmaterialSaveErr) {
              return done(rawmaterialSaveErr);
            }

            // Delete an existing Rawmaterial
            agent.delete('/api/rawmaterials/' + rawmaterialSaveRes.body._id)
              .send(rawmaterial)
              .expect(200)
              .end(function (rawmaterialDeleteErr, rawmaterialDeleteRes) {
                // Handle rawmaterial error error
                if (rawmaterialDeleteErr) {
                  return done(rawmaterialDeleteErr);
                }

                // Set assertions
                (rawmaterialDeleteRes.body._id).should.equal(rawmaterialSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Rawmaterial if not signed in', function (done) {
    // Set Rawmaterial user
    rawmaterial.user = user;

    // Create new Rawmaterial model instance
    var rawmaterialObj = new Rawmaterial(rawmaterial);

    // Save the Rawmaterial
    rawmaterialObj.save(function () {
      // Try deleting Rawmaterial
      request(app).delete('/api/rawmaterials/' + rawmaterialObj._id)
        .expect(403)
        .end(function (rawmaterialDeleteErr, rawmaterialDeleteRes) {
          // Set message assertion
          (rawmaterialDeleteRes.body.message).should.match('User is not authorized');

          // Handle Rawmaterial error error
          done(rawmaterialDeleteErr);
        });

    });
  });

  it('should be able to get a single Rawmaterial that has an orphaned user reference', function (done) {
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

          // Save a new Rawmaterial
          agent.post('/api/rawmaterials')
            .send(rawmaterial)
            .expect(200)
            .end(function (rawmaterialSaveErr, rawmaterialSaveRes) {
              // Handle Rawmaterial save error
              if (rawmaterialSaveErr) {
                return done(rawmaterialSaveErr);
              }

              // Set assertions on new Rawmaterial
              (rawmaterialSaveRes.body.name).should.equal(rawmaterial.name);
              should.exist(rawmaterialSaveRes.body.user);
              should.equal(rawmaterialSaveRes.body.user._id, orphanId);

              // force the Rawmaterial to have an orphaned user reference
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

                    // Get the Rawmaterial
                    agent.get('/api/rawmaterials/' + rawmaterialSaveRes.body._id)
                      .expect(200)
                      .end(function (rawmaterialInfoErr, rawmaterialInfoRes) {
                        // Handle Rawmaterial error
                        if (rawmaterialInfoErr) {
                          return done(rawmaterialInfoErr);
                        }

                        // Set assertions
                        (rawmaterialInfoRes.body._id).should.equal(rawmaterialSaveRes.body._id);
                        (rawmaterialInfoRes.body.name).should.equal(rawmaterial.name);
                        should.equal(rawmaterialInfoRes.body.user, undefined);

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
      Rawmaterial.remove().exec(done);
    });
  });
});
