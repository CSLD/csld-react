# CSLD
Larp database is a portal for czech and slovak larp community.
# Architecture
Backend (processing and storing data) is exposed by Java server, you can find it in  v https://github.com/CSLD/CSLD
This backend server serves frontend React client (this repo) communication with backend via GraphQL API.

# How to run client
## Prerequisites
* npm (tested with version 6.3.14)
* nodeJS (tested with version 13.7.0)
## Running the client
1. Switch to the `devel` branch
1. Install dependencies by running `yarn install`
1. Run 
```
yarn dev - dev mode against local Java server
yarn dev-staging - dev mode against staging Java server
yarn dev-prod - dev mode against production Java server
```