"use client"

import Button from "@mui/material/Button";



export default function ButtonComponent(props: any) {
    return (
        <Button variant={props.variant} onClick={props.onClick}>
            {props.children}
        </Button>
    )

}