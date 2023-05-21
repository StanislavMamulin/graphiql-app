import { FC, useEffect, useRef, useState } from 'react';
import styles from './CustomTextareaeditor.module.css';
import { parse } from 'graphql';

interface Props {
  value: string;
  editable?: boolean;
  onMount?: (ref) => void;
  mode: 1 | 0; // 1 -  editor, 0 - response
}

const DEFAULT_VALUE = `query{
  characters {
    results {
      name
    }
  }
}`;

const CustomTexareaEditor: FC<Props> = ({
  value = DEFAULT_VALUE,
  mode,
  editable = true,
  onMount,
}) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [totalLines, setTotalLines] = useState<number>(0);
  const [currentLine, setCurrentLine] = useState<number>(0);
  const [error, setError] = useState<string>('');

  const handleValidation = () => {
    if (!mode) return;
    try {
      const val = textAreaRef.current?.value.replace(/\n/g, '');
      parse(val);
      setError('');
    } catch (error) {
      const { message, locations } = error;
      const errorLine = locations[0]?.line || 1;
      setError(`Line: ${errorLine}: ${message}`);
    }
  };

  const handleSelect = () => {
    const cursor = textAreaRef.current?.selectionStart || 0;
    const currentLine = textAreaRef.current?.value.substr(0, cursor).split('\n').length;
    setCurrentLine(currentLine);
  };

  const handleBlur = () => {
    if (!mode) return;
    handleValidation();
  };

  useEffect(() => {
    onMount && onMount(textAreaRef.current);
  }, []);

  useEffect(() => {
    textAreaRef.current.value = value;
  }, [value]);

  useEffect(() => {
    const lines = value.split('\n').length;
    setTotalLines(lines);
  }, [value]);

  useEffect(() => {
    currentLine > totalLines && setTotalLines(currentLine);
  }, [currentLine, totalLines]);

  return (
    <div className={styles.inputBox}>
      <textarea
        defaultValue={value}
        onChange={handleValidation}
        onSelect={handleSelect}
        onBlur={handleBlur}
        readOnly={!editable}
        ref={textAreaRef}
        rows={2}
        cols={50}
      />
      <div>
        <span>{`${currentLine}/${totalLines}`}</span>
        {error && <span className={styles.error}>{error}</span>}
      </div>
    </div>
  );
};

export default CustomTexareaEditor;
