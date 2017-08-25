(function () {
  'use strict';

  describe('Previsionalresources Route Tests', function () {
    // Initialize global variables
    var $scope,
      PrevisionalresourcesService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _PrevisionalresourcesService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      PrevisionalresourcesService = _PrevisionalresourcesService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('previsionalresources');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/previsionalresources');
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
          PrevisionalresourcesController,
          mockPrevisionalresource;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('previsionalresources.view');
          $templateCache.put('modules/previsionalresources/client/views/view-previsionalresource.client.view.html', '');

          // create mock Previsionalresource
          mockPrevisionalresource = new PrevisionalresourcesService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Previsionalresource Name'
          });

          // Initialize Controller
          PrevisionalresourcesController = $controller('PrevisionalresourcesController as vm', {
            $scope: $scope,
            previsionalresourceResolve: mockPrevisionalresource
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:previsionalresourceId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.previsionalresourceResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            previsionalresourceId: 1
          })).toEqual('/previsionalresources/1');
        }));

        it('should attach an Previsionalresource to the controller scope', function () {
          expect($scope.vm.previsionalresource._id).toBe(mockPrevisionalresource._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/previsionalresources/client/views/view-previsionalresource.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          PrevisionalresourcesController,
          mockPrevisionalresource;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('previsionalresources.create');
          $templateCache.put('modules/previsionalresources/client/views/form-previsionalresource.client.view.html', '');

          // create mock Previsionalresource
          mockPrevisionalresource = new PrevisionalresourcesService();

          // Initialize Controller
          PrevisionalresourcesController = $controller('PrevisionalresourcesController as vm', {
            $scope: $scope,
            previsionalresourceResolve: mockPrevisionalresource
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.previsionalresourceResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/previsionalresources/create');
        }));

        it('should attach an Previsionalresource to the controller scope', function () {
          expect($scope.vm.previsionalresource._id).toBe(mockPrevisionalresource._id);
          expect($scope.vm.previsionalresource._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/previsionalresources/client/views/form-previsionalresource.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          PrevisionalresourcesController,
          mockPrevisionalresource;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('previsionalresources.edit');
          $templateCache.put('modules/previsionalresources/client/views/form-previsionalresource.client.view.html', '');

          // create mock Previsionalresource
          mockPrevisionalresource = new PrevisionalresourcesService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Previsionalresource Name'
          });

          // Initialize Controller
          PrevisionalresourcesController = $controller('PrevisionalresourcesController as vm', {
            $scope: $scope,
            previsionalresourceResolve: mockPrevisionalresource
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:previsionalresourceId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.previsionalresourceResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            previsionalresourceId: 1
          })).toEqual('/previsionalresources/1/edit');
        }));

        it('should attach an Previsionalresource to the controller scope', function () {
          expect($scope.vm.previsionalresource._id).toBe(mockPrevisionalresource._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/previsionalresources/client/views/form-previsionalresource.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
