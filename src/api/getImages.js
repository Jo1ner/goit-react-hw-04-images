import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '39533166-9bd7aa608c643a8dc83511a02';

export const fetchImages = (searchText, page) => {
  return axios.get(
    `${BASE_URL}?key=${API_KEY}&q=${searchText}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`
  );
};
