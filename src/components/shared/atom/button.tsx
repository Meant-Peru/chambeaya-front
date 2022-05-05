import * as React from "react";

import "./../../../sass/shared/_button.scss";


export default function ButtonComponent(props: any){
    return(
        <React.Fragment>
            <button className="btnComponent">
                {props.label}
            </button>
        </React.Fragment>

    )
}