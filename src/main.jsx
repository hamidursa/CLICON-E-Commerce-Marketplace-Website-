import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import RootLayouts from "./Pages/PageLayout/RootLayouts.jsx";
import Registration from "./Pages/Registration.jsx";
import Info from "./Pages/Info.jsx";
import TrackOrder from "./Pages/TrackOrder.jsx";
import Compare from "./Pages/Compare.jsx";
import CustomerSupport from "./Pages/CustomerSupport.jsx";
import Shop from "./Pages/Shop.jsx";
import Home from "./Pages/Home.jsx";
import Cart from "./Pages/Cart.jsx";
import CheckOut from "./Pages/CheckOut.jsx";
import OrderSuccess from "./Pages/OrderSuccess.jsx";
import ProductView from "./Pages/ProductView.jsx";
import Favorites from "./Pages/Favorites.jsx";
import CategoryPage from "./Pages/Category/CategoryPage.jsx";

import { CartProvider } from "./Context/CartContext.jsx";
import { WishlistProvider } from "./Context/WishlistContext.jsx";
import { ToastProvider } from "./Context/ToastContext.jsx";
import ProductProvider from "./Context/ProductContext.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayouts,
    children: [
      { index: true, Component: Home },
      { path: "shop", Component: Shop },
      { path: "product/:id", Component: ProductView },
      { path: "products/:id", Component: ProductView },
      { path: "category/:slug", Component: CategoryPage },
      { path: "cart", Component: Cart },
      { path: "wishlist", Component: Favorites },
      { path: "favorites", Component: Favorites },
      { path: "checkout", Component: CheckOut },
      { path: "ordersuccess", Component: OrderSuccess },
      { path: "trackorder", Component: TrackOrder },
      { path: "compare", Component: Compare },
      { path: "customersupport", Component: CustomerSupport },
      { path: "info", Component: Info },
      { path: "about", Component: Info },
      { path: "contact", Component: CustomerSupport },
      { path: "signup", Component: Registration },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ToastProvider>
      <CartProvider>
        <WishlistProvider>
          <ProductProvider>
            <RouterProvider router={router} />
          </ProductProvider>
        </WishlistProvider>
      </CartProvider>
    </ToastProvider>
  </React.StrictMode>
);
