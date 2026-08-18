import {configureStore} from '@reduxjs/toolkit'
import authReducers from './authSlice.js'

const store = configureStore({
    reducer: {
        auth : authReducers,
    } // only the registered reducers, can interact with the store 
})

export default store; 