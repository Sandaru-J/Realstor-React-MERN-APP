import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

;

const persistConfig = {
    key: 'root',
    storage,
    version: 1,
  };
  
const rootReducer = combineReducers({ user: userReducer })
const persistedReducer = persistReducer(persistConfig, rootReducer);

// const store = configureStore({
//   reducer: { user:persistedReducer, },
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware({
//     serializableCheck:false
//   }), 
// })

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(/* other middlewares if needed */),
});


const persistor = persistStore(store)
export {store, persistor}
// Infer the `RootState` and `AppDispatch` types from the store itself
//export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
//export type AppDispatch = typeof store.dispatch