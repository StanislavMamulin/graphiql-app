import { useEffect, useState } from 'react';
import styles from './GraphqlEditor.module.css';
import RunButton from '../RunButton/RunButton';
import CustomTextareaEditor from '../CustomTextareaEditor/CustomTextareaEditor';
import { useLazySendRequestQuery } from '../../services/rickAndMortyAPI';
import { Spinner } from '../Spinner/Spinner';

const initValue = `query{
characters {
  results {
    name
  }
 }
}`;
const EDITOR_PLACEHOLDER = 'type gql query here...';
const RESULT_PLACEHOLDER = 'response will be shown here...';

export default function GraphqlEditor() {
  const [editorRef, setEditorRef] = useState(null);
  const [responseCode, setResponseCode] = useState('');
  const [sendRequest, { isFetching, data = {}, isError, error }] = useLazySendRequestQuery();

  const handleEditorDidMount = (editor) => {
    setEditorRef(editor);
  };

  const handleRequest = async () => {
    const query = editorRef.value.replace(/\n/g, '') || '';
    query && sendRequest({ document: query });
  };

  useEffect(() => {
    let response = '';
    if (isError) {
      response = error.message.split(',"status"')[0];
    } else if (Object.keys(data).length > 0) {
      response = JSON.stringify(data, null, 1);
    }
    setResponseCode(response);
  }, [data, error, isError]);

  return (
    <>
      <div className={styles.editorWrapper}>
        <RunButton onClick={handleRequest} />
        <div className={styles.editor}>
          <CustomTextareaEditor
            value={initValue}
            editable={true}
            onMount={handleEditorDidMount}
            placeholder={EDITOR_PLACEHOLDER}
            mode={1}
          />
        </div>
        <div className={`${styles.result} ${isError ? styles.error : ''}`}>
          <CustomTextareaEditor
            editable={false}
            value={responseCode}
            placeholder={RESULT_PLACEHOLDER}
            mode={0}
          />
        </div>
      </div>
      {isFetching && <Spinner fullscreen={true} />}
    </>
  );
}
