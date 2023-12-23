import { configureStore } from '@reduxjs/toolkit';
import app from './reducers/app';

const store = configureStore({
    reducer: {
        app,
    },
});

export default store;
