import * as React from "react";
import Hero from "../components/hero";
import ListPost from "../components/listPost";
import Header from "../components/shared/header";

export default function Home() {
  return (
    <React.Fragment>
       <Header />
       <Hero />
       <ListPost />
    </React.Fragment>
  );
}