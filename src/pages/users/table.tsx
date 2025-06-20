import { useMany, getDefaultFilter } from "@refinedev/core";
import {
  useTable,
  EditButton,
  ShowButton,
  getDefaultSortOrder,
  FilterDropdown,
  List,
  useSelect
} from "@refinedev/antd";

import { Table, Space, Select } from "antd";
interface inputUser {
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  skills: string[],
  avatar: any[]
}
export const TableUsers = () => {
  const { tableProps, filters,sorters } = useTable({
    sorters: { initial: [{ field: "id", order: "asc" }] },
    syncWithLocation: true,
  });

  let tabledata = tableProps?.dataSource
  let allskills:string[] =[] 
  tabledata?.forEach((current) =>{
    allskills.push(...current.skills)
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

  return (
    <List>
      <Table {...tableProps} rowKey="id">
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
          title="Actions"
          render={(_, record) => (
            <Space>
              <ShowButton hideText size="small" recordItemId={record.id} />
              <EditButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};