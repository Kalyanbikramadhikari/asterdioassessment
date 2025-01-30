import { configureStore } from "@reduxjs/toolkit";
import favoritesSlice from "./reducerSlices/favoritesSlice";
import { setupListeners } from '@reduxjs/toolkit/query';


// Middleware to save favorites to localStorage
// const localStorageMiddleware = (store) => (next) => (action) => {
//   const result = next(action);
//   if (action.type.startsWith("favorites/")) {
//     localStorage.setItem("favorites", JSON.stringify(store.getState().favorites.favorites));
//   }
//   return result;
// };

export const store = configureStore({
    reducer: {
        favorites: favoritesSlice,
    },
    // middleware: (getDefaultMiddleware) =>
    //     getDefaultMiddleware().concat(localStorageMiddleware),
});
setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;

