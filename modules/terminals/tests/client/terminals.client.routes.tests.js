(function () {
  'use strict';

  describe('Terminals Route Tests', function () {
    // Initialize global variables
    var $scope,
      TerminalsService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _TerminalsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      TerminalsService = _TerminalsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('terminals');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/terminals');
        });

        it('Should be abstract', function () {
          expect(mainstate.abstract).toBe(true);
        });

        it('Should have template', function () {
          expect(mainstate.template).toBe('<ui-view/>');
        });
      });

      describe('View Route', function () {
        var viewstate,
          TerminalsController,
          mockTerminal;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('terminals.view');
          $templateCache.put('modules/terminals/client/views/view-terminal.client.view.html', '');

          // create mock Terminal
          mockTerminal = new TerminalsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Terminal Name'
          });

          // Initialize Controller
          TerminalsController = $controller('TerminalsController as vm', {
            $scope: $scope,
            terminalResolve: mockTerminal
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:terminalId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.terminalResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            terminalId: 1
          })).toEqual('/terminals/1');
        }));

        it('should attach an Terminal to the controller scope', function () {
          expect($scope.vm.terminal._id).toBe(mockTerminal._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/terminals/client/views/view-terminal.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          TerminalsController,
          mockTerminal;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('terminals.create');
          $templateCache.put('modules/terminals/client/views/form-terminal.client.view.html', '');

          // create mock Terminal
          mockTerminal = new TerminalsService();

          // Initialize Controller
          TerminalsController = $controller('TerminalsController as vm', {
            $scope: $scope,
            terminalResolve: mockTerminal
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.terminalResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/terminals/create');
        }));

        it('should attach an Terminal to the controller scope', function () {
          expect($scope.vm.terminal._id).toBe(mockTerminal._id);
          expect($scope.vm.terminal._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/terminals/client/views/form-terminal.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          TerminalsController,
          mockTerminal;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('terminals.edit');
          $templateCache.put('modules/terminals/client/views/form-terminal.client.view.html', '');

          // create mock Terminal
          mockTerminal = new TerminalsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Terminal Name'
          });

          // Initialize Controller
          TerminalsController = $controller('TerminalsController as vm', {
            $scope: $scope,
            terminalResolve: mockTerminal
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:terminalId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.terminalResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            terminalId: 1
          })).toEqual('/terminals/1/edit');
        }));

        it('should attach an Terminal to the controller scope', function () {
          expect($scope.vm.terminal._id).toBe(mockTerminal._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/terminals/client/views/form-terminal.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
