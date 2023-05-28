import { useTranslation } from 'react-i18next';
import { Button } from '../Button/Button';
import styles from './Editor.module.css';

type SidebarProps = {
  docHandler: () => void;
};

export const Sidebar = ({ docHandler }: SidebarProps) => {
  const { t } = useTranslation();
  return (
    <aside className={styles.sidebar}>
      <Button
        clickHandler={() => {
          docHandler();
        }}
        title={t('docs')}
        extraClass={styles.button_aside}
      ></Button>
    </aside>
  );
};
