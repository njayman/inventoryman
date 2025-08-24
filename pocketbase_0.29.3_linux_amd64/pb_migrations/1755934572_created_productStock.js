/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = new Collection({
    "createRule": null,
    "deleteRule": null,
    "fields": [
      {
        "autogeneratePattern": "",
        "hidden": false,
        "id": "text3208210256",
        "max": 0,
        "min": 0,
        "name": "id",
        "pattern": "^[a-z0-9]+$",
        "presentable": false,
        "primaryKey": true,
        "required": true,
        "system": true,
        "type": "text"
      },
      {
        "autogeneratePattern": "",
        "hidden": false,
        "id": "_clone_dkXz",
        "max": 0,
        "min": 0,
        "name": "product_name",
        "pattern": "",
        "presentable": false,
        "primaryKey": false,
        "required": false,
        "system": false,
        "type": "text"
      },
      {
        "hidden": false,
        "id": "_clone_l2Je",
        "max": null,
        "min": 0,
        "name": "stockQuantity",
        "onlyInt": false,
        "presentable": false,
        "required": false,
        "system": false,
        "type": "number"
      },
      {
        "hidden": false,
        "id": "_clone_rTfg",
        "max": null,
        "min": 0,
        "name": "lowStockThreshold",
        "onlyInt": false,
        "presentable": false,
        "required": false,
        "system": false,
        "type": "number"
      },
      {
        "autogeneratePattern": "",
        "hidden": false,
        "id": "_clone_I2Cu",
        "max": 0,
        "min": 0,
        "name": "supplier_name",
        "pattern": "",
        "presentable": false,
        "primaryKey": false,
        "required": false,
        "system": false,
        "type": "text"
      },
      {
        "hidden": false,
        "id": "_clone_BWI9",
        "name": "last_updated",
        "onCreate": true,
        "onUpdate": true,
        "presentable": false,
        "system": false,
        "type": "autodate"
      }
    ],
    "id": "pbc_3122050317",
    "indexes": [],
    "listRule": null,
    "name": "productStock",
    "system": false,
    "type": "view",
    "updateRule": null,
    "viewQuery": "SELECT\n    id,\n    name as product_name,\n    stockQuantity,\n    lowStockThreshold,\n    name as supplier_name,\n    updated as last_updated\nFROM\n    products",
    "viewRule": null
  });

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3122050317");

  return app.delete(collection);
})
