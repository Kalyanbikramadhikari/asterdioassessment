import { createApi } from "@reduxjs/toolkit/query/react";
import MockData from "../../data/mockData"


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

const savedEvents = localStorage.getItem("mockEvents");
let mockEvents = savedEvents ? JSON.parse(savedEvents) : MockData;

export const eventsApi = createApi({
    reducerPath: "eventsApi",
    baseQuery: async () => ({ data: mockEvents }),
    tagTypes: ['Events', 'User'],

    endpoints: (builder) => ({

        // api request to get event data by id
        getEventById: builder.query<Event, number>({
            query: (id) => {
                const event = mockEvents.find((event: Event) => event.id === id);
                console.log('event', event)
                if (!event) {
                    return { error: { status: 404, message: "Event not found" } };
                }
                return { data: event };
            },
        }),

        // api request to get event data
        getEvents: builder.query<Event[], void>({
            query: () => "",
            providesTags: ['Events'],

        }),

        // api request for adding new event
        addEvent: builder.mutation<Event, Partial<Event>>({
            queryFn: async (newEvent) => {
                const newEventWithId: Event = {
                    id: mockEvents.length + 1,
                    ...newEvent,
                    guests: Number(newEvent.guests) || 0
                } as Event;

                mockEvents = [newEventWithId, ...mockEvents];
                localStorage.setItem("mockEvents", JSON.stringify(mockEvents));

                return { data: mockEvents }; // Ensure return format matches expected type
            },
            invalidatesTags: [{ type: 'Events' }],

        }),


        // api request for updating event
        updateEvent: builder.mutation<Event, { id: number; updatedData: Partial<Event> }>(
            {
                queryFn: async ({ id, updatedData }) => {
                    const eventIndex = mockEvents.findIndex((event: Event) => event.id === id);

                    if (eventIndex === -1) {
                        return { error: { status: 404, message: "Event not found" } };
                    }

                    // Merge the existing event with the updated data
                    const updatedEvents = [...mockEvents];
                    updatedEvents[eventIndex] = { ...updatedEvents[eventIndex], ...updatedData };

                    // Save the updated array back to localStorage
                    localStorage.setItem("mockEvents", JSON.stringify(updatedEvents));

                    return { data: mockEvents };
                },
                invalidatesTags: [{ type: 'Events' }],

            }
        ),


        // api request to delete an event
        deleteEvent: builder.mutation<void, number>({
            queryFn: async (id) => {
                const eventIndex = mockEvents.findIndex((event: Event) => event.id === id);

                if (eventIndex === -1) {
                    return { error: { status: 404, message: "Event not found" } };
                }
                mockEvents = mockEvents.filter((event: Event) => event.id !== id);
                localStorage.setItem("mockEvents", JSON.stringify(mockEvents));

                return { data: undefined }; // Returning data as undefined because no response data is needed
            },
            invalidatesTags: [{ type: 'Events' }],
        }),

    }),
});


export const { useGetEventByIdQuery, useGetEventsQuery, useAddEventMutation, useUpdateEventMutation, useDeleteEventMutation } = eventsApi;