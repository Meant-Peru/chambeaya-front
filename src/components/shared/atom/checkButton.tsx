import * as React from "react";

import "./../../../sass/shared/_checkButton.scss";

export default function CheckButton(props: any) {
  const [checked, setChecked] = React.useState(true);

  return (
    <React.Fragment>
      <label className={"form-control-"+props.withbg}>
        <input type="checkbox" name="checkbox-checked"  />
        <span>{props.label}</span>
      </label>
    </React.Fragment>
  );
}
