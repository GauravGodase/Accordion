import React from "react";
import ListView from "./ListView";
import "../styles/ListView.scss";


function Home() {
  return (
    <div style={{width:"100%", display: "flex", justifyContent:"center"}}>
      <ListView />
    </div>
  );
}

export default Home;
