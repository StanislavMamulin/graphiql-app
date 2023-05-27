import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlagImg } from './FlagImg';
import { LangItem, languageOptions } from './languageOptions';
import { DEFAULT_LANG, LANG_LS_KEY } from '../../utils/constants';

import styles from './LangSwitcher.module.css';

type LangSwitcherProps = {
  small?: boolean;
};

export const LangSwitcher = ({ small }: LangSwitcherProps) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [currentLang, setCurrentLang] = useState<string>(DEFAULT_LANG);
  const menuRef = useRef<HTMLUListElement | null>(null);
  const firstAppear = useRef<boolean>(false);
  const { i18n } = useTranslation();

  useEffect(() => {
    const storedLang = localStorage.getItem(LANG_LS_KEY);
    if (storedLang) {
      setCurrentLang(storedLang);
    }
  }, []);

  const clickHandler = useCallback((e: MouseEvent) => {
    if (!firstAppear.current && menuRef.current && !menuRef.current.contains(e.target as Node)) {
      setShowDropdown(false);
      window.removeEventListener('click', clickHandler);
    }

    firstAppear.current = false;
  }, []);

  const showDropdownHandler = () => {
    setShowDropdown(true);
    if (!showDropdown) {
      firstAppear.current = true;
      window.addEventListener('click', clickHandler);
    }
  };

  const getFlag = (): JSX.Element => {
    const langInfo: LangItem | undefined = languageOptions.find(
      (lang: LangItem) => lang.id === currentLang
    );

    if (langInfo) {
      return <FlagImg src={langInfo.flagimg} alt={langInfo.name} />;
    }

    return <FlagImg src={languageOptions[0].flagimg} alt={languageOptions[0].name} />;
  };

  const selectListItem = (lang: LangItem) => {
    setCurrentLang(lang.id);

    i18n.changeLanguage(lang.id);
    localStorage.setItem('lng', lang.id);

    setShowDropdown(false);
    window.removeEventListener('click', clickHandler);
  };

  const getLangContainerStyle = () =>
    styles.lang__container + (small ? ' ' + styles.lang__container_small : '');

  return (
    <div className={getLangContainerStyle()}>
      <button onClick={showDropdownHandler} className={styles.lang__button} type="button">
        {getFlag()}
      </button>
      {showDropdown && (
        <ul className={styles.lang__list} ref={menuRef}>
          {languageOptions.map((lang) => (
            <li key={lang.id} className={styles.lang__item} onClick={() => selectListItem(lang)}>
              <FlagImg src={lang.flagimg} alt={lang.name} />
              <span className={styles.lang__name}>{lang.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
