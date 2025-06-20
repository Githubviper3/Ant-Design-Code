import { useOne } from "@refinedev/core";
import { IgetGeneral } from "../interfaces";



export const ShowGeneral: React.FC<IgetGeneral> = ({ input_id,resourcetype}) => {
  const { data, isLoading } = useOne({
    resource: resourcetype,
    id: input_id,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  let info;
  if (resourcetype == "users"){
    info = data?.data.firstName + " " + data?.data.lastName
  } else if (resourcetype == "events"){
    info = data?.data.title    
  } else{
    info = data?.data.name 
  }
  resourcetype = resourcetype[0].toUpperCase() + resourcetype.slice(1,-1)

  return <div>{resourcetype} name: {info}</div>;
};
