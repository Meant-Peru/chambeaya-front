import React from "react";
import "./../../sass/shared/_header.scss";
import NavbarScroller from "./NavBarScroller";

const navigation = {
    brand: { name: "ChambeaYa.", to: "/" },
    links: [
      { name: "Buscar un empleo", to: "/searchjob" },
      { name: "Postear un empleo", to: "/postjob" },
      { name: "Contacto", to: "/contact" },
      { name: "Iniciar sesión", to: "/login" },
      { name: "Registrarme", to: "/signup" },
    ],
  };

export default function Header() {
const { brand, links } = navigation;
  return (
    <React.Fragment>
        <header>
            <NavbarScroller brand={brand} links={links} />
        </header>
    </React.Fragment>
  );
}