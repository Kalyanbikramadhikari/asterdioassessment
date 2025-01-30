import React, { useState, useEffect } from "react";
import { Search, FilterList, Event, LocationOn, People, CalendarToday } from "@mui/icons-material";


import MockData from "../data/mockData";
import Header from "../components/Header";
import EventCard from "../components/EventCard";


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


const EventList = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("date");
    const [currentPage, setCurrentPage] = useState(1);
    const eventsPerPage = 3; // Adjust the number of events per page

    // Load data from JSON file
    useEffect(() => {
        setEvents(MockData);
    }, []);

    // Filter events by search query
    const searchedEvent = events.filter((event) =>
        event.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Sort events by date
    const sortedEvents = searchedEvent.sort((a, b) => {
        if (sortBy === "date") {
            return new Date(a.time).getTime() - new Date(b.time).getTime(); // Convert dates to timestamps
        }
        //  else if(sortBy === 'guest'){
        //     return 
        // }
        return 0;
    });


   

    // Pagination logic
    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const currentEvents = sortedEvents.slice(indexOfFirstEvent, indexOfLastEvent);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div className=" bg-gray-100 min-h-screen">
            <Header />

            <div className="p-6 px-16">
                <h1 className="text-3xl font-bold mb-6">Event Listings</h1>

                {/* Search and Filters */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="flex items-center bg-white p-2 rounded-lg shadow-sm flex-1">
                        <Search className="text-gray-400 mr-2" />
                        <input
                            type="text"
                            placeholder="Search events..."
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
                            <option value="date">Sort by Date</option>
                            <option value="guest">Sort by No.of Guest</option>
                            <option value="distance">Sort by Distance from TIA</option>
                            {/* <option value="date">Sort by Date</option> */}

                        </select>
                    </div>
                </div>

                {/* Event Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentEvents.map((event) => (
                        <EventCard event={event} />
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center mt-6">
                    {Array.from({ length: Math.ceil(sortedEvents.length / eventsPerPage) }).map((_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => paginate(index + 1)}
                            className={`mx-1 px-4 py-2 rounded-lg ${currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-white"
                                }`}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>


        </div>
    );
};

export default EventList;