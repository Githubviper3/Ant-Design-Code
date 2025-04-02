import { useMany, getDefaultFilter } from "@refinedev/core";
import {
  useTable,
  EditButton,
  ShowButton,
  getDefaultSortOrder,
  DeleteButton,
  List,
} from "@refinedev/antd";
import "./smol.css"
import { Table, Space, Select } from "antd";

export const TableUsers = () => {
  const { tableProps, filters,sorters } = useTable({
    sorters: { initial: [{ field: "id", order: "asc" }] },
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


  const getFullname =(value: any,record: any):string =>{
    return value + " " + record.lastName 
  }

  const formatbirthday = (value: string): string => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const dataformat: Date = new Date(value)
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

  return (
    <List>
      <Table {...tableProps} rowKey="id" className="hd" >
        <Table.Column
          dataIndex="id"
          title="ID"
          sorter
          defaultSortOrder={getDefaultSortOrder("id", sorters)}
        />
        <Table.Column
        dataIndex="firstName"
        title="Name"
        sorter
        defaultSortOrder={getDefaultFilter("firstname")}
        render = {getFullname}
        />
        <Table.Column
        dataIndex="email"
        title="Email Address"
        sorter
        defaultSortOrder={getDefaultFilter("email")}
        />
        <Table.Column
        dataIndex="birthday"
        title= "Date of birth"
        render={formatbirthday}
        />
        <Table.Column
        dataIndex="skills"
        title="Skills"
        
        render={(value:string[])=>{
          if (value == undefined){
            return "No Skills"
          }
        return <> 
        {value.map(
          (item:string) => (
          <p>{formatListItems(item)}</p>
          )
        )}
        </>
        }}

        onFilter={(value, record) => {
          return record.skills?.includes(value);
        }}

        filters={allskills.map((skill)=> {return {text: formatListItems(skill),value:skill}})}
        
        />

        <Table.Column
          title="Actions"
          render={(_, record) => (
            <Space>
              <ShowButton hideText size="small" recordItemId={record.id} />
              <EditButton hideText size="small" recordItemId={record.id} />
              <DeleteButton hideText size="small" recordItemId={record.id} mutationMode="undoable" />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};