import { useForm, Edit } from "@refinedev/antd";
import { Form, Input,Space, Button } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";


export const EditUser = () => {

  const { formProps, saveButtonProps,query} = useForm({
    redirect: "show",
  });
  



  const firstName = query?.data?.data?.firstName
  const lastName = query?.data?.data?.lastName
  const email = query?.data?.data?.email
  const user_name =  firstName +" " + lastName
  const skills:string[] = query?.data?.data?.skills
  const formatListItems= (item:string) =>{
    return item[0].toUpperCase() + item.slice(1)
  }

  return (
    
    <Edit title={user_name} saveButtonProps={saveButtonProps} >
      <Form {...formProps} layout="vertical" initialValues={{
          skills: skills
        }}>
        <Form.Item 
          label="Firstname" 
          name="firstName" 
          initialValue={firstName}
          rules={[
            {
              type: "string",
              message: "Please enter a valid first name!",
            },
            {
              required: true,
              message: "First name is required!",
            },
          ]} 
        >
            <Input/>
        </Form.Item>
        <Form.Item 
          label="Lastname" 
          name="lastName" 
          initialValue={lastName}
          rules={[
            {
              type: "string",
              message: "Please enter a valid first name!",
            },
            {
              required: true,
              message: "Last name is required!",
            },
          ]} 
          >
          <Input/>
        </Form.Item> 
        <Form.Item 
        label="Email Address" 
        name="email" 
        rules={[
            {
              type: "email",
              message: "Please enter a valid email address!",
            },
            {
              required: true,
              message: "Email is required!",
            },
          ]} 
        initialValue={email}>
          <Input type="email"/>
        </Form.Item> 
        {/* <Form.Item name="skills2" >
        <UpdateList list_items={skills} name={"skills"}/>           
        </Form.Item> */}
        <h4>Skills</h4>
        <Form.List name="skills">
          
        {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, ...restField }) => (
            <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
              <Form.Item
                {...restField}
                name={name}
                rules={[{ required: true, message: 'Please select a skill' }]}
              >
                <Input />
              </Form.Item>
              <MinusCircleOutlined onClick={() => remove(name)} />
            </Space>
          ))}
          <Form.Item>
            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
              Add Skill
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
    </Form>
    </Edit>
  );
};