'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Productmodel = mongoose.model('Productmodel'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  productmodel;

/**
 * Productmodel routes tests
 */
describe('Productmodel CRUD tests', function () {

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

    // Save a user to the test db and create new Productmodel
    user.save(function () {
      productmodel = {
        name: 'Productmodel name'
      };

      done();
    });
  });

  it('should be able to save a Productmodel if logged in', function (done) {
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

        // Save a new Productmodel
        agent.post('/api/productmodels')
          .send(productmodel)
          .expect(200)
          .end(function (productmodelSaveErr, productmodelSaveRes) {
            // Handle Productmodel save error
            if (productmodelSaveErr) {
              return done(productmodelSaveErr);
            }

            // Get a list of Productmodels
            agent.get('/api/productmodels')
              .end(function (productmodelsGetErr, productmodelsGetRes) {
                // Handle Productmodels save error
                if (productmodelsGetErr) {
                  return done(productmodelsGetErr);
                }

                // Get Productmodels list
                var productmodels = productmodelsGetRes.body;

                // Set assertions
                (productmodels[0].user._id).should.equal(userId);
                (productmodels[0].name).should.match('Productmodel name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Productmodel if not logged in', function (done) {
    agent.post('/api/productmodels')
      .send(productmodel)
      .expect(403)
      .end(function (productmodelSaveErr, productmodelSaveRes) {
        // Call the assertion callback
        done(productmodelSaveErr);
      });
  });

  it('should not be able to save an Productmodel if no name is provided', function (done) {
    // Invalidate name field
    productmodel.name = '';

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

        // Save a new Productmodel
        agent.post('/api/productmodels')
          .send(productmodel)
          .expect(400)
          .end(function (productmodelSaveErr, productmodelSaveRes) {
            // Set message assertion
            (productmodelSaveRes.body.message).should.match('Please fill Productmodel name');

            // Handle Productmodel save error
            done(productmodelSaveErr);
          });
      });
  });

  it('should be able to update an Productmodel if signed in', function (done) {
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

        // Save a new Productmodel
        agent.post('/api/productmodels')
          .send(productmodel)
          .expect(200)
          .end(function (productmodelSaveErr, productmodelSaveRes) {
            // Handle Productmodel save error
            if (productmodelSaveErr) {
              return done(productmodelSaveErr);
            }

            // Update Productmodel name
            productmodel.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Productmodel
            agent.put('/api/productmodels/' + productmodelSaveRes.body._id)
              .send(productmodel)
              .expect(200)
              .end(function (productmodelUpdateErr, productmodelUpdateRes) {
                // Handle Productmodel update error
                if (productmodelUpdateErr) {
                  return done(productmodelUpdateErr);
                }

                // Set assertions
                (productmodelUpdateRes.body._id).should.equal(productmodelSaveRes.body._id);
                (productmodelUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Productmodels if not signed in', function (done) {
    // Create new Productmodel model instance
    var productmodelObj = new Productmodel(productmodel);

    // Save the productmodel
    productmodelObj.save(function () {
      // Request Productmodels
      request(app).get('/api/productmodels')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Productmodel if not signed in', function (done) {
    // Create new Productmodel model instance
    var productmodelObj = new Productmodel(productmodel);

    // Save the Productmodel
    productmodelObj.save(function () {
      request(app).get('/api/productmodels/' + productmodelObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', productmodel.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Productmodel with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/productmodels/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Productmodel is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Productmodel which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Productmodel
    request(app).get('/api/productmodels/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Productmodel with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Productmodel if signed in', function (done) {
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

        // Save a new Productmodel
        agent.post('/api/productmodels')
          .send(productmodel)
          .expect(200)
          .end(function (productmodelSaveErr, productmodelSaveRes) {
            // Handle Productmodel save error
            if (productmodelSaveErr) {
              return done(productmodelSaveErr);
            }

            // Delete an existing Productmodel
            agent.delete('/api/productmodels/' + productmodelSaveRes.body._id)
              .send(productmodel)
              .expect(200)
              .end(function (productmodelDeleteErr, productmodelDeleteRes) {
                // Handle productmodel error error
                if (productmodelDeleteErr) {
                  return done(productmodelDeleteErr);
                }

                // Set assertions
                (productmodelDeleteRes.body._id).should.equal(productmodelSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Productmodel if not signed in', function (done) {
    // Set Productmodel user
    productmodel.user = user;

    // Create new Productmodel model instance
    var productmodelObj = new Productmodel(productmodel);

    // Save the Productmodel
    productmodelObj.save(function () {
      // Try deleting Productmodel
      request(app).delete('/api/productmodels/' + productmodelObj._id)
        .expect(403)
        .end(function (productmodelDeleteErr, productmodelDeleteRes) {
          // Set message assertion
          (productmodelDeleteRes.body.message).should.match('User is not authorized');

          // Handle Productmodel error error
          done(productmodelDeleteErr);
        });

    });
  });

  it('should be able to get a single Productmodel that has an orphaned user reference', function (done) {
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

          // Save a new Productmodel
          agent.post('/api/productmodels')
            .send(productmodel)
            .expect(200)
            .end(function (productmodelSaveErr, productmodelSaveRes) {
              // Handle Productmodel save error
              if (productmodelSaveErr) {
                return done(productmodelSaveErr);
              }

              // Set assertions on new Productmodel
              (productmodelSaveRes.body.name).should.equal(productmodel.name);
              should.exist(productmodelSaveRes.body.user);
              should.equal(productmodelSaveRes.body.user._id, orphanId);

              // force the Productmodel to have an orphaned user reference
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

                    // Get the Productmodel
                    agent.get('/api/productmodels/' + productmodelSaveRes.body._id)
                      .expect(200)
                      .end(function (productmodelInfoErr, productmodelInfoRes) {
                        // Handle Productmodel error
                        if (productmodelInfoErr) {
                          return done(productmodelInfoErr);
                        }

                        // Set assertions
                        (productmodelInfoRes.body._id).should.equal(productmodelSaveRes.body._id);
                        (productmodelInfoRes.body.name).should.equal(productmodel.name);
                        should.equal(productmodelInfoRes.body.user, undefined);

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
      Productmodel.remove().exec(done);
    });
  });
});
