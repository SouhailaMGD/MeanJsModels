(function () {
  'use strict';

  describe('Productmodels Controller Tests', function () {
    // Initialize global variables
    var ProductmodelsController,
      $scope,
      $httpBackend,
      $state,
      Authentication,
      ProductmodelsService,
      mockProductmodel;

    // The $resource service augments the response object with methods for updating and deleting the resource.
    // If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
    // the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
    // When the toEqualData matcher compares two objects, it takes only object properties into
    // account and ignores methods.
    beforeEach(function () {
      jasmine.addMatchers({
        toEqualData: function (util, customEqualityTesters) {
          return {
            compare: function (actual, expected) {
              return {
                pass: angular.equals(actual, expected)
              };
            }
          };
        }
      });
    });

    // Then we can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($controller, $rootScope, _$state_, _$httpBackend_, _Authentication_, _ProductmodelsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();

      // Point global variables to injected services
      $httpBackend = _$httpBackend_;
      $state = _$state_;
      Authentication = _Authentication_;
      ProductmodelsService = _ProductmodelsService_;

      // create mock Productmodel
      mockProductmodel = new ProductmodelsService({
        _id: '525a8422f6d0f87f0e407a33',
        name: 'Productmodel Name'
      });

      // Mock logged in user
      Authentication.user = {
        roles: ['user']
      };

      // Initialize the Productmodels controller.
      ProductmodelsController = $controller('ProductmodelsController as vm', {
        $scope: $scope,
        productmodelResolve: {}
      });

      // Spy on state go
      spyOn($state, 'go');
    }));

    describe('vm.save() as create', function () {
      var sampleProductmodelPostData;

      beforeEach(function () {
        // Create a sample Productmodel object
        sampleProductmodelPostData = new ProductmodelsService({
          name: 'Productmodel Name'
        });

        $scope.vm.productmodel = sampleProductmodelPostData;
      });

      it('should send a POST request with the form input values and then locate to new object URL', inject(function (ProductmodelsService) {
        // Set POST response
        $httpBackend.expectPOST('api/productmodels', sampleProductmodelPostData).respond(mockProductmodel);

        // Run controller functionality
        $scope.vm.save(true);
        $httpBackend.flush();

        // Test URL redirection after the Productmodel was created
        expect($state.go).toHaveBeenCalledWith('productmodels.view', {
          productmodelId: mockProductmodel._id
        });
      }));

      it('should set $scope.vm.error if error', function () {
        var errorMessage = 'this is an error message';
        $httpBackend.expectPOST('api/productmodels', sampleProductmodelPostData).respond(400, {
          message: errorMessage
        });

        $scope.vm.save(true);
        $httpBackend.flush();

        expect($scope.vm.error).toBe(errorMessage);
      });
    });

    describe('vm.save() as update', function () {
      beforeEach(function () {
        // Mock Productmodel in $scope
        $scope.vm.productmodel = mockProductmodel;
      });

      it('should update a valid Productmodel', inject(function (ProductmodelsService) {
        // Set PUT response
        $httpBackend.expectPUT(/api\/productmodels\/([0-9a-fA-F]{24})$/).respond();

        // Run controller functionality
        $scope.vm.save(true);
        $httpBackend.flush();

        // Test URL location to new object
        expect($state.go).toHaveBeenCalledWith('productmodels.view', {
          productmodelId: mockProductmodel._id
        });
      }));

      it('should set $scope.vm.error if error', inject(function (ProductmodelsService) {
        var errorMessage = 'error';
        $httpBackend.expectPUT(/api\/productmodels\/([0-9a-fA-F]{24})$/).respond(400, {
          message: errorMessage
        });

        $scope.vm.save(true);
        $httpBackend.flush();

        expect($scope.vm.error).toBe(errorMessage);
      }));
    });

    describe('vm.remove()', function () {
      beforeEach(function () {
        // Setup Productmodels
        $scope.vm.productmodel = mockProductmodel;
      });

      it('should delete the Productmodel and redirect to Productmodels', function () {
        // Return true on confirm message
        spyOn(window, 'confirm').and.returnValue(true);

        $httpBackend.expectDELETE(/api\/productmodels\/([0-9a-fA-F]{24})$/).respond(204);

        $scope.vm.remove();
        $httpBackend.flush();

        expect($state.go).toHaveBeenCalledWith('productmodels.list');
      });

      it('should should not delete the Productmodel and not redirect', function () {
        // Return false on confirm message
        spyOn(window, 'confirm').and.returnValue(false);

        $scope.vm.remove();

        expect($state.go).not.toHaveBeenCalled();
      });
    });
  });
}());
