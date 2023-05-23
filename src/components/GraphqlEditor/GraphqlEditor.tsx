import { useEffect, useState } from 'react';
import styles from './GraphqlEditor.module.css';
import RunButton from '../RunButton/RunButton';
import CustomTexareaEditor from '../CustomTextareaEditor/CustomTexareaEditor';
import { useSendRequestQuery } from '../../services/rickAndMortyAPI';
import { Spinner } from '../Spinner/Spinner';

const initValue = `query{
characters {
  results {
    name
  }
 }
}`;

export default function GraphqlEditor() {
  const [editorRef, setEditorRef] = useState(null);
  const [responseCode, setResponseCode] = useState('');
  const [value, setValue] = useState(initValue);
  const {
    isFetching,
    data = [],
    isError,
    error,
  } = useSendRequestQuery({
    document: value,
    variables: {},
  });

  const handleEditorDidMount = (editor) => {
    setEditorRef(editor);
  };

  const handleRequest = async () => {
    const query = editorRef.value.replace(/\n/g, '');
    setValue(query);
  };

  useEffect(() => {
    if (data && !isError) {
      setResponseCode(JSON.stringify(data, null, 1));
    } else if (isError) {
      setResponseCode(error.message);
    }
  }, [data, isError, error]);

  return (
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
      <div className={`${styles.result} ${isError ? styles.error : ''}`}>
        <CustomTexareaEditor
          editable={false}
          value={responseCode || '# response will be shown here...'}
          mode={0}
        />
      </div>
      {isFetching && (
        <div className={styles.spinnerWrapper}>
          <Spinner />
        </div>
      )}
    </div>
  );
}
