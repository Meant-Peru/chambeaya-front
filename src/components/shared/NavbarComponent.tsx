import { Brand, Navbar, Ul, Li } from "./styled";
import Logo from "./../../assets/logo.svg";

const NavbarComponent = (props: {
    brand: { name: string; to: string },
    links: Array<{ name: string, to: string }>
  }) => {
    const { brand, links } = props;
    const NavLinks: any = () => links.map((link: { name: string, to: string }) => <Li key={link.name}><a href={link.to}>{link.name}</a></Li>);
    return (
      <Navbar>
        <Brand href={brand.to}><img src={Logo} alt="" /></Brand>
        <Ul>
          <NavLinks />
        </Ul>
      </Navbar >
    )
  };
export default NavbarComponent;
