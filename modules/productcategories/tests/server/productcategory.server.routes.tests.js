'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Productcategory = mongoose.model('Productcategory'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  productcategory;

/**
 * Productcategory routes tests
 */
describe('Productcategory CRUD tests', function () {

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

    // Save a user to the test db and create new Productcategory
    user.save(function () {
      productcategory = {
        name: 'Productcategory name'
      };

      done();
    });
  });

  it('should be able to save a Productcategory if logged in', function (done) {
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

        // Save a new Productcategory
        agent.post('/api/productcategories')
          .send(productcategory)
          .expect(200)
          .end(function (productcategorySaveErr, productcategorySaveRes) {
            // Handle Productcategory save error
            if (productcategorySaveErr) {
              return done(productcategorySaveErr);
            }

            // Get a list of Productcategories
            agent.get('/api/productcategories')
              .end(function (productcategoriesGetErr, productcategoriesGetRes) {
                // Handle Productcategories save error
                if (productcategoriesGetErr) {
                  return done(productcategoriesGetErr);
                }

                // Get Productcategories list
                var productcategories = productcategoriesGetRes.body;

                // Set assertions
                (productcategories[0].user._id).should.equal(userId);
                (productcategories[0].name).should.match('Productcategory name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Productcategory if not logged in', function (done) {
    agent.post('/api/productcategories')
      .send(productcategory)
      .expect(403)
      .end(function (productcategorySaveErr, productcategorySaveRes) {
        // Call the assertion callback
        done(productcategorySaveErr);
      });
  });

  it('should not be able to save an Productcategory if no name is provided', function (done) {
    // Invalidate name field
    productcategory.name = '';

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

        // Save a new Productcategory
        agent.post('/api/productcategories')
          .send(productcategory)
          .expect(400)
          .end(function (productcategorySaveErr, productcategorySaveRes) {
            // Set message assertion
            (productcategorySaveRes.body.message).should.match('Please fill Productcategory name');

            // Handle Productcategory save error
            done(productcategorySaveErr);
          });
      });
  });

  it('should be able to update an Productcategory if signed in', function (done) {
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

        // Save a new Productcategory
        agent.post('/api/productcategories')
          .send(productcategory)
          .expect(200)
          .end(function (productcategorySaveErr, productcategorySaveRes) {
            // Handle Productcategory save error
            if (productcategorySaveErr) {
              return done(productcategorySaveErr);
            }

            // Update Productcategory name
            productcategory.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Productcategory
            agent.put('/api/productcategories/' + productcategorySaveRes.body._id)
              .send(productcategory)
              .expect(200)
              .end(function (productcategoryUpdateErr, productcategoryUpdateRes) {
                // Handle Productcategory update error
                if (productcategoryUpdateErr) {
                  return done(productcategoryUpdateErr);
                }

                // Set assertions
                (productcategoryUpdateRes.body._id).should.equal(productcategorySaveRes.body._id);
                (productcategoryUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Productcategories if not signed in', function (done) {
    // Create new Productcategory model instance
    var productcategoryObj = new Productcategory(productcategory);

    // Save the productcategory
    productcategoryObj.save(function () {
      // Request Productcategories
      request(app).get('/api/productcategories')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Productcategory if not signed in', function (done) {
    // Create new Productcategory model instance
    var productcategoryObj = new Productcategory(productcategory);

    // Save the Productcategory
    productcategoryObj.save(function () {
      request(app).get('/api/productcategories/' + productcategoryObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', productcategory.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Productcategory with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/productcategories/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Productcategory is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Productcategory which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Productcategory
    request(app).get('/api/productcategories/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Productcategory with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Productcategory if signed in', function (done) {
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

        // Save a new Productcategory
        agent.post('/api/productcategories')
          .send(productcategory)
          .expect(200)
          .end(function (productcategorySaveErr, productcategorySaveRes) {
            // Handle Productcategory save error
            if (productcategorySaveErr) {
              return done(productcategorySaveErr);
            }

            // Delete an existing Productcategory
            agent.delete('/api/productcategories/' + productcategorySaveRes.body._id)
              .send(productcategory)
              .expect(200)
              .end(function (productcategoryDeleteErr, productcategoryDeleteRes) {
                // Handle productcategory error error
                if (productcategoryDeleteErr) {
                  return done(productcategoryDeleteErr);
                }

                // Set assertions
                (productcategoryDeleteRes.body._id).should.equal(productcategorySaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Productcategory if not signed in', function (done) {
    // Set Productcategory user
    productcategory.user = user;

    // Create new Productcategory model instance
    var productcategoryObj = new Productcategory(productcategory);

    // Save the Productcategory
    productcategoryObj.save(function () {
      // Try deleting Productcategory
      request(app).delete('/api/productcategories/' + productcategoryObj._id)
        .expect(403)
        .end(function (productcategoryDeleteErr, productcategoryDeleteRes) {
          // Set message assertion
          (productcategoryDeleteRes.body.message).should.match('User is not authorized');

          // Handle Productcategory error error
          done(productcategoryDeleteErr);
        });

    });
  });

  it('should be able to get a single Productcategory that has an orphaned user reference', function (done) {
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

          // Save a new Productcategory
          agent.post('/api/productcategories')
            .send(productcategory)
            .expect(200)
            .end(function (productcategorySaveErr, productcategorySaveRes) {
              // Handle Productcategory save error
              if (productcategorySaveErr) {
                return done(productcategorySaveErr);
              }

              // Set assertions on new Productcategory
              (productcategorySaveRes.body.name).should.equal(productcategory.name);
              should.exist(productcategorySaveRes.body.user);
              should.equal(productcategorySaveRes.body.user._id, orphanId);

              // force the Productcategory to have an orphaned user reference
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

                    // Get the Productcategory
                    agent.get('/api/productcategories/' + productcategorySaveRes.body._id)
                      .expect(200)
                      .end(function (productcategoryInfoErr, productcategoryInfoRes) {
                        // Handle Productcategory error
                        if (productcategoryInfoErr) {
                          return done(productcategoryInfoErr);
                        }

                        // Set assertions
                        (productcategoryInfoRes.body._id).should.equal(productcategorySaveRes.body._id);
                        (productcategoryInfoRes.body.name).should.equal(productcategory.name);
                        should.equal(productcategoryInfoRes.body.user, undefined);

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
      Productcategory.remove().exec(done);
    });
  });
});
