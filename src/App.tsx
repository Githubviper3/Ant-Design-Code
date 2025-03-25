import { Refine, Authenticated, AuthPage } from "@refinedev/core";
import routerProvider, { NavigateToResource } from "@refinedev/react-router";
import {
  ThemedLayoutV2,
  ThemedTitleV2,
  useNotificationProvider,
} from "@refinedev/antd";

import { BrowserRouter, Routes, Route, Outlet } from "react-router";
import {DashboardOutlined} from "@ant-design/icons";
import { ConfigProvider, App as AntdApp } from "antd";

import { dataProvider } from "./providers/data-provider";
import { authProvider } from "./providers/auth-provider";

import { ShowProduct } from "./pages/products/show";
import { EditProduct } from "./pages/products/edit";
import { TableProducts } from "./pages/products/table";
import { CreateProduct } from "./pages/products/create";



import { Login } from "./pages/auth/login";

import "antd/dist/reset.css";
import { DashboardPage } from "./pages/dashboard";

export default function App(): JSX.Element {
  return (
    <BrowserRouter>
      <ConfigProvider>
        <AntdApp>
          <Refine
            dataProvider={dataProvider}
            authProvider={authProvider}
            routerProvider={routerProvider}
            notificationProvider={useNotificationProvider}
            resources={[
              {
                name: "dashboard",
                list: "/dashboard",
                meta: {
                  label: "Dashboard",
                  icon: <DashboardOutlined />,
                },
              },
              {
                name: "protected-products",
                list: "/products",
                show: "/products/:id",
                edit: "/products/:id/edit",
                create: "/products/create",
                meta: { label: "Products" },
              }
            ]}
          >
            <Routes>
              <Route
                element={
                  <Authenticated
                    key="authenticated-routes"
                    redirectOnFail="/login"
                    
                  >
                    <ThemedLayoutV2
                      Title={(props) => (
                        <ThemedTitleV2 {...props} text="Products" />
                      )}
                    >
                      <Outlet />
                    </ThemedLayoutV2>
                  </Authenticated>
                }
              >
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route
                  index
                  element={<NavigateToResource resource="protected-products" />}
                />
                <Route path="/products">
                  <Route index element={<TableProducts />} />
                  <Route path=":id" element={<ShowProduct />} />
                  <Route path=":id/edit" element={<EditProduct />} />
                  <Route path="create" element={<CreateProduct />} />
                </Route>
              </Route>
              <Route
                element={
                  <Authenticated key="auth-pages" fallback={<Outlet />}>
                    <NavigateToResource resource="protected-products" />
                  </Authenticated>
                }
              >
                <Route path="/login" element={<Login />} />
x
              </Route>
            </Routes>
          </Refine>
        </AntdApp>
      </ConfigProvider>
    </BrowserRouter>
  );
}