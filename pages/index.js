import React, { useEffect, useState } from "react";
import UserModal from "./components/chore-modal";

const Home = () => {
  const [choresMap, setChoresMap] = useState(new Map());
  const [selectedChoreId, setSelectedChoreId] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://chores-app-api-3550fe946076.herokuapp.com/chores"
        );
        const data = await response.json();

        const map = new Map();
        data.forEach((chore) => {
          map.set(chore._id, chore);
        });

        setChoresMap(map);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const openModal = (choreId) => {
    setSelectedChoreId(choreId);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedChoreId(null);
    setModalIsOpen(false);
  };

  return (
    <div className="home-container">
      <h1>Chores</h1>
      <div className="grid-container">
        {[...choresMap.values()].map((chore) => (
          <div
            className="grid-item"
            key={chore._id}
            onClick={() => openModal(chore._id)}
          >
            <h3>{chore.choreName}</h3>
            <p>Points: {chore.points}</p>
            {/* <p>id {chore._id}</p> */}
          </div>
        ))}
      </div>
      <UserModal
        isOpen={modalIsOpen}
        onClose={closeModal}
        choreId={selectedChoreId}
      />
    </div>
  );
};

export default Home;


/*
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

*/