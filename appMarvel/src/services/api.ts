import axios from 'axios';
import Crypto from 'crypto-js';

const privateKey = '77af81a983a77dc066a2dd5696eef99f48e0300b';
const publicKey = '10bab138cb8384426205710437215153';
const ts = '1';

const api = axios.create({
  baseURL: 'https://gateway.marvel.com:443/v1/public',
  params: {
    ts,
    apikey: publicKey,
    hash: String(Crypto.MD5(`${ts}${privateKey}${publicKey}`)),
  },
});

export default api;
