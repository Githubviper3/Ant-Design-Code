import "./smol.css";
import {useMediaQuery} from "react-responsive";
import {DesktopTable} from "./tableviewDesktop";
import {MobileTable} from "./tableviewMobile";

export const TableHandler = () => {
  let isMobile = useMediaQuery({query: "(max-width: 800px)"})


  if (isMobile){
    
    return (
      <MobileTable/>
    )
  }
  return (
    <>
    <DesktopTable/>
    </>


  );
};