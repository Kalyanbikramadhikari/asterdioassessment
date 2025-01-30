import { Link, useParams } from "react-router-dom";
// import MockData from "../data/mockData";
import { LocationOn, People, CalendarToday, Event } from "@mui/icons-material";
import { useGetEventsQuery } from "../store/APIfeatures/eventAPi";

const EventDetails = () => {
  const { id } = useParams();
  const { data: events, isLoading, isError } = useGetEventsQuery();


  
  const event = events ? events.find((e) => e.id === Number(id)) : null;
  // const event = MockData.find((e) => e.id === Number(id));
  if (!event) {
    return <div>Event not found!</div>;
  }
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Breadcrumb Navigation */}
      <nav className="flex mb-6" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <Link to="/" className="text-gray-700 hover:text-blue-600">
              Home
            </Link>
          </li>
          <li>
            <div className="flex items-center">
              <span className="mx-2 text-gray-500">/</span>
              <Link to="/events" className="text-gray-700 hover:text-blue-600">
                Events
              </Link>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <span className="mx-2 text-gray-500">/</span>
              <span className="text-gray-500">{event.name}</span>
            </div>
          </li>
        </ol>
      </nav>

      {/* Event Details */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <img src={event.image} alt={event.name} className="w-full h-64 object-cover" />
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{event.name}</h1>
          <div className="space-y-4">
            <div className="flex items-center text-gray-600">
              <LocationOn className="mr-2" />
              <p>{event.location}</p>
            </div>
            <div className="flex items-center text-gray-600">
              <CalendarToday className="mr-2" />
              <p>{new Date(event.time).toLocaleString()}</p>
            </div>
            <div className="flex items-center text-gray-600">
              <Event className="mr-2" />
              <p>{event.organizer}</p>
            </div>
            <div className="flex items-center text-gray-600">
              <People className="mr-2" />
              <p>{event.guests} Guests</p>
            </div>
            <p className="text-gray-700">{event.description}</p>
          </div>
        </div>
      </div>
    </div>
  );

};

export default EventDetails;
