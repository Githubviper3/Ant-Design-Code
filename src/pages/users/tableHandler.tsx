import {
  useTable,
} from "@refinedev/antd";
import "./smol.css";
import {useMediaQuery} from "react-responsive";
import {DesktopTable} from "./tableviewDesktop";
import {DesktopMobile} from "./tableviewMobile";

export const TableHandler = () => {

  const { tableProps,sorters,setFilters } = useTable({
    syncWithLocation: true,
  });

  let tabledata = tableProps?.dataSource
  let allskills:string[] =[] 
  tabledata?.forEach((current) =>{
    if (current.skills){
      allskills.push(...current.skills)
    }
  })
  allskills = [...new Set(allskills)]
  


  let isMobile = useMediaQuery({query: "(max-width: 800px)"})


  if (isMobile){
    
    return (
      <DesktopMobile/>
    )
  }
  return (
    <>
    <DesktopTable tableProps={tableProps} sorters={sorters} allskills={allskills}/>
    </>


  );
};