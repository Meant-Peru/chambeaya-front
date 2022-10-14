import { Brand, Navbar, Ul, Li} from "./styled";
import Logo from "./../../assets/logo_final.png";

import { useState } from "react";
import ToggleNav from './ToggleNav';
import NavMobile from "./NavMobile";

const NavbarComponent = (props: {
  brand: { name: string; to: string };
  links: Array<{ name: string; to: string }>;
}) => {
  const { brand, links } = props;

  //Return menu links
  const NavLinks: any = () =>
    links.map((link: { name: string; to: string }) => (
      <Li key={link.name}>
        <a href={link.to}>{link.name}</a>
      </Li>
    ));
  //State menu icon
  const [navToggled, setNavToggled] = useState(false);

  const handleNavToggle = () => {
    setNavToggled(!navToggled);
  }
  return (
    <Navbar>
      <Brand href={brand.to}>
        <img src={Logo} width="100" alt="" />
      </Brand>
      <Ul>
        <NavLinks />
      </Ul>
      <ToggleNav handleNavToggle={handleNavToggle}/>
      { navToggled ? <NavMobile list={links} handleNavToggle={handleNavToggle} /> : null }

    </Navbar>
  );
};
export default NavbarComponent;