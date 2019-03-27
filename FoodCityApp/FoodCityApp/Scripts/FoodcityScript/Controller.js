app.controller("myCtrl", function ($scope, myService) {
    $scope.divInventory = false;
    GetAllInventories();
    //To Get all inventory records
    function GetAllInventories() {

        var getInventoryData = myService.getInventories();
        getInventoryData.then(function (inventory) {
            $scope.inventory = inventory.data;
        }, function () {
                alert('Error in getting inventory records');
        });
    }

    $scope.editInventory = function (inventory) {
        var getinventoryData = myService.getInventory(inventory.Id);
        getinventoryData.then(function (_inventory) {
            $scope.inventory = _inventory.data;
            $scope.inventoryId = inventory.Id;
            $scope.inventoryName = inventory.Name;
            $scope.inventoryDescription = inventory.Description;
            $scope.inventoryUnitPrice = inventory.UnitPrice;
            $scope.inventoryNo_Of_Unit = inventory.No_Of_Unit;
            $scope.Action = "Update";
            $scope.divInventory = true;
        }, function () {
            alert('Error in getting book records');
        });
    }

    $scope.AddUpdateInventory = function () {
        var Inventory = {
            Name: $scope.inventoryName,
            Description: $scope.inventoryDescription,
            UnitPrice: $scope.inventoryUnitPrice,
            No_Of_Unit: $scope.inventoryNo_Of_Unit
        };
        var getInventoryAction = $scope.Action;

        if (getInventoryAction == "Update") {
            Inventory.Id = $scope.inventoryId;
            var getInventoryData = myService.UpdateInventorie(Inventory);
            getInventoryData.then(function (msg) {
                GetAllInventories();
                alert(msg.data);
                $scope.divInventory = false;
            }, function () {
                    alert('Error in updating Inventory record');
            });
        } else {
            var getInventoryData = myService.AddInventorie(Inventory);
            getInventoryData.then(function (msg) {
                GetAllInventories();
                alert(msg.data);
                $scope.divInventory = false;
            }, function () {
                    alert('Error in adding Inventory record');
            });
        }
    }

    $scope.AddInventoryDiv = function () {
        ClearFields();
        $scope.Action = "Add";
        $scope.divInventory = true;
    }

    $scope.deleteInventory = function (inventory) {
        var getInventoryData = myService.DeleteInventorie(inventory.Id);
        getInventoryData.then(function (msg) {
            alert(msg.data);
            GetAllInventories();
        }, function () {
                alert('Error in deleting inventory record');
        });
    }

    function ClearFields() {
        $scope.inventoryId = "";
        $scope.inventoryName = "";
        $scope.inventoryDescription = "";
        $scope.inventoryUnitPrice = "";
        $scope.inventoryNo_Of_Unit = "";
    }

    $scope.Cancel = function () {
        $scope.divInventory = false;
    };

});