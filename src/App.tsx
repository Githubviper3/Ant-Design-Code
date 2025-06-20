import { Refine } from "@refinedev/core";
import routerProvider, { NavigateToResource } from "@refinedev/react-router";
import {
  ThemedLayoutV2,
  ThemedTitleV2,
  useNotificationProvider,
} from "@refinedev/antd";

import "./pages/users/smol.css"
import { BrowserRouter, Routes, Route, Outlet } from "react-router";
import { ConfigProvider, App as AntdApp,theme } from "antd";

import { dataProvider } from "./providers/data-provider";

import "antd/dist/reset.css";
import { ShowUser } from "./pages/users/show";
import { EditUser } from "./pages/users/edit";
import { CreateUser } from "./pages/users/create";
import { TableHandler } from "./pages/users/tableHandler";
const EmptySider = () => null;


export default function App(): JSX.Element {
  return (
    <BrowserRouter>
      <ConfigProvider

      theme={{
        algorithm: theme.darkAlgorithm, 
        token: {
          // Seed Token
          colorPrimary: 'rgb(45, 112, 3)', 
          colorTextBase: '#ffffff',
          colorBgBase: '#333333',
 
        }
      }}>
        <AntdApp  >
            <Refine
              dataProvider={dataProvider}
              routerProvider={routerProvider}
              notificationProvider={useNotificationProvider}
              resources={[
                {
                  name: "users",
                  list: "/",
                  show: "/:id",
                  edit: "/:id/edit",
                  create: "/create",
                  meta: { label: "Users" ,},
                },
              ]}
            >
              <Routes>
                <Route
                  element={
                    <ThemedLayoutV2 Sider={EmptySider}
                    >
                      <Outlet />
                    </ThemedLayoutV2>
                  }
                >
                  <Route>
                    <Route index element={<TableHandler/>}/>
                    <Route path=":id" element={<ShowUser />} />
                    <Route path="/:id/edit" element={<EditUser />} />
                    <Route path="/create" element={<CreateUser />} />
                  </Route>
                </Route>
              </Routes>
            </Refine>
        </AntdApp>
      </ConfigProvider>
    </BrowserRouter>
  );
}
