import { getDefaultFilter, CrudSorting } from "@refinedev/core";
import {
  EditButton,
  ShowButton,
  getDefaultSortOrder,
  DeleteButton,
  List,
} from "@refinedev/antd";
import "./smol.css";
import { Table, Space, Select, TableProps } from "antd";

interface inputprops {
    value: string,
    label: string
}

interface DesktopTableProps {
  tableProps: TableProps<any>;
  sorters: CrudSorting;
  allskills: any[];
}

export const DesktopMobile = ({
  tableProps,
  sorters,
  allskills,
}: DesktopTableProps) => {
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

  let options: {[index:string]:inputprops[]} = {
  id: [
    { label: "ASC", value: "asc" },
    { label: "DESC", value: "desc" }
  ],
  name: [
    { label: "ASC", value: "asc" },
    { label: "DESC", value: "desc" }
  ],
  email: [
    { label: "ASC", value: "asc" },
    { label: "DESC", value: "desc" }
  ]
    ,"skills":[]};

  allskills.forEach((skill)=>{
    options["skills"].push({
        label: formatListItems(skill),
        value: skill
    })
  })



  return (
    <List>
    <div>
    <Select
        allowClear
        style={{ width: "20%" }}
        placeholder="Id"
        options={options.id}
      />
      &nbsp;
      <Select
        allowClear
        style={{ width: "20%" }}
        placeholder="Name"
        options={options.name}
      />
        &nbsp;
    <Select
        allowClear
        style={{ width: "20%" }}
        placeholder="Email"
        options={options.email}
      />
        &nbsp;
        &nbsp;
      <Select
        mode="multiple"
        allowClear
        style={{ width: "25%" }}
        placeholder="Skills"
        options={options.skills}
      />

    </div>
    <br />
      <div className="table-container">
        <Table {...tableProps} className="UserTable" rowKey="id">
          <Table.Column
            dataIndex="id"
            title="ID"
            defaultSortOrder={getDefaultSortOrder("id", sorters)}
          />
          <Table.Column
            dataIndex="firstName"
            title="Name"
            defaultSortOrder={getDefaultFilter("firstname")}
            render={getFullname}
          />
          <Table.Column
            dataIndex="email"
            title="Email Address"
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
            // onFilter={(value, record) => {
            //   return record.skills?.includes(value);
            // }}
            // filters={allskills.map((skill:string) => {
            //   return { text: formatListItems(skill), value: skill };
            // })}
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
