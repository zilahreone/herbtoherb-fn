import App from "../App";
import Herb from "./Herb";
import HerbDetail from "./HerbDetail";
import PageNotFound from "./PageNotFound";

export default routers = [
  {
    path: '/',
    element: <App />,
    errorElement: <PageNotFound />,
    children: [
      {
        path: '/herb',
        element: <Herb />
      },
      {
        path: '/herb/:herbId',
        element: <HerbDetail />
      },
    ]
  },
]