import store from '../../config/store';
import {setHost, hostSelector} from '../Login/loginSlice';

describe('Test login slice', () => {
  test('for setHost action', () => {
    let state = store.getState();
    expect(hostSelector(state)).toBe('localhost');
    store.dispatch(setHost('127.0.0.1'));
    expect(hostSelector(store.getState())).toBe('127.0.0.1');
    expect(store.getState().login).toMatchSnapshot();
  })
})