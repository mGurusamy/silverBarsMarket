# Silver Bars Market - Live Order Board API

## Summary:
#### Live Order Board App API service is running and exposing `/orders` endpoint on port number `8000`. Client of this API service can avail the below facilities offered by this API service.

- client can register/`post` an `order`. Orders are stored in InMemory Array for this exercise.
  - `order` entity should have below properties to be accepted by this api service
    - `order` should have `id`
    - `order` should have `quantity`
    - `order` should have `price`
    - `order` should have `type`
    - `type` property should be either `SELL || BUY`
- client can `delete` an `order` which was already registered. This will remove the `order` from InMemory Array
- client can `get orderSummary` by accessing the above end point(`http://{domainprefix}:{port}/orders`)
  - it merges `order.quantity` when the order price and types are same.
  - all `SELL` type orders displayed in ascending order of `price`
  - all `BUY` type orders displayed in descending order of `price`

## NPM Script Details

- This API service needs stable version of `node` and `npm`[node package manager]
- All the dependencies and npm script details are held in `package.json` in the root folder
- run `npm install` to download all its dependencies
- run `npm start` will spin up the api service on the host machine on `port 8000`
- run `npm run test:unit` for unit testing
- run `npm run test:unit:coverage` for unit testing coverage
- run `npm run test:int` for integration testing

## Assumptions
- Below are the assumptions I had to bring this api service
  - built purely for this exercise purpose with tight time constraint.
  - more specific `Error` can be thrown when the order doesn't have individual properties.
  - assumed no api `authendication` and `authorization` required. if its needed, `jwt` token should be verified before service the client || mutual auth certificate based verfication can be done before sevice the client.
  - `pm2` should be the ideal to run the node process for stable environment
  - `logging` can be added appropriately and it will be held in `pm2 logs` file
  - individual `DockerFile` and `Docker Compose File` is the ideal way to spin up api services in a standalone host environment
  - code base not hosted in any distributed version control system
  - code base not pushed to any repository like nexus