import { useCatStore } from '@/stores/catStore';
import Card from 'components/Card/Card';
import Skeleton from 'components/Skeleton/Skeleton';
import { debounce } from 'lodash';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Breeds.module.scss';

function Breeds() {
  const { breeds, fetchBreeds, isLoadingMain, hasMore, picturesPerPage } =
    useCatStore();

  useEffect(() => {
    if (breeds.length === 0 && !isLoadingMain) {
      fetchBreeds();
    }
  }, [breeds.length, fetchBreeds, isLoadingMain]);

  useEffect(() => {
    const handleScroll = debounce(() => {
      if (
        window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 300 &&
        !isLoadingMain &&
        hasMore
      ) {
        fetchBreeds();
      }
    }, 200);

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      handleScroll.cancel();
    };
  }, [fetchBreeds, hasMore, isLoadingMain]);

  const navigate = useNavigate();

  return (
    <main className={styles.container}>
      <h2>Все породы котиков</h2>
      <ul className={styles.list}>
        {breeds.map((breed) => (
          <Card
            key={breed.id}
            breed={breed}
            onCLick={() => {
              navigate(`/breed/${breed.id}`, {
                state: { breed },
              });
            }}
          />
        ))}
        {isLoadingMain &&
          Array.from({ length: picturesPerPage }).map((_, index) => (
            <Skeleton key={index} />
          ))}
      </ul>
    </main>
  );
}

export default Breeds;
