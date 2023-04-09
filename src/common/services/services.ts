// This file is going to include all the services that we are going to use in our application

import { endpoints } from "../constants/urls";
import { httpClient } from "./httpClient";
import type { Family, Post, SignupData, VerifyEmailData } from "~/stores/types";
import type { LoginResponse } from "~/stores/response.type";

export const login = async (email: string, password: string) => {
  const response = await httpClient.post<LoginResponse>(endpoints.auth.login, {
    email,
    password,
  });
  return { data: response.data, status: response.status };
};

export const getPosts = async () => {
  const response = await httpClient.get<Post[]>(endpoints.posts);
  return response.data;
};

export const getFeed = async (familyIds: string[], feedOptions: any) => {
  const response = await httpClient.post<any>(endpoints.feed, {
    familyIds: familyIds,
    skip: feedOptions.skip,
    limit: feedOptions.limit,
  });
  return response.data;
};

export const signup = async (signupData: SignupData) => {
  const response = await httpClient.post(endpoints.auth.register, signupData);

  return { data: response.data, status: response.status };
};

export const verifyEmail = async (verifData: VerifyEmailData) => {
  const response = await httpClient.post(endpoints.auth.verify, verifData);

  return { data: response.data, status: response.status };
};

export const makePost = async (payload) => {
  const response = await httpClient.post(endpoints.posts, {familyId: payload.familyId,
    audioUrl: payload.audioUrl});

  return { data: response.data, status: response.status };
};

export const getAccountDetails = async () => {
  const response = await httpClient.get(endpoints.auth.accountDetails);

  return response.data;
};

export const editAccountDetails = async (data: any) => {
  const response = await httpClient.put(endpoints.auth.accountDetails, data);

  return response.data;
};

export const getFamilies = async () => {
  const response = await httpClient.get(endpoints.families.myFamilies);
  return response.data;
};

export const getFamily = async (id: string) => {
  const response = await httpClient.get(endpoints.families.families  + `/${id}`);
  return response.data;
};

export const createFamily = async (familyName: string) => {
  const response = await httpClient.post(endpoints.families.families, {
    name: familyName,
  });
  return response.data;
};

export const getUser = async (id: string) => {
  const response = await httpClient.get(endpoints.users + `/${id}`)
  return response.data;
}

export const deleteFamily = async (id: string) => {
  const response = await httpClient.delete(endpoints.families.deleteFamily + `/${id}`);
  return response.data;
};

export const updateFamily = async (id: string, update: Family) => {
  console.log("I am here")
  console.log(endpoints.families.families + `/${id}`)
  const response = await httpClient.patch(endpoints.families.families + `/${id}`, update);
  return response.data;
}

export const closeFamily = async (id: string) => {
  const response = await httpClient.get(endpoints.families.closeFamily + `/${id}`)
  return response.data;
}

export const openFamily = async (id: string) => {
  const response = await httpClient.get(endpoints.families.openFamily + `/${id}`)
  return response.data;
}


export const joinFamily = async (code: string) => {
  const response = await httpClient.get(
    endpoints.families.joinFamily + `/${code}`
  );
  return response.data;
};



export const uploadProfilePic = async (data: any) => {
  const response = await httpClient.post(endpoints.file.profilePhoto, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const uploadPost = async (data: any) => {
  const response = await httpClient.post(endpoints.file.profilePhoto, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const deletePost = async (id: string) => {
  const response = await httpClient.delete(endpoints.posts + `/${id}`)
  return response.data
}

export const services = {
  signup,
  verifyEmail,
  login,
  makePost,
  getAccountDetails,
  getPosts,
  editAccountDetails,
  getFamilies,
  createFamily,
  joinFamily,
  uploadProfilePic,
  uploadPost,
  deleteFamily,
  updateFamily,
  getUser,
  closeFamily,
  openFamily,
  getFamily,
  deletePost
  
};
