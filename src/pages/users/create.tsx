import { useForm,Create } from "@refinedev/antd";
import { Form, Input, Space, Button } from "antd";
import { MinusCircleOutlined, PlusOutlined,UnorderedListOutlined  } from "@ant-design/icons";
import { useGo } from "@refinedev/core";

export const CreateUser = () => {
  const { formProps, saveButtonProps } = useForm({
    redirect: "edit",
  });

  const go = useGo();
  const goback = () =>{
     go({
            to: {
              resource: "users",
              action: "list",
            },
          });
  }
  return (
    <Create title={"Create User"} saveButtonProps={saveButtonProps} headerButtons={({ defaultButtons }) => (
        <>
          {defaultButtons}
          <Button type="default" onClick={goback}><UnorderedListOutlined />Users</Button>
        </>
      )} >
    <Form {...formProps} layout="vertical">
      <Form.Item
        label="Firstname"
        name="firstName"
        rules={[
          {
            type: "string",
            message: "Please enter a valid first name!",
          },
          {
            required: true,
            message: "Firstname is required!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Lastname"
        name="lastName"
        rules={[
          {
            type: "string",
            message: "Please enter a valid first name!",
          },
          {
            required: true,
            message: "Lastname is required!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Birthday"
        name="birthday"
        rules={[
          {
            type: "date",
            message: "Please enter a valid birthday!",
          },
          {
            required: true,
            message: "Birthday is required!",
          },
        ]}
      >
        <Input type="date" />
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
      >
        <Input type="email" />
      </Form.Item>
      <label>Skills</label>
      <Form.List name="skills">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space key={key} style={{ display: "flex", marginBottom: 8 }} align="baseline">
                <Form.Item
                  {...restField}
                  name={[name, "skill"]}
                  rules={[{ required: true, message: "Please select a skill" }]}
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
    </Create>
  );
};
