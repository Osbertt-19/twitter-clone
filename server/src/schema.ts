import * as path from 'path'
import { makeExecutableSchema } from "graphql-tools"
import {
  fileLoader,
  mergeTypes,
  mergeResolvers,
} from "merge-graphql-schemas"

const typeDefs = fileLoader(path.join(__dirname, "/modules/**/*.graphql"));
const resolvers = fileLoader(path.join(__dirname, "/modules/**/*.ts"));

export const schema = makeExecutableSchema({
  typeDefs: mergeTypes(typeDefs),
  resolvers: mergeResolvers(resolvers),
});

