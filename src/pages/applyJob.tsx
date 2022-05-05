import * as React from "react";
import Header from "../components/shared/header";
import "./../sass/pages/_applyJob.scss";


import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";



export default function ApplyJob() {
    
  return (
    <React.Fragment>
      <Header />
      <section className="applyJob">
        <aside className="coverHeader mb-5">
          <h1 className="mb-2">Diseñador UX/UI</h1>
          <p>Empresa Famel SAC</p>
        </aside>
        <aside>
          <Tabs >
            <TabList className={"mb-5"}>
              <Tab>Datos generales</Tab>
              <Tab>Skills</Tab>
              <Tab>Experiencia</Tab>
            </TabList>

            <TabPanel>
              <h2>Any content 1</h2>
            </TabPanel>
            <TabPanel>
              <h2>Any content 2</h2>
            </TabPanel>
            <TabPanel>
              <h2>Any content 3</h2>
            </TabPanel>
          </Tabs>
        </aside>
      </section>
    </React.Fragment>
  );
}
