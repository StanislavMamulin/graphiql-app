import { Suspense, useState } from 'react';
import styles from '../components/Editor/Editor.module.css';
import { LazyDoc } from '../components/Editor';
import { Sidebar } from '../components/Editor/Sidebar';
import GraphqlEditor from '../components/GraphqlEditor/GraphqlEditor';
import { TabBlock } from '../components/TabBlock/TabBlock';

const MainPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  function openDoc() {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <div className={styles.wrapper}>
        <GraphqlEditor />
        <TabBlock />
      </div>
      <div className={styles.interface}>
        <Sidebar docHandler={() => openDoc()} />
        <Suspense fallback={<div>Loading...</div>}>
          <LazyDoc isOpen={isOpen} />
        </Suspense>
      </div>
    </>
  );
};

export default MainPage;
