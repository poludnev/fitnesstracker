import axios from 'axios';

export const add = (payload) => {
  const id = Date.now();
  const date = new Date(id);
  const [month, day, year] = [date.getUTCMonth(), date.getUTCDate(), date.getUTCFullYear()];
  const trainingId = `${year}${month + 1}${day}`

  axios.post('https://poludnev.com/api/fitness', {
    [id]: {trainingId, ...payload},
  }).then((response) => {
    console.log('got response', response.data)
    
  }).catch((e) => {
    console.error('fucked up', e);
  })
  
  return { type: 'ADD', payload: { [id]: {trainingId, ...payload}} };
};

export const remove = (payload, ...args) => {
  console.log('action: remove task', payload);

  return { type: 'REMOVE' };
}
