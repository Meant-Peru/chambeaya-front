import styled from 'styled-components';

import { Menu } from "@material-ui/icons";

const ToggleNav = ({handleNavToggle}) => {
    return(
        <StyledToggle onClick={handleNavToggle}>
            <Menu />
        </StyledToggle>
    )
}

const StyledToggle = styled.button`
border:none;
background-color:transparent;
display: none;
color: #fff;
font-size:2rem;
  @media (max-width: 425px) {
    display: flex;
    cursor:pointer
  }
`
export default ToggleNav