# Demo Preparation

## One time

1. Restart Rasbery neustarten um Lizenz-Ablaud zu verhindern
2. Standardwinkel des Greifers richtig setzen lassen von Lenze

## Every run

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