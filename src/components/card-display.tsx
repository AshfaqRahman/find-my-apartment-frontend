import { Card } from "@mui/material";
import Image from "next/image";

export default function Apartment(props: any) {
  return (
    <>
        <Card>
            <div style={{
                    display: "flex", justifyContent: "left", backgroundColor: "#D8D8D8", margin:"40px",  marginLeft:"75px", borderRadius:"10px", fontFamily:"Tahoma"}}>
                <div>
                <Image 
                    src= {props.data.url}
                    width={200} height={200}
                    alt= {props.data.alt}/>   
                </div>
                <div style={{marginLeft:"40px"}}>
                    <h1>{props.data.title}</h1>
                    <h3>{props.data.text}</h3>
                </div>
            </div>
        </Card>
    </>
  );
}
