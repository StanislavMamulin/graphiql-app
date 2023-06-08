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
    try {
      const result = await request(baseUrl, document, variables, headers);
      return { data: result };
    } catch (error) {
      return { error };
    }
  };

export const rickAndMortyApi = createApi({
  reducerPath: 'rickAndMortyApi',
  baseQuery: graphqlBaseQuery({
    baseUrl: 'https://rickandmortyapi.com/graphql',
  }),
  endpoints: (builder) => ({
    sendRequest: builder.query({
      query: (request: GraphQLQueryProps) => request,
    }),
  }),
});

export const { useSendRequestQuery, useLazySendRequestQuery } = rickAndMortyApi;
