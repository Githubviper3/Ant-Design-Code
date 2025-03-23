import { I_id } from "../../interfaces";
import { useList } from "@refinedev/core";
import { Button } from "antd";
import { useState } from "react";
import styles from "../../css/App.module.css";
interface ListParams  {
  page_size?: number,
  order_field?: string, //name
  orderby?: "asc" | "desc";
}

export const ListProducts: React.FC<ListParams> = ({
  page_size= 10,
  orderby = "asc",
  order_field = "name",
  }) => {
  const [current_page, setPage] = useState<number>(1);
  const { data, isLoading } = useList(
    { resource: "products",
      pagination: { current: current_page, pageSize: page_size },
      sorters: [{ field: order_field, order: orderby }],
      // filters: [{ field: "material", operator: "eq", value: "Aluminum" }],
    },
  );
  console.log("Current page:",current_page)
  console.log("page size:",page_size)
  
  if (isLoading) {
    return <div>Loading...</div>;
  }
  const prevPage: React.MouseEventHandler<HTMLElement> = () =>{
    if (current_page > 1){
      setPage(current_page-1)
      console.log("Lets go to prev")
    } else{
      console.log("too low")
    }
  }

  const nextPage: React.MouseEventHandler<HTMLElement> = () =>{
    if (current_page < page_size){
      setPage(current_page+1)
      console.log("Lets go to next")
    } else{
      console.log("too high")
    }
  }

  return <>
    <div>
      <h1>Products</h1>
      <p>Page: {current_page}</p>
      <Button htmlType="button" onClick={prevPage}>&laquo; Previous</Button>
      <Button htmlType="button" onClick={nextPage} className={styles.next}>Next &raquo;</Button>
      <ul>
        {data?.data?.map((product) => (
          <li key={product.id}>
            <p>
              {product.name}
              {/* <br />
              Product Id: {product.id} */}
              <br />
              Price: £{product.price}
              <br />
              Material: {product.material}
            </p>
          </li>
        ))}
      </ul>
    </div>
    </>
};