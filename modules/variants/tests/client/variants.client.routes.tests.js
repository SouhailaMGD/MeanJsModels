(function () {
  'use strict';

  describe('Variants Route Tests', function () {
    // Initialize global variables
    var $scope,
      VariantsService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _VariantsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      VariantsService = _VariantsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('variants');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/variants');
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
          VariantsController,
          mockVariant;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('variants.view');
          $templateCache.put('modules/variants/client/views/view-variant.client.view.html', '');

          // create mock Variant
          mockVariant = new VariantsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Variant Name'
          });

          // Initialize Controller
          VariantsController = $controller('VariantsController as vm', {
            $scope: $scope,
            variantResolve: mockVariant
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:variantId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.variantResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            variantId: 1
          })).toEqual('/variants/1');
        }));

        it('should attach an Variant to the controller scope', function () {
          expect($scope.vm.variant._id).toBe(mockVariant._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/variants/client/views/view-variant.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          VariantsController,
          mockVariant;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('variants.create');
          $templateCache.put('modules/variants/client/views/form-variant.client.view.html', '');

          // create mock Variant
          mockVariant = new VariantsService();

          // Initialize Controller
          VariantsController = $controller('VariantsController as vm', {
            $scope: $scope,
            variantResolve: mockVariant
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.variantResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/variants/create');
        }));

        it('should attach an Variant to the controller scope', function () {
          expect($scope.vm.variant._id).toBe(mockVariant._id);
          expect($scope.vm.variant._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/variants/client/views/form-variant.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          VariantsController,
          mockVariant;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('variants.edit');
          $templateCache.put('modules/variants/client/views/form-variant.client.view.html', '');

          // create mock Variant
          mockVariant = new VariantsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Variant Name'
          });

          // Initialize Controller
          VariantsController = $controller('VariantsController as vm', {
            $scope: $scope,
            variantResolve: mockVariant
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:variantId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.variantResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            variantId: 1
          })).toEqual('/variants/1/edit');
        }));

        it('should attach an Variant to the controller scope', function () {
          expect($scope.vm.variant._id).toBe(mockVariant._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/variants/client/views/form-variant.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
