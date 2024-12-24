import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import AppLayout from "./layout/app-layout";
import { Page } from "./pages/page";
import store from "./store";
import { fetchStudents } from "./redux/studentSlice";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Page />,
      },
    ],
  },
]);

store.dispatch(fetchStudents());

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
