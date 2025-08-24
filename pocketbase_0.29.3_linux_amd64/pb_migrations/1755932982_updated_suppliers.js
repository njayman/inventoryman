/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3355664324")

  // add field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "file347571224",
    "maxSelect": 1,
    "maxSize": 0,
    "mimeTypes": [
      "image/png",
      "image/vnd.mozilla.apng",
      "image/jpeg",
      "image/webp",
      "image/gif"
    ],
    "name": "photo",
    "presentable": false,
    "protected": false,
    "required": false,
    "system": false,
    "thumbs": [],
    "type": "file"
  }))

  // add field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "file3630795382",
    "maxSelect": 99,
    "maxSize": 0,
    "mimeTypes": [
      "image/png",
      "image/vnd.mozilla.apng",
      "image/jpeg",
      "image/webp",
      "image/gif",
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ],
    "name": "document",
    "presentable": false,
    "protected": false,
    "required": false,
    "system": false,
    "thumbs": [],
    "type": "file"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3355664324")

  // remove field
  collection.fields.removeById("file347571224")

  // remove field
  collection.fields.removeById("file3630795382")

  return app.save(collection)
})
