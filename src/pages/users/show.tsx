import { useShow } from "@refinedev/core";
import { TextField, Show } from "@refinedev/antd";

import { Typography, Avatar ,Collapse,List } from "antd";


const { Panel } = Collapse;
export const ShowUser = () => {
  const {
    query: { data, isLoading },
  } = useShow();
  
  const formatbirthday = (data: string): string => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const dataformat: Date = new Date(data)
    let formated: string = "";
    let ending: string="th";
    let day = dataformat.getDate();
    if (day>= 11 && day <= 13) {
      ending =  "th"; 
    } else{
      switch (day % 10) {
        case 1:
          ending=  "st";
          break;
        case 2:
          ending= "nd";
          break;
        case 3:
          ending= "rd";
          break;
      }
    }

    formated = `${day}${ending} ${months[dataformat.getMonth()]} ${dataformat.getFullYear()}` 
    return formated;
  }

  const formatListItems= (item:string) =>{
    return item[0].toUpperCase() + item.slice(1)
  }

  const user_name = data?.data?.firstName +" " + data?.data?.lastName
  const avatarinfo = data?.data?.avatar
  const avatar= <Avatar  size="large" alt={avatarinfo?.name} key={avatarinfo?.uid} src={avatarinfo?.url} />
  const skills:string[] = data?.data?.skills
  const message =  user_name + " has no skills"
  return (
    <Show title={user_name} isLoading={isLoading} headerProps={{subTitle:avatar}}>
      
      <Typography.Title level={5}>Name</Typography.Title>
      <TextField value={user_name} />

      <Typography.Title level={5}>Email</Typography.Title>
      <TextField value={data?.data?.email} />
    
      <Typography.Title level={5}>Birthday</Typography.Title>
      <TextField value={formatbirthday(data?.data?.birthday)} />
      
      <Typography.Title level={5}>Skills</Typography.Title>
      <List 
      bordered 
      dataSource={skills}
      locale={{ emptyText: message }}
      renderItem={(item)=>{return <List.Item>{formatListItems(item)}</List.Item>}}
      />
    </Show>
  );
};