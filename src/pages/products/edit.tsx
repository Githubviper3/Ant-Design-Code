import { useOne, useUpdate } from "@refinedev/core";
import { I_id } from "../../interfaces";


export const EditProduct: React.FC<I_id> = ({ input_id }) => {
  const { data, isLoading } = useOne({ resource: "products", id: input_id });
  const { mutate, isLoading: isUpdating } = useUpdate();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const updatePrice = async () => {
    await mutate({
      resource: "products",
      id: input_id,
      values: {
        price: Math.floor(Math.random() * 100),
      },
    });
  };

  return (
    <div>
      <div>Product name: {data?.data.name}</div>
      <div>Product price: ${data?.data.price}</div>
      <button onClick={updatePrice}>Update Price</button>
    </div>
  );
};