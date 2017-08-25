(function () {
  'use strict';

  describe('Productcategories Route Tests', function () {
    // Initialize global variables
    var $scope,
      ProductcategoriesService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _ProductcategoriesService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      ProductcategoriesService = _ProductcategoriesService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('productcategories');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/productcategories');
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
          ProductcategoriesController,
          mockProductcategory;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('productcategories.view');
          $templateCache.put('modules/productcategories/client/views/view-productcategory.client.view.html', '');

          // create mock Productcategory
          mockProductcategory = new ProductcategoriesService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Productcategory Name'
          });

          // Initialize Controller
          ProductcategoriesController = $controller('ProductcategoriesController as vm', {
            $scope: $scope,
            productcategoryResolve: mockProductcategory
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:productcategoryId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.productcategoryResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            productcategoryId: 1
          })).toEqual('/productcategories/1');
        }));

        it('should attach an Productcategory to the controller scope', function () {
          expect($scope.vm.productcategory._id).toBe(mockProductcategory._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/productcategories/client/views/view-productcategory.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          ProductcategoriesController,
          mockProductcategory;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('productcategories.create');
          $templateCache.put('modules/productcategories/client/views/form-productcategory.client.view.html', '');

          // create mock Productcategory
          mockProductcategory = new ProductcategoriesService();

          // Initialize Controller
          ProductcategoriesController = $controller('ProductcategoriesController as vm', {
            $scope: $scope,
            productcategoryResolve: mockProductcategory
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.productcategoryResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/productcategories/create');
        }));

        it('should attach an Productcategory to the controller scope', function () {
          expect($scope.vm.productcategory._id).toBe(mockProductcategory._id);
          expect($scope.vm.productcategory._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/productcategories/client/views/form-productcategory.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          ProductcategoriesController,
          mockProductcategory;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('productcategories.edit');
          $templateCache.put('modules/productcategories/client/views/form-productcategory.client.view.html', '');

          // create mock Productcategory
          mockProductcategory = new ProductcategoriesService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Productcategory Name'
          });

          // Initialize Controller
          ProductcategoriesController = $controller('ProductcategoriesController as vm', {
            $scope: $scope,
            productcategoryResolve: mockProductcategory
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:productcategoryId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.productcategoryResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            productcategoryId: 1
          })).toEqual('/productcategories/1/edit');
        }));

        it('should attach an Productcategory to the controller scope', function () {
          expect($scope.vm.productcategory._id).toBe(mockProductcategory._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/productcategories/client/views/form-productcategory.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
