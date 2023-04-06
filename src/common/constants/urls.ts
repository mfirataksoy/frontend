export const baseURL = 'http://localhost:3002'
export const prodURL = 'https://backend.keepsakeproject.com'

export const endpoints = {
  auth: {
    login: '/v1/auth/login',
    register: '/v1/auth/register',
    logout: '/v1/auth/logout',
    verify: '/v1/auth/verify-email',
    accountDetails: '/v1/auth/me',
  },
  posts: '/posts',

  feed: '/posts/feed',
  
  families: {
    families: '/families',
    myFamilies: '/families/my-family',
    joinFamily: '/families/join-family',
    deleteFamily: '/families',
    openCloseFamily: '/families'
  },

  file: {
    profilePhoto: '/file/uploadPhoto',
  },

  users: {
    getUser: '/users'
  },

}
