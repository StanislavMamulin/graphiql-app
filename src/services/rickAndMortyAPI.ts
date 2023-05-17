import { createApi, BaseQueryFn } from '@reduxjs/toolkit/query/react';
import { request, Variables } from 'graphql-request';

type GraphQLQueryProps = {
  document: string;
  variables?: Variables;
  headers?: { [headerKey: string]: string };
};

type GraphQLBaseQuery = ({ baseUrl }: { baseUrl: string }) => BaseQueryFn<GraphQLQueryProps>;

const graphqlBaseQuery: GraphQLBaseQuery =
  ({ baseUrl }) =>
  async ({ document, variables, headers }) => {
    const result = await request(baseUrl, document, variables, headers);
    return { data: result };
  };

export const rickAndMortyApi = createApi({
  reducerPath: 'rickAndMortyApi',
  baseQuery: graphqlBaseQuery({
    baseUrl: 'https://rickandmortyapi.com/graphql',
  }),
  endpoints: (builder) => ({
    sendRequest: builder.query({
      query: (request: GraphQLQueryProps) => ({
        document: request.document,
        variables: request.variables,
        headers: request.headers,
      }),
    }),
  }),
});

export const { useSendRequestQuery } = rickAndMortyApi;
