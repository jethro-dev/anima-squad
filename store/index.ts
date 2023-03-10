import { combineReducers, configureStore } from "@reduxjs/toolkit";
import shoppingCartReducer from "./slice/shoppingCartSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import cartReducer from "./slice/shoppingCartSlice";

const persistConfig = {
  key: "root",
  storage,
};

export const rootReducer = combineReducers({ shoppingCart: cartReducer });

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
