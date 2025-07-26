{
  "_$ver": 1,
  "_$id": "lx8mwule",
  "_$type": "Scene",
  "left": 0,
  "right": 0,
  "top": 0,
  "bottom": 0,
  "name": "Scene2D",
  "width": 720,
  "height": 1280,
  "_$comp": [
    {
      "_$type": "b4000ac9-b0ff-4fae-84cc-376c885e1a08",
      "scriptPath": "../src/MainGame.ts",
      "fruitSprites": [
        {
          "_$uuid": "92870a81-3759-431b-a75b-454e5ed58fea",
          "_$type": "Texture2D"
        },
        {
          "_$uuid": "e9daeaf6-af06-4657-82ec-fa6a7e214d31",
          "_$type": "Texture2D"
        },
        {
          "_$uuid": "16105f80-b03b-495a-9b7b-c5cb5ccaa156",
          "_$type": "Texture2D"
        },
        {
          "_$uuid": "f5a58278-53d7-4c3b-877f-bc7f1f214e90",
          "_$type": "Texture2D"
        },
        {
          "_$uuid": "87993206-5645-4b05-b01d-903b30abe363",
          "_$type": "Texture2D"
        },
        {
          "_$uuid": "c3bd5d99-0ced-4561-bb8e-456f9ad63a57",
          "_$type": "Texture2D"
        },
        {
          "_$uuid": "81f53be6-157e-4cac-89c1-b0ff568ae437",
          "_$type": "Texture2D"
        },
        {
          "_$uuid": "649cd504-266c-4a8e-8df8-48458fa14b09",
          "_$type": "Texture2D"
        },
        {
          "_$uuid": "3836db71-ee59-4905-b52d-2b56caff1ac5",
          "_$type": "Texture2D"
        },
        {
          "_$uuid": "d14aecd1-a066-4bfa-8968-0a529ef45866",
          "_$type": "Texture2D"
        },
        {
          "_$uuid": "d14aecd1-a066-4bfa-8968-0a529ef45866",
          "_$type": "Texture"
        }
      ],
      "scoreLabel": {
        "_$ref": "62n6ibz4"
      },
      "fruitPre": {
        "_$uuid": "3673779d-8bc5-4f8d-b159-d669ce94989b",
        "_$type": "Prefab"
      },
      "topNode": {
        "_$ref": "qmf31hwz"
      }
    }
  ],
  "_$child": [
    {
      "_$id": "2fov3f1w",
      "_$type": "Sprite",
      "name": "bgLayer",
      "width": 100,
      "height": 100,
      "_$child": [
        {
          "_$id": "m1gesygi",
          "_$type": "Image",
          "name": "wall",
          "width": 720,
          "height": 1280,
          "skin": "res://c94d3ae1-8795-4191-85ea-f3b0588ac782",
          "useSourceSize": true,
          "color": "#ffffff",
          "_$comp": [
            {
              "_$type": "50686dac-323b-49d6-9a86-ac68057c73b6",
              "scriptPath": "../src/FillScreen.ts"
            }
          ]
        },
        {
          "_$id": "b7yw3yto",
          "_$type": "Image",
          "name": "down",
          "x": 1,
          "y": 1234,
          "width": 720,
          "height": 500,
          "skin": "res://0baa6304-beb8-4dc8-bd36-acd96999fe17",
          "sizeGrid": "28,0,0,0,0",
          "color": "#ffffff",
          "_$comp": [
            {
              "_$type": "RigidBody",
              "type": "static"
            },
            {
              "_$id": "dcyt",
              "_$type": "BoxCollider",
              "density": 1,
              "width": 720,
              "height": 500
            }
          ]
        },
        {
          "_$id": "0242x4zu",
          "_$type": "Sprite",
          "name": "left",
          "x": -20,
          "width": 20,
          "height": 1280,
          "_$comp": [
            {
              "_$type": "RigidBody",
              "type": "static"
            },
            {
              "_$id": "bxex",
              "_$type": "BoxCollider",
              "density": 1,
              "width": 20,
              "height": 1280
            }
          ]
        },
        {
          "_$id": "fz7sz2wd",
          "_$type": "Sprite",
          "name": "right",
          "x": 720,
          "width": 20,
          "height": 1280,
          "_$comp": [
            {
              "_$type": "RigidBody",
              "type": "static"
            },
            {
              "_$id": "bxex",
              "_$type": "BoxCollider",
              "density": 1,
              "width": 20,
              "height": 1280
            }
          ]
        }
      ]
    },
    {
      "_$id": "62n6ibz4",
      "_$type": "FontClip",
      "name": "scoreLabel",
      "x": 35,
      "y": 114,
      "width": 276,
      "height": 116,
      "interval": 50,
      "skin": "res://8ea0f59d-8099-4a29-b726-d5521b048334",
      "sheet": "0123456789",
      "value": "0",
      "spaceX": 0,
      "spaceY": 0,
      "_$comp": [
        {
          "_$type": "f965e3d3-2953-4352-92ca-f54573453ba4",
          "scriptPath": "../src/AdjustWithHeight.ts",
          "offset": 50,
          "hasShowEffect": false
        }
      ]
    },
    {
      "_$id": "a6zlbw2m",
      "_$type": "Sprite",
      "name": "fruitNode",
      "y": 120,
      "width": 100,
      "height": 2,
      "_$comp": [
        {
          "_$type": "f965e3d3-2953-4352-92ca-f54573453ba4",
          "scriptPath": "../src/AdjustWithHeight.ts",
          "offset": 120,
          "hasShowEffect": false
        }
      ]
    },
    {
      "_$id": "qmf31hwz",
      "_$type": "Sprite",
      "name": "topNode",
      "y": 120,
      "width": 100,
      "height": 2,
      "_$comp": [
        {
          "_$type": "f965e3d3-2953-4352-92ca-f54573453ba4",
          "scriptPath": "../src/AdjustWithHeight.ts",
          "offset": 120,
          "hasShowEffect": false
        }
      ],
      "_$child": [
        {
          "_$id": "bghl9kg4",
          "_$type": "Sprite",
          "name": "dashLine",
          "y": 100,
          "width": 711,
          "height": 8,
          "anchorY": 0.5,
          "texture": {
            "_$uuid": "0f791309-e6af-4da8-ba4f-71d599a7a6dc",
            "_$type": "Texture"
          }
        }
      ]
    }
  ]
}