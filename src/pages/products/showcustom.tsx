import { useOne } from "@refinedev/core";
import { I_id } from "../../interfaces";

export const ShowProduct: React.FC<I_id> = ({ input_id }) => {
  const { data, isLoading } = useOne({
    resource: "products",
    id: input_id,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <div>Product name: {data?.data.name}</div>;
};
