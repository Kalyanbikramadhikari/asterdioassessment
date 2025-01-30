import { useFormik } from "formik";
import * as Yup from "yup";
import { useAddEventMutation, useGetEventsQuery } from "../store/APIfeatures/eventAPi";
import Header from "../components/Header";
import ApiError from "./ApiError";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddEvent = () => {
    const [addEvent, { data, isLoading, isError, isSuccess }] = useAddEventMutation();
    const { refetch } = useGetEventsQuery();

    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            name: "",
            location: "",
            time: "",
            organizer: "",
            description: "",
            image: "",
            guests: "",
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Event name is required"),
            location: Yup.string().required("Location is required"),
            time: Yup.string().required("Date & Time is required"),
            organizer: Yup.string().required("Organizer is required"),
            description: Yup.string().required("Description is required"),
            image: Yup.string().url("Enter a valid image URL").required("Image is required"),
            guests: Yup.number().min(1, "At least 1 guest is required").required("Guests are required"),
        }),
        onSubmit: async (values, { resetForm }) => {
            await addEvent({ ...values, guests: Number(values.guests) });
            refetch();
            resetForm();
        },
    });

    if (isError) {
        return (
            <ApiError />
        )
    }else if(isSuccess){
        toast.success('Event Added Sucessfully');   
        navigate('/');
        window.location.reload()

    }

    return (
        <div>
            <Header />
            <form onSubmit={formik.handleSubmit} className="p-6 px-16 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">Add New Event</h2>

                <div className="mb-4">
                    <label className="block font-semibold">Event Name</label>
                    <input
                        type="text"
                        name="name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                        className="w-full p-2 border rounded"
                    />
                    {formik.touched.name && formik.errors.name && <p className="text-red-500">{formik.errors.name}</p>}
                </div>

                <div className="mb-4">
                    <label className="block font-semibold">Location</label>
                    <input
                        type="text"
                        name="location"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.location}
                        className="w-full p-2 border rounded"
                    />
                    {formik.touched.location && formik.errors.location && <p className="text-red-500">{formik.errors.location}</p>}
                </div>

                <div className="mb-4">
                    <label className="block font-semibold">Date & Time</label>
                    <input
                        type="datetime-local"
                        name="time"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.time}
                        className="w-full p-2 border rounded"
                    />
                    {formik.touched.time && formik.errors.time && <p className="text-red-500">{formik.errors.time}</p>}
                </div>

                <div className="mb-4">
                    <label className="block font-semibold">Organizer</label>
                    <input
                        type="text"
                        name="organizer"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.organizer}
                        className="w-full p-2 border rounded"
                    />
                    {formik.touched.organizer && formik.errors.organizer && <p className="text-red-500">{formik.errors.organizer}</p>}
                </div>

                <div className="mb-4">
                    <label className="block font-semibold">Description</label>
                    <textarea
                        name="description"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.description}
                        className="w-full p-2 border rounded"
                    ></textarea>
                    {formik.touched.description && formik.errors.description && <p className="text-red-500">{formik.errors.description}</p>}
                </div>

                <div className="mb-4">
                    <label className="block font-semibold">Image address only</label>
                    <input
                        type="text"
                        name="image"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.image}
                        className="w-full p-2 border rounded"
                    />
                    {formik.touched.image && formik.errors.image && <p className="text-red-500">{formik.errors.image}</p>}
                </div>

                <div className="mb-4">
                    <label className="block font-semibold">No. of Guests</label>
                    <input
                        type="number"
                        name="guests"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.guests}
                        className="w-full p-2 border rounded"
                    />
                    {formik.touched.guests && formik.errors.guests && <p className="text-red-500">{formik.errors.guests}</p>}
                </div>

                <button type="submit" className="w-full p-2 bg-[#E93D14] text-white rounded hover:bg-blue-600">
                    {
                        isLoading ?
                            (
                                <svg aria-hidden="true" role="status" className='inline w-7 h-7 me-3 text-white animate-spin ' viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                </svg>
                            ) :
                            (
                                <span>Add Event</span>
                            )

                    }
                </button>
            </form>
        </div>

    );
};

export default AddEvent;
