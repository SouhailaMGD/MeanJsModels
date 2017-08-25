'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Manufacturing = mongoose.model('Manufacturing'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  manufacturing;

/**
 * Manufacturing routes tests
 */
describe('Manufacturing CRUD tests', function () {

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

    // Save a user to the test db and create new Manufacturing
    user.save(function () {
      manufacturing = {
        name: 'Manufacturing name'
      };

      done();
    });
  });

  it('should be able to save a Manufacturing if logged in', function (done) {
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

        // Save a new Manufacturing
        agent.post('/api/manufacturings')
          .send(manufacturing)
          .expect(200)
          .end(function (manufacturingSaveErr, manufacturingSaveRes) {
            // Handle Manufacturing save error
            if (manufacturingSaveErr) {
              return done(manufacturingSaveErr);
            }

            // Get a list of Manufacturings
            agent.get('/api/manufacturings')
              .end(function (manufacturingsGetErr, manufacturingsGetRes) {
                // Handle Manufacturings save error
                if (manufacturingsGetErr) {
                  return done(manufacturingsGetErr);
                }

                // Get Manufacturings list
                var manufacturings = manufacturingsGetRes.body;

                // Set assertions
                (manufacturings[0].user._id).should.equal(userId);
                (manufacturings[0].name).should.match('Manufacturing name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Manufacturing if not logged in', function (done) {
    agent.post('/api/manufacturings')
      .send(manufacturing)
      .expect(403)
      .end(function (manufacturingSaveErr, manufacturingSaveRes) {
        // Call the assertion callback
        done(manufacturingSaveErr);
      });
  });

  it('should not be able to save an Manufacturing if no name is provided', function (done) {
    // Invalidate name field
    manufacturing.name = '';

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

        // Save a new Manufacturing
        agent.post('/api/manufacturings')
          .send(manufacturing)
          .expect(400)
          .end(function (manufacturingSaveErr, manufacturingSaveRes) {
            // Set message assertion
            (manufacturingSaveRes.body.message).should.match('Please fill Manufacturing name');

            // Handle Manufacturing save error
            done(manufacturingSaveErr);
          });
      });
  });

  it('should be able to update an Manufacturing if signed in', function (done) {
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

        // Save a new Manufacturing
        agent.post('/api/manufacturings')
          .send(manufacturing)
          .expect(200)
          .end(function (manufacturingSaveErr, manufacturingSaveRes) {
            // Handle Manufacturing save error
            if (manufacturingSaveErr) {
              return done(manufacturingSaveErr);
            }

            // Update Manufacturing name
            manufacturing.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Manufacturing
            agent.put('/api/manufacturings/' + manufacturingSaveRes.body._id)
              .send(manufacturing)
              .expect(200)
              .end(function (manufacturingUpdateErr, manufacturingUpdateRes) {
                // Handle Manufacturing update error
                if (manufacturingUpdateErr) {
                  return done(manufacturingUpdateErr);
                }

                // Set assertions
                (manufacturingUpdateRes.body._id).should.equal(manufacturingSaveRes.body._id);
                (manufacturingUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Manufacturings if not signed in', function (done) {
    // Create new Manufacturing model instance
    var manufacturingObj = new Manufacturing(manufacturing);

    // Save the manufacturing
    manufacturingObj.save(function () {
      // Request Manufacturings
      request(app).get('/api/manufacturings')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Manufacturing if not signed in', function (done) {
    // Create new Manufacturing model instance
    var manufacturingObj = new Manufacturing(manufacturing);

    // Save the Manufacturing
    manufacturingObj.save(function () {
      request(app).get('/api/manufacturings/' + manufacturingObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', manufacturing.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Manufacturing with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/manufacturings/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Manufacturing is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Manufacturing which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Manufacturing
    request(app).get('/api/manufacturings/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Manufacturing with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Manufacturing if signed in', function (done) {
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

        // Save a new Manufacturing
        agent.post('/api/manufacturings')
          .send(manufacturing)
          .expect(200)
          .end(function (manufacturingSaveErr, manufacturingSaveRes) {
            // Handle Manufacturing save error
            if (manufacturingSaveErr) {
              return done(manufacturingSaveErr);
            }

            // Delete an existing Manufacturing
            agent.delete('/api/manufacturings/' + manufacturingSaveRes.body._id)
              .send(manufacturing)
              .expect(200)
              .end(function (manufacturingDeleteErr, manufacturingDeleteRes) {
                // Handle manufacturing error error
                if (manufacturingDeleteErr) {
                  return done(manufacturingDeleteErr);
                }

                // Set assertions
                (manufacturingDeleteRes.body._id).should.equal(manufacturingSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Manufacturing if not signed in', function (done) {
    // Set Manufacturing user
    manufacturing.user = user;

    // Create new Manufacturing model instance
    var manufacturingObj = new Manufacturing(manufacturing);

    // Save the Manufacturing
    manufacturingObj.save(function () {
      // Try deleting Manufacturing
      request(app).delete('/api/manufacturings/' + manufacturingObj._id)
        .expect(403)
        .end(function (manufacturingDeleteErr, manufacturingDeleteRes) {
          // Set message assertion
          (manufacturingDeleteRes.body.message).should.match('User is not authorized');

          // Handle Manufacturing error error
          done(manufacturingDeleteErr);
        });

    });
  });

  it('should be able to get a single Manufacturing that has an orphaned user reference', function (done) {
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

          // Save a new Manufacturing
          agent.post('/api/manufacturings')
            .send(manufacturing)
            .expect(200)
            .end(function (manufacturingSaveErr, manufacturingSaveRes) {
              // Handle Manufacturing save error
              if (manufacturingSaveErr) {
                return done(manufacturingSaveErr);
              }

              // Set assertions on new Manufacturing
              (manufacturingSaveRes.body.name).should.equal(manufacturing.name);
              should.exist(manufacturingSaveRes.body.user);
              should.equal(manufacturingSaveRes.body.user._id, orphanId);

              // force the Manufacturing to have an orphaned user reference
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

                    // Get the Manufacturing
                    agent.get('/api/manufacturings/' + manufacturingSaveRes.body._id)
                      .expect(200)
                      .end(function (manufacturingInfoErr, manufacturingInfoRes) {
                        // Handle Manufacturing error
                        if (manufacturingInfoErr) {
                          return done(manufacturingInfoErr);
                        }

                        // Set assertions
                        (manufacturingInfoRes.body._id).should.equal(manufacturingSaveRes.body._id);
                        (manufacturingInfoRes.body.name).should.equal(manufacturing.name);
                        should.equal(manufacturingInfoRes.body.user, undefined);

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
      Manufacturing.remove().exec(done);
    });
  });
});
