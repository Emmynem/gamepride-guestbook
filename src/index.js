import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './lib/components/app';
import { fetchAdmins } from "./lib/slice/admin";
import { fetchGuests } from "./lib/slice/guest";
import store from './store';

store.dispatch(fetchAdmins());
store.dispatch(fetchGuests());

// ReactDOM.render(
//     <App />
//     ,
//     document.getElementById('root')
// );

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    ,
    document.getElementById('root')
);
