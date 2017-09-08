(function () {
  'use strict';

  describe('Customfields Route Tests', function () {
    // Initialize global variables
    var $scope,
      CustomfieldsService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _CustomfieldsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      CustomfieldsService = _CustomfieldsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('customfields');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/customfields');
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
          CustomfieldsController,
          mockCustomfield;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('customfields.view');
          $templateCache.put('modules/customfields/client/views/view-customfield.client.view.html', '');

          // create mock Customfield
          mockCustomfield = new CustomfieldsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Customfield Name'
          });

          // Initialize Controller
          CustomfieldsController = $controller('CustomfieldsController as vm', {
            $scope: $scope,
            customfieldResolve: mockCustomfield
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:customfieldId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.customfieldResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            customfieldId: 1
          })).toEqual('/customfields/1');
        }));

        it('should attach an Customfield to the controller scope', function () {
          expect($scope.vm.customfield._id).toBe(mockCustomfield._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/customfields/client/views/view-customfield.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          CustomfieldsController,
          mockCustomfield;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('customfields.create');
          $templateCache.put('modules/customfields/client/views/form-customfield.client.view.html', '');

          // create mock Customfield
          mockCustomfield = new CustomfieldsService();

          // Initialize Controller
          CustomfieldsController = $controller('CustomfieldsController as vm', {
            $scope: $scope,
            customfieldResolve: mockCustomfield
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.customfieldResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/customfields/create');
        }));

        it('should attach an Customfield to the controller scope', function () {
          expect($scope.vm.customfield._id).toBe(mockCustomfield._id);
          expect($scope.vm.customfield._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/customfields/client/views/form-customfield.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          CustomfieldsController,
          mockCustomfield;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('customfields.edit');
          $templateCache.put('modules/customfields/client/views/form-customfield.client.view.html', '');

          // create mock Customfield
          mockCustomfield = new CustomfieldsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Customfield Name'
          });

          // Initialize Controller
          CustomfieldsController = $controller('CustomfieldsController as vm', {
            $scope: $scope,
            customfieldResolve: mockCustomfield
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:customfieldId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.customfieldResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            customfieldId: 1
          })).toEqual('/customfields/1/edit');
        }));

        it('should attach an Customfield to the controller scope', function () {
          expect($scope.vm.customfield._id).toBe(mockCustomfield._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/customfields/client/views/form-customfield.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
