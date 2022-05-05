import * as React from "react";

import "./../../../sass/shared/_card.scss";

export default function Card(props: any) {
  return (
    <React.Fragment>
      <article className="card">
        <h4 className="mb-2">{props.title}</h4>
        <p>{props.description}</p>
      </article>
    </React.Fragment>
  );
}
