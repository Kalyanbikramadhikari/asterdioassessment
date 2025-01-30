import { Event as EventIcon, LocationOn, People, CalendarToday } from "@mui/icons-material";


interface Event {
    id: number;
    name: string;
    location: string;
    time: string;
    organizer: string;
    description: string;
    image: string;
    guests: number;
}

interface EventCardProps {
    event: Event; 
}

const EventCard = ({ event }: EventCardProps) => {
    return (
        <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={event.image} alt={event.name} className="w-full h-48 object-cover" />
            <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{event.name}</h2>
                <div className="flex items-center text-gray-600 mb-2">
                    <LocationOn className="mr-2" />
                    <p>{event.location}</p>
                </div>
                <div className="flex items-center text-gray-600 mb-2">
                    <CalendarToday className="mr-2" />
                    <p>{new Date(event.time).toLocaleString()}</p>
                </div>
                <div className="flex items-center text-gray-600 mb-2">
                    <EventIcon className="mr-2" />
                    <p>{event.organizer}</p>
                </div>
                <div className="flex items-center text-gray-600 mb-4">
                    <People className="mr-2" />
                    <p>{event.guests} Guests</p>
                </div>
                <p className="text-gray-700">{event.description}</p>
            </div>
        </div>
    )
}

export default EventCard