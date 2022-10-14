
import styled from 'styled-components';
import { Close } from '@material-ui/icons';
                            
const NavMobile = ({handleNavToggle,list}) => {
  console.log(list);

  const NavLinks: any = () =>
    list.map((link: { name: string; to: string }) => (
      <li style={{textAlign:'center',padding:'1em 0em'}} key={link.name}>
        <a style={{fontSize:'1.8em'}} href={link.to}>{link.name}</a>
      </li>
    ));

return (
    <StyledMenu>
      <div style={{height:'100px',display:'flex',justifyContent:'flex-end',alignItems:'center'}}>
        <CloseToggle onClick={handleNavToggle}>
            <Close />
        </CloseToggle>
      </div>
      
        <ul style={{display:'flex',flexDirection:'column',justifyContent:'center'}}>
             <NavLinks />
        </ul>
        
    </StyledMenu>
)
}

export const StyledMenu = styled.div`
position: fixed;
top: 0;
right: 0;
height: 100vh;
width: 100%;
@media screen and (min-width: 790px) {
    width: 60%;
}
background-color: rgb(58, 66, 81, .9);
z-index: 99;
display: flex;
flex-direction: column;
padding:0 2em;

`;
export const CloseToggle = styled.button`
border:none;
background-color:transparent;
color: #fff;
font-size:2rem;
cursor:pointer
`
export default NavMobile