# Munchkin Server

This server has been created with Socket.io and Express Server to serve the client and the API

The Front is made with React <3

## Implementation 
### Requests

Clients can trigger events like : 
 - ```player:action``` with ```payload``` object to trigger some player actions like 
 ```json
  {
    "action" : "XXX",
    "payload" : {
      ...args
    }
  }
 ```