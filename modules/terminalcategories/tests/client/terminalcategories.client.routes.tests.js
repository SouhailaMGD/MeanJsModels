(function () {
  'use strict';

  describe('Terminalcategories Route Tests', function () {
    // Initialize global variables
    var $scope,
      TerminalcategoriesService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _TerminalcategoriesService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      TerminalcategoriesService = _TerminalcategoriesService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('terminalcategories');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/terminalcategories');
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
          TerminalcategoriesController,
          mockTerminalcategory;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('terminalcategories.view');
          $templateCache.put('modules/terminalcategories/client/views/view-terminalcategory.client.view.html', '');

          // create mock Terminalcategory
          mockTerminalcategory = new TerminalcategoriesService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Terminalcategory Name'
          });

          // Initialize Controller
          TerminalcategoriesController = $controller('TerminalcategoriesController as vm', {
            $scope: $scope,
            terminalcategoryResolve: mockTerminalcategory
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:terminalcategoryId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.terminalcategoryResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            terminalcategoryId: 1
          })).toEqual('/terminalcategories/1');
        }));

        it('should attach an Terminalcategory to the controller scope', function () {
          expect($scope.vm.terminalcategory._id).toBe(mockTerminalcategory._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/terminalcategories/client/views/view-terminalcategory.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          TerminalcategoriesController,
          mockTerminalcategory;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('terminalcategories.create');
          $templateCache.put('modules/terminalcategories/client/views/form-terminalcategory.client.view.html', '');

          // create mock Terminalcategory
          mockTerminalcategory = new TerminalcategoriesService();

          // Initialize Controller
          TerminalcategoriesController = $controller('TerminalcategoriesController as vm', {
            $scope: $scope,
            terminalcategoryResolve: mockTerminalcategory
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.terminalcategoryResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/terminalcategories/create');
        }));

        it('should attach an Terminalcategory to the controller scope', function () {
          expect($scope.vm.terminalcategory._id).toBe(mockTerminalcategory._id);
          expect($scope.vm.terminalcategory._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/terminalcategories/client/views/form-terminalcategory.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          TerminalcategoriesController,
          mockTerminalcategory;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('terminalcategories.edit');
          $templateCache.put('modules/terminalcategories/client/views/form-terminalcategory.client.view.html', '');

          // create mock Terminalcategory
          mockTerminalcategory = new TerminalcategoriesService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Terminalcategory Name'
          });

          // Initialize Controller
          TerminalcategoriesController = $controller('TerminalcategoriesController as vm', {
            $scope: $scope,
            terminalcategoryResolve: mockTerminalcategory
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:terminalcategoryId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.terminalcategoryResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            terminalcategoryId: 1
          })).toEqual('/terminalcategories/1/edit');
        }));

        it('should attach an Terminalcategory to the controller scope', function () {
          expect($scope.vm.terminalcategory._id).toBe(mockTerminalcategory._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/terminalcategories/client/views/form-terminalcategory.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
