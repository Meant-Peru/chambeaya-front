import * as React from "react";
import BecauseSection from "../components/BecauseSection";
import Hero from "../components/hero";
import ListPost from "../components/listPost";
import PartnerSection from "../components/PartnerSection";
import Footer from "../components/shared/footer";
import Header from "../components/shared/header";

export default function Home() {
  return (
    <React.Fragment>
       <Header />
       <Hero />
       <ListPost />
       <PartnerSection />
       <BecauseSection/>
       <Footer />
    </React.Fragment>
  );
}