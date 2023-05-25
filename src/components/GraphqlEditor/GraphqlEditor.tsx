import { useEffect, useState } from 'react';
import styles from './GraphqlEditor.module.css';
import RunButton from '../RunButton/RunButton';
import CustomTextareaEditor from '../CustomTextareaEditor/CustomTextareaEditor';
import { useLazySendRequestQuery } from '../../services/rickAndMortyAPI';
import { Spinner } from '../Spinner/Spinner';
import { prettifyCode } from '../../utils/prettify';

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
  const [responseRef, setResponseRef] = useState(null);
  const [sendRequest, { isFetching, data = {}, isError, error }] = useLazySendRequestQuery();
  //const { variables, headers } = useSelector((state: RootState) => state.requestParameters);

  const handleEditorDidMount = (editor) => {
    setEditorRef(editor);
  };

  const handleResponseDidMount = (editor) => {
    setResponseRef(editor);
  };

  const handleRequest = async () => {
    const query = editorRef.value.replace(/\s+/g, '') || '';
    query && sendRequest({ document: query, variables: { myVariable: 'someValue' }, headers: {} });
  };

  useEffect(() => {
    if (!responseRef || Object.keys(data).length === 0 || error) return;
    responseRef.value = prettifyCode(JSON.stringify(data, null, 1));
  }, [data, error, responseRef]);

  useEffect(() => {
    if (!error) return;
    responseRef.value = prettifyCode(error.message.split(',"status"')[0]);
  }, [error, responseRef]);

  return (
    <>
      <div className={styles.editorWrapper}>
        <RunButton onClick={handleRequest} />
        <div className={styles.editor}>
          <CustomTextareaEditor
            defaultValue={initValue}
            editable={true}
            onMount={handleEditorDidMount}
            placeholder={EDITOR_PLACEHOLDER}
            mode={1}
          />
        </div>
        <div className={`${styles.result} ${isError ? styles.error : ''}`}>
          <CustomTextareaEditor
            editable={false}
            onMount={handleResponseDidMount}
            placeholder={RESULT_PLACEHOLDER}
            mode={0}
          />
        </div>
      </div>
      {isFetching && <Spinner fullscreen={true} />}
    </>
  );
}
