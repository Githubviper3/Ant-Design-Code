import { useForm, Edit } from "@refinedev/antd";
import { Form, Input } from "antd";
import { UpdateList } from "../../components/UpdateList";


export const EditUser = () => {
  const { formProps, saveButtonProps,query} = useForm({
    redirect: "show",
  });



  const firstName = query?.data?.data?.firstName
  const lastName = query?.data?.data?.lastName
  const email = query?.data?.data?.email
  const user_name =  firstName +" " + lastName
  const skills:string[] = query?.data?.data?.skills
  

  return (
    
    <Edit title={user_name} saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item label="Firstname" name="firstname" initialValue={firstName}>
          <Input/>
        </Form.Item>
        <Form.Item label="Lastname" name="lastname" initialValue={lastName}>
          <Input/>
        </Form.Item> 
        <Form.Item label="Email Address" name="email" initialValue={email}>
          <Input/>
        </Form.Item> 
        <UpdateList list_items={skills} name={"skills"}/>           
      </Form>
    </Edit>
  );
};