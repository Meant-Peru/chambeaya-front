import * as React from "react";

import "./../../../sass/shared/_tag.scss";


export default function TagComponent(props: any){
    return(
        <React.Fragment>
            <button className={"tagComponent-"+props.type+"-"+props.level}>
                {props.label}
            </button>
        </React.Fragment>

    )
}