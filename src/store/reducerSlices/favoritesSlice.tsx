import { createSlice } from "@reduxjs/toolkit";



interface Event {
  id: number;
  name: string;
  location: string;
  time: string;
  organizer: string;
  description: string;
  image: string;
  guests: number;
}

interface FavoritesState {
  favorites: Event[];
}

const storedFavorites = localStorage.getItem("favorites");
const favorites: Event[] = storedFavorites ? 
  (Array.isArray(JSON.parse(storedFavorites)) ? JSON.parse(storedFavorites) : []) : [];


const initialState: FavoritesState = { favorites };

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addToFavorites: (state, action: { payload: Event }) => {
      const event = action.payload;
      if (!state.favorites.some((fav) => fav.id === event.id)) {
        state.favorites.push(event); 
        localStorage.setItem("favorites", JSON.stringify(state.favorites));
      }
      // localStorage.setItem('favorites', JSON.stringify(action.payload))

    },
    removeFromFavorites: (state, action: { payload: number }) => {
      const eventId = action.payload;
      const updatedFavorites = state.favorites.filter((event) => event.id !== eventId);
      state.favorites = updatedFavorites
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
