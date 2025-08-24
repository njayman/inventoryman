/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_4121054073")

  // add field
  collection.fields.addAt(7, new Field({
    "hidden": false,
    "id": "number565310835",
    "max": null,
    "min": null,
    "name": "sales_price_per_unit",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // update field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "number3402113753",
    "max": null,
    "min": 0,
    "name": "purchase_price_per_unit",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_4121054073")

  // remove field
  collection.fields.removeById("number565310835")

  // update field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "number3402113753",
    "max": null,
    "min": 0,
    "name": "price",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
})
