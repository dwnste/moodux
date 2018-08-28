let state = {};
let listeners = [];
let rootReducer;

const dispatch = ({type, payload = {}}) => {
    state = rootReducer(state, {
        type,
        payload,
    });

    listeners.forEach(listener => {
        listener();
    });

    return {
        type,
        payload,
    };
};

const createStore = (reducer, preloadedState) => {
    state = preloadedState;
    rootReducer = reducer;

    dispatch({ type: 'INIT' });

    if (preloadedState) {
        dispatch({
            type: 'PRELOAD_STATE',
            payload: preloadedState,
        })
    }

    return {
        subscribe(listener) {
            if (!listener) {
                return;
            }

            listeners.push(listener);

            const unsubscribe = () => {
                const index = listeners.findIndex(func => func === listener);

                if (index > -1) {
                    listeners.splice(index, 1);
                }
            };

            return unsubscribe;
        },
        dispatch,
        getState() {
            return state;
        },
    };
}

export default createStore;
