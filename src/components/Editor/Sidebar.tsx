import { Button } from '../Button/Button';
import styles from './Editor.module.css';

type SidebarProps = {
  docHandler: () => void;
};

export const Sidebar = ({ docHandler }: SidebarProps) => {
  return (
    <aside className={styles.settings}>
      <Button
        clickHandler={() => {
          docHandler();
        }}
        title={'DOCS'}
        extraClass={styles.button_aside}
      ></Button>
    </aside>
  );
};
