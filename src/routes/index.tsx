import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


// lazy loading

// const EventList = lazy(() => import("../pages/EventList"));
const NotFound = lazy(() => import("../pages/NotFound"));
const EventDetail = lazy(() => import("../pages/EventDetail"))
const EventList = lazy(() => import("../pages/EventList"))
const Favorites = lazy(() => import("../pages/Favorites"))
const AddEvents = lazy(() => import("../pages/AddEvent"))
const UpdateEvents = lazy(() => import("../pages/UpdateEvent"))




// Loading spinner
import Loading from "../components/Loading";


const AppRoutes = () => {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<EventList />} />
          <Route path="/events" element={<EventList />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/addEvent" element={<AddEvents />} />
          <Route path="/event/update/:id" element={<UpdateEvents />} />

          <Route path="*" element={<NotFound />} />
          <Route path="/event/:id" element={<EventDetail />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRoutes;
