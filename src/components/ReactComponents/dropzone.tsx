import { _centeringStyle } from "@/static/constants";
import {
  faArrowUpFromBracket,
  faCloudArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import CloseIcon from "@mui/icons-material/Close";
import CancelIcon from "@mui/icons-material/Cancel";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "@/services/firebase-config";
import { randomInRange } from "@/static/utils";
import ToastComponent from "@/mui-components/toast";

import CircularProgress, {
  CircularProgressProps,
} from "@mui/material/CircularProgress";

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
  let fileUrls = props.fileUrls;

  let [openToast, setOpenToast] = useState(false);
  let [message, setMessage] = useState("");
  let [severity, setSeverity] = useState("success");

  let [uploadingFiles, setUploadingFiles] = useState(false);
  let [progress, setProgress] = useState(0);

  let remove = (url: string) => {
    // let files_ = files;
    // console.log(files, thumbs);
    // let newFilenames = filenames.filter((file) => file !== name);
    // let newThumbs = thumbs.filter((thumb) => thumb.filename !== name);
    // setFilenames(newFilenames);
    // setThumbs(newThumbs);

    const storageRef = ref(storage, url);
    fileUrls = fileUrls.filter((file) => file !== url);
    props.onUpload(fileUrls);
    let acthumbs = thumbs.filter((thumb) => thumb.url !== url);
    setThumbs(acthumbs);

    deleteObject(storageRef)
      .then(() => {
        setMessage("image file deleted");
        setSeverity("success");
        setOpenToast(true);
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
        setMessage("image file deletion failed");
        setSeverity("error");
        setOpenToast(true);
      });
  };

  let setImageThumbnail = async (fileUrls: any[]) => {
    let acFiles = fileUrls.map((url: any, idx) => {
      return {
        url: url,
        jsx: (removeFunction: any) => (
          <div style={thumb} key={idx}>
            <div
              style={{
                ...thumbInner,
                width: "100px",
                height: "100px",
                position: "relative",
              }}
            >
              <img
                src={url}
                // Revoke data uri after image is loaded
                style={{
                  position: "absolute",
                  zIndex: 1,
                  bottom: 0,
                }}
                width={"95%"}
                height={"95%"}
                // onLoad={() => {
                //   URL.revokeObjectURL(url.preview);
                // }}
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
                  onClick={() => removeFunction(url)}
                >
                  <CancelIcon fontSize="small" />
                </IconButton>
              </div>
            </div>
          </div>
        ),
      };
    });
    setThumbs(acFiles);
  };

  let uploading = async (files) => {
    files.forEach((file, index) => {
      const storageRef = ref(
        storage,
        `${props.location}/${new Date().getTime()}_${randomInRange(
          0,
          10000000000
        )}_${file.name}`
      );

      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
        },
        (error) => {
          // Handle unsuccessful uploads
          setMessage("image file uploading failed");
          setSeverity("error");
          setOpenToast(true);
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...

          getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
            // console.log("File available at", downloadURL);
            fileUrls.push(downloadURL);
            props.onUpload(fileUrls);
            await setImageThumbnail(fileUrls);

            if (index === files.length - 1) {
              setUploadingFiles(false);
            }
          });
        }
      );
    });
  };

  const onDrop = useCallback((acceptedFiles: any[]) => {
    if (acceptedFiles.length === 0) {
      return;
    }
    if (fileUrls.length + acceptedFiles.length > props.maxFiles) {
      setMessage("max files exceeded");
      setSeverity("error");
      setOpenToast(true);
      return;
    }
    setUploadingFiles(true);
    // console.log("useEffect:: acceptedFiles", acceptedFiles);

    uploading(acceptedFiles);
  }, []);

  useEffect(() => {
    setImageThumbnail(fileUrls);
  }, []);

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: props.maxFiles,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg"],
    },
    maxSize: 5 * 1024 * 1024,
  });

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
              {uploadingFiles ? (
                <>
                  <CircularProgressWithLabel value={progress} />
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faCloudArrowUp} bounce size="2xl" />
                  file names must be unique
                </>
              )}
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
          <ul>{thumbs.map((thumb: any, idx: any) => thumb.jsx(remove))}</ul>
        </Box>

        <ToastComponent
          message={message}
          open={openToast}
          onClose={setOpenToast}
          onCross={setOpenToast}
          severity={severity}
        />
      </Grid>
    </section>
  );
}

function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number }
) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="text.secondary"
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}
