import axios from 'axios';
//  baseURL: "http://localhost:3334",
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  //baseURL: "http://localhost:3334",
  headers: {
    "Content-Type": "application/json",
  },
});
