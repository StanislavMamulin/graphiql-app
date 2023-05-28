import { BASE_URL } from '../../../services/api';
import {
  getIntrospectionQuery,
  buildClientSchema,
  IntrospectionQuery,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInterfaceType,
  GraphQLInputObjectType,
  GraphQLEnumType,
} from 'graphql';
import { useState, useEffect } from 'react';

import styles from './Doc.module.css';
import { BiArrowBack } from 'react-icons/bi';

interface IDocField {
  [index: string]:
    | string
    | null
    | {
        name: string;
        type: string;
        description: string | null;
      }[];
  name: string;
  description: string | null;
  type: string | null;
  value: string | null;
}

interface IDocType {
  name: string;
  description: string | null;
  fields: IDocField[] | null;
}

type DocProps = {
  isOpen: boolean;
};

const Documentation = ({ isOpen }: DocProps) => {
  const [schema, setSchema] = useState<GraphQLSchema>();
  const [types, setTypes] = useState<IDocType[]>([]);
  const [selectedType, setSelectedType] = useState<IDocType | null>(null);
  const [error, setError] = useState<string>('');
  const [history, setHistory] = useState<IDocType[]>([]);

  useEffect(() => {
    async function fetchSchema() {
      try {
        const response = await fetch(BASE_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: getIntrospectionQuery(),
          }),
        });
        const { data }: { data: IntrospectionQuery } = await response.json();
        const clientSchema = buildClientSchema(data);
        setSchema(clientSchema);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      }
    }
    isOpen ? fetchSchema() : null;
  }, [isOpen]);

  useEffect(() => {
    if (history.length === 0) {
      setSelectedType(null);
    } else {
      setSelectedType(history[history.length - 1]);
    }
  }, [history]);

  function handleSelectType(type: IDocType) {
    setHistory([...history, type]);
  }

  useEffect(() => {
    if (schema) {
      const typeMap = schema.getTypeMap();

      const typesInMap = Object.keys(typeMap)
        .filter((typeName) => !typeName.startsWith('__'))
        .map((typeName) => {
          const type = typeMap[typeName];
          let typeFields: IDocField[] | undefined;

          if (
            type instanceof (GraphQLObjectType || GraphQLInterfaceType || GraphQLInputObjectType)
          ) {
            const fields = type.getFields();
            typeFields = Object.keys(fields).map((fieldName) => {
              const field = fields[fieldName];
              return {
                name: field.name,
                description: (field.description as string) || null,
                type: field.type.toString(),
                value: null,
              };
            });
          } else if (type instanceof GraphQLEnumType) {
            const values = type.getValues();
            typeFields = values.map((value) => {
              return {
                name: value.name,
                description: (value.description as string) || null,
                type: null,
                value: value.value,
              };
            });
          }

          return {
            name: type.name,
            description: (type.description as string) || null,
            fields: typeFields || null,
          };
        });
      setTypes(typesInMap);
    }
  }, [schema]);

  function handleSelectField(name: string) {
    const regExp = /\[(.*?)\]/;
    const typeName = regExp.exec(name) ? regExp.exec(name)![1] : name;
    const type = types.find((type) => type.name === typeName);

    type ? setHistory([...history, type]) : '';
  }

  const historyRoute = () => {
    setHistory(history.slice(0, -1));
  };

  let docBar = styles.doc;
  if (isOpen) {
    docBar += ' ' + styles.doc_showed;
  }

  return (
    <div className={docBar}>
      <div>
        {!error ? (
          selectedType ? (
            <>
              <BiArrowBack className={styles.histoty_btn} onClick={() => historyRoute()} />
              <h3 className={styles.subtitle}>{selectedType.name}</h3>
              {selectedType.description && (
                <p className={styles.description}>{selectedType.description}</p>
              )}
              {selectedType.fields?.map((field) => (
                <div
                  className={styles.field}
                  key={field.name}
                  onClick={() => handleSelectField(field.type || '')}
                >
                  <h4 className={styles.field_title}>{field.name}</h4> :
                  <span className={styles.field_type}>{field.type || field.value}</span>
                  {field.description && <p>{field.description}</p>}
                </div>
              ))}
            </>
          ) : (
            <ul className={styles.type_list}>
              {types.map((type) => (
                <li key={type.name} onClick={() => handleSelectType(type)}>
                  <h4>{type.name}</h4>
                </li>
              ))}
            </ul>
          )
        ) : (
          <>{error && <span>error</span>}</>
        )}
      </div>
    </div>
  );
};

export default Documentation;
