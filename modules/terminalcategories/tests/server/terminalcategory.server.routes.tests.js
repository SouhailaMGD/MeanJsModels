'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Terminalcategory = mongoose.model('Terminalcategory'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  terminalcategory;

/**
 * Terminalcategory routes tests
 */
describe('Terminalcategory CRUD tests', function () {

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

    // Save a user to the test db and create new Terminalcategory
    user.save(function () {
      terminalcategory = {
        name: 'Terminalcategory name'
      };

      done();
    });
  });

  it('should be able to save a Terminalcategory if logged in', function (done) {
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

        // Save a new Terminalcategory
        agent.post('/api/terminalcategories')
          .send(terminalcategory)
          .expect(200)
          .end(function (terminalcategorySaveErr, terminalcategorySaveRes) {
            // Handle Terminalcategory save error
            if (terminalcategorySaveErr) {
              return done(terminalcategorySaveErr);
            }

            // Get a list of Terminalcategories
            agent.get('/api/terminalcategories')
              .end(function (terminalcategoriesGetErr, terminalcategoriesGetRes) {
                // Handle Terminalcategories save error
                if (terminalcategoriesGetErr) {
                  return done(terminalcategoriesGetErr);
                }

                // Get Terminalcategories list
                var terminalcategories = terminalcategoriesGetRes.body;

                // Set assertions
                (terminalcategories[0].user._id).should.equal(userId);
                (terminalcategories[0].name).should.match('Terminalcategory name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Terminalcategory if not logged in', function (done) {
    agent.post('/api/terminalcategories')
      .send(terminalcategory)
      .expect(403)
      .end(function (terminalcategorySaveErr, terminalcategorySaveRes) {
        // Call the assertion callback
        done(terminalcategorySaveErr);
      });
  });

  it('should not be able to save an Terminalcategory if no name is provided', function (done) {
    // Invalidate name field
    terminalcategory.name = '';

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

        // Save a new Terminalcategory
        agent.post('/api/terminalcategories')
          .send(terminalcategory)
          .expect(400)
          .end(function (terminalcategorySaveErr, terminalcategorySaveRes) {
            // Set message assertion
            (terminalcategorySaveRes.body.message).should.match('Please fill Terminalcategory name');

            // Handle Terminalcategory save error
            done(terminalcategorySaveErr);
          });
      });
  });

  it('should be able to update an Terminalcategory if signed in', function (done) {
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

        // Save a new Terminalcategory
        agent.post('/api/terminalcategories')
          .send(terminalcategory)
          .expect(200)
          .end(function (terminalcategorySaveErr, terminalcategorySaveRes) {
            // Handle Terminalcategory save error
            if (terminalcategorySaveErr) {
              return done(terminalcategorySaveErr);
            }

            // Update Terminalcategory name
            terminalcategory.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Terminalcategory
            agent.put('/api/terminalcategories/' + terminalcategorySaveRes.body._id)
              .send(terminalcategory)
              .expect(200)
              .end(function (terminalcategoryUpdateErr, terminalcategoryUpdateRes) {
                // Handle Terminalcategory update error
                if (terminalcategoryUpdateErr) {
                  return done(terminalcategoryUpdateErr);
                }

                // Set assertions
                (terminalcategoryUpdateRes.body._id).should.equal(terminalcategorySaveRes.body._id);
                (terminalcategoryUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Terminalcategories if not signed in', function (done) {
    // Create new Terminalcategory model instance
    var terminalcategoryObj = new Terminalcategory(terminalcategory);

    // Save the terminalcategory
    terminalcategoryObj.save(function () {
      // Request Terminalcategories
      request(app).get('/api/terminalcategories')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Terminalcategory if not signed in', function (done) {
    // Create new Terminalcategory model instance
    var terminalcategoryObj = new Terminalcategory(terminalcategory);

    // Save the Terminalcategory
    terminalcategoryObj.save(function () {
      request(app).get('/api/terminalcategories/' + terminalcategoryObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', terminalcategory.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Terminalcategory with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/terminalcategories/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Terminalcategory is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Terminalcategory which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Terminalcategory
    request(app).get('/api/terminalcategories/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Terminalcategory with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Terminalcategory if signed in', function (done) {
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

        // Save a new Terminalcategory
        agent.post('/api/terminalcategories')
          .send(terminalcategory)
          .expect(200)
          .end(function (terminalcategorySaveErr, terminalcategorySaveRes) {
            // Handle Terminalcategory save error
            if (terminalcategorySaveErr) {
              return done(terminalcategorySaveErr);
            }

            // Delete an existing Terminalcategory
            agent.delete('/api/terminalcategories/' + terminalcategorySaveRes.body._id)
              .send(terminalcategory)
              .expect(200)
              .end(function (terminalcategoryDeleteErr, terminalcategoryDeleteRes) {
                // Handle terminalcategory error error
                if (terminalcategoryDeleteErr) {
                  return done(terminalcategoryDeleteErr);
                }

                // Set assertions
                (terminalcategoryDeleteRes.body._id).should.equal(terminalcategorySaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Terminalcategory if not signed in', function (done) {
    // Set Terminalcategory user
    terminalcategory.user = user;

    // Create new Terminalcategory model instance
    var terminalcategoryObj = new Terminalcategory(terminalcategory);

    // Save the Terminalcategory
    terminalcategoryObj.save(function () {
      // Try deleting Terminalcategory
      request(app).delete('/api/terminalcategories/' + terminalcategoryObj._id)
        .expect(403)
        .end(function (terminalcategoryDeleteErr, terminalcategoryDeleteRes) {
          // Set message assertion
          (terminalcategoryDeleteRes.body.message).should.match('User is not authorized');

          // Handle Terminalcategory error error
          done(terminalcategoryDeleteErr);
        });

    });
  });

  it('should be able to get a single Terminalcategory that has an orphaned user reference', function (done) {
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

          // Save a new Terminalcategory
          agent.post('/api/terminalcategories')
            .send(terminalcategory)
            .expect(200)
            .end(function (terminalcategorySaveErr, terminalcategorySaveRes) {
              // Handle Terminalcategory save error
              if (terminalcategorySaveErr) {
                return done(terminalcategorySaveErr);
              }

              // Set assertions on new Terminalcategory
              (terminalcategorySaveRes.body.name).should.equal(terminalcategory.name);
              should.exist(terminalcategorySaveRes.body.user);
              should.equal(terminalcategorySaveRes.body.user._id, orphanId);

              // force the Terminalcategory to have an orphaned user reference
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

                    // Get the Terminalcategory
                    agent.get('/api/terminalcategories/' + terminalcategorySaveRes.body._id)
                      .expect(200)
                      .end(function (terminalcategoryInfoErr, terminalcategoryInfoRes) {
                        // Handle Terminalcategory error
                        if (terminalcategoryInfoErr) {
                          return done(terminalcategoryInfoErr);
                        }

                        // Set assertions
                        (terminalcategoryInfoRes.body._id).should.equal(terminalcategorySaveRes.body._id);
                        (terminalcategoryInfoRes.body.name).should.equal(terminalcategory.name);
                        should.equal(terminalcategoryInfoRes.body.user, undefined);

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
      Terminalcategory.remove().exec(done);
    });
  });
});
