import { Event as EventIcon, LocationOn, People, CalendarToday, Favorite, FavoriteBorder, Delete } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { addToFavorites, removeFromFavorites } from "../store/reducerSlices/favoritesSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import EditIcon from '@mui/icons-material/Edit';
import { useState } from "react";
import { useTranslation } from "react-i18next";

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
    deleteVisible?: boolean;
    onDelete: (id: number) => Promise<void>;
}

const EventCard: React.FC<EventCardProps> = ({ event, onDelete, deleteVisible }) => {
    const dispatch = useDispatch();
    const favorites = useSelector((state: RootState) => state.favorites.favorites);
    const isFavorite = favorites.some((fav: Event) => fav.id === event.id);
    const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);


    const { t } = useTranslation();

    const toggleFavorite = () => {
        if (isFavorite) {
            dispatch(removeFromFavorites(event.id));
        } else {
            dispatch(addToFavorites(event));
        }
    };
    const handleDeleteClick = () => {
        setOpenDeleteConfirmation(true);
    };
    const confirmDelete = () => {
        onDelete(event.id); // Call the parent's delete handler
        setOpenDeleteConfirmation(false);
    };

    const cancelDelete = () => {
        setOpenDeleteConfirmation(false);
    };

    return (

        <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer relative text-sm md:text-base">
            <Link to={`/event/update/${event.id}`}>

                <div className="flex justify-center items-center h-10 w-10 bg-gray-200 absolute top-3 right-3 rounded-full" >
                    <EditIcon />
                </div>
            </Link>

            {
                deleteVisible && (
                    <div onClick={handleDeleteClick} className="flex justify-center items-center h-10 w-10 bg-gray-200 absolute top-3 left-3 text-red-600 rounded-full" >
                        <Delete />
                    </div>
                )
            }

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


            <button onClick={toggleFavorite} className="mt-4 text-blue-500 hover:text-blue-700 pl-3 pb-3">
                {isFavorite ? <Favorite /> : <FavoriteBorder />}
                <span className="ml-2">{isFavorite ? t("eventCard.removeFromFavorites") : t("eventCard.addToFavorites")}</span>
            </button>



            {openDeleteConfirmation && (
                <div className="fixed inset-0 z-50 bg-[#434343] bg-opacity-20 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-xl font-bold mb-4">{t("eventCard.deleteConfirmation")} </h3>
                        <div className="flex justify-end space-x-4">
                            <button onClick={cancelDelete} className="px-4 py-2 bg-gray-200 rounded-lg cursor-pointer">
                                {t("eventCard.cancel")}
                            </button>
                            <button onClick={confirmDelete} className="px-4 py-2 bg-red-600 text-white rounded-lg cursor-pointer">
                                {t("eventCard.delete")}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default EventCard