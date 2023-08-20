"use client"

import { Card, Grid } from "@mui/material"
import Image from "next/image"
import Link from "next/link";

export default function ZoneCard(props: any) {
    const imgSize = 160, wdt = "30vw";

    return (
        <>
            <Card style={{display: "flex", justifyContent: "right", width:wdt, marginRight:"20px", marginTop:"10px", marginBottom:"0px", marginLeft:"45px", borderRadius:"12px"}}>
                <Link href={props.zoneLink} style={{textDecoration: "none"}}>
                    <Grid style={{display: "flex", justifyContent: "left", width:wdt}}>
                        <Grid>
                            <Image 
                            src={props.imageSrc}
                            width={imgSize} height={imgSize}
                            alt={props.imageAlt}/>   
                        </Grid>
                        <Grid style={{marginLeft:"20px", fontFamily: "Tahoma", color: "#1F1F1F", paddingRight:"15px"}}>
                            <h2>{props.cardTitle}</h2>
                            <p style={{fontSize:"12px"}}>{props.cardText}</p>
                        </Grid>
                    </Grid>  
                </Link>
            </Card>
        </>
    );
}