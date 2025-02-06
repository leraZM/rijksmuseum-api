import axios from 'axios';
import { BASE_URL } from '../config/constants';

export const apiClient = axios.create({
  baseURL: BASE_URL,
  validateStatus: () => true,
});
