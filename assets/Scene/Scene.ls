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
              "scriptPath": "Script/FillScreen.ts"
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
          "color": "#ffffff"
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
              "scriptPath": "Script/AdjustWithHeight.ts",
              "offset": 50,
              "hasShowEffect": false
            }
          ]
        }
      ]
    }
  ]
}