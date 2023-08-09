import { Alert, Snackbar } from "@mui/material"
import React from "react";



export default function ToastComponent(props: any) {
    return (
        
      <Snackbar open={props.open} autoHideDuration={5000} onClose={() => {props.onCross(false)}} >
      <Alert onClose={() => props.onCloss(false)} severity={props.severity} sx={{ width: '100%' }}>
        {props.message}
      </Alert>
    </Snackbar>
    )
}