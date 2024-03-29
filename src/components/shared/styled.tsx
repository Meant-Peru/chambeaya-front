import styled from "styled-components";
import "typeface-rubik";



export const Theme = {
  colors: {
    bg: `#F9F9FA`,
    primary: `#4DBFB4`,
    secondary: `#FFD500`,
    green: "#4dbfb4",
    dark: `#4DBFB4`,
    light: `#FFFFFF`,
    red: `#ff5851`,
    redlight: "#e98787",
    gray6: `#98A0AE`,
    gray9: `#3A4049`,
    border: `#e9e9e9`,
  },
  fonts: {
    body: `Rubik , sans-serif`,
    heading: `Rubik , sans-serif`,
  },
  grids: {
    small: `360px`,
    smallmax: `420px`,
    medium: `744px`,
    large: `992px`,
    xlarge: `1240px`,
  },
};

export const Navbar = styled.nav`
  font-family: ${Theme.fonts.heading};
  color: ${Theme.colors.light};
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0.5em 8%;
  a {
    color: white;
    text-decoration: none;
  }
  @media (max-width: 1023px) {
    padding: 0.5em 2em;
  }
`;

export const Brand = styled.a`

  font-weight: bold;
  font-style: italic;
  padding-right: 1rem;
`;

export const Ul = styled.ul`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  position: absolute;
  right: 2rem;
  @media (max-width: 425px) {
    display: none;
  }
`;

export const Li = styled.li`
  flex: 0 0 auto;
  -webkit-box-align: center;
  -webkit-box-pack: center;
  -webkit-tap-highlight-color: transparent;
  align-items: center;
  color: #999;
  height: 100%;
  justify-content: center;
  text-decoration: none;
  -webkit-box-align: center;
  -webkit-box-pack: center;
  -webkit-tap-highlight-color: transparent;
  align-items: center;
  color: #999;
  display: flex;
  font-size: 14px;
  height: 50px;
  justify-content: center;
  line-height: 16px;
  margin: 0 10px;
  text-decoration: none;
  white-space: nowrap;
`;

export const BtnPrimary = styled.button`
  background: ${Theme.colors.primary};
  font-size: 16px;
  border-radius: 28px;
  align-items: center;
  padding: 16px 64px;
  color: ${Theme.colors.light};
  border-style: none;
  cursor: pointer;
  &:hover {
    background: ${Theme.colors.gray6};
  }
`;

export const BtnMobile = styled.button`
display:none;
  background: ${Theme.colors.primary};
  font-size: 16px;
  border-radius: 28px;
  align-items: center;
  padding: 0.5em;
  color: ${Theme.colors.light};
  border-style: none;
  cursor: pointer;
  &:hover {
    background: ${Theme.colors.gray6};
  }
  @media (max-width: 767px) {
    display:flex;
  }
`;

export const BtnTable = styled.button`
  background: ${Theme.colors.primary};
  font-size: 16px;
  border-radius: 28px;
  align-items: center;
  padding: 0.75em 1.5em;
  color: ${Theme.colors.light};
  border-style: none;
  cursor: pointer;
  &:hover {
    background: ${Theme.colors.gray6};
  }
  @media (max-width: 767px) {
    margin-bottom:0.5em
        }
`;

export const BtnSecondary = styled.button`
  background: ${Theme.colors.light};
  font-size: 16px;
  border-radius: 28px;
  align-items: center;
  padding: 16px 64px;
  color: ${Theme.colors.gray6};
  border: 2px solid ${Theme.colors.primary};
  cursor: pointer;
  &:hover {
    background: ${Theme.colors.primary};
    color: ${Theme.colors.light};
  }
`;

export const Txtfield = styled.input`
  margin-bottom: 0.5em;
  background: ${Theme.colors.light};
  font-size: 16px;
  border-radius: 28px;
  align-items: center;
  padding: 16px 24px;
  border: 1px solid ${Theme.colors.border};
  width: 100%;

  ::placeholder {
    color: ${Theme.colors.gray6};
  }
  @media (max-width: 375px) {
    margin-bottom: 1rem;
  }
`;

export const Span = styled.span`
  font-size: 10px;
  color: #c60000;
  align-items: center;
  width: 50%;
  margin-bottom: 1em;
  @media (max-width: 375px) {
    margin-bottom: 1rem;
  }
`;

export const TxtArea = styled.textarea`
  background: ${Theme.colors.light};
  font-size: 16px;
  border-radius: 28px;
  align-items: center;
  padding: 16px 24px;
  border: 1px solid ${Theme.colors.border};
  width: 100%;
  margin-right: 1rem;
  font-family: ${Theme.fonts.body};
  ::placeholder {
    color: ${Theme.colors.gray6};
  }
  @media (max-width: 767px) {
    margin:0px
  }
`;

export const DropdownMenu = styled.select`
  margin-bottom: 0.5em;
  background: ${Theme.colors.light};
  color: ${Theme.colors.gray6};
  font-size: 16px;
  border-radius: 28px;
  align-items: center;
  padding: 16px 24px;
  border: none;

  border-right: 24px solid transparent;
  outline: ${Theme.colors.border} auto 1px;
  :focus-visible {
    border: 1px solid ${Theme.colors.primary};
    border-right: 24px solid transparent;
    outline: ${Theme.colors.primary} auto 1px;
  }
  @media (max-width: 767px) {
    margin-right: 0;
    margin-bottom: 1rem;
    width:100%
  }
`;
export const DropdownItem = styled.option`
  background: ${Theme.colors.light};
  font-size: 16px;
  border-radius: 28px;
  align-items: center;
  padding: 16px 24px;
  border: 0px;
  ::placeholder {
    color: ${Theme.colors.gray6};
  }
`;
