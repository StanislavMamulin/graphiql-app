import { Suspense, useState } from 'react';
import styles from '../components/Editor/Editor.module.css';
import { LazyDoc } from '../components/Editor';
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
      <ErrorBoundary>
        <div className={styles.wrapper}>
          <GraphqlEditor />
          <TabBlock />
        </div>
      </ErrorBoundary>
      <ErrorBoundary>
        <div className={styles.interface}>
          <Sidebar docHandler={() => openDoc()} />
          <Suspense fallback={<div>Loading...</div>}>
            <LazyDoc isOpen={isOpen} />
          </Suspense>
        </div>
      </ErrorBoundary>
    </>
  );
};

export default MainPage;
