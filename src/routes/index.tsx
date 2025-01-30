import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


// lazy loading

// const EventList = lazy(() => import("../pages/EventList"));
const NotFound = lazy(() => import("../pages/NotFound"));
const EventDetail = lazy(() => import("../pages/EventDetail"))
const EventList = lazy(() => import("../pages/EventList"))

const Header = lazy(() => import("../components/Header"))



// Loading spinner
import Loading from "../components/Loading";


const AppRoutes = () => {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Header />} />
          <Route path="/events" element={<EventList />} />

          <Route path="*" element={<NotFound />} />
          <Route path="/event/:id" element={<EventDetail />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRoutes;
