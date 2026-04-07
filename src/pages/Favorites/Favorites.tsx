import { useCatStore } from '@/stores/catStore';
import BreedCard from 'components/BreedCard/BreedCard';
import styles from './Favorites.module.scss';

const Favorites = () => {
  const { favorites } = useCatStore();

  return (
    <main className={styles.container}>
      <>
        <h2>Ваши любимые котики {'<3'} </h2>
        <ul className={styles.list}>
          {favorites.map((favorite) => (
            <BreedCard key={favorite.id} cat={favorite} />
          ))}
        </ul>
      </>
    </main>
  );
};

export default Favorites;
