import React, { FC, useEffect, useRef, useState } from 'react';
import styles from './CustomTextareaeditor.module.css';
import { GraphQLError, parse } from 'graphql';
import svgImg from '../../assets/icons/format_code.svg';
import { prettifyCode } from '../../utils/prettify';

interface Props {
  value?: '';
  editable?: boolean;
  onMount?: (ref: HTMLTextAreaElement | null) => void;
  mode: 1 | 0; // 1 -  editor, 0 - response
  placeholder: string;
  defaultValue?: string;
}

const CustomTextareaEditor: FC<Props> = ({
  value,
  mode,
  editable = true,
  onMount,
  placeholder,
  defaultValue,
}) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [totalLines, setTotalLines] = useState<number>(0);
  const [currentLine, setCurrentLine] = useState<number>(0);
  const [error, setError] = useState<string>('');

  const handleChange = () => {
    const val = textAreaRef.current?.value.replace(/\n/g, '');
    if (!val) {
      setTotalLines(0);
      setCurrentLine(0);
    } else {
      try {
        parse(val);
        setError('');
      } catch (error) {
        console.log(error);
        if (error instanceof GraphQLError) {
          const { message, locations } = error;
          if (locations) {
            const errorLine = locations[0]?.line || 1;
            setError(`Line: ${errorLine}: ${message}`);
          }
        }
      }
    }
  };

  const handleSelect = () => {
    const cursor = textAreaRef.current?.selectionStart ?? '';
    const currentLine = textAreaRef.current?.value.substr(0, +cursor).split('\n').length;
    currentLine ? setCurrentLine(currentLine) : null;
  };

  const prettify = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (textAreaRef.current?.value) {
      textAreaRef.current.value = prettifyCode(textAreaRef.current.value);
    }
  };

  useEffect(() => {
    const lines = textAreaRef.current?.value.split('\n').length;
    lines ? setTotalLines(lines) : null;
    onMount && onMount(textAreaRef.current);
  }, [onMount]);

  useEffect(() => {
    const lines = textAreaRef.current?.value.split('\n').length;
    lines ? setTotalLines(lines) : null;
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
        defaultValue={defaultValue}
        onChange={handleChange}
        onSelect={handleSelect}
        readOnly={!editable}
        ref={textAreaRef}
        placeholder={placeholder}
        rows={2}
        cols={50}
      />
      {mode ? (
        <div className={styles.inform}>
          <span>{`${currentLine}/${totalLines}`}</span>
          {error && <span className={styles.error}>{error}</span>}
        </div>
      ) : null}
    </div>
  );
};

export default CustomTextareaEditor;
