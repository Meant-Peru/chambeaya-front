import * as React from "react";
import Header from "../components/shared/header";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import CheckButton from "../components/shared/atom/checkButton";
import toast, { Toaster } from 'react-hot-toast';
import {
  Txtfield,
  DropdownMenu,
  DropdownItem,
  BtnPrimary,
} from "./../components/shared/styled";
import "react-tabs/style/react-tabs.css";
import "./../sass/pages/_applyJob.scss";
import Footer from "../components/shared/footer";
import {usePostForm, usePostJob} from "../hooks/usePostJob";
import {useTab} from "../hooks/useTab";
import {useNavigate, useParams} from "react-router-dom";
import {PostJob} from "../types/post_job";
import {get} from "lodash";
import {postulateJob} from "../util/job.service";
import {Backdrop, CircularProgress} from "@material-ui/core";

export default function ApplyJob() {
  const { form, handleForm, reset } = usePostForm();
  const navigate = useNavigate();
  const { selectedTab, handleNextTab, setSelectedTab } = useTab();
  const {id} = useParams();
  const {postJobSate: {loading, postJob}} = usePostJob(id);
  const _postJob = postJob!.reduce((k: any, o: any) => (k[o] = k, o), {}) as PostJob;

  form.idPostJob = id;

  const handleCheck = (event: any) => {
    if (event.target.checked) form.skillsIds!.push(event.target.value);
  }

  const submit = async (event: any) => {
    event.preventDefault();
    await postulateJob(form);
    toast.success("Te has postulado correctamente, gracias!")
    reset();
    setTimeout(() => {
      navigate("/");
    }, 2000);
  }

  return (
    <React.Fragment>
      <Backdrop
          open={loading!}
          style={{
            background: "white",
            zIndex: 99,
          }}
      >
        <CircularProgress color="inherit"/>
      </Backdrop>
      <Header />
      <Toaster position="top-right" reverseOrder={false} />
      <form onSubmit={submit}>
        <section className="applyJob">
          <aside className="coverHeader mb-5">
            <h1 className="mb-2">{get(_postJob, "title", "")}</h1>
            <p><i>Empresa Famel SAC</i></p>
          </aside>
          <aside className="contain">
            <Tabs selectedIndex={selectedTab} onSelect={(index) => setSelectedTab(index)}>
              <TabList className={"mb-5"}>
                <Tab tabIndex={"0"}>Datos generales</Tab>
                <Tab tabIndex={"1"}>Skills</Tab>
                <Tab tabIndex={"2"}>Experiencia</Tab>
              </TabList>
              <TabPanel tabIndex={0}>
                <section className="formApply pt-5">
                  <article className="mb-5">
                    <p className="mb-3">Comprobante de pago a emitir</p>
                    <aside className="FormGroup">
                      <DropdownMenu onChange={handleForm} name="documentType" value={form.documentType}>
                        <DropdownItem>Elige el tipo de documento</DropdownItem>
                        <DropdownItem value="1">RUC</DropdownItem>
                        <DropdownItem value="2">DNI</DropdownItem>
                      </DropdownMenu>
                      <Txtfield className="ml-5" placeholder="Nro de documento" name="documentNumber"
                                onChange={handleForm} value={form.documentNumber}/>
                    </aside>
                  </article>
                  <article>
                    <p className="mb-3">Su presupuesto estimado</p>
                    <aside className="FormGroup">
                      <DropdownMenu onChange={handleForm} name="typeAmount" value={form.typeAmount}>
                        <DropdownItem>Eliga tipo de moneda</DropdownItem>
                        <DropdownItem value="1">Soles</DropdownItem>
                        <DropdownItem value="2">Dólares</DropdownItem>
                      </DropdownMenu>
                      <Txtfield className="ml-5" placeholder="Total" onChange={handleForm} name="amountEstimated" value={form.amountEstimated} />
                    </aside>
                    <p className="mt-2">
                      <i>
                        * Recuerde que el presupuesto estimado por el cliente es
                        de : 2000 soles
                      </i>
                    </p>
                  </article>
                  <article className="footerSection">
                    <BtnPrimary type="button" onClick={handleNextTab}> Siguiente </BtnPrimary>
                  </article>
                </section>
              </TabPanel>
              <TabPanel tabIndex={1}>
                <section className="formApply pt-5">
                  <p>Elige las skills que mejor manejes</p>
                  <article className="gridBox mt-4">
                    {
                      get(_postJob, "ids_Skills_post_Job", []).map(value => (
                          <CheckButton value={value} onChange={handleCheck} withbg="yes" label={value} key={value}/>
                      ))
                    }
                  </article>
                  <article className="footerSection">
                    <BtnPrimary type="button" onClick={handleNextTab}> Siguiente </BtnPrimary>
                  </article>
                </section>
              </TabPanel>
              <TabPanel tabIndex={2}>
                <section className="formApply pt-5">
                  <article className="mb-5">
                    <p className="mb-3 text-center">
                      Enlace digital de experiencia laboral (Certijoven, Linkedin,
                      Web, etc)
                    </p>
                    <aside className="FormGroup">
                      <DropdownMenu onChange={handleForm} name="typeBio" value={form.typeBio}>
                        <DropdownItem>Seleccione tipo de enlace </DropdownItem>
                        <DropdownItem value="1">Linkedin</DropdownItem>
                        <DropdownItem value="2">Web</DropdownItem>
                      </DropdownMenu>
                      <Txtfield className="ml-5" placeholder="Ingrese enlace" onChange={handleForm} name="linkBio" value={form.linkBio} />
                    </aside>
                  </article>
                  <article className="mb-5">
                    <p className="text-center mb-3">
                      ó , coloca tu experiencia respecto al puesto que buscamos
                    </p>
                    <aside className="FormGroup">
                      <Txtfield className="mr-5" placeholder="Empresa" />
                      <Txtfield className="" placeholder="Tiempo de trabajo" />
                    </aside>
                    <aside className="FormGroup-full mt-4">
                      <Txtfield placeholder="Empresa" />
                    </aside>
                  </article>

                  <article className="footerSection">
                    <BtnPrimary type="submit"> Aplicar </BtnPrimary>
                  </article>
                </section>
              </TabPanel>
            </Tabs>
          </aside>
        </section>
      </form>
      <Footer />
    </React.Fragment>
  );
}
