'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Terminal = mongoose.model('Terminal'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  terminal;

/**
 * Terminal routes tests
 */
describe('Terminal CRUD tests', function () {

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

    // Save a user to the test db and create new Terminal
    user.save(function () {
      terminal = {
        name: 'Terminal name'
      };

      done();
    });
  });

  it('should be able to save a Terminal if logged in', function (done) {
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

        // Save a new Terminal
        agent.post('/api/terminals')
          .send(terminal)
          .expect(200)
          .end(function (terminalSaveErr, terminalSaveRes) {
            // Handle Terminal save error
            if (terminalSaveErr) {
              return done(terminalSaveErr);
            }

            // Get a list of Terminals
            agent.get('/api/terminals')
              .end(function (terminalsGetErr, terminalsGetRes) {
                // Handle Terminals save error
                if (terminalsGetErr) {
                  return done(terminalsGetErr);
                }

                // Get Terminals list
                var terminals = terminalsGetRes.body;

                // Set assertions
                (terminals[0].user._id).should.equal(userId);
                (terminals[0].name).should.match('Terminal name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Terminal if not logged in', function (done) {
    agent.post('/api/terminals')
      .send(terminal)
      .expect(403)
      .end(function (terminalSaveErr, terminalSaveRes) {
        // Call the assertion callback
        done(terminalSaveErr);
      });
  });

  it('should not be able to save an Terminal if no name is provided', function (done) {
    // Invalidate name field
    terminal.name = '';

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

        // Save a new Terminal
        agent.post('/api/terminals')
          .send(terminal)
          .expect(400)
          .end(function (terminalSaveErr, terminalSaveRes) {
            // Set message assertion
            (terminalSaveRes.body.message).should.match('Please fill Terminal name');

            // Handle Terminal save error
            done(terminalSaveErr);
          });
      });
  });

  it('should be able to update an Terminal if signed in', function (done) {
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

        // Save a new Terminal
        agent.post('/api/terminals')
          .send(terminal)
          .expect(200)
          .end(function (terminalSaveErr, terminalSaveRes) {
            // Handle Terminal save error
            if (terminalSaveErr) {
              return done(terminalSaveErr);
            }

            // Update Terminal name
            terminal.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Terminal
            agent.put('/api/terminals/' + terminalSaveRes.body._id)
              .send(terminal)
              .expect(200)
              .end(function (terminalUpdateErr, terminalUpdateRes) {
                // Handle Terminal update error
                if (terminalUpdateErr) {
                  return done(terminalUpdateErr);
                }

                // Set assertions
                (terminalUpdateRes.body._id).should.equal(terminalSaveRes.body._id);
                (terminalUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Terminals if not signed in', function (done) {
    // Create new Terminal model instance
    var terminalObj = new Terminal(terminal);

    // Save the terminal
    terminalObj.save(function () {
      // Request Terminals
      request(app).get('/api/terminals')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Terminal if not signed in', function (done) {
    // Create new Terminal model instance
    var terminalObj = new Terminal(terminal);

    // Save the Terminal
    terminalObj.save(function () {
      request(app).get('/api/terminals/' + terminalObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', terminal.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Terminal with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/terminals/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Terminal is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Terminal which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Terminal
    request(app).get('/api/terminals/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Terminal with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Terminal if signed in', function (done) {
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

        // Save a new Terminal
        agent.post('/api/terminals')
          .send(terminal)
          .expect(200)
          .end(function (terminalSaveErr, terminalSaveRes) {
            // Handle Terminal save error
            if (terminalSaveErr) {
              return done(terminalSaveErr);
            }

            // Delete an existing Terminal
            agent.delete('/api/terminals/' + terminalSaveRes.body._id)
              .send(terminal)
              .expect(200)
              .end(function (terminalDeleteErr, terminalDeleteRes) {
                // Handle terminal error error
                if (terminalDeleteErr) {
                  return done(terminalDeleteErr);
                }

                // Set assertions
                (terminalDeleteRes.body._id).should.equal(terminalSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Terminal if not signed in', function (done) {
    // Set Terminal user
    terminal.user = user;

    // Create new Terminal model instance
    var terminalObj = new Terminal(terminal);

    // Save the Terminal
    terminalObj.save(function () {
      // Try deleting Terminal
      request(app).delete('/api/terminals/' + terminalObj._id)
        .expect(403)
        .end(function (terminalDeleteErr, terminalDeleteRes) {
          // Set message assertion
          (terminalDeleteRes.body.message).should.match('User is not authorized');

          // Handle Terminal error error
          done(terminalDeleteErr);
        });

    });
  });

  it('should be able to get a single Terminal that has an orphaned user reference', function (done) {
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

          // Save a new Terminal
          agent.post('/api/terminals')
            .send(terminal)
            .expect(200)
            .end(function (terminalSaveErr, terminalSaveRes) {
              // Handle Terminal save error
              if (terminalSaveErr) {
                return done(terminalSaveErr);
              }

              // Set assertions on new Terminal
              (terminalSaveRes.body.name).should.equal(terminal.name);
              should.exist(terminalSaveRes.body.user);
              should.equal(terminalSaveRes.body.user._id, orphanId);

              // force the Terminal to have an orphaned user reference
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

                    // Get the Terminal
                    agent.get('/api/terminals/' + terminalSaveRes.body._id)
                      .expect(200)
                      .end(function (terminalInfoErr, terminalInfoRes) {
                        // Handle Terminal error
                        if (terminalInfoErr) {
                          return done(terminalInfoErr);
                        }

                        // Set assertions
                        (terminalInfoRes.body._id).should.equal(terminalSaveRes.body._id);
                        (terminalInfoRes.body.name).should.equal(terminal.name);
                        should.equal(terminalInfoRes.body.user, undefined);

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
      Terminal.remove().exec(done);
    });
  });
});
