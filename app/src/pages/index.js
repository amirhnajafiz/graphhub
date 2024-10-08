import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import Layout from '@theme/Layout';
import HomePage from '@site/src/components/HomePage';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <p className="hero__subtitle" style={{textAlign: "justify"}}>{siteConfig.tagline}</p>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Graphhub, created by amirhnajafiz">
      <main>
        <HomePage />
      </main>
      <HomepageHeader style={{marginBottom: "0px"}} />
    </Layout>
  );
}
