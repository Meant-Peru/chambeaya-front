import * as React from "react";

import "./../../../sass/shared/_button.scss";
import { useNavigate } from "react-router-dom";
import plusIcon from "./../../../assets/plus.svg"

export default function ButtonComponent(props: any){
    const navigate = useNavigate();

    const handleRedirect = () => {
      navigate(props.link);
    };
  
    return(
        <React.Fragment>
            <button className={"btnComponent--"+props.type} onClick={handleRedirect}>
                {props.label}
                <img src={plusIcon} className={props.icon} alt="Add" />
            </button>
        </React.Fragment>

    )
}