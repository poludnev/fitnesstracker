const initialState = {};

const firstReducer = (state = initialState, action) => {

  switch (action.type) {
    case 'ADD':
      // state.push(action.payload);

      console.log('action....', action.payload)

      // state[action.payload.id] = action.payload;

      const newState = { ...state, ...action.payload }
      console.group(newState)

      return newState
    case 'REMOVE':
      
      return { ...state };
    default:
      return state;
  }
};

export default firstReducer;
