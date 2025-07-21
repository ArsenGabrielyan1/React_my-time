import React, { memo } from "react";

import "@assets/styles/loading.scss";

function Loading() {
  return (
    <div className="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default memo(Loading);
