import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom"
import Dashboard from '../views/Dashboard'
import AboutUs from '../views/AboutUs'
import ContactUs from '../views/ContactUs'
import Detail from '../views/Detail'

const router = createBrowserRouter([
    {
        path: "/",
        element: <Dashboard />,
    },
    {
        path: "/contactUs",
        element: <ContactUs />,
    },
    {
        path: "/aboutUs",
        element: <AboutUs />,
    },
    {
        path: "/detail/:adId",
        element: <Detail />,
    },
]);

function Router() {
    return <RouterProvider router={router} />
}

export default Router