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
        "cascadeDelete": false,
        "collectionId": "pbc_4092854851",
        "hidden": false,
        "id": "relation1166304858",
        "maxSelect": 1,
        "minSelect": 0,
        "name": "product_id",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "relation"
      },
      {
        "autogeneratePattern": "",
        "hidden": false,
        "id": "_clone_Z4xV",
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
        "id": "json2286207058",
        "maxSize": 1,
        "name": "total_stock",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "json"
      }
    ],
    "id": "pbc_3764684605",
    "indexes": [],
    "listRule": null,
    "name": "product_stock_overview",
    "system": false,
    "type": "view",
    "updateRule": null,
    "viewQuery": "SELECT (ROW_NUMBER() OVER()) as id, p.id AS product_id, p.name AS product_name, SUM(r.quantity_remaining) AS total_stock FROM restocks AS r LEFT JOIN products AS p on r.product = p.id WHERE r.quantity_remaining > 0 GROUP BY p.id",
    "viewRule": null
  });

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3764684605");

  return app.delete(collection);
})
