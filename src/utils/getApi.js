import axios from 'axios';

const API_KEY = '27474155-3cfd7f528fc901bb0ea0a4d0b';

axios.defaults.baseURL = 'https://pixabay.com/api/';


export const getApi = (q, page) => {
    axios.defaults.params = {
        q,
        page,
        per_page: 12,
        image_type: 'photo',
        orientation: 'horizontal',
        key: API_KEY,
      };
   return axios.get().then((({data}) => {return data}));
}