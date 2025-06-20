import {
  EditButton,
  ShowButton,
  DeleteButton,
  List,
  useTable
} from "@refinedev/antd";
import "./smol.css";
import { Table, Space, Select, Button } from "antd";
import { CrudFilter } from "@refinedev/core";
interface inputprops {
    value: string,
    label: string
}
import { useState,useMemo } from "react";


export const DesktopMobile = () => {
  const { tableProps,setFilters,sorters,setSorters } = useTable({
      syncWithLocation: true,
    });
  
    let tabledata = tableProps?.dataSource
    let allskills:string[] =[] 
    tabledata?.forEach((current:any) =>{
      if (current.skills){
        allskills.push(...current.skills)
      }
    })
    allskills = [...new Set(allskills)]
  
    allskills.sort()


  const getFullname = (value: any, record: any): string => {
    return  value + " " + record.lastName;
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

    formated = `Birthday: ${day}${ending} ${
      months[dataformat.getMonth()]
    } ${dataformat.getFullYear()}`;
    return formated;
  };

  const formatListItems = (item: string) => {
    return item[0].toUpperCase() + item.slice(1);
  };

  let options: {[index:string]:inputprops[]} = {
  "skills":[]};

  allskills.forEach((skill)=>{
    options["skills"].push({
        label: formatListItems(skill),
        value: skill
    })
  })
  

  const [skillsFilter, setSkillsFilter] = useState<string[]>([]);

  const handleApplyFilters = () => {
  const filters: CrudFilter[] = [];
  console.log(skillsFilter)
  if (skillsFilter.length > 0) {
    filters.push({
      field: "skills",
      operator: "in",
      value: skillsFilter,
    });
  }
  setFilters(filters, "replace");
  }

  const currentSorterOrders = useMemo<{ [key: string]: "asc" | "desc" }>(() => {
    return {
      id: sorters.find((item) => item.field === "id")?.order || "asc",
      firstname: sorters.find((item) => item.field === "firstname")?.order || "asc",
      email: sorters.find((item) => item.field === "email")?.order || "asc",
    };
  }, [sorters]);
  
  const toggleSort = (field: string) => {
    setSorters([
      {
        field,
        order: currentSorterOrders[field] === "asc" ? "desc" : "asc",
      },
    ]);
  };

  return (
    <>
    <List>
      <div>
        
    <Select
        allowClear
        className="idsort"
        placeholder="Order ids in"
        options={options.id}
      />
    <Select
        allowClear
        className="namesort"
        placeholder="Order names in"
        options={options.name}
      />
    <Select
        allowClear
        className="emailsort"
        placeholder="Order emails in"
        options={options.email}
      />
      <Select
        mode="multiple"
        allowClear
        className="SkillsFilter"
        placeholder="Select Skills"
        options={options.skills}
        onChange={setSkillsFilter}
      />
      &nbsp;
      &nbsp;
      <Button type="primary" onClick={handleApplyFilters}>Apply filters</Button>

    </div>
    <br />
      <div className="table-container">
        <Table {...tableProps} className="UserTable" rowKey="id">
          <Table.Column
            dataIndex="id"
            title="ID"
            render={(value)=>{return `User ID: ${value}`}}
          />
          <Table.Column
            dataIndex="firstName"
            title="Name"
            render={getFullname}
          />
          <Table.Column
            dataIndex="email"
            title="Email Address"
            render={(value)=>{return `Email: ${value}`}}
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
                <h3>Skills</h3>
                  {value.map((item: string) => (
                    <p>{formatListItems(item)}</p>
                  ))}
                </>
              );
            }}
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
    </>
  );
};
