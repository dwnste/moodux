let state = {};
let listeners = [];

const dispatch = ({type, payload = {}}) => {
    state = reducer(state, {
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

    dispatch({ type: 'INIT' });

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
