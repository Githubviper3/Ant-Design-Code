import { useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import {Input, Alert,Space,Button,List } from "antd";

interface listprops{
    list_items: string[],
    name: string,
}
export const UpdateList: React.FC<listprops> =({list_items,name})=>{
    const formatListItems= (item:string): string =>{
        return item[0].toUpperCase() + item.slice(1)
      }
      const [itemInput, setItemInput] = useState('');
      const [itemList, setItemList] = useState(list_items);
      const [error, setError] = useState('');
    
      const addItem = () => {
        if (itemInput.trim() === '') {
          setError(`Please enter a valid ${name}.`);
          return;
        }
    
        // Add the new item to the list
        setItemList([...itemList, itemInput]);
        setItemInput('');
        setError('');
      };
    
      const removeItem = (index:number) => {
        // Remove the item at the given index
        const newItemList = itemList.filter((_, i) => i !== index);
        setItemList(newItemList);
      };
    
    return <>
    <h2>Add new {name}</h2>
      
      {error && <Alert message={error} type="error" showIcon />}

      <Space direction="vertical" style={{ width: '100%' }}>
        <Input
          value={itemInput}
          onChange={(e) => setItemInput(e.target.value)}
          placeholder={`Enter ${name}`}
          style={{ marginBottom: 10 }}
        />
        <Button type="primary" onClick={addItem} block>
          Add to {name}
        </Button>
      </Space>

      <div style={{ marginTop: 20 }}>
        <h3>List of {name}:</h3>
        <List
          bordered
          dataSource={itemList}
          renderItem={(item, index) => (
            <List.Item
              key={index}
              actions={[
                <Button
                  type="text"
                  icon={<DeleteOutlined />}
                  onClick={() => removeItem(index)}
                >
                  Remove
                </Button>,
              ]}
            >
              {formatListItems(item)}
            </List.Item>
          )}
        />
      </div>
      </>
}