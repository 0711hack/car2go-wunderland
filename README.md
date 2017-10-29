# Demo Preparation

## One time

1. Restart Raspberry neustarten um Lizenz-Ablaud zu verhindern
2. Standardwinkel des Greifers richtig setzen lassen von Lenze

## Every run

1. init `wonderland/state.json` file
2. check constant `ENDPOINT_URL` in `robot-controller/controller.js`
3. check constant `maxVehicleCount` in `wonderland/lib/wonderland.js`
4. put cars in parking position
5. calibrate robot, run `cd robot-conroller/ && node position.js && cd ..`
6. start placement loop, run `node index.js`

* `CTRL+C` to stop.
* `CTRL+C` again to kill which will result in broken `state.json` and requires to start from scratch

## Things to monitor

```
ping 10.200.21.54 # Raspberry pi
ping 10.200.21.99 # Robot
ping 8.8.8.8 # Internet access
```

# Transfer format
## Tranform triggers Data-Fetcher

```
[
 {
  "id":"ka",
  "x":123
  "y"":123
 }
]
```

## robot-controller triggers controller
```
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
```
