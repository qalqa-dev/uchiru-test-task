import { useCatStore } from '@/stores/catStore';
import BreedCard from 'components/BreedCard/BreedCard';
import Skeleton from 'components/Skeleton/Skeleton';
import { debounce } from 'lodash';
import { useCallback, useEffect } from 'react';
import styles from './App.module.scss';

function App() {
  const { randomCats, fetchRandomCats, isLoadingRandom, picturesPerPage } =
    useCatStore();

  const handleScroll = useCallback(
    debounce(() => {
      if (
        window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 300 &&
        !isLoadingRandom
      ) {
        fetchRandomCats();
      }
    }, 200),
    [fetchRandomCats, isLoadingRandom],
  );

  useEffect(() => {
    if (randomCats.length === 0 && !isLoadingRandom) {
      fetchRandomCats();
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [fetchRandomCats]);

  return (
    <main className={styles.container}>
      <h2>Случайные котики</h2>
      <ul className={styles.list}>
        {randomCats.map((cat) => (
          <BreedCard key={cat.id} cat={cat} />
        ))}
        {isLoadingRandom &&
          Array.from({ length: picturesPerPage }).map((_, index) => (
            <Skeleton key={index} />
          ))}
      </ul>
    </main>
  );
}

export default App;
