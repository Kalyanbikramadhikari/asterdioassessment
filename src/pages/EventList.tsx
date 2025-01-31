import { useState } from "react";
import { Search, FilterList,  Add } from "@mui/icons-material";


// import MockData from "../data/mockData";
import Header from "../components/Header";
import EventCard from "../components/EventCard";
import { useDeleteEventMutation, useGetEventsQuery } from "../store/APIfeatures/eventAPi";
import Loading from "../components/Loading";
import ApiError from "./ApiError";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";


// interface Event {
//     id: number;
//     name: string;
//     location: string;
//     time: string;
//     organizer: string;
//     description: string;
//     image: string;
//     guests: number;
// }


const EventList = () => {
    // reciving data from endpoint
    const { data: events, isLoading, isError } = useGetEventsQuery();
    const [deleteEvent] = useDeleteEventMutation();

    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("default");
    const [currentPage, setCurrentPage] = useState(1);
    const eventsPerPage = 3;

    const { t } = useTranslation();


    const handleDeleteEvent = async (id: number) => {
        try {
            await deleteEvent(id);
            toast.success("Event deleted successfully!");
        } catch (error) {
            toast.error("Failed to delete the event.");
        }
    };


    // Filter events by search query
    const searchedEvent = events && events.filter((event) =>
        event.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Sort events by date
    const sortedEvents = searchedEvent && searchedEvent.sort((a, b) => {
        if (sortBy === "date") {
            return new Date(a.time).getTime() - new Date(b.time).getTime();
        } else if (sortBy === "guest") {
            return a.guests - b.guests; 
        } 
        return 0;
    });

    // Pagination logic
    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const currentEvents = sortedEvents && sortedEvents.slice(indexOfFirstEvent, indexOfLastEvent);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div className=" bg-gray-100 min-h-screen">

            {
                isLoading ? <Loading /> : isError ? <ApiError /> : (
                    <>
                        <Header />

                        <div className="p-6 md:px-16">
                            <div className="flex justify-between items-center mb-5">
                                <h1 className=" text-xl md:text-3xl font-bold ">{t("eventList.title")}</h1>

                                <Link to="/addEvent">
                                    <button className="  bg-[#E93D14] px-6 py-2 text-[#ffffff] rounded-3xl cursor-pointer ">
                                        {t("eventList.addEvent")} <Add />
                                    </button>
                                </Link>
                            </div>

                            {/* Search and Filters */}
                            <div className="flex flex-col md:flex-row gap-4 mb-6">
                                <div className="flex items-center bg-white p-2 rounded-lg shadow-sm flex-1">
                                    <Search className="text-gray-400 mr-2" />
                                    <input
                                        type="text"
                                        placeholder={t("eventList.searchPlaceholder")}
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="outline-none flex-1"
                                    />
                                </div>
                                <div className="flex items-center bg-white p-2 rounded-lg shadow-sm">
                                    <FilterList className="text-gray-400 mr-2" />
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="outline-none"
                                    >
                                        <option value="default">{t("eventList.sortBy.default")}</option>
                                        <option value="date">{t("eventList.sortBy.date")}</option>
                                        <option value="guest">{t("eventList.sortBy.guest")}</option>

                                        {/* <option value="distance">Sort by Distance from TIA</option> */}
                                        {/* <option value="date">Sort by Date</option> */}

                                    </select>
                                </div>
                            </div>

                            {/* Event Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {currentEvents && currentEvents.map((event) => (
                                    < div key={event.id}>
                                        <EventCard event={event} onDelete={handleDeleteEvent} deleteVisible={true} />

                                    </div>
                                ))}
                            </div>

                            {/* Pagination */}
                            <div className="flex justify-center mt-6 ">
                                {Array.from({ length: Math.ceil((sortedEvents?.length || 0) / eventsPerPage) }).map((_, index) => (
                                    <button
                                        key={index + 1}
                                        onClick={() => paginate(index + 1)}
                                        className={`mx-1 px-4 py-2 rounded-lg cursor-pointer ${currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-white"
                                            }`}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                            </div>
                        </div>

                    </>
                )
            }


        </div>
    );
};

export default EventList;