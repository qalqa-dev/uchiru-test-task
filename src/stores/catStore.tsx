import { getCatsBreeds, getCatsByBreed, getRandomCats } from '@/data/api';
import { CatStore } from '@/model/catStore';
import { create } from 'zustand';

const FAVORITES_STORAGE_KEY = 'cat_favorites';
const API_KEY_STORAGE_KEY = 'cat_api_key';

export const useCatStore = create<CatStore>((set, get) => ({
  breeds: [],
  cats: [],
  randomCats: [],
  favorites: JSON.parse(localStorage.getItem(FAVORITES_STORAGE_KEY) || '[]'),
  isLoadingMain: false,
  isLoadingBreed: false,
  isLoadingRandom: false,
  hasMore: true,
  error: null,
  currentPage: 0,
  currentRandomPage: 0,
  picturesPerPage: 10,
  userApiKey:
    import.meta.env.VITE_API_KEY ||
    localStorage.getItem(API_KEY_STORAGE_KEY) ||
    '',

  fetchBreeds: async () => {
    const { userApiKey, picturesPerPage, currentPage, breeds, hasMore } = get();
    try {
      if (hasMore) {
        set({ isLoadingMain: true, error: null });
        const newBreeds = await getCatsBreeds(
          userApiKey,
          currentPage,
          picturesPerPage,
        );

        set({ currentPage: currentPage + 1 });
        set({
          breeds: [...breeds, ...newBreeds],
          currentPage: currentPage + 1,
          isLoadingMain: false,
        });
        if (newBreeds.length < picturesPerPage) {
          set({ hasMore: false, isLoadingMain: false });
        }
      }
    } catch (error: unknown) {
      set({ error: error as Error, isLoadingMain: false });
    }
  },

  fetchCatsByBreed: async (breed) => {
    const { picturesPerPage, userApiKey } = get();
    try {
      set({ isLoadingBreed: true, error: null });
      const cats = await getCatsByBreed(breed, picturesPerPage, userApiKey);
      set({ cats: cats || [], isLoadingBreed: false });
    } catch (error: unknown) {
      set({ error: error as Error, isLoadingBreed: false });
    }
  },

  fetchRandomCats: async () => {
    const { picturesPerPage, currentRandomPage, randomCats } = get();
    try {
      set({ isLoadingRandom: true, error: null });
      const newCats = await getRandomCats(currentRandomPage, picturesPerPage);
      set({
        randomCats: [...randomCats, ...newCats],
        currentRandomPage: currentRandomPage + 1,
        isLoadingRandom: false,
      });
    } catch (error: unknown) {
      set({ error: error as Error, isLoadingRandom: false });
    }
  },

  resetCats: () => {
    set({ cats: [] });
  },

  addToFavorites: (cat) => {
    const { favorites } = get();
    if (!favorites.find((favorite) => favorite.id === cat.id)) {
      const updatedFavorites = [...favorites, cat];
      set({ favorites: updatedFavorites });
      localStorage.setItem(
        FAVORITES_STORAGE_KEY,
        JSON.stringify(updatedFavorites),
      );
    }
  },

  removeFromFavorites: (catId) => {
    const { favorites } = get();
    const updatedFavorites = favorites.filter(
      (favorite) => favorite.id !== catId,
    );
    set({ favorites: updatedFavorites });
    localStorage.setItem(
      FAVORITES_STORAGE_KEY,
      JSON.stringify(updatedFavorites),
    );
  },

  isFavorite: (catId) =>
    get().favorites.some((favorite) => favorite.id === catId),

  setApiKey: (apiKey: string) => {
    set({ userApiKey: apiKey });
    localStorage.setItem(API_KEY_STORAGE_KEY, apiKey);
  },
}));
