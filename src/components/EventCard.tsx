import { Event as EventIcon, LocationOn, People, CalendarToday, Favorite, FavoriteBorder } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { addToFavorites, removeFromFavorites } from "../store/reducerSlices/favoritesSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";


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
    const dispatch = useDispatch();
    const favorites = useSelector((state: RootState) => state.favorites.favorites);
    const isFavorite = favorites.some((fav: Event) => fav.id === event.id);

    const toggleFavorite = () => {
        if (isFavorite) {
            dispatch(removeFromFavorites(event.id));
        } else {
            dispatch(addToFavorites(event));
        }
    };
    return (

        <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer">
            <Link to={`/event/${event.id}`}>

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
            </Link >


            <button onClick={toggleFavorite} className="mt-4 text-blue-500 hover:text-blue-700">
                {isFavorite ? <Favorite /> : <FavoriteBorder />}
                <span className="ml-2">{isFavorite ? "Remove from Favorites" : "Add to Favorites"}</span>
            </button>
        </div>
    )
}

export default EventCard