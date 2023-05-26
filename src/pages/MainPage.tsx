import { Suspense, useState } from 'react';
import styles from '../components/Editor/Editor.module.css';
import { LazyDoc } from '../components/Editor/Documentation';
import { Sidebar } from '../components/Editor/Sidebar';
import GraphqlEditor from '../components/GraphqlEditor/GraphqlEditor';
import { TabBlock } from '../components/TabBlock/TabBlock';
import { ErrorBoundary } from '../components/ErrorBoundary/ErrorBoundary';

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
        <Sidebar docHandler={() => openDoc()} />
        <div className={styles.interface}>
          <Suspense fallback={<div>Loading...</div>}>
            <LazyDoc isOpen={isOpen} />
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default MainPage;
