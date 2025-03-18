import { Refine } from "@refinedev/core";
import { useState } from "react";
import { dataProvider } from "./providers/data-provider";

// import { ShowProduct } from "./pages/products/show";
// import {MyForm} from "./components/form";
// import {ShowGeneral} from "./components/showGeneral";
// import { Dropdown } from "./components/dropdown";
 import {EditProduct} from "./pages/products/edit";
// import {ListProducts} from "./pages/products/list";
//import {CreateProduct} from "./pages/products/create";

export default function App(): JSX.Element {
  // const [itemid, setItemid] = useState<number | string>(1);
  // const [option,setOption] = useState<string>("")
  return (
    <Refine dataProvider={dataProvider}>
      {/* <Dropdown choice={option} setChoice={setOption}/>
      <MyForm id = {itemid} setId= {setItemid} />
      <ShowGeneral input_id={itemid} resourcetype={option} /> */}
      <EditProduct/>
      {/* <ListProducts/> */}
      {/* <CreateProduct/> */}
    </Refine>
  );
}