import { Suspense, useState } from 'react';
import { LazyDoc } from '../../components/DocSection/Documentation';
import { Sidebar } from '../../components/DocSection/Sidebar';
import GraphqlEditor from '../../components/GraphqlEditor/GraphqlEditor';
import { TabBlock } from '../../components/TabBlock/TabBlock';
import { ErrorBoundary } from '../../components/ErrorBoundary/ErrorBoundary';

import styles from './Main.module.css';

const MainPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  function openDoc() {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <div className={styles.wrapper}>
        <ErrorBoundary>
          <div className={styles.editors}>
            <GraphqlEditor />
            <TabBlock />
          </div>
        </ErrorBoundary>
        <ErrorBoundary>
          <Sidebar docHandler={() => openDoc()} />
          <div className={styles.doc_section}>
            <Suspense fallback={<div>Loading...</div>}>
              <LazyDoc isOpen={isOpen} />
            </Suspense>
          </div>
        </ErrorBoundary>
      </div>
    </>
  );
};

export default MainPage;
