import React, { FC } from 'react';
import Editor from '@monaco-editor/react';

interface Props {
  onMount?: (editor, monaco) => void;
}

const MonacoEditor: FC<Props> = ({ onMount, ...rest }) => {
  const handleEditorDidMount = (editor, monaco) => {
    onMount && onMount(editor, monaco);
  };

  return (
    <>
      <Editor onMount={handleEditorDidMount} {...rest} />
    </>
  );
};

export default MonacoEditor;
