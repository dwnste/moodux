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

const actionToggleFoo = {
    type: 'TOGGLE_FOO',
};

const actionToggleBar = {
    type: 'TOGGLE_BAR',
};

const actionDoSomething = {
    type: 'DO_SOMETHING',
};

test('state from getState is equal to initial', () => {
    const store = createStore(reducer, initialState);

    expect(store.getState()).toEqual(initialState);
});

test('unknown action type doesn\'t change the state', () => {
    const store = createStore(reducer, initialState);

    store.dispatch(actionDoSomething);

    expect(store.getState()).toEqual(initialState);
});

test('foo is toggled', () => {
    const store = createStore(reducer, initialState);

    store.dispatch(actionToggleFoo);

    expect(store.getState()).toEqual(toggledFooState);
});

test('foo and bar are toggled', () => {
    const store = createStore(reducer, initialState);

    store.dispatch(actionToggleFoo);
    store.dispatch(actionToggleBar);

    expect(store.getState()).toEqual(toggledFooAndBarState);
});

test('dispatch 3 actions and see if subscription works', () => {
    const store = createStore(reducer, initialState);

    let counter = 0;
    
    const listener = () => {
        counter++;
    };

    const unsubscribe = store.subscribe(listener);

    store.dispatch(actionToggleFoo);
    store.dispatch(actionToggleBar);
    store.dispatch(actionDoSomething);

    unsubscribe();

    store.dispatch(actionDoSomething);

    expect(counter).toBe(3);
});
