import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from '../config/store';
import Main from './Main/Main';

function App() {
  return (
    <Provider store={store}>
      <Main/>
    </Provider>
  );
}

ReactDOM.render(<App/>, document.getElementById('main'));

export default App;
