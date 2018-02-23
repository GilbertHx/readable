import * as TYPE from './type';
import { api, headers } from './../config/api_setting';

export function fetchCategories() {
  const request = fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories);

  return {
    type: TYPE.FETCH_CATEGORIES,
    payload: request
  };
}
