import { _centeringStyle } from "@/static/constants";
import {
  faArrowUpFromBracket,
  faCloudArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Grid, IconButton } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import CloseIcon from "@mui/icons-material/Close";
import CancelIcon from "@mui/icons-material/Cancel";

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 0,
  backGroundColor: "red",
};

const thumb = {
  display: "inline-flex",
  borderRadius: 1,
  // border: "1px solid #eaeaea",
  marginBottom: 4,
  marginRight: 4,
  width: 100,
  padding: 0,
  backGroundColor: "red",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  minWidth: "10vw",
};

export default function Dropzone(props: any) {
  let [thumbs, setThumbs] = useState<any[]>([]);
  let [files, setFiles] = useState<any[]>([]);

  let remove = (name: string) =>  {
    // let files_ = files;
    // console.log(files, thumbs);
    let newFiles = files.filter((file) => file !== name);
    let newThumbs = thumbs.filter((thumb) => thumb.filename !== name);
    setFiles(newFiles);
    // console.log(newFiles);
    setThumbs(newThumbs);
  };

  const onDrop = useCallback(
    (acceptedFiles: any) => {
      console.log("onDrop:: acceptedFiles");
      // console.log("useEffect:: acceptedFiles");
      let acceptableFiles = acceptedFiles.filter(
        (file: any) => !files.includes(file.name)
      );
      let approvedFiles = [
        ...files,
        ...acceptableFiles.map((file: any) => file.name),
      ];

      approvedFiles.splice(
        0,
        Math.max(0, approvedFiles.length - props.maxFiles)
      );

      setFiles([...approvedFiles]);

      let acFiles = acceptableFiles.map((file: any) => {
        return {
          filename: file.name,
          jsx: (removeFunction: any) =>  (
            <div style={thumb} key={file.name}>
              <div
                style={{
                  ...thumbInner,
                  width: "100px",
                  height: "100px",
                  position: "relative",
                }}
              >
                <img
                  src={URL.createObjectURL(file)}
                  // Revoke data uri after image is loaded
                  style={{
                    position: "absolute",
                    zIndex: 1,
                    bottom: 0,
                  }}
                  width={"95%"}
                  height={"95%"}
                  onLoad={() => {
                    URL.revokeObjectURL(file.preview);
                  }}
                />
                <div
                  style={{
                    zIndex: 10,
                    right: 0,
                    top: -5,
                    position: "absolute",
                    cursor: "pointer",
                    // backgroundColor: "rgba(0,0,0,0.5)",
                    borderRadius: "50%",
                    padding: 0,
                  }}
                >
                  <IconButton
                    size="small"
                    sx={{
                      padding: 0,
                    }}
                    onClick={() => removeFunction(file.name)}
                  >
                    <CancelIcon fontSize="small" />
                  </IconButton>
                </div>
              </div>
            </div>
          ),
        };
      });

      approvedFiles = [...thumbs, ...acFiles];
      approvedFiles.splice(
        0,
        Math.max(0, approvedFiles.length - props.maxFiles)
      );
      setThumbs(approvedFiles);
      // acceptedFiles.forEach((file: any, idx: number) => {
      //   // console.log(file);
      //   // const reader = new FileReader();

      //   // reader.onabort = () => console.log("file reading was aborted");
      //   // reader.onerror = () => console.log("file reading has failed");
      //   // reader.onload = () => {
      //   //   // Do whatever you want with the file contents
      //   //   const binaryStr = reader.result;
      //   // };
      //   // let preview = URL.createObjectURL(file);
      //   // // console.log(preview);
      //   // reader.readAsArrayBuffer(file);
      //   // reader.onloadend = () => {
      //   //   // console.log(reader.result);
      //   //   // convert to base64 image
      //   //   const base64String = btoa(
      //   //     new Uint8Array(reader.result as ArrayBuffer).reduce(
      //   //       (data, byte) => data + String.fromCharCode(byte),
      //   //       ""
      //   //     )
      //   //   );
      //   //   props.onUpload(base64String);
      //   // };
      // });
    },
    [files]
  );
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: props.maxFiles,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg"],
    },
    maxSize: 5 * 1024 * 1024,
  });
  // const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  

  useEffect(() => {}, [acceptedFiles]);

  return (
    <section className="container">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <Grid container>
          <Grid
            item
            lg={12}
            md={12}
            sx={{
              maxWidth: "28vw",
              minWidth: "28vw",
              px: 2,
            }}
          >
            <Box
              sx={{
                ..._centeringStyle,
                borderRadius: 2,
                fontWeight: "bold",
              }}
            >
              {props.title}
            </Box>
            <Box
              sx={{
                ..._centeringStyle,
                borderRadius: 3,
                height: "10vh",
                width: "100%",
                padding: 0,
                border: "dotted",
                flexDirection: "column",
              }}
            >
              <FontAwesomeIcon icon={faCloudArrowUp} bounce size="2xl" />
              file names must be unique
            </Box>
          </Grid>
        </Grid>
      </div>
      <Grid item md={12} lg={12}>
        <Box
          sx={{
            ..._centeringStyle,
            width: "28vw",
            mx: 2,
            // border: "dotted",
          }}
        >
          <ul>{thumbs.map((thumb : any) => thumb.jsx(remove))}</ul>
        </Box>
      </Grid>
    </section>
  );
}
