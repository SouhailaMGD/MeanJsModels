(function () {
  'use strict';

  describe('Deliveries Route Tests', function () {
    // Initialize global variables
    var $scope,
      DeliveriesService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _DeliveriesService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      DeliveriesService = _DeliveriesService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('deliveries');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/deliveries');
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
          DeliveriesController,
          mockDelivery;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('deliveries.view');
          $templateCache.put('modules/deliveries/client/views/view-delivery.client.view.html', '');

          // create mock Delivery
          mockDelivery = new DeliveriesService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Delivery Name'
          });

          // Initialize Controller
          DeliveriesController = $controller('DeliveriesController as vm', {
            $scope: $scope,
            deliveryResolve: mockDelivery
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:deliveryId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.deliveryResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            deliveryId: 1
          })).toEqual('/deliveries/1');
        }));

        it('should attach an Delivery to the controller scope', function () {
          expect($scope.vm.delivery._id).toBe(mockDelivery._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/deliveries/client/views/view-delivery.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          DeliveriesController,
          mockDelivery;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('deliveries.create');
          $templateCache.put('modules/deliveries/client/views/form-delivery.client.view.html', '');

          // create mock Delivery
          mockDelivery = new DeliveriesService();

          // Initialize Controller
          DeliveriesController = $controller('DeliveriesController as vm', {
            $scope: $scope,
            deliveryResolve: mockDelivery
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.deliveryResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/deliveries/create');
        }));

        it('should attach an Delivery to the controller scope', function () {
          expect($scope.vm.delivery._id).toBe(mockDelivery._id);
          expect($scope.vm.delivery._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/deliveries/client/views/form-delivery.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          DeliveriesController,
          mockDelivery;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('deliveries.edit');
          $templateCache.put('modules/deliveries/client/views/form-delivery.client.view.html', '');

          // create mock Delivery
          mockDelivery = new DeliveriesService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Delivery Name'
          });

          // Initialize Controller
          DeliveriesController = $controller('DeliveriesController as vm', {
            $scope: $scope,
            deliveryResolve: mockDelivery
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:deliveryId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.deliveryResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            deliveryId: 1
          })).toEqual('/deliveries/1/edit');
        }));

        it('should attach an Delivery to the controller scope', function () {
          expect($scope.vm.delivery._id).toBe(mockDelivery._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/deliveries/client/views/form-delivery.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
