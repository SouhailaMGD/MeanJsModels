'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Deliveryitem = mongoose.model('Deliveryitem'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  deliveryitem;

/**
 * Deliveryitem routes tests
 */
describe('Deliveryitem CRUD tests', function () {

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

    // Save a user to the test db and create new Deliveryitem
    user.save(function () {
      deliveryitem = {
        name: 'Deliveryitem name'
      };

      done();
    });
  });

  it('should be able to save a Deliveryitem if logged in', function (done) {
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

        // Save a new Deliveryitem
        agent.post('/api/deliveryitems')
          .send(deliveryitem)
          .expect(200)
          .end(function (deliveryitemSaveErr, deliveryitemSaveRes) {
            // Handle Deliveryitem save error
            if (deliveryitemSaveErr) {
              return done(deliveryitemSaveErr);
            }

            // Get a list of Deliveryitems
            agent.get('/api/deliveryitems')
              .end(function (deliveryitemsGetErr, deliveryitemsGetRes) {
                // Handle Deliveryitems save error
                if (deliveryitemsGetErr) {
                  return done(deliveryitemsGetErr);
                }

                // Get Deliveryitems list
                var deliveryitems = deliveryitemsGetRes.body;

                // Set assertions
                (deliveryitems[0].user._id).should.equal(userId);
                (deliveryitems[0].name).should.match('Deliveryitem name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Deliveryitem if not logged in', function (done) {
    agent.post('/api/deliveryitems')
      .send(deliveryitem)
      .expect(403)
      .end(function (deliveryitemSaveErr, deliveryitemSaveRes) {
        // Call the assertion callback
        done(deliveryitemSaveErr);
      });
  });

  it('should not be able to save an Deliveryitem if no name is provided', function (done) {
    // Invalidate name field
    deliveryitem.name = '';

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

        // Save a new Deliveryitem
        agent.post('/api/deliveryitems')
          .send(deliveryitem)
          .expect(400)
          .end(function (deliveryitemSaveErr, deliveryitemSaveRes) {
            // Set message assertion
            (deliveryitemSaveRes.body.message).should.match('Please fill Deliveryitem name');

            // Handle Deliveryitem save error
            done(deliveryitemSaveErr);
          });
      });
  });

  it('should be able to update an Deliveryitem if signed in', function (done) {
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

        // Save a new Deliveryitem
        agent.post('/api/deliveryitems')
          .send(deliveryitem)
          .expect(200)
          .end(function (deliveryitemSaveErr, deliveryitemSaveRes) {
            // Handle Deliveryitem save error
            if (deliveryitemSaveErr) {
              return done(deliveryitemSaveErr);
            }

            // Update Deliveryitem name
            deliveryitem.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Deliveryitem
            agent.put('/api/deliveryitems/' + deliveryitemSaveRes.body._id)
              .send(deliveryitem)
              .expect(200)
              .end(function (deliveryitemUpdateErr, deliveryitemUpdateRes) {
                // Handle Deliveryitem update error
                if (deliveryitemUpdateErr) {
                  return done(deliveryitemUpdateErr);
                }

                // Set assertions
                (deliveryitemUpdateRes.body._id).should.equal(deliveryitemSaveRes.body._id);
                (deliveryitemUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Deliveryitems if not signed in', function (done) {
    // Create new Deliveryitem model instance
    var deliveryitemObj = new Deliveryitem(deliveryitem);

    // Save the deliveryitem
    deliveryitemObj.save(function () {
      // Request Deliveryitems
      request(app).get('/api/deliveryitems')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Deliveryitem if not signed in', function (done) {
    // Create new Deliveryitem model instance
    var deliveryitemObj = new Deliveryitem(deliveryitem);

    // Save the Deliveryitem
    deliveryitemObj.save(function () {
      request(app).get('/api/deliveryitems/' + deliveryitemObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', deliveryitem.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Deliveryitem with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/deliveryitems/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Deliveryitem is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Deliveryitem which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Deliveryitem
    request(app).get('/api/deliveryitems/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Deliveryitem with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Deliveryitem if signed in', function (done) {
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

        // Save a new Deliveryitem
        agent.post('/api/deliveryitems')
          .send(deliveryitem)
          .expect(200)
          .end(function (deliveryitemSaveErr, deliveryitemSaveRes) {
            // Handle Deliveryitem save error
            if (deliveryitemSaveErr) {
              return done(deliveryitemSaveErr);
            }

            // Delete an existing Deliveryitem
            agent.delete('/api/deliveryitems/' + deliveryitemSaveRes.body._id)
              .send(deliveryitem)
              .expect(200)
              .end(function (deliveryitemDeleteErr, deliveryitemDeleteRes) {
                // Handle deliveryitem error error
                if (deliveryitemDeleteErr) {
                  return done(deliveryitemDeleteErr);
                }

                // Set assertions
                (deliveryitemDeleteRes.body._id).should.equal(deliveryitemSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Deliveryitem if not signed in', function (done) {
    // Set Deliveryitem user
    deliveryitem.user = user;

    // Create new Deliveryitem model instance
    var deliveryitemObj = new Deliveryitem(deliveryitem);

    // Save the Deliveryitem
    deliveryitemObj.save(function () {
      // Try deleting Deliveryitem
      request(app).delete('/api/deliveryitems/' + deliveryitemObj._id)
        .expect(403)
        .end(function (deliveryitemDeleteErr, deliveryitemDeleteRes) {
          // Set message assertion
          (deliveryitemDeleteRes.body.message).should.match('User is not authorized');

          // Handle Deliveryitem error error
          done(deliveryitemDeleteErr);
        });

    });
  });

  it('should be able to get a single Deliveryitem that has an orphaned user reference', function (done) {
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

          // Save a new Deliveryitem
          agent.post('/api/deliveryitems')
            .send(deliveryitem)
            .expect(200)
            .end(function (deliveryitemSaveErr, deliveryitemSaveRes) {
              // Handle Deliveryitem save error
              if (deliveryitemSaveErr) {
                return done(deliveryitemSaveErr);
              }

              // Set assertions on new Deliveryitem
              (deliveryitemSaveRes.body.name).should.equal(deliveryitem.name);
              should.exist(deliveryitemSaveRes.body.user);
              should.equal(deliveryitemSaveRes.body.user._id, orphanId);

              // force the Deliveryitem to have an orphaned user reference
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

                    // Get the Deliveryitem
                    agent.get('/api/deliveryitems/' + deliveryitemSaveRes.body._id)
                      .expect(200)
                      .end(function (deliveryitemInfoErr, deliveryitemInfoRes) {
                        // Handle Deliveryitem error
                        if (deliveryitemInfoErr) {
                          return done(deliveryitemInfoErr);
                        }

                        // Set assertions
                        (deliveryitemInfoRes.body._id).should.equal(deliveryitemSaveRes.body._id);
                        (deliveryitemInfoRes.body.name).should.equal(deliveryitem.name);
                        should.equal(deliveryitemInfoRes.body.user, undefined);

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
      Deliveryitem.remove().exec(done);
    });
  });
});
