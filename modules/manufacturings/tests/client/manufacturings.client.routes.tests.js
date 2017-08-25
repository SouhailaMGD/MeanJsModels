(function () {
  'use strict';

  describe('Manufacturings Route Tests', function () {
    // Initialize global variables
    var $scope,
      ManufacturingsService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _ManufacturingsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      ManufacturingsService = _ManufacturingsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('manufacturings');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/manufacturings');
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
          ManufacturingsController,
          mockManufacturing;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('manufacturings.view');
          $templateCache.put('modules/manufacturings/client/views/view-manufacturing.client.view.html', '');

          // create mock Manufacturing
          mockManufacturing = new ManufacturingsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Manufacturing Name'
          });

          // Initialize Controller
          ManufacturingsController = $controller('ManufacturingsController as vm', {
            $scope: $scope,
            manufacturingResolve: mockManufacturing
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:manufacturingId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.manufacturingResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            manufacturingId: 1
          })).toEqual('/manufacturings/1');
        }));

        it('should attach an Manufacturing to the controller scope', function () {
          expect($scope.vm.manufacturing._id).toBe(mockManufacturing._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/manufacturings/client/views/view-manufacturing.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          ManufacturingsController,
          mockManufacturing;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('manufacturings.create');
          $templateCache.put('modules/manufacturings/client/views/form-manufacturing.client.view.html', '');

          // create mock Manufacturing
          mockManufacturing = new ManufacturingsService();

          // Initialize Controller
          ManufacturingsController = $controller('ManufacturingsController as vm', {
            $scope: $scope,
            manufacturingResolve: mockManufacturing
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.manufacturingResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/manufacturings/create');
        }));

        it('should attach an Manufacturing to the controller scope', function () {
          expect($scope.vm.manufacturing._id).toBe(mockManufacturing._id);
          expect($scope.vm.manufacturing._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/manufacturings/client/views/form-manufacturing.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          ManufacturingsController,
          mockManufacturing;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('manufacturings.edit');
          $templateCache.put('modules/manufacturings/client/views/form-manufacturing.client.view.html', '');

          // create mock Manufacturing
          mockManufacturing = new ManufacturingsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Manufacturing Name'
          });

          // Initialize Controller
          ManufacturingsController = $controller('ManufacturingsController as vm', {
            $scope: $scope,
            manufacturingResolve: mockManufacturing
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:manufacturingId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.manufacturingResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            manufacturingId: 1
          })).toEqual('/manufacturings/1/edit');
        }));

        it('should attach an Manufacturing to the controller scope', function () {
          expect($scope.vm.manufacturing._id).toBe(mockManufacturing._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/manufacturings/client/views/form-manufacturing.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
