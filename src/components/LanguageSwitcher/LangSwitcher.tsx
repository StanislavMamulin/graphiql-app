import { useCallback, useRef, useState } from 'react';
import styles from './LangSwitcher.module.css';
import { FlagImg } from './FlagImg';
import { LangItem, languageOptions } from './languageOptions';

const defaultLangFlag = <FlagImg src={languageOptions[0].flagimg} alt={languageOptions[0].name} />;

type LangSwitcherProps = {
  small?: boolean;
};

export const LangSwitcher = ({ small }: LangSwitcherProps) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [langFlag, setLangFlag] = useState(defaultLangFlag);
  const menuRef = useRef<HTMLUListElement | null>(null);
  const firstAppear = useRef<boolean>(false);

  const clickHandler = useCallback((e: MouseEvent) => {
    console.log(firstAppear.current);
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

  const selectListItem = (lang: LangItem) => {
    setLangFlag(<FlagImg src={lang.flagimg} alt={lang.name} />);
    setShowDropdown(false);
    window.removeEventListener('click', clickHandler);
  };

  const getLangContainerStyle = () =>
    styles.lang__container + (small ? ' ' + styles.lang__container_small : '');

  return (
    <div className={getLangContainerStyle()}>
      <button onClick={showDropdownHandler} className={styles.lang__button}>
        {langFlag}
      </button>
      {showDropdown && (
        <ul className={styles.lang__list} ref={menuRef}>
          {languageOptions.map((lang) => (
            <li key={lang.id} className={styles.lang__item} onClick={() => selectListItem(lang)}>
              <FlagImg src={lang.flagimg} alt={lang.name} />
              {lang.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
