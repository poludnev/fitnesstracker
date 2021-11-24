import axios from 'axios';

export const add = (payload, ...args) => {

  console.log('action: added task', payload);
  return { type: 'ADD', payload };
};

export const remove = (payload, ...args) => {
  console.log('action: remove task', payload);

  return { type: 'REMOVE' };
}

