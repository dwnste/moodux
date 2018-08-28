import compose from './utils';

const applyMiddleware = (...middlewares) =>
    createStore = (...args) => {
        const store = createStore(...args);
        const { getState } = store;
        const dispatch = compose(middlewares.map(m => m({ getState })))(store.dispatch);

        return {
            ...store,
            dispatch
        };
    };

export default applyMiddleware;
