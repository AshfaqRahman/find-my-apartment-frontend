import { apiUrls } from '@/lib/apiUrls';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import HOST from "@/static/host";

// call api/message/chatlist to fetch chat list
export const getChatList = async () => {
  const token = getCookie('token');
  const response = await axios.get(apiUrls.chat.list, {
    headers: {
      Authorization: `${token}`,
    },
  });
  //console.log("getChatList", response);
  if(response.status !== 200) {
    return {
      success: false,
      message: "Something went wrong",
      data: [],
    }
  }
  return {
    success: true,
    message: "Chat list fetched successfully",
    data: response.data.data,
  }
}

// call api/message/:friend_id to fetch chat
export const getChat = async (friend_id: string) => {
  const token = getCookie('token');
  const response = await axios.get(
    `${apiUrls.chat.messages}/${friend_id}`, 
    {
    headers: {
      Authorization: `${token}`,
    },
  });
 // console.log("getChat", response);
  if(response.status !== 200) {
    return {
      success: false,
      message: "Something went wrong",
      data: [],
    }
  }
  return {
    success: true,
    message: "Chat fetched successfully",
    data: response.data.data,
  }
}

// call api/user/:user_id to fetch user
export const getUser = async (user_id: string) => {
  const token = getCookie('token');
  const response = await axios.get(
    `${HOST}/api/user/${user_id}`, 
    {
    headers: {
      Authorization: `${token}`,
    },
  });
  //console.log("getUser", response);
  if(response.status !== 200) {
    return {
      success: false,
      message: "Something went wrong",
      data: [],
    }
  }
  return {
    success: true,
    message: "User fetched successfully",
    data: response.data.data,
  }
}