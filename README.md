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

The server will run on port 8080. The server will restart
automatically when you change code.

# Workshop

## 1. Marvel API

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

## 2. Create your first schema + resolver combo

**Assignment:** Create a "Hello World!" in GraphQL

Make a change to the **schema** open
`graphql/types/schema.graphql` and add a property

```graphql
type Query {
  hello: String!
}
```

Now create the **resolver** open `graphql/resolvers/query.js` and
add the resolver

```js
const resolveFunctions = {
  Query: {
    hello() {
      return 'world!';
    },
  },
};
```

**Assignment:** Run a query in
[http://localhost:8080/graphiql](http://localhost:8080/graphiql)
that returns `{ data: { hello: "World!" } }`

## 3. Get characters from the Marvel API

We've created a context variable with the Marvel API Service.
This is available in the GraphQL Context.

The third parameter in a resolver is the one that provides the
context that's being defined. The context is added to the
resolvers as an argument in [`/server.js:29`](/server.js) on
line 29.

The service is defined as a class in
[`/services/marvel.js`](/services/marvel.js)

Here's a code snippet to get one `character` by `id`:

```js
const resolveFunctions = {
  Query: {
    async character(_, args, { marvel }) {
      return marvel.getCharacter(args.id);
    },
  },
};
```

**Assignment:** Make a change to the schema to be able to request
both `characters` (plural) and `character(id: Int!)` and write
your own resolvers. Your type should contain the properties:
`id`, `name`, `description`

## 4. Add thumbnail to your character type

Now that we have a character we can also add the Thumbnail that's
being returned from the Marvel API. To do so, add the following
to the schema. Doing this will allow your clients to query this
part from GraphQL and it'll be automatically included from the
Marvel API response

```graphql
type Character {
  thumbnail: Thumbnail
}

type Thumbnail {
  path: String
  extension: String
}
```

**Assignment:** Add thumbnail to your schema

## 5. Flatten "Thumbnail" from the Character type

Up to now we only used data from the Marvel API directly.
However, it would be nice to flatten our `Thumbnail` into a
string, so it can be used without joining the `path` and
`extension`.

**Assignment:** Change your schema to reflect the `thumbnail`
property of `Character` as a `String`.

## 6. **Advanced:** Add a "Favorite" workflow to your API

To create a service in [/services](/services), make a class and
add it to the context [/server.js](/server.js). This service will
be available as a property of context as the third argument in a
resolver:

```js
myResolver(parent, args, context){
  context.marvel.getCharacters();
  context.myservice.myfunction();
}
```

**Assignment:** Create a service that can track a list of
"favorite" superheroes by ID. Fill it with some samle data

## 7. **Advanced:** Add a mutation to toggle a Super Hero as "Favorite"

GraphQL is a query language where the Query and Mutation model
are separate from each other. It's designed so that you don't do
_CRUD_ on every _type_. However, every mutation returns a type of
the "query model".

A schema defines a mutation in the root `type Mutation`

```
type Mutation {
  setFavorite(id: Int): Character
}
```

The resolver mutation is defined in
[/graphql/resolvers/](/graphql/resolvers/). For example in a new
file called `mutations.js`.

```js
```

**Assignment:** Add a method to your custom service, to set a
hero as a favorite. Use this method to implement the resolver for
the mutation.

## 8. **Advanced:** Retrieve if a Hero is a favorite

To use this Favorite service, we can add a property
`favorite: Boolean` to the Character type.

**Assignment:** Add favorite to Character, and retrieve it using
a resolver

## 9. **Advanced:** Make a hero non-favorite

**Assignment:** Make a _schema_, _resolver_ and _service_ change
that allows the client to un-favorite a hero.

## 10. **Very advanced:** Make a subscription

Subscriptions are used to notify a client of a change. Take a
look at
[the example code here](https://github.com/tomyitav/graphql-server-seed/blob/master/graphql/resolvers/cars.js#L67).

Browse the repo to get a good overview of what needs to be done.

**Assignment:** Make a subscription that fires whenever a Hero is
favorited or un-favorited.
