import { createStore } from '../src/index';

const initialState = {
    foo: false,
    bar: false,
};

const toggledFooState = {
    foo: true,
    bar: false,
};

const toggledFooAndBarState = {
    foo: true,
    bar: true,
};

const newState = (state, newState) => {
    return {
        ...state,
        ...newState,
    };
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'TOGGLE_FOO':
            return newState(state, { foo: true });
        case 'TOGGLE_BAR':
            return newState(state, { bar: true });
        default:
            return state;
    }
};

test('state from getState is equal to initial', () => {
    const store = createStore(initialState, reducer);

    expect(store.getState()).toEqual(initialState);
});

test('foo is toggled', () => {
    const store = createStore(initialState, reducer);

    store.dispatch({
        type: 'TOGGLE_FOO',
    });

    expect(store.getState()).toEqual(toggledFooState);
});

test('foo and bar are toggled', () => {
    const store = createStore(initialState, reducer);

    store.dispatch({
        type: 'TOGGLE_FOO',
    });

    store.dispatch({
        type: 'TOGGLE_BAR',
    });

    expect(store.getState()).toEqual(toggledFooAndBarState);
});

/*

const unsubscribe = store.subscribe(() => { console.log(state) });

unsubscribe();
*/
