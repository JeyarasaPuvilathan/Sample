app.service("myService", function ($http) {

    //get All inventory
    this.getInventories = function () {
        return $http.get("Home/GetAllInventories");
    };

    // get inventory by inventoryId
    this.getInventory = function (inventoryId) {
        var response = $http({
            method: "post",
            url: "Home/GetInventorieById",
            params: {
                id: JSON.stringify(inventoryId)
            }
        });
        return response;
    }

    // Update inventory
    this.updateInventory = function (inventory) {
        var response = $http({
            method: "post",
            url: "Home/UpdateInventorie",
            data: JSON.stringify(inventory),
            dataType: "json"
        });
        return response;
    }

    // Add inventory
    this.AddInventory = function (inventory) {
        var response = $http({
            method: "post",
            url: "Home/AddInventorie",
            data: JSON.stringify(inventory),
            dataType: "json"
        });
        return response;
    }

    //Delete inventory
    this.DeleteInventory = function (inventoryId) {
        var response = $http({
            method: "post",
            url: "Home/DeleteBook",
            params: {
                bookId: JSON.stringify(inventoryId)
            }
        });
        return response;
    }

});