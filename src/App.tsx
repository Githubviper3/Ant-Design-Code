import { Refine } from "@refinedev/core";
import { useState } from "react";
import { dataProvider } from "./providers/data-provider";

// import { ShowProduct } from "./pages/products/show";
//import {MyForm} from "./components/form";
// import {ShowGeneral} from "./components/showGeneral";
// import { Dropdown } from "./components/dropdown";
//import {EditProduct} from "./pages/products/edit";
//import {ListProducts} from "./pages/products/list";
//import {CreateProduct} from "./pages/products/create";
//import {SelectStuff} from "./getdata";
//import {EditProductByID} from "./pages/products//edit2";
import {TableProducts} from "./pages/products/table";
export default function App(): JSX.Element {  
  return (
    <Refine dataProvider={dataProvider}>
      <TableProducts />
    </Refine>
  );
}