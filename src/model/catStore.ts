import { Cat, IBreed } from './breed';

export interface CatStore {
  breeds: IBreed[];
  cats: Cat[];
  randomCats: Cat[];
  favorites: Cat[];
  isLoadingMain: boolean;
  isLoadingBreed: boolean;
  isLoadingRandom: boolean;
  hasMore: boolean;
  error: Error | null;
  currentPage: number;
  currentRandomPage: number;
  picturesPerPage: number;
  userApiKey: string;
  fetchBreeds: () => Promise<void>;
  fetchCatsByBreed: (breed: string) => void;
  fetchRandomCats: () => Promise<void>;
  resetCats: () => void;
  addToFavorites: (cat: Cat) => void;
  removeFromFavorites: (catId: string) => void;
  isFavorite: (catId: string) => boolean;
  setApiKey: (apiKey: string) => void;
}
