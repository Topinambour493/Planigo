import "./AttractionFilters.css"

import React from 'react';
import {Form} from "react-router";

export default function AttractionFilters() {
  return (
    <div id={"attraction-filter"}>
      <Form method={"get"}>
        <input
          type={"text"}
          name={"search"}
          placeholder={"recherche"}
        />
        <input type={"number"} name={"max_price"} placeholder={"prix maximum"}/>
      </Form>
    </div>
  );
}
