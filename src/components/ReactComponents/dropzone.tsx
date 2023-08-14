import { _centeringStyle } from "@/static/constants";
import {
  faArrowUpFromBracket,
  faCloudArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Grid } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

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
  border: "1px solid #eaeaea",
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
  const onDrop = useCallback((acceptedFiles: any) => {
    acceptedFiles.forEach((file: any, idx: number) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result;
      };
      let preview = URL.createObjectURL(file);
      // console.log(preview);
      reader.readAsArrayBuffer(file);
      reader.onloadend = () => {
        // console.log(reader.result);
        // convert to base64 image
        const base64String = btoa(
          new Uint8Array(reader.result as ArrayBuffer).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ""
          )
        );
        props.onUpload(base64String);
      };
    });
  }, []);
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: props.maxFiles,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg"],
    },
    maxSize: 5 * 1024 * 1024,
  });
  // const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
  const [thumbs, setThumbs] = useState<any[]>([]);
  const [files, setFiles] = useState<any[]>([]);

  useEffect(() => {
    let acceptableFiles = acceptedFiles.filter(
      (file) => !files.includes(file.name)
    );
    let approvedFiles = [...files, ...acceptableFiles.map((file) => file.name)];

    approvedFiles.splice(0, Math.max(0, approvedFiles.length - props.maxFiles));

    setFiles(approvedFiles);

    let acFiles = acceptableFiles.map((file: any) => (
      <div style={thumb} key={file.name}>
        <div style={{ ...thumbInner, backgroundColor: "#ff000005" }}>
          <Grid
            item
            style={{
              position: "absolute",
              zIndex: 1,
              right: 0,
              backgroundColor: "blue",
            }}
            md={12}
            lg={12}
          >
            <Box width={"100%"} sx={{ ..._centeringStyle }}>
              cross
            </Box>
          </Grid>
          <img
            src={URL.createObjectURL(file)}
            width={"100px"}
            height={"100px"}
            // Revoke data uri after image is loaded
            onLoad={() => {
              URL.revokeObjectURL(file.preview);
            }}
          />
        </div>
      </div>
    ));

    approvedFiles = [...thumbs, ...acFiles];
    approvedFiles.splice(0, Math.max(0, approvedFiles.length - props.maxFiles));
    setThumbs(approvedFiles);
  }, [acceptedFiles]);

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
              }}
            >
              <FontAwesomeIcon icon={faCloudArrowUp} bounce size="2xl" />
            </Box>
          </Grid>
        </Grid>
      </div>
      <Grid item md={12} lg={12}>
        <Box
          sx={{
            maxWidth: "28vw",
            minWidth: "28vw",
            px: 2,
          }}
          sx={{
            ..._centeringStyle,
          }}
        >
          <ul>{thumbs}</ul>
        </Box>
      </Grid>
    </section>
  );
}
