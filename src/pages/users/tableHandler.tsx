import { getDefaultFilter } from "@refinedev/core";
import {
  useTable,
  EditButton,
  ShowButton,
  getDefaultSortOrder,
  DeleteButton,
  List,
} from "@refinedev/antd";
import "./smol.css";
import { Table, Space} from "antd";
import {useMediaQuery} from "react-responsive";
import {DesktopTable} from "./tableviewDesktop";
import {DesktopMobile} from "./tableviewMobile";

export const TableUsers = () => {

  const { tableProps, filters,sorters } = useTable({
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
      <DesktopMobile tableProps={tableProps} sorters={sorters} allskills={allskills}/>
    )
  }
  return (
    <>
    <DesktopTable tableProps={tableProps} sorters={sorters} allskills={allskills}/>
    </>


  );
};