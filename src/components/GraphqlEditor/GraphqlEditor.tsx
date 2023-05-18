import { useEffect, useState } from 'react';
import styles from './GraphqlEditor.module.css';
import RunButton from '../RunButton/RunButton';
import { initializeMode } from 'monaco-graphql/dist/initializeMode';
import CustomTexareaEditor from '../CustomTextareaEditor/CustomTexareaEditor';

// const fetcher = createGraphiQLFetcher({
//     url: 'https://rickandmortyapi.com/graphql',
// });

const initValue = `query{
characters {
  results {
    name
  }
 }
}`;

export default function GraphqlEditor() {
  const [editorRef, setEditorRef] = useState(null);
  // const [isLoading, setIsLoading] = useState(false);
  const [responseCode, setResponseCode] = useState('');
  const [value, setValue] = useState(initValue);

  useEffect(() => {
    initializeMode({
      schemas: [
        {
          uri: 'https://rickandmortyapi.com/graphql',
          fileMatch: ['**/*.graphql'],
        },
      ],
    });
  }, []);

  const handleEditorDidMount = (editor) => {
    // // initialize the graphql mode with the schema uri
    // initializeMode({
    //   schemas: [
    //     {
    //       uri: 'https://rickandmortyapi.com/graphql',
    //       fileMatch: ['**/*.graphql'],
    //     },
    //   ],
    // });
    setEditorRef(editor);
  };

  const handleRequest = async () => {
    //const query = editorRef.getValue().replace(/\n/g, '');
    const query = editorRef.value.replace(/\n/g, '');
    const result = await fetch('https://rickandmortyapi.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({ query }),
    });
    const data = await result.json();
    const code = JSON.stringify(data, null, 1);
    setResponseCode(code);
  };

  // if (isLoading) return <p>Loading...</p>;
  return (
    <>
      <div className={styles.editorWrapper}>
        <RunButton onClick={handleRequest} />
        <div className={styles.editor}>
          <CustomTexareaEditor
            value={value}
            editable={true}
            onMount={handleEditorDidMount}
            mode={1}
          />
        </div>
        <div className={styles.result}>
          <CustomTexareaEditor
            editable={false}
            value={responseCode || '# response will be shown here...'}
            mode={0}
          />
        </div>
      </div>
    </>
  );
}
