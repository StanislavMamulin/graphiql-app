import { SyntheticEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import { Button } from '../Button/Button';
import { Editor } from './Editor';
import { RootState } from 'redux/store';
import { setHeaders, setVariables } from '../../redux/slices/requestParametersSlice';

import styles from './TabBlock.module.css';
import { useAppDispatch } from '../../hooks/reduxHooks';

export enum TabsTypes {
  VARIABLES = 'Variables',
  HEADERS = 'Headers',
}

type EditorsError = {
  varsErrorText: string;
  headersErrorText: string;
};

const initialEditorsError = {
  varsErrorText: '',
  headersErrorText: '',
};

export function TabBlock(): JSX.Element {
  const [showVars, setShowVars] = useState(true);
  const [showHeaders, setShowHeaders] = useState(true);
  const [editorError, setEditorError] = useState<EditorsError>(initialEditorsError);

  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const { variables, headers } = useSelector((state: RootState) => state.requestParameters);

  const setError = (type: TabsTypes, message: string) => {
    if (type === TabsTypes.HEADERS) {
      setEditorError({ ...editorError, headersErrorText: message });
    } else {
      setEditorError({ ...editorError, varsErrorText: message });
    }
  };

  const textChangeHandler = (event: SyntheticEvent, type: TabsTypes) => {
    const text = (event.target as HTMLTextAreaElement).value;

    if (!text) {
      setError(type, '');
      return;
    }

    try {
      const object = JSON.parse(text);
      if (object) {
        setError(type, '');

        if (type === TabsTypes.HEADERS) {
          dispatch(setHeaders(object));
        } else {
          dispatch(setVariables(object));
        }
      }
    } catch (err) {
      if (type === TabsTypes.HEADERS) {
        setError(type, t('editorErrors.syntaxError'));
      } else {
        setError(type, t('editorErrors.syntaxError'));
      }
    }
  };

  return (
    <div className={styles.tabs__container}>
      <div className={styles.tabs__switchers}>
        <Button
          title={t('editor.queryVariables')}
          clickHandler={() => {
            setShowVars((prevShow) => !prevShow);
          }}
          extraClass={classNames(
            styles.varsTab,
            styles.varsBtn,
            showVars ? styles.btn_open : styles.btn_close
          )}
        />
        <Button
          title={t('editor.httpHeaders')}
          clickHandler={() => {
            setShowHeaders((prevShow) => !prevShow);
          }}
          extraClass={classNames(
            styles.headersTab,
            styles.headersBtn,
            showHeaders ? styles.btn_open : styles.btn_close
          )}
        />
      </div>
      {(showVars || showHeaders) && (
        <div className={styles.tabs__editorscontainer}>
          <Editor
            show={showVars}
            title={TabsTypes.VARIABLES}
            changeHandler={textChangeHandler}
            errorText={editorError.varsErrorText}
            value={JSON.stringify(variables, null, 1)}
          />
          <Editor
            show={showHeaders}
            title={TabsTypes.HEADERS}
            changeHandler={textChangeHandler}
            errorText={editorError.headersErrorText}
            value={JSON.stringify(headers, null, 1)}
          />
        </div>
      )}
    </div>
  );
}
