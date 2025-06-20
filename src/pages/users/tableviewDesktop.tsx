import { getDefaultFilter,CrudSorting } from "@refinedev/core";
import {
  EditButton,
  ShowButton,
  getDefaultSortOrder,
  DeleteButton,
  List,
} from "@refinedev/antd";
import "./smol.css";
import { Table, Space,TableProps } from "antd";


interface DesktopTableProps {
  tableProps: TableProps<any>; 
  sorters: CrudSorting;
  allskills: any[]; 
}

export const DesktopTable = ({ tableProps, sorters, allskills }: DesktopTableProps) => {
  const getFullname = (value: any, record: any): string => {
    return value + " " + record.lastName;
  };

  const formatbirthday = (value: string): string => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const dataformat: Date = new Date(value);
    let formated: string = "";
    let ending: string = "th";
    let day = dataformat.getDate();
    if (day >= 11 && day <= 13) {
      ending = "th";
    } else {
      switch (day % 10) {
        case 1:
          ending = "st";
          break;
        case 2:
          ending = "nd";
          break;
        case 3:
          ending = "rd";
          break;
      }
    }

    formated = `${day}${ending} ${
      months[dataformat.getMonth()]
    } ${dataformat.getFullYear()}`;
    return formated;
  };

  const formatListItems = (item: string) => {
    return item[0].toUpperCase() + item.slice(1);
  };


  return (
    <List>
      <div className="table-container">
        <Table {...tableProps} className="UserTable" rowKey="id">
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
            render={getFullname}
          />
          <Table.Column
            dataIndex="email"
            title="Email Address"
            sorter
            defaultSortOrder={getDefaultFilter("email")}
          />
          <Table.Column
            dataIndex="birthday"
            title="Date of birth"
            render={formatbirthday}
          />
          <Table.Column
            dataIndex="skills"
            title="Skills"
            render={(value: string[]) => {
              if (value == undefined) {
                return "No Skills";
              }
              return (
                <>
                  {value.map((item: string) => (
                    <p>{formatListItems(item)}</p>
                  ))}
                </>
              );
            }}
            onFilter={(value, record) => {
              return record.skills?.includes(value);
            }}
            filters={allskills.map((skill:string) => {
              return { text: formatListItems(skill), value: skill };
            })}
          />

          <Table.Column
            title="Actions"
            render={(_, record) => (
              <Space>
                <ShowButton hideText size="large" recordItemId={record.id} />
                <EditButton hideText size="large" recordItemId={record.id} />
                <DeleteButton
                  hideText
                  size="large"
                  recordItemId={record.id}
                  mutationMode="undoable"
                />
              </Space>
            )}
          />
        </Table>
      </div>
    </List>
  );
};
