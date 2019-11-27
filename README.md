# Workshop wrapping a REST API in GraphQL

## Installation

Clone the repository and run `npm install`

```
npm install
```

## Starting the server

```
npm start
```

The server will run on port 8080. You can change this by editing
config file.

# Workshop

## API

You will need an API Key which you can get from the
[Marvel Developer portal](https://developer.marvel.com). You need
to register an account here, to get the key. Once you have your
public and private keys add them to the `.env` in the root
directory. You are now ready to make calls to the Marvel API.

To be able to call the Marvel API you will also need a MD5 Hash.
You do not need to create the hash yourself.  
A Utility class `MD5Util` is provided to create the MD5 hash. For
more information please refer to the
[Authorizing and signing requests](https://developer.marvel.com/documentation/authorization)
section of the Marvel documentation.
