import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useFavorites = create(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (id) => set((state) => ({
        favorites: state.favorites.includes(id) 
          ? state.favorites 
          : [...state.favorites, id]
      })),
      removeFavorite: (id) => set((state) => ({
        favorites: state.favorites.filter(favId => favId !== id)
      })),
      toggleFavorite: (id) => set((state) => {
        const isFav = state.favorites.includes(id);
        if (isFav) {
          return { favorites: state.favorites.filter(favId => favId !== id) };
        } else {
          return { favorites: [...state.favorites, id] };
        }
      }),
    }),
    {
      name: 'florin-favorites', // name of item in the storage (must be unique)
    }
  )
);
