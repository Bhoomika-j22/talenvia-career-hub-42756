import React from "react";

// PUBLIC_INTERFACE
export default function PageHeader({ title, subtitle, right }) {
  /** Standard page header used across routes. */
  return (
    <div className="PageHeader">
      <div>
        <h1>{title}</h1>
        {subtitle ? <p>{subtitle}</p> : null}
      </div>
      {right ? <div className="Row">{right}</div> : null}
    </div>
  );
}
