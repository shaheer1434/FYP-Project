import { configureStore, combineReducers } from "@reduxjs/toolkit";
// Import redux-persist like this for Vite
import * as reduxPersist from "redux-persist";
import storage from "redux-persist/lib/storage";
import authSlice from "./authSlice";

const { persistReducer, persistStore } = reduxPersist;

const authPersistConfig = {
  key: "auth",
  storage,
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authSlice),
//   [userApi.reducerPath]: userApi.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // needed because redux-persist uses non-serializable values
    })
    // .concat(userApi.middleware)
});

export const persistor = persistStore(store);
export default store;
