import { useForm, SaveButton } from "@refinedev/antd";
import { Form, Input, Space, Button } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

export const CreateUser = () => {
  const { formProps, saveButtonProps } = useForm({
    redirect: "edit",
  });


  return (
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
      <SaveButton {...saveButtonProps} />
    </Form>
  );
};
