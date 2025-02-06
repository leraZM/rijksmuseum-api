import dotenv from 'dotenv';

dotenv.config();

export const API_KEY = process.env.API_KEY || '';
export const CULTURE = process.env.CULTURE || 'en';
export const BASE_URL = `${process.env.BASE_URL}/${CULTURE}`;
