import * as React from "react";
import Card from "./atom/card";
import "./../../sass/shared/_cardPost.scss";

export default function CardPost() {
  return (
    <React.Fragment>
    
     <aside className="listCard">
        <Card title="Desarrollador" description="AE1 requiere de un desarrollador frontend para sus productos"/>
        <Card title="Desarrollador" description="AE1 requiere de un desarrollador frontend para sus productos"/>
        <Card title="Desarrollador" description="AE1 requiere de un desarrollador frontend para sus productos"/>
        <Card title="Desarrollador" description="AE1 requiere de un desarrollador frontend para sus productos"/>
     </aside>
    </React.Fragment>
  );
}