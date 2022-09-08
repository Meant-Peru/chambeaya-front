import { Brand, Navbar, Ul, Li } from "./styled";
import Logo from "./../../assets/Icon_.png";

const NavbarComponent = (props: {
    brand: { name: string; to: string },
    links: Array<{ name: string, to: string }>
  }) => {
    const { brand, links } = props;
    const NavLinks: any = () => links.map((link: { name: string, to: string }) => <Li key={link.name}><a href={link.to}>{link.name}</a></Li>);
    return (
     <Navbar>
         <Brand href={brand.to}><img src={Logo} width="100" alt="" /></Brand>
         <Ul>
            <NavLinks />
         </Ul>
     </Navbar >
    )
  };
export default NavbarComponent;
