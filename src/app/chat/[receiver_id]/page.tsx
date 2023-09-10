"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  _apartmentTypes,
  _area,
  _baths,
  _beds,
  _budget,
  _centeringStyle,
  _color,
  _divRadius,
  _mapHeightInAddApartment,
  _pageHeight,
  apartmentTypeReverseMapping,
} from "@/static/constants";
import SocketIOClient from "socket.io-client";
import { Typography, Button, TextField, Grid, Box, Avatar, AppBar, Toolbar, IconButton } from "@mui/material";
import HOST from "@/static/host";
import { getCookie } from 'cookies-next';
import jwt_decode from 'jwt-decode';
import { getChat, getChatList } from "../apis";
import ToastComponent from "@/mui-components/toast";
import SendIcon from '@mui/icons-material/Send';

// parse jwt token from cookie
const getUserIdFromAuthToken = () => {
  const token = getCookie('token')?.toString();
  if (!token) return "";
  const decoded: any = jwt_decode(token);
  return decoded.id;
}

interface IChat {
  user_id: string;
  first_name: string;
  last_name: string;
  last_message: string;
  sent_time: Date;
  sender_id: string;
  receiver_id: string;
}

interface IMsg {
  sender_id: string;
  message: string;
  receiver_id: string;
  sent_at: Date;
}

const sender_id = getUserIdFromAuthToken();
console.log("user", sender_id);

const socket = SocketIOClient(HOST);
socket.on("connect", () => {
  console.log("connected at ", socket.id);
});


export default function Chat(params:any){
  const inputRef = useRef(null);

  // connected flag
  const [connected, setConnected] = useState<boolean>(false);

  // init chat and message
  const [chat, setChat] = useState<IMsg[]>([]); 
  const [msg, setMsg] = useState<string>("");
  // const chatEndRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   if (chatEndRef.current) {
  //     chatEndRef.current.scrollIntoView({ behavior: "smooth" });
  //   }
  // }, [chat]);
  
  // toast
  const [openToast, setOpenToast] = useState(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [severity, setSeverity] = useState("success");

  // chat list 
  const [chatList, setChatList] = useState<IChat[]>([]);
  // receiver id
  const [receiverId, setReceiverId] = useState<string>("");


  useEffect((): any => {
    const receiver_id = params.params.receiver_id;
    console.log("chat:useEffect-> receiver_id", receiver_id);
    setReceiverId(receiver_id);
    // connect to socket server
    console.log("HOST", HOST);

    // bring chat list
    (async () => {
      const response = await getChatList();
      if(response.success) {
        setChatList(response.data as IChat[]);
        console.log("page->getChatList", response);
      }else {
        console.log("page->getChatList", response.message);
      }

      const chatResponse = await getChat(receiver_id);
      if(chatResponse.success) {
        // append all the message to chat
        chatResponse.data.forEach((msg: IMsg) => {
          chat.push(msg);
        });
        setChat([...chat]);

        console.log("page->getChat", chatResponse);
      }else {
        console.log("page->getChat", chatResponse.message);
      }

      
    })();

    // log socket connection
    if(socket.connected) {
      console.log("connected at ", socket.id);
      setConnected(true);
    }

    // emit to register-user event with userId
    socket.emit("register-user", sender_id);
    console.log("register-user->", sender_id);

    // update chat on new message dispatched
    socket.on("receive-message", (message: IMsg) => {
      console.log("receive-message", message);
      // append message to chat
      chat.push(message);
      setChat([...chat]);
    });

    // disconnect
    socket.on("disconnect", () => {
      console.log("disconnected"); 
      setConnected(false);
    });

    // socket disconnet onUnmount if exists
    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = async () => {
    if (msg) {
      const user_id = sender_id;
      const message = msg;
      const receiver_id = receiverId;
      const sent_at = new Date();

      // build message obj
      const msgObj: IMsg = {
        sender_id: user_id,
        message,
        receiver_id,
        sent_at,
      };

      // dispatch message to other users
      socket.emit("send-message", msgObj);

      // clear message input
      setMsg("");

     // chat.push(msgObj);
     // setChat([...chat]);
    }

    // focus after click
    inputRef?.current;
  };

  return (
    <>
      <Grid container item pt={"16px"}>
        {/* grid on the left panel */}
        <Grid
          height={_pageHeight}
          position={"fixed"}
          overflow={"auto"}
          display={{ md: "block", lg: "block" }}
          container
          item
          lg={3}
          md={3}
          sm={4}
        >
          <Grid item lg={12} 
          style={{
            display: "flex",
            justifyContent:"flex-start", 
            alignItems:"center",
            }}
            >
            {chatList.map((chat, i) => (
                  <Box
                    key={"msg_" + i}
                    boxShadow={2}
                    width={"100%"}
                    borderRadius={0}
                    style={{
                      display: "block",
                      padding: "16px"
                    }}
                  >
                    

                    <Grid item xs={12} 
                    display={"flex"}
                    >
                      <Avatar style={{ marginRight: "8px" }}>{chat.first_name.charAt(0)}</Avatar>
                      <Box
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                        }}>
                          <Typography variant="body1">{chat.first_name} {chat.last_name}</Typography> 
                          <Typography variant="caption">
                            {chat.sender_id === sender_id ? (
                              <Typography variant="caption" component="span" style={{ fontWeight: "bold" }}>
                                You:
                              </Typography>
                            ) : null}
                            {chat.last_message}
                          </Typography>
                          <Typography variant="caption" align="left" color="textSecondary">
                            {chat.sent_time.toString()}
                          </Typography>
                        </Box>
                    </Grid>
                    
                  </Box>
                ))}
          </Grid>
        </Grid>

          {/* grid on the right panel */}
        <Grid 
          container
          height={_pageHeight}
          lg={9}
          position={"fixed"}
          overflow={"auto"}
          pb={"15vh"}
          left={{ md: "25%", lg: "25%", sm:"33%"}}
          sx={{
          backgroundColor: "#ffffa5",          
          width: "75vw",
        }}
        >

              {/* chat header */}
            <Grid item lg={12}
            style={{
              display: "block",
              justifyContent:"flex-start",
              alignItems:"flex-start",
              height: "10vh",
              position:"fixed",
              width:"75vw",
            
            }}
            >
              <AppBar position="static">
                <Toolbar>
                  <Box sx={{ 
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    spacing: 8,
                    }}>
                    <Avatar style={{ marginRight: "8px" }}>A</Avatar>
                    <Typography variant="h6" pl={"16px"}>Ashfaq Rahman</Typography>
                  </Box>
                </Toolbar>
              </AppBar>
              
            </Grid>

            {/* chat body */}
            <Grid container 
            bgcolor="#fff2f2"
            mt={"10vh"}
            style={{ display:"flex",overflowY: "auto",
            flexDirection: "column-reverse",
            height:"65vh"
            }}>
              <Grid item xs={12} padding={"16px"}>
                {chat.length ? (
                  chat.map((chat, i) => (
                    <div
                      key={"msg_" + i}
                      style={{
                        marginBottom: "8px",
                        display: "flex",
                        justifyContent: chat.sender_id === sender_id ? "flex-end" : "flex-start",
                      }}
                    >

                      <Box style={{ 
                        backgroundColor: chat.sender_id === sender_id ? "#2196f3" : "#fff", 
                        color: chat.sender_id === sender_id ? "#fff" : "#000", marginBottom: "8px",    
                        width: "fit-content",
                        padding: "8px",
                        borderRadius: "8px",
                        }}>
                        
                        <Typography variant="body1">{chat.message}</Typography>
              
                      </Box> 
                    </div>
                  ))
                ) : (
                  <Typography variant="subtitle1" align="center" color="textSecondary" style={{ marginTop: "16px" }}>
                    No chat messages
                  </Typography>
                )}
              </Grid>
            </Grid>

            {/* chat footer */}
            <Grid container 
            style={{ backgroundColor: "#ffbbcc", 
            display: "block", padding:"16px", 
            position:"fixed", bottom:"0",
            width:"75vw",
            height:"15vh"
            }}>
              <Grid item lg={12} 
              style={{backgroundColor:"#00ff00", 
              display: "flex",  
              justifyContent:"center", 
              alignItems:"center"
              }}>
                <TextField
                  style={{ flexGrow: 1, marginRight: "16px" }}
                  variant="outlined"
                  label={connected ? "Type a message..." : "Connecting..."}
                  disabled={!connected}
                  value={msg}
                  onChange={(e) => {
                    setMsg(e.target.value);
                  }}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      sendMessage();
                    }
                  }}
                />

                <IconButton
                  style={{ backgroundColor: "#2196f3", color: "#fff" }}
                  onClick={sendMessage}
                  disabled={!connected}
                >
                  <SendIcon />
                </IconButton>
              </Grid>
            </Grid>


        </Grid>

          

        <ToastComponent
          message={toastMessage}
          open={openToast}
          onClose={setOpenToast}
          onCross={setOpenToast}
          severity={severity}
        />
      </Grid>
    </>
  );
}