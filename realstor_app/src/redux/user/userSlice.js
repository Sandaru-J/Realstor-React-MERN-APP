import { createSlice} from "@reduxjs/toolkit";

const initialState ={
    currentUser : null,
    error : null,
    loading : false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        setCurrentUser:(state, action)=>{
            state.currentUser = action.payload;
        },
        signInStart : (state) =>{
            state.loading = true;
        },
        signInSuccess: ( state, action) =>{
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        signInFailure: ( state, action ) => {
            state.error = action.payload;
            state.loading = false;
        }
    }
});

// const persistConfig = {
//     key: 'user', // Specify a key for the reducer
//     storage,
//     version: 1,
//   }; 

export const { reducer: userReducer } = userSlice;
export const { signInStart, signInSuccess, signInFailure, setCurrentUser } = userSlice.actions;
export default userSlice.reducer;

// const persistedUserReducer = persistReducer(persistConfig, userSlice.reducer);

// export const { signInStart, signInSuccess, signInFailure } = userSlice.actions;
// export default persistedUserReducer;