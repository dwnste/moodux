import { createStore } from '../src/index';

const initialState = {
    foo: false,
    bar: false,
};

const newState = (state, newState) => {
    return {
        ...state,
        ...newState,
    };
};

const reducer = (state = {}, action) => {
    switch (action.type) {
        case 'TOGGLE_FOO':
            return newState(state, { foo: true });
        case 'TOGGLE_BAR':
            return newState(state, { bar: true });
        default:
            return state;
    }
};

const store = createStore(initialState, reducer);

test('state from getState is equal to initial', () => {
    expect(store.getState()).toEqual(initialState);
});

/*

const unsubscribe = store.subscribe(() => { console.log(state) });

store.dispatch({ type: 'TOGGLE_FOO' });
store.dispatch({ type: 'TOGGLE_BAR' });

unsubscribe();

store.dispatch({ type: 'TOGGLE_FOO' });
*/
