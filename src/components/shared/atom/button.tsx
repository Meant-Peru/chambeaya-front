import * as React from "react";

import "./../../../sass/shared/_button.scss";
import { useNavigate } from "react-router-dom";
import plusIcon from "./../../../assets/plus.svg"

interface Props {
    type : string,
    label : string,
    icon ?: string,
    link ?: string
}

export default function ButtonComponent(props: Props){
    const navigate = useNavigate();
    const {type,label,icon,link} = props


    const handleRedirect = () => {
      const uri = (link)? link : ""  
      navigate(uri)
    };
  
    return(
        <React.Fragment>
            <button className={"btnComponent--"+type} onClick={handleRedirect}>
                {label}
                <img src={plusIcon} className={icon} alt="Add" />
            </button>
        </React.Fragment>

    )
}