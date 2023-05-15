import { createApi } from '@reduxjs/toolkit/query/react';
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query';
import { getIntrospectionQuery, IntrospectionQuery } from 'graphql';
import { gql } from 'graphql-request';

type Data = {
  document?: string;
  variables?: Record<string, string>;
  headers?: Record<string, string>;
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: graphqlRequestBaseQuery({
    url: 'https://rickandmortyapi.com/graphql',
  }),
  endpoints: ({ query }) => ({
    getSchema: query<IntrospectionQuery, void>({
      query: () => ({
        document: getIntrospectionQuery(),
      }),
    }),
    getData: query<Record<string, string>, Data>({
      query: ({ document, variables, headers }) => ({
        document: gql`
          ${document}
        `,
        variables,
        headers,
      }),
    }),
  }),
});

export const { useGetSchemaQuery, useLazyGetDataQuery } = api;
