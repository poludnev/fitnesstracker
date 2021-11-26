const initialState = [];

const secondReducer = (state = initialState, action) => {

  switch (action.type) {
    case 'ADD_TODAY':
      // state.push(...Object.values(action.payload));
      return Object.values(action.payload);
    case 'REMOVE':
      state.pop();
      return [...state];
    default:
      return state;
  }
};

export default secondReducer;
