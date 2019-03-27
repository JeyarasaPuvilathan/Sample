using FoodCityApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

namespace FoodCityApp.Controllers
{
    public class HomeController : Controller
    {
        // GET: Book

        public ActionResult Index()
        {
            return View();
        }

        // GET: All Inventorie
        public JsonResult GetAllInventories()
        {
            using (FoodCity_DbEntities contextObj = new FoodCity_DbEntities())
            {
                var InventorieList = contextObj.Inventories.ToList();
                return Json(InventorieList, JsonRequestBehavior.AllowGet);
            }
        }
        //GET: Inventorie by Id
        public JsonResult GetInventorieById(string id)
        {
            using (FoodCity_DbEntities contextObj = new FoodCity_DbEntities())
            {
                var InventorieId = Convert.ToInt32(id);
                var getInventorieById = contextObj.Inventories.Find(InventorieId);
                return Json(getInventorieById, JsonRequestBehavior.AllowGet);
            }
        }
        //Update Inventorie
        public string UpdateInventorie(Inventory inventorie)
        {
            if (inventorie != null)
            {
                using (FoodCity_DbEntities contextObj = new FoodCity_DbEntities())
                {
                    int InventorieId = Convert.ToInt32(inventorie.Id);
                    Inventory _inventorie = contextObj.Inventories.Where(b => b.Id == InventorieId).FirstOrDefault();
                    _inventorie.Name = inventorie.Name;
                    _inventorie.Description = inventorie.Description;
                    _inventorie.UnitPrice = inventorie.UnitPrice;
                    _inventorie.No_Of_Unit = inventorie.No_Of_Unit;
                    contextObj.SaveChanges();
                    return "Inventory record updated successfully";
                }
            }
            else
            {
                return "Invalid Inventory record";
            }
        }
        // Add Inventory
        public string AddInventorie(Inventory inventorie)
        {
            if (inventorie != null)
            {
                using (FoodCity_DbEntities contextObj = new FoodCity_DbEntities())
                {
                    contextObj.Inventories.Add(inventorie);
                    contextObj.SaveChanges();
                    return "Inventories record added successfully";
                }
            }
            else
            {
                return "Invalid Inventories record";
            }
        }
        // Delete book
        public string DeleteInventorie(string inventorieId)
        {

            if (!String.IsNullOrEmpty(inventorieId))
            {
                try
                {
                    int _inventoriebookId = Int32.Parse(inventorieId);
                    using (FoodCity_DbEntities contextObj = new FoodCity_DbEntities())
                    {
                        var _inventorie = contextObj.Inventories.Find(_inventoriebookId);
                        contextObj.Inventories.Remove(_inventorie);
                        contextObj.SaveChanges();
                        return "Selected inventorie record deleted sucessfully";
                    }
                }
                catch (Exception)
                {
                    return "inventorie details not found";
                }
            }
            else
            {
                return "Invalid operation";
            }
        }

    }


}
