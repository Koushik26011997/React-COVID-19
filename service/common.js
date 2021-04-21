import axios from 'axios';
import { BASE_URL } from '../Constant';

export const request = async (method, url, data = {}, isFullURL = false) => {

  let base;

  let instance = axios.create({
    baseURL: isFullURL ? url : BASE_URL,
    timeout: 8000,
    headers: {},
  });

  if (method === 'post') {
    console.log('post');
    base = instance.post(url, data);
  }
  else if (method === 'put') {
    base = instance.put(url, data);
  }
  else if (method === 'patch') {
    base = instance.patch(url, data);
  }
  else if (method === 'delete') {
    base = instance.delete(url);
  }
  else
    base = instance.get(url, { params: data });

  return base;
}
