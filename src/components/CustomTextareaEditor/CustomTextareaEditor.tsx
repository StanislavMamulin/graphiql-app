import React, { FC, useEffect, useRef, useState } from 'react';
import styles from './CustomTextareaeditor.module.css';
import { parse } from 'graphql';
import svgImg from '../../assets/icons/format_code.svg';
import { prettifyCode } from '../../utils/prettify';

interface Props {
  value: string;
  editable?: boolean;
  onMount?: (ref: HTMLTextAreaElement | null) => void;
  mode: 1 | 0; // 1 -  editor, 0 - response
  placeholder: string;
}

const CustomTextareaEditor: FC<Props> = ({
  value,
  mode,
  editable = true,
  onMount,
  placeholder,
}) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [totalLines, setTotalLines] = useState<number>(0);
  const [currentLine, setCurrentLine] = useState<number>(0);
  const [error, setError] = useState<string>('');

  const handleValidation = () => {
    const val = textAreaRef.current?.value.replace(/\n/g, '');

    if (!mode || !val) return;
    try {
      parse(val);
      setError('');
    } catch (error) {
      const { message, locations } = error;
      const errorLine = locations[0]?.line || 1;
      setError(`Line: ${errorLine}: ${message}`);
    }
  };

  const handleSelect = () => {
    const cursor = textAreaRef.current?.selectionStart ?? 0;
    const currentLine = textAreaRef.current?.value.substr(0, cursor).split('\n').length;
    setCurrentLine(currentLine);
  };

  const handleBlur = () => {
    if (!mode) return;
    handleValidation();
  };

  const prettify = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    textAreaRef.current.value = prettifyCode(textAreaRef?.current?.value);
  };

  useEffect(() => {
    onMount && onMount(textAreaRef.current);
  }, [onMount]);

  useEffect(() => {
    textAreaRef.current.value = prettifyCode(value);
    const lines = value.split('\n').length;
    setTotalLines(lines);
  }, [value]);

  useEffect(() => {
    currentLine > totalLines && setTotalLines(currentLine);
  }, [currentLine, totalLines]);

  return (
    <div className={styles.inputBox}>
      {!!mode && (
        <a href="#" title="Prettify" onClick={(e) => prettify(e)}>
          <span className={styles.pretty}>
            <img src={svgImg} alt="Prettify" />
          </span>
        </a>
      )}
      <textarea
        noValidate={true}
        defaultValue={value}
        onChange={handleValidation}
        onSelect={handleSelect}
        onBlur={handleBlur}
        readOnly={!editable}
        ref={textAreaRef}
        placeholder={placeholder}
        rows={2}
        cols={50}
      />
      <div className={styles.inform}>
        <span>{`${currentLine}/${totalLines}`}</span>
        {error && <span className={styles.error}>{error}</span>}
      </div>
    </div>
  );
};

export default CustomTextareaEditor;
