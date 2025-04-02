import { AuthPage } from "@refinedev/antd";
import { GoogleOutlined,GithubOutlined } from "@ant-design/icons";

export const Login = () => {
  return (
    <AuthPage
      type="login"
      formProps={{
        initialValues: {
          email: "demo@demo.com",
          password: "demodemo",
        },
      }}
      providers={[
        {
          name: "google",
          label: "Sign in with Google",
          icon: (
            <GoogleOutlined
              style={{
                fontSize: 24,
                lineHeight: 0,
              }}
            />
          ),
        },
        {
          name: "github",
          label: "Sign in with GitHub",
          icon: (
            <GithubOutlined
              style={{
                fontSize: 24,
                lineHeight: 0,
              }}
            />
          ),
        },
      ]}
      
    />
  );
};