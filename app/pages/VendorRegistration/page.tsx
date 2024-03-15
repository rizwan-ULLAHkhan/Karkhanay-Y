'use client'
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { FiUser, FiPhoneCall, FiMapPin, FiGlobe, FiBriefcase, FiHome, FiMail } from 'react-icons/fi';
import '../VendorRegistration/vendorregister.css'


type ModalState = {
    visible: boolean;
    message: string;
    color?: string; // Make color optional if it's not always required
};


const VendorRegistration = () => {
    const { data: session } = useSession();
    const [modal, setModal] = useState<ModalState>({ visible: false, message: '' });
    const [isButtonDisabled, setIsButtonDisabled] = useState(false); // New state for button disabled status
    const [formData, setFormData] = useState({

        fullName: '',
        address: '',
        contactNumber: '',
        industryType: '',
        city: '',
        companyName: '',
        email: '',

        // Add more fields as necessary
    });
    const industryTypes: string[] = ['Technology', 'Sports', 'Medical', 'Entertainment'];
    const handleFormSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsButtonDisabled(true); // Disable button as soon as form is submitted
        const vendorRegistrationData = {
            gmail: session?.user?.email,
            fullName: formData.fullName,
            companyName: formData.companyName,
            contactNumber: formData.contactNumber,
            industryType: formData.industryType,
            city: formData.city,
            address: formData.address,
            email: formData.email,
        };


        try {
            const response = await fetch('/api/vendorRegistration', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(vendorRegistrationData),
            });

            if (!response.ok) {
                // MongoDB POST failed. Deleting images from Sanity:

                console.error(`Error : ${response.status} - ${response.statusText}`);
                // handle the error, maybe set an error state or show a notification to the user
                alert("bc")
                return;
            }

            setModal({
                visible: true,
                message: 'vendor data uploaded successfully!',
                color: 'text-green-500'
            });

            setTimeout(() => {
                setModal({ visible: false, message: '' });
                setIsButtonDisabled(false); // Consider re-enabling the button if there's an error
            }, 3000);



            // Reset form data here
            setFormData({
                fullName: '',
                address: '',
                contactNumber: '',
                industryType: '',
                city: '',
                companyName: '',
                email: '',
                // Reset other fields as necessary
            });

        } catch (error) {
            setIsButtonDisabled(false); // Consider re-enabling the button if there's an error
            alert('An error occurred while uploading registration data. Please try again.');

        }


    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Only show registration form to logged-in users
    if (!session) {
        return <p className="text-Kgray">Please sign in to become a seller.</p>;
    }

    return (
        // Container for the form with added padding for smaller screens
        <div className="max-w-lg mx-auto my-10 p-4 sm:p-6 bg-white rounded-lg shadow-xl">
            {modal.visible && (
                <div className={`modal-content ${modal.color} `}>
                    <p>{modal.message}</p>
                </div>
            )}
            <form onSubmit={handleFormSubmit}>
                {/* Form Heading */}
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-semibold text-Kgray">Vendor Registration</h2>
                    <p className="text-Kgray">Join our community of professional sellers</p>
                </div>


                {/* Full Name Field */}
                <div className="mb-6 flex items-center  border-Kblue py-2">
                    <FiUser className="text-Kblue" />
                    <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        placeholder="Full Name"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                    // ... existing props
                    />
                </div>

                {/* Company Name Field */}
                <div className="mb-6 flex items-center  border-Kblue py-2">
                    <FiBriefcase className="text-Kblue" />
                    <input
                        type="text"
                        id="companyName"
                        name="companyName"
                        placeholder="Company Name"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                    // ... existing props
                    />
                </div>
                <div className="mb-6 flex items-center  border-Kblue py-2">
                    <FiHome className="text-Kblue " />
                    <input
                        type="text"
                        id="address"
                        name="address"
                        placeholder="Company/Industry Address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                        required
                    />
                </div>
                {/* City Field */}
                <div className="mb-6 flex items-center  border-Kblue py-2">
                    <FiMapPin className="text-Kblue" />
                    <input
                        type="text"
                        id="city"
                        name="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                        required
                    // ... existing props
                    />
                </div>
                <div className="mb-6 flex items-center border-Kblue py-2">
                    <FiMail className="text-Kblue " />
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                        required
                    />
                </div>
                {/* Other fields with icons */}

                {/* Contact Number Field */}
                <div className="mb-6 flex items-center  border-Kblue py-2">
                    <FiPhoneCall className="text-Kblue" />
                    <input
                        type="tel"
                        id="contactNumber"
                        name="contactNumber"
                        placeholder="+92/03 xx xxxxxxx"
                        value={formData.contactNumber}
                        onChange={handleInputChange}
                        className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                        required

                    // ... existing props
                    />
                </div>

                {/* Industry Type Dropdown */}
                <div className="mb-6 flex items-center border-Kblue py-2">
                    <FiGlobe className="text-Kblue mr-8 " />
                    <select
                        id="industryType"
                        name="industryType"
                        value={formData.industryType}
                        onChange={handleInputChange}
                        className=" appearance-none bg-transparent border-none w-full text-gray-700  py-1 px-2 leading-tight focus:outline-none"
                        required
                    >
                        <option value="" >Select Industry Type</option>
                        {industryTypes.map((type, index: number) => (
                            <option key={index} value={type} >
                                {type}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center mt-8">
                    <button
                        type="submit"
                        className={`w-full bg-Kblue hover:bg-Kgreen text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline transition-colors duration-300 ${isButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={isButtonDisabled} // Use isButtonDisabled state here
                    >
                        Register as a Seller
                    </button>
                </div>
            </form>

        </div>
    );
};

export default VendorRegistration;
