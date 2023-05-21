import { SyntheticEvent, useState } from 'react';
import classNames from 'classnames';

import { TabsTypes } from './TabBlock';
import styles from './TabBlock.module.css';

type EditorProps = {
  show: boolean;
  title: string;
  changeHandler: (event: SyntheticEvent, type: TabsTypes) => void;
  value?: string;
  errorText?: string;
};

export function Editor({
  show,
  title,
  changeHandler,
  value = '',
  errorText,
}: EditorProps): JSX.Element {
  const [text, setText] = useState(value);

  const editorClasses = classNames(
    styles.tabs__editor,
    show ? styles.tabs__editor_show : styles.tabs__editor_hide,
    {
      [styles.varsTab]: title === TabsTypes.VARIABLES,
      [styles.headersTab]: title === TabsTypes.HEADERS,
    }
  );

  const type = title === TabsTypes.HEADERS ? TabsTypes.HEADERS : TabsTypes.VARIABLES;

  return (
    <div className={editorClasses}>
      <textarea
        value={text}
        className={styles.editor__text}
        onChange={(event) => {
          setText(event.target.value);
          changeHandler(event, type);
        }}
      />
      {errorText && <div className={styles.errorText}>{errorText}</div>}
    </div>
  );
}
