(function () {
  'use strict';

  describe('Deliveryitems Route Tests', function () {
    // Initialize global variables
    var $scope,
      DeliveryitemsService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _DeliveryitemsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      DeliveryitemsService = _DeliveryitemsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('deliveryitems');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/deliveryitems');
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
          DeliveryitemsController,
          mockDeliveryitem;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('deliveryitems.view');
          $templateCache.put('modules/deliveryitems/client/views/view-deliveryitem.client.view.html', '');

          // create mock Deliveryitem
          mockDeliveryitem = new DeliveryitemsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Deliveryitem Name'
          });

          // Initialize Controller
          DeliveryitemsController = $controller('DeliveryitemsController as vm', {
            $scope: $scope,
            deliveryitemResolve: mockDeliveryitem
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:deliveryitemId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.deliveryitemResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            deliveryitemId: 1
          })).toEqual('/deliveryitems/1');
        }));

        it('should attach an Deliveryitem to the controller scope', function () {
          expect($scope.vm.deliveryitem._id).toBe(mockDeliveryitem._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/deliveryitems/client/views/view-deliveryitem.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          DeliveryitemsController,
          mockDeliveryitem;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('deliveryitems.create');
          $templateCache.put('modules/deliveryitems/client/views/form-deliveryitem.client.view.html', '');

          // create mock Deliveryitem
          mockDeliveryitem = new DeliveryitemsService();

          // Initialize Controller
          DeliveryitemsController = $controller('DeliveryitemsController as vm', {
            $scope: $scope,
            deliveryitemResolve: mockDeliveryitem
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.deliveryitemResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/deliveryitems/create');
        }));

        it('should attach an Deliveryitem to the controller scope', function () {
          expect($scope.vm.deliveryitem._id).toBe(mockDeliveryitem._id);
          expect($scope.vm.deliveryitem._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/deliveryitems/client/views/form-deliveryitem.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          DeliveryitemsController,
          mockDeliveryitem;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('deliveryitems.edit');
          $templateCache.put('modules/deliveryitems/client/views/form-deliveryitem.client.view.html', '');

          // create mock Deliveryitem
          mockDeliveryitem = new DeliveryitemsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Deliveryitem Name'
          });

          // Initialize Controller
          DeliveryitemsController = $controller('DeliveryitemsController as vm', {
            $scope: $scope,
            deliveryitemResolve: mockDeliveryitem
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:deliveryitemId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.deliveryitemResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            deliveryitemId: 1
          })).toEqual('/deliveryitems/1/edit');
        }));

        it('should attach an Deliveryitem to the controller scope', function () {
          expect($scope.vm.deliveryitem._id).toBe(mockDeliveryitem._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/deliveryitems/client/views/form-deliveryitem.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
