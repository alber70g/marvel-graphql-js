import path from 'path';
import { makeExecutableSchema } from 'graphql-tools';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import { isArray } from 'util';

let typesArray = fileLoader(path.join(__dirname, '../types'), {
  recursive: true,
});
let resolversArray = fileLoader(path.join(__dirname, '../resolvers'));

typesArray = isArray(typesArray) ? typesArray : [typesArray];
resolversArray = isArray(resolversArray) ? resolversArray : [resolversArray];

const allTypes = mergeTypes(typesArray);
const allResolvers = mergeResolvers(resolversArray);

const schema = makeExecutableSchema({
  typeDefs: allTypes,
  resolvers: allResolvers,
});

export default schema;
