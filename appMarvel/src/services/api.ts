/* eslint-disable import/no-unresolved */
import axios from 'axios';
import Crypto from 'crypto-js';
import { BASE_URL, PRIVATE_KEY, PUBLIC_KEY, TS } from '@env';

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    apikey: PUBLIC_KEY,
    hash: String(Crypto.MD5(`${TS}${PRIVATE_KEY}${PUBLIC_KEY}`)),
    ts: TS,
  },
});

export default api;
