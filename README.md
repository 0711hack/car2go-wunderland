# Demo Preparation

1. init `wonderland/state.json` file
2. check constant `ENDPOINT_URL` in `robot-controller/controller.js`
3. check constant `maxVehicleCount` in `wonderland/lib/wonderland.js`
4. run `node index.js`

# Transfer format
## Tranform triggers Data-Fetcher

``
[
 {
  "id":"ka",
  "x":123
  "y"":123
 }
]
``

## robot-controller triggers controller
``
[  
   {  
      "from":{  
         "x":123,
         "y":123
      },
      "to":{  
         "x":123,
         "y":123
      }
   }
]
``