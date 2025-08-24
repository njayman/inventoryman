/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_4121054073")

  // add field
  collection.fields.addAt(6, new Field({
    "hidden": false,
    "id": "number908331628",
    "max": null,
    "min": 0,
    "name": "quantity_remaining",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // update field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "number2683508278",
    "max": null,
    "min": 0,
    "name": "quantity_initial",
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
  collection.fields.removeById("number908331628")

  // update field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "number2683508278",
    "max": null,
    "min": 0,
    "name": "quantity",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
})
