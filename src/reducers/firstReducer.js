const initialState = [];

const firstReducer = (state = initialState, action) => {

  switch (action.type) {
    case 'ADD':
      state.push(action.payload);
      return [...state];
    case 'REMOVE':
      state.pop();
      return [...state];
    default:
      return state;
  }
};

export default firstReducer;
