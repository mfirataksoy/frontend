import axios from 'axios'
import { baseURL } from '../constants/urls'

// if developlent mode

// vite if development mode
const isDev = import.meta.env.DEV
const tokenRes: LoginResponse = localStorageState.value
const accesToken = tokenRes?.idToken?.jwtToken

export const httpClient = axios.create({
  baseURL: baseURL
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${accesToken}`,
  },
})
