import type { APIRoute } from 'astro';
import { createYoga, createSchema } from 'graphql-yoga';
import Cars from '@data/cars';

const schema = createSchema({
  typeDefs: `
    type CarItem {
      id: Int!
      make: String!
      model: String!
    }
    type Query {
      car: [CarItem!]
    }
  `,
  resolvers: {
    Query: {
      car: () => Cars,
    },
  },
});

const { handleRequest } = createYoga({
  schema,
  graphqlEndpoint: '/api/graphql',
  fetchAPI: {
    Request: Request,
    Response: Response,
  },
});

export const POST: APIRoute = async (context) => {
  const { request } = context;
  return handleRequest(request, context);
};
