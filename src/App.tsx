import { Refine } from "@refinedev/core";
import routerProvider, { NavigateToResource } from "@refinedev/react-router";
import {
  ThemedLayoutV2,
  ThemedTitleV2,
  useNotificationProvider,
} from "@refinedev/antd";

import { BrowserRouter, Routes, Route, Outlet } from "react-router";
import { ConfigProvider, App as AntdApp } from "antd";

import { dataProvider } from "./providers/data-provider";

import { ShowProduct } from "./pages/products/show";
import { EditProduct } from "./pages/products/edit";
import { TableProducts } from "./pages/products/table";
import { CreateProduct } from "./pages/products/create";

import "antd/dist/reset.css";
import { ShowUser } from "./pages/users/show";
import { EditUser } from "./pages/users/edit";
import { CreateUser } from "./pages/users/create";
import { TableUsers } from "./pages/users/table";
export default function App(): JSX.Element {
  return (
    <BrowserRouter>
      <ConfigProvider>
        <AntdApp>
            <Refine
              dataProvider={dataProvider}
              routerProvider={routerProvider}
              notificationProvider={useNotificationProvider}
              resources={[
                {
                  name: "users",
                  list: "/users",
                  show: "/users/:id",
                  edit: "/users/:id/edit",
                  create: "/users/create",
                  meta: { label: "Users" },
                },
              ]}
            >
              <Routes>
                <Route
                  element={
                    <ThemedLayoutV2
                      Title={(props) => (
                        <ThemedTitleV2 {...props} text="Users" wrapperStyles={{color: "black"}} />
                      )}
                    >
                      <Outlet />
                    </ThemedLayoutV2>
                  }
                >
                  <Route path="/users">
                    <Route index element={<TableUsers/>}/>
                    <Route path=":id" element={<ShowUser />} />
                    <Route path="/users/:id/edit" element={<EditUser />} />
                    <Route path="/users/create" element={<CreateUser />} />
                  </Route>
                </Route>
              </Routes>
            </Refine>
        </AntdApp>
      </ConfigProvider>
    </BrowserRouter>
  );
}
