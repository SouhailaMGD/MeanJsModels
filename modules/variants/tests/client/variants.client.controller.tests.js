(function () {
  'use strict';

  describe('Variants Controller Tests', function () {
    // Initialize global variables
    var VariantsController,
      $scope,
      $httpBackend,
      $state,
      Authentication,
      VariantsService,
      mockVariant;

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
    beforeEach(inject(function ($controller, $rootScope, _$state_, _$httpBackend_, _Authentication_, _VariantsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();

      // Point global variables to injected services
      $httpBackend = _$httpBackend_;
      $state = _$state_;
      Authentication = _Authentication_;
      VariantsService = _VariantsService_;

      // create mock Variant
      mockVariant = new VariantsService({
        _id: '525a8422f6d0f87f0e407a33',
        name: 'Variant Name'
      });

      // Mock logged in user
      Authentication.user = {
        roles: ['user']
      };

      // Initialize the Variants controller.
      VariantsController = $controller('VariantsController as vm', {
        $scope: $scope,
        variantResolve: {}
      });

      // Spy on state go
      spyOn($state, 'go');
    }));

    describe('vm.save() as create', function () {
      var sampleVariantPostData;

      beforeEach(function () {
        // Create a sample Variant object
        sampleVariantPostData = new VariantsService({
          name: 'Variant Name'
        });

        $scope.vm.variant = sampleVariantPostData;
      });

      it('should send a POST request with the form input values and then locate to new object URL', inject(function (VariantsService) {
        // Set POST response
        $httpBackend.expectPOST('api/variants', sampleVariantPostData).respond(mockVariant);

        // Run controller functionality
        $scope.vm.save(true);
        $httpBackend.flush();

        // Test URL redirection after the Variant was created
        expect($state.go).toHaveBeenCalledWith('variants.view', {
          variantId: mockVariant._id
        });
      }));

      it('should set $scope.vm.error if error', function () {
        var errorMessage = 'this is an error message';
        $httpBackend.expectPOST('api/variants', sampleVariantPostData).respond(400, {
          message: errorMessage
        });

        $scope.vm.save(true);
        $httpBackend.flush();

        expect($scope.vm.error).toBe(errorMessage);
      });
    });

    describe('vm.save() as update', function () {
      beforeEach(function () {
        // Mock Variant in $scope
        $scope.vm.variant = mockVariant;
      });

      it('should update a valid Variant', inject(function (VariantsService) {
        // Set PUT response
        $httpBackend.expectPUT(/api\/variants\/([0-9a-fA-F]{24})$/).respond();

        // Run controller functionality
        $scope.vm.save(true);
        $httpBackend.flush();

        // Test URL location to new object
        expect($state.go).toHaveBeenCalledWith('variants.view', {
          variantId: mockVariant._id
        });
      }));

      it('should set $scope.vm.error if error', inject(function (VariantsService) {
        var errorMessage = 'error';
        $httpBackend.expectPUT(/api\/variants\/([0-9a-fA-F]{24})$/).respond(400, {
          message: errorMessage
        });

        $scope.vm.save(true);
        $httpBackend.flush();

        expect($scope.vm.error).toBe(errorMessage);
      }));
    });

    describe('vm.remove()', function () {
      beforeEach(function () {
        // Setup Variants
        $scope.vm.variant = mockVariant;
      });

      it('should delete the Variant and redirect to Variants', function () {
        // Return true on confirm message
        spyOn(window, 'confirm').and.returnValue(true);

        $httpBackend.expectDELETE(/api\/variants\/([0-9a-fA-F]{24})$/).respond(204);

        $scope.vm.remove();
        $httpBackend.flush();

        expect($state.go).toHaveBeenCalledWith('variants.list');
      });

      it('should should not delete the Variant and not redirect', function () {
        // Return false on confirm message
        spyOn(window, 'confirm').and.returnValue(false);

        $scope.vm.remove();

        expect($state.go).not.toHaveBeenCalled();
      });
    });
  });
}());
