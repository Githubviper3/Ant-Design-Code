import { useShow, useOne } from "@refinedev/core";
import { TextField, NumberField, MarkdownField, Show } from "@refinedev/antd";

import { Button, Typography,List } from "antd";

export const ShowUser = () => {
  const {
    query: { data, isLoading },
  } = useShow();
  
  const formatbirthday = (data: string,ukformat: boolean = false): string => {
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
    if (ukformat){
      formated = `${day}${ending} ${months[dataformat.getMonth()]} ${dataformat.getFullYear()}` 
    } else{
      formated = `${months[dataformat.getMonth()]} ${day}${ending} ${months[dataformat.getMonth()]}`
    }
    return formated;
  }

  const formatListItems= (item:string): string =>{
    return item[0].toUpperCase() + item.slice(1)
  }
  console.log(data?.data?.skills)
  const user_name: string  =data?.data?.firstName +" " + data?.data?.lastName
  return (
    <Show title={user_name} isLoading={isLoading}>
      <Typography.Title level={5}>Name</Typography.Title>
      <TextField value={user_name} />

      <Typography.Title level={5}>Email</Typography.Title>
      <TextField value={data?.data?.email} />
    
      <Typography.Title level={5}>Birthday</Typography.Title>
      <TextField value={formatbirthday(data?.data?.birthday)} />
      <Typography.Title level={5}>Skills</Typography.Title>
      <List
      bordered

      itemLayout="horizontal"
      dataSource={data?.data?.skills}
      renderItem={(item:string) => <List.Item>{formatListItems(item)}</List.Item>}
    />

    </Show>
  );
};