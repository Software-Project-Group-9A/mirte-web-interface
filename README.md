# mirte-web-interface

This repository contains both the backend (NodeJS) and frontend (Vue) of the robot. 

## Preparations

In order to build and run both the frontend and backend one needs an installation of NodeJS. We
prefer using nodeenv.

```
sudo apt install -y python3-pip python3-setuptools python3-wheel
sudo -H pip install nodeenv
nodeenv --node=16.2.0 node_env
source node_env/bin/activate
```

## Build and run the frontend

```
cd vue-frontend
npm install .
npm run build
```

This will build a dist folder which will be served by the backend.


## Build and run the backend

```
cd nodejs-backend
npm install .
npm run backend
```

## Develop for the frontend

The orange pi might not have enough power to build the backend. In order to develop on your own machine
you could also serve the frontend on your local machine (without the backend). 

```
cd vue-frontend
npm install .
npm run serve
```


