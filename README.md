# JokeAPI GraphQL

GraphQL service for getting jokes from [Joke API](https://v2.jokeapi.dev/joke/Any) with JWT key authefication
## Installation

```bash
$ npm install
```

## Running the app

1. Generate keys for JWT sign and setup key files in the .env file
```bash
# Signature algorithm
# See .env.example for all supported algorithms
ALGORITHM=RS512

# Key file can be PEM encoded for RSA and ECDSA algorithms
# Or it is a plain text for HMAC-SHA secret
PRIVATE_KEY_FILE=assets/private.key

# For RSA and ECDSA algorithms, public PEM key is also needed
PUBLIC_KEY_FILE=assets/public.key
```

2. Run the app
```bash
# if your default nodeJS version is not v14.17.1
$ nvm use 

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```