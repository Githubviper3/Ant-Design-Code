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
                  name: "products",
                  list: "/products",
                  show: "/products/:id",
                  edit: "/products/:id/edit",
                  create: "/products/create",
                  meta: { label: "Products" },
                },
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
                        <ThemedTitleV2 {...props} text="Products" />
                      )}
                    >
                      <Outlet />
                    </ThemedLayoutV2>
                  }
                >
                  <Route
                    index
                    element={<NavigateToResource resource="products" />}
                  />
                  <Route path="/products">
                    <Route index element={<TableProducts />} />
                    <Route path=":id" element={<ShowProduct />} />
                    <Route path=":id/edit" element={<EditProduct />} />
                    <Route path="create" element={<CreateProduct />} />
                  </Route>
                  <Route path="/users">
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
