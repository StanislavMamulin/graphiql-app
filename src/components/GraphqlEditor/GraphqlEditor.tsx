import { useState } from 'react';
import styles from './GraphqlEditor.module.css';
import MonacoEditor from '../MonacoEditor/MonacoEditor';
import RunButton from '../RunButton/RunButton';

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

  const handleEditorDidMount = (editor) => {
    // // initialize the graphql mode with the schema uri
    // initializeMode({
    //   schemas: [
    //     {
    //       uri: '',
    //       fileMatch: ['**/*.graphql'],
    //     },
    //   ],
    // });
    setEditorRef(editor);
  };

  const handleRequest = async () => {
    const query = editorRef.getValue().replace(/\n/g, '');
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
    <div className={styles.editorWrapper}>
      <RunButton onClick={handleRequest} />
      <div className={styles.editor}>
        <MonacoEditor
          height="300px"
          width="100%"
          value={initValue}
          defaultLanguage="graphql"
          language="graphql"
          defaultValue="# write your graphql query here"
          theme="vs-dark"
          onMount={handleEditorDidMount}
          options={{ readOnly: false, lineNumbers: 'on', minimap: { enabled: false } }}
        />
      </div>
      <div className={styles.result}>
        <MonacoEditor
          height="300px"
          width="100%"
          language="json"
          value={responseCode}
          options={{ readOnly: true, lineNumbers: 'off', minimap: { enabled: false } }}
          theme="vs-dark"
        />
      </div>
    </div>
  );
}
