'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Delivery = mongoose.model('Delivery'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  delivery;

/**
 * Delivery routes tests
 */
describe('Delivery CRUD tests', function () {

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

    // Save a user to the test db and create new Delivery
    user.save(function () {
      delivery = {
        name: 'Delivery name'
      };

      done();
    });
  });

  it('should be able to save a Delivery if logged in', function (done) {
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

        // Save a new Delivery
        agent.post('/api/deliveries')
          .send(delivery)
          .expect(200)
          .end(function (deliverySaveErr, deliverySaveRes) {
            // Handle Delivery save error
            if (deliverySaveErr) {
              return done(deliverySaveErr);
            }

            // Get a list of Deliveries
            agent.get('/api/deliveries')
              .end(function (deliveriesGetErr, deliveriesGetRes) {
                // Handle Deliveries save error
                if (deliveriesGetErr) {
                  return done(deliveriesGetErr);
                }

                // Get Deliveries list
                var deliveries = deliveriesGetRes.body;

                // Set assertions
                (deliveries[0].user._id).should.equal(userId);
                (deliveries[0].name).should.match('Delivery name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Delivery if not logged in', function (done) {
    agent.post('/api/deliveries')
      .send(delivery)
      .expect(403)
      .end(function (deliverySaveErr, deliverySaveRes) {
        // Call the assertion callback
        done(deliverySaveErr);
      });
  });

  it('should not be able to save an Delivery if no name is provided', function (done) {
    // Invalidate name field
    delivery.name = '';

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

        // Save a new Delivery
        agent.post('/api/deliveries')
          .send(delivery)
          .expect(400)
          .end(function (deliverySaveErr, deliverySaveRes) {
            // Set message assertion
            (deliverySaveRes.body.message).should.match('Please fill Delivery name');

            // Handle Delivery save error
            done(deliverySaveErr);
          });
      });
  });

  it('should be able to update an Delivery if signed in', function (done) {
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

        // Save a new Delivery
        agent.post('/api/deliveries')
          .send(delivery)
          .expect(200)
          .end(function (deliverySaveErr, deliverySaveRes) {
            // Handle Delivery save error
            if (deliverySaveErr) {
              return done(deliverySaveErr);
            }

            // Update Delivery name
            delivery.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Delivery
            agent.put('/api/deliveries/' + deliverySaveRes.body._id)
              .send(delivery)
              .expect(200)
              .end(function (deliveryUpdateErr, deliveryUpdateRes) {
                // Handle Delivery update error
                if (deliveryUpdateErr) {
                  return done(deliveryUpdateErr);
                }

                // Set assertions
                (deliveryUpdateRes.body._id).should.equal(deliverySaveRes.body._id);
                (deliveryUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Deliveries if not signed in', function (done) {
    // Create new Delivery model instance
    var deliveryObj = new Delivery(delivery);

    // Save the delivery
    deliveryObj.save(function () {
      // Request Deliveries
      request(app).get('/api/deliveries')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Delivery if not signed in', function (done) {
    // Create new Delivery model instance
    var deliveryObj = new Delivery(delivery);

    // Save the Delivery
    deliveryObj.save(function () {
      request(app).get('/api/deliveries/' + deliveryObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', delivery.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Delivery with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/deliveries/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Delivery is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Delivery which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Delivery
    request(app).get('/api/deliveries/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Delivery with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Delivery if signed in', function (done) {
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

        // Save a new Delivery
        agent.post('/api/deliveries')
          .send(delivery)
          .expect(200)
          .end(function (deliverySaveErr, deliverySaveRes) {
            // Handle Delivery save error
            if (deliverySaveErr) {
              return done(deliverySaveErr);
            }

            // Delete an existing Delivery
            agent.delete('/api/deliveries/' + deliverySaveRes.body._id)
              .send(delivery)
              .expect(200)
              .end(function (deliveryDeleteErr, deliveryDeleteRes) {
                // Handle delivery error error
                if (deliveryDeleteErr) {
                  return done(deliveryDeleteErr);
                }

                // Set assertions
                (deliveryDeleteRes.body._id).should.equal(deliverySaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Delivery if not signed in', function (done) {
    // Set Delivery user
    delivery.user = user;

    // Create new Delivery model instance
    var deliveryObj = new Delivery(delivery);

    // Save the Delivery
    deliveryObj.save(function () {
      // Try deleting Delivery
      request(app).delete('/api/deliveries/' + deliveryObj._id)
        .expect(403)
        .end(function (deliveryDeleteErr, deliveryDeleteRes) {
          // Set message assertion
          (deliveryDeleteRes.body.message).should.match('User is not authorized');

          // Handle Delivery error error
          done(deliveryDeleteErr);
        });

    });
  });

  it('should be able to get a single Delivery that has an orphaned user reference', function (done) {
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

          // Save a new Delivery
          agent.post('/api/deliveries')
            .send(delivery)
            .expect(200)
            .end(function (deliverySaveErr, deliverySaveRes) {
              // Handle Delivery save error
              if (deliverySaveErr) {
                return done(deliverySaveErr);
              }

              // Set assertions on new Delivery
              (deliverySaveRes.body.name).should.equal(delivery.name);
              should.exist(deliverySaveRes.body.user);
              should.equal(deliverySaveRes.body.user._id, orphanId);

              // force the Delivery to have an orphaned user reference
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

                    // Get the Delivery
                    agent.get('/api/deliveries/' + deliverySaveRes.body._id)
                      .expect(200)
                      .end(function (deliveryInfoErr, deliveryInfoRes) {
                        // Handle Delivery error
                        if (deliveryInfoErr) {
                          return done(deliveryInfoErr);
                        }

                        // Set assertions
                        (deliveryInfoRes.body._id).should.equal(deliverySaveRes.body._id);
                        (deliveryInfoRes.body.name).should.equal(delivery.name);
                        should.equal(deliveryInfoRes.body.user, undefined);

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
      Delivery.remove().exec(done);
    });
  });
});
