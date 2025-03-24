import { TableProducts } from "./pages/products/table";
import { Refine, Authenticated } from "@refinedev/core";
import routerProvider, { NavigateToResource } from "@refinedev/react-router";

import { BrowserRouter, Routes, Route, Outlet } from "react-router";

import { dataProvider } from "./providers/data-provider";
import { authProvider } from "./providers/auth-provider";

import { ShowProduct } from "./pages/products/show";
import { EditProduct } from "./pages/products/edit";
import { ListProducts } from "./pages/products/list";
import { CreateProduct } from "./pages/products/create";

import { Login } from "./pages/login";
import { Header } from "./components/header";

export default function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Refine
          dataProvider={dataProvider}
          authProvider={authProvider}
          routerProvider={routerProvider}
          resources={[
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
                element={(
                    <Authenticated key="authenticated-routes" redirectOnFail="/login">
                        <Header />
                        <Outlet />
                    </Authenticated>
                )}
            >
                <Route
                    index
                    element={<NavigateToResource resource="protected-products" />}
                />
                <Route path="/products">
                    <Route index element={<TableProducts />} />
                    <Route path=":id" element={<ShowProduct  input_id={123}/>} />
                    <Route path=":id/edit" element={<EditProduct />} />
                    <Route path="create" element={<CreateProduct />} />
                </Route>
            </Route>
            <Route
                element={(
                    <Authenticated key="auth-pages" fallback={<Outlet />}>
                        <NavigateToResource resource="protected-products" />
                    </Authenticated>
                )}
            >
                <Route path="/login" element={<Login />} />
            </Route>
        </Routes>
      </Refine>
    </BrowserRouter>
  );
}