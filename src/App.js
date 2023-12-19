import React, { useState } from "react";
import summer from "./Images/summer.jpg";
import winter from "./Images/winter.jpg";

const App=()=>{

    const[latitude, setLatitude]= useState(0);
    const[longitude, setLongitude]= useState(0);
    const[hemisphere, setHemisphere]= useState("");
    const[month, setMonth]= useState(()=>{return new Date().getMonth()+1});//Lazy Initialization: We dont want to reload it again and again when we click on the button.
    function fetchLocation(){
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition((position)=>{
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
                if(position.coords.latitude>0)
                {
                    setHemisphere("Northern Hemisphere");
                }
                else if(position.coords.latitude<0)
                {
                    setHemisphere("Southern Hemisphere");
                }
                else
                {
                    setHemisphere("Equator");
                }
            })
        }
    }
    return(
        <div>
            <button onClick={fetchLocation}>Fetch Location</button>

            <h1>{latitude}</h1>
            <h1>{longitude}</h1>
            <h1>{hemisphere}</h1>
            <h1>{month}</h1>

            {
                hemisphere && (hemisphere=="Northern Hemisphere" && month>=4 && month<=10) ||(hemisphere=="Southern Hemisphere" && (month<4  || month >10))
                (
                    <div>
                        <h1>Summer Season</h1>
                        <img src={summer}></img>

                    </div>
                )
            }

            {
                hemisphere && (hemisphere=="Northern Hemisphere" && (month<4 || month>10)) || (hemisphere=="Southern Hemisphere" && month>=4 && month <= 10)
                (
                    <div>
                        <h1>Winter Season</h1>
                        <img src={winter}></img>

                    </div>
                )
            }
        </div>
    )
}

export default App;