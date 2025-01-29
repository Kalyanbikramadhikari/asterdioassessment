import { useParams } from "react-router-dom";

const EventDetails = () => {
  const { id } = useParams();

  return <div className="text-center text-2xl py-10">Event Details for ID: {id}</div>;
};

export default EventDetails;
