// 'use client'
// import React, { useState } from 'react';
// import { useSession } from 'next-auth/react';
// import { FiUser, FiPhoneCall, FiMapPin, FiGlobe, FiBriefcase, FiHome, FiMail } from 'react-icons/fi';
// import '../VendorRegistration/vendorregister.css'


// type ModalState = {
//     visible: boolean;
//     message: string;
//     color?: string; // Make color optional if it's not always required
// };


// const VendorRegistration = () => {
//     const { data: session } = useSession();
//     const [modal, setModal] = useState<ModalState>({ visible: false, message: '' });
//     const [isButtonDisabled, setIsButtonDisabled] = useState(false); // New state for button disabled status
//     const [formData, setFormData] = useState({

//         fullName: '',
//         address: '',
//         contactNumber: '',
//         industryType: '',
//         city: '',
//         companyName: '',
//         email: '',

//         // Add more fields as necessary
//     });

//     const industryTypes: string[] = ['Technology', 'Sports', 'Medical', 'Entertainment'];


//     const handleFormSubmit = async (event: React.FormEvent) => {
//         event.preventDefault();
//         setIsButtonDisabled(true); // Disable button as soon as form is submitted
//         const vendorRegistrationData = {
//             gmail: session?.user?.email,
//             fullName: formData.fullName,
//             companyName: formData.companyName,
//             contactNumber: formData.contactNumber,
//             industryType: formData.industryType,
//             city: formData.city,
//             address: formData.address,
//             email: formData.email,
//         };


//         try {
//             const response = await fetch('/api/vendorRegistration', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(vendorRegistrationData),
//             });

//             if (!response.ok) {
//                 // MongoDB POST failed. Deleting images from Sanity:

//                 console.error(`Error : ${response.status} - ${response.statusText}`);
//                 // handle the error, maybe set an error state or show a notification to the user
//                 alert("bc")
//                 return;
//             }

//             setModal({
//                 visible: true,
//                 message: 'vendor data uploaded successfully!',
//                 color: 'text-green-500'
//             });

//             setTimeout(() => {
//                 setModal({ visible: false, message: '' });
//                 setIsButtonDisabled(false); // Consider re-enabling the button if there's an error
//             }, 3000);



//             // Reset form data here
//             setFormData({
//                 fullName: '',
//                 address: '',
//                 contactNumber: '',
//                 industryType: '',
//                 city: '',
//                 companyName: '',
//                 email: '',
//                 // Reset other fields as necessary
//             });

//         } catch (error) {
//             setIsButtonDisabled(false); // Consider re-enabling the button if there's an error
//             alert('An error occurred while uploading registration data. Please try again.');

//         }


//     };

//     const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//         const { name, value } = event.target;
//         setFormData({
//             ...formData,
//             [name]: value,
//         });
//     };

//     // Only show registration form to logged-in users
//     if (!session) {
//         return <p className="text-Kgray">Please sign in to become a seller.</p>;
//     }

//     return (
//         // Container for the form with added padding for smaller screens
//         <div className="max-w-lg mx-auto my-10 p-4 sm:p-6 bg-white rounded-lg shadow-xl">
//             {modal.visible && (
//                 <div className={`modal-content ${modal.color} `}>
//                     <p>{modal.message}</p>
//                 </div>
//             )}
//             <form onSubmit={handleFormSubmit}>
//                 {/* Form Heading */}
//                 <div className="text-center mb-8">
//                     <h2 className="text-2xl font-semibold text-Kgray">Vendor Registration</h2>
//                     <p className="text-Kgray">Join our community of professional sellers</p>
//                 </div>


//                 {/* Full Name Field */}
//                 <div className="mb-6 flex items-center  border-Kblue py-2">
//                     <FiUser className="text-Kblue" />
//                     <input
//                         type="text"
//                         id="fullName"
//                         name="fullName"
//                         placeholder="Full Name"
//                         value={formData.fullName}
//                         onChange={handleInputChange}
//                         className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
//                     // ... existing props
//                     />
//                 </div>

//                 {/* Company Name Field */}
//                 <div className="mb-6 flex items-center  border-Kblue py-2">
//                     <FiBriefcase className="text-Kblue" />
//                     <input
//                         type="text"
//                         id="companyName"
//                         name="companyName"
//                         placeholder="Company Name"
//                         value={formData.companyName}
//                         onChange={handleInputChange}
//                         className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
//                     // ... existing props
//                     />
//                 </div>
//                 <div className="mb-6 flex items-center  border-Kblue py-2">
//                     <FiHome className="text-Kblue " />
//                     <input
//                         type="text"
//                         id="address"
//                         name="address"
//                         placeholder="Company/Industry Address"
//                         value={formData.address}
//                         onChange={handleInputChange}
//                         className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
//                         required
//                     />
//                 </div>
//                 {/* City Field */}
//                 <div className="mb-6 flex items-center  border-Kblue py-2">
//                     <FiMapPin className="text-Kblue" />
//                     <input
//                         type="text"
//                         id="city"
//                         name="city"
//                         placeholder="City"
//                         value={formData.city}
//                         onChange={handleInputChange}
//                         className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
//                         required
//                     // ... existing props
//                     />
//                 </div>
//                 <div className="mb-6 flex items-center border-Kblue py-2">
//                     <FiMail className="text-Kblue " />
//                     <input
//                         type="email"
//                         id="email"
//                         name="email"
//                         placeholder="Email Address"
//                         value={formData.email}
//                         onChange={handleInputChange}
//                         className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
//                         required
//                     />
//                 </div>
//                 {/* Other fields with icons */}

//                 {/* Contact Number Field */}
//                 <div className="mb-6 flex items-center  border-Kblue py-2">
//                     <FiPhoneCall className="text-Kblue" />
//                     <input
//                         type="tel"
//                         id="contactNumber"
//                         name="contactNumber"
//                         placeholder="+92/03 xx xxxxxxx"
//                         value={formData.contactNumber}
//                         onChange={handleInputChange}
//                         className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
//                         required

//                     // ... existing props
//                     />
//                 </div>

//                 {/* Industry Type Dropdown */}
//                 <div className="mb-6 flex items-center border-Kblue py-2">
//                     <FiGlobe className="text-Kblue mr-8 " />
//                     <select
//                         id="industryType"
//                         name="industryType"
//                         value={formData.industryType}
//                         onChange={handleInputChange}
//                         className=" appearance-none bg-transparent border-none w-full text-gray-700  py-1 px-2 leading-tight focus:outline-none"
//                         required
//                     >
//                         <option value="" >Select Industry Type</option>
//                         {industryTypes.map((type, index: number) => (
//                             <option key={index} value={type} >
//                                 {type}
//                             </option>
//                         ))}
//                     </select>
//                 </div>

//                 {/* Submit Button */}
//                 <div className="flex justify-center mt-8">
//                     <button
//                         type="submit"
//                         className={`w-full bg-Kblue hover:bg-Kgreen text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline transition-colors duration-300 ${isButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
//                         disabled={isButtonDisabled} // Use isButtonDisabled state here
//                     >
//                         Register as a Seller
//                     </button>
//                 </div>
//             </form>

//         </div>
//     );
// };

// export default VendorRegistration;




























'use client'
// VendorRegistration.tsx
import React, { useState, useEffect,useRef } from 'react';
import { useSession } from 'next-auth/react';
import { Sclient } from '@/app/sanityclientsetup'

// Add your CSS import statement
import '../VendorRegistration/vendorregister.css'

type ModalState = {
    visible: boolean;
    message: string;
    color?: string; // Make color optional if it's not always required
};

interface FormErrors {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    cnic?: string;
    cnicFrontImage?: string;
    cnicBackImage?: string;
    password?: string;
    confirmPassword?: string;
    companyName?: string;
    storeName?: string;
    streetAddress?: string;
    city?: string;
    province?: string;
    nationalTaxNumber?: string;
    secpNumber?: string;
}

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    cnic: string;
    cnicFrontImage: File | null | string;
    cnicBackImage: File | null | string;
    password: string;
    confirmPassword: string;
    companyName: string;
    storeName: string;
    streetAddress: string;
    city: string;
    province: string;
    nationalTaxNumber: string;
    secpNumber: string;
}
const baseImageUrl = 'https://cdn.sanity.io/images';

async function uploadImage(file: File): Promise<string | null> {
    try {
        // Upload the image asset to Sanity
        const uploadedImageAsset = await Sclient.assets.upload('image', file);
        console.log("uploadedd?????")
        // Create imageData with _id from uploaded asset
        const imageData = {
            _type: 'productImage',
            image: {
                _type: 'image',
                asset: {
                    _ref: uploadedImageAsset._id,
                    _type: 'reference'
                }
            },
            description: "this is image for cnic when the vendor registers"
        };

        // Create the image document in Sanity
        const createdImageDoc = await Sclient.create(imageData);
        console.log(createdImageDoc, "please dont go please dont go")
        if (!createdImageDoc || !createdImageDoc._id) {
            console.log("Failed to create the image document or received an unexpected response from Sanity.");
            return null; // Explicitly return null on failure
        }

        // Construct the URL for the uploaded image
        const imageUrl = await constructImageUrl(createdImageDoc._id);
        return imageUrl || null; // Ensure that null is returned if imageUrl is undefined
    } catch (error) {
        console.error("Error uploading image:", error);
        return null; // Explicitly return null on catch
    }
}

const constructImageUrl = async (refId: string) => {

    const query = `*[_id == "${refId}"].image.asset._ref`
    const ref = await Sclient.fetch(query);
    console.log(ref)
    if (Array.isArray(ref) && ref.length > 0 && typeof ref[0] === "string") {
        const splitRef = ref[0].split('-');
        const uniqueId = splitRef[1];
        const dimensions = splitRef[2]; // This might not be needed for the URL, depending on your configuration
        const format = splitRef[3];
        const url = `${baseImageUrl}/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${uniqueId}-${dimensions}.${format}`
        console.log(url)
        return url;
    }

}


const VendorRegistration = () => {
    const { data: session } = useSession();
    const [modal, setModal] = useState<ModalState>({ visible: false, message: '' });
    const [isButtonDisabled, setIsButtonDisabled] = useState(false); // New state for button disabled status
    const [notification, setNotification] = useState({ visible: false, message: '' });
    const [formErrors, setFormErrors] = useState<FormErrors>({});
    const [cnicImages, setCnicImages] = useState<File[]>([]); // Now explicitly an array of File objects
    const [isLoading, setIsLoading] = useState(false);



    const cnicFrontImageRef = useRef<HTMLInputElement>(null);
    const cnicBackImageRef = useRef<HTMLInputElement>(null);


    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        cnic: '',
        cnicFrontImage: null,
        cnicBackImage: null,
        password: '',
        confirmPassword: '',
        companyName: '',
        storeName: '',
        streetAddress: '',
        city: '',
        province: '',
        nationalTaxNumber: '',
        secpNumber: '',
    });


    useEffect(() => {
        // Only try to update the email if the session has loaded and the email is different
        if (session?.user?.email && formData.email !== session.user.email) {
            setFormData(prevFormData => ({
                ...prevFormData,
                // Use a fallback empty string if session.user.email is undefined or null
                email: session.user.email || '',
            }));
        }
    }, [session, formData.email]);

    useEffect(() => {
        // Declare timeoutId with type number
        let timeoutId: number;

        if (modal.visible) {
            timeoutId = window.setTimeout(() => { // Use window.setTimeout for clarity in a browser environment
                setModal({ visible: false, message: '', color: '' });
            }, 5000);
        }

        return () => {
            // clearTimeout expects a number in a browser environment, which matches our type
            window.clearTimeout(timeoutId);
        };
    }, [modal.visible]);


    const validateForm = (): FormErrors => {
        let errors: FormErrors = {};

        if (!formData.firstName.trim()) errors.firstName = "First Name is required.";
        if (!formData.lastName.trim()) errors.lastName = "Last Name is required.";
        if (!formData.email.trim()) errors.email = "Email is required.";
        if (!formData.phone.trim()) errors.phone = "Phone is required.";
        if (!formData.cnic.trim()) errors.cnic = "CNIC is required.";
        if (!formData.cnicFrontImage) errors.cnicFrontImage = "CNIC front image is required.";
        if (!formData.cnicBackImage) errors.cnicBackImage = "CNIC back image is required.";
        if (!formData.password) errors.password = "Password is required.";
        if (formData.password !== formData.confirmPassword) errors.confirmPassword = "Passwords do not match.";
        if (!formData.companyName.trim()) errors.companyName = "Company Name is required.";
        if (!formData.storeName.trim()) errors.storeName = "Store Name is required.";
        if (!formData.streetAddress.trim()) errors.streetAddress = "Street Address is required.";
        if (!formData.city.trim()) errors.city = "City is required.";
        if (!formData.province.trim()) errors.province = "Province is required.";
        if (!formData.nationalTaxNumber.trim()) errors.nationalTaxNumber = "National Tax Number is required.";
        if (!formData.secpNumber.trim()) errors.secpNumber = "SECP Number is required.";


        return errors;
    };



    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleFrontCNICImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFormData({
                ...formData,
                cnicFrontImage: e.target.files[0],
            });
        }
    };

    const handleBackCNICImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFormData({
                ...formData,
                cnicBackImage: e.target.files[0],
            });
        }
    };














    const handleFormSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsButtonDisabled(true); // Disable the submit button to prevent multiple submissions
        const resetForm = () => {
            // Reset file input fields using refs
            if (cnicFrontImageRef.current) {
                cnicFrontImageRef.current.value = "";
            }
            if (cnicBackImageRef.current) {
                cnicBackImageRef.current.value = "";
            }
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setFormErrors(validationErrors);
            setIsButtonDisabled(false);
            return;
        }
    }

        console.log("check 2")
        // Basic front-end validation checks
        if (!formData.email || !formData.firstName || !formData.firstName || !formData.password || !formData.confirmPassword) {

            setIsButtonDisabled(false);
            return;
        }
        console.log("check 3")

        // More validation checks can be added here based on your requirements
        // For example, checking for a valid email format, password length, etc.

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match.");
            setIsButtonDisabled(false);
            return;
        }
        console.log("check 4")

        // Assuming you have a state to handle file upload, 
        // such as formData.cnicFrontImage and formData.cnicBackImage
        if (!formData.cnicFrontImage || !formData.cnicBackImage) {
            alert("Please upload both front and back CNIC images.");
            setIsButtonDisabled(false);
            return;
        }
        console.log("check 5")


        setIsLoading(true)

        // Upload CNIC images and get URLs
        let cnicFrontImageUrl: string | null = null;
        if (formData.cnicFrontImage instanceof File) {
            cnicFrontImageUrl = await uploadImage(formData.cnicFrontImage);
        }

        let cnicBackImageUrl: string | null = null;
        if (formData.cnicBackImage instanceof File) {
            cnicBackImageUrl = await uploadImage(formData.cnicBackImage);
        }


        const vendorRegistrationData = new FormData();
        vendorRegistrationData.append('email', formData.email);
        vendorRegistrationData.append('firstName', formData.firstName);
        vendorRegistrationData.append('lastName', formData.lastName);
        vendorRegistrationData.append('password', formData.password); // Make sure to securely handle passwords
        // Append other form data as key-value pairs

        vendorRegistrationData.append('phone', formData.phone);
        vendorRegistrationData.append('cnic', formData.cnic);
        // Ensure you handle file objects correctly as shown
        vendorRegistrationData.append('companyName', formData.companyName);
        vendorRegistrationData.append('storeName', formData.storeName);
        vendorRegistrationData.append('streetAddress', formData.streetAddress);
        vendorRegistrationData.append('city', formData.city);
        vendorRegistrationData.append('province', formData.province);
        vendorRegistrationData.append('nationalTaxNumber', formData.nationalTaxNumber);
        vendorRegistrationData.append('secpNumber', formData.secpNumber);

        const payload = {
            ...formData,
            cnicFrontImageUrl: cnicFrontImageUrl, cnicBackImageUrl: cnicBackImageUrl,
        };
        try {
            const response = await fetch('/api/vendorRegistration', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Perform actions based on the response
            const responseData = await response.json();

            setModal({
                visible: true,
                message: 'Your registration was successful!',
                color: 'text-green-500', // Change the color based on your color scheme
            });
            setTimeout(() => {
                setModal({ visible: false, message: '', color: '' });
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    cnic: '',
                    cnicFrontImage: null,
                    cnicBackImage: null,
                    password: '',
                    confirmPassword: '',
                    companyName: '',
                    storeName: '',
                    streetAddress: '',
                    city: '',
                    province: '',
                    nationalTaxNumber: '',
                    secpNumber: '',
                });
                resetForm();
                
            }, 3000); // Hides the modal after 3 seconds




        } catch (error) {
            setModal({
                visible: true,
                message: (error as Error).toString(),
                color: 'text-red-500', // Change the color based on your color scheme
            });
            setTimeout(() => {
                setModal({ visible: false, message: '', color: '' });
            }, 3000); // Hides the modal after 5 seconds

        }

        setIsButtonDisabled(false); // Re-enable the submit button
    }


    return (
        <div className="vendor-registration-form">
            <form onSubmit={handleFormSubmit}>

                <label>
                    <h1>Title</h1>
                    <select name="title" onChange={handleInputChange} className='mx-2'>
                        <option value="Mr">Mr</option>
                        <option value="Ms">Ms</option>
                        {/* Add other title options here */}
                    </select>
                </label>

                <label>
                    <h1>First Name</h1>
                    <input type="text" value={formData.firstName} name="firstName" placeholder="First name" onChange={handleInputChange} />
                </label>
                {formErrors.firstName && <p className="error-message">{formErrors.firstName}</p>}

                <label>
                    <h1>Last Name</h1>
                    <input type="text" value={formData.lastName} name="lastName" placeholder="Last name" onChange={handleInputChange} />
                </label>
                {formErrors.lastName && <p className="error-message">{formErrors.lastName}</p>}

                <label>
                    <h1>Email</h1>
                    <input type="email"  name="email" placeholder="Enter email" onChange={handleInputChange} value={formData.email || session?.user?.email || ''} required />
                </label>
                {formErrors.email && <p className="error-message">{formErrors.email}</p>}

                <label>
                    <h1>Phone</h1>
                    <input type="tel" value={formData.phone} name="phone" placeholder="Enter phone" onChange={handleInputChange} />
                </label>
                {formErrors.phone && <p className="error-message">{formErrors.phone}</p>}

                <label>
                    <h1>CNIC</h1>
                    <input type="text" value={formData.cnic} name="cnic" placeholder="Enter CNIC" onChange={handleInputChange} />
                </label>
                {formErrors.cnic && <p className="error-message">{formErrors.cnic}</p>}

                <label>
                    <h1>CNIC Front Image</h1>
                    <input type="file" ref={cnicFrontImageRef} name="cnicFrontImage" onChange={handleFrontCNICImageChange} />
                </label>
                {formErrors.cnicFrontImage && <p className="error-message">{formErrors.cnicFrontImage}</p>}

                <label>
                    <h1>CNIC Back Image</h1>
                    <input type="file" ref={cnicBackImageRef} name="cnicBackImage" onChange={handleBackCNICImageChange} />
                </label>
                {formErrors.cnicBackImage && <p className="error-message">{formErrors.cnicBackImage}</p>}

                <label>
                    <h1>Password</h1>
                    <input type="password" value={formData.password} name="password" placeholder="Enter Password" onChange={handleInputChange} />
                </label>
                {formErrors.password && <p className="error-message">{formErrors.password}</p>}

                <label>
                    <h1>Confirm Password</h1>
                    <input type="password" value={formData.confirmPassword} name="confirmPassword" placeholder="Confirm Password" onChange={handleInputChange} />
                </label>
                {formErrors.confirmPassword && <p className="error-message">{formErrors.confirmPassword}</p>}

                {/* Business Profile Section */}
                <h1>Business Profile</h1>

                <label>
                    <h1>Company Name</h1>
                    <input type="text" value={formData.companyName} name="companyName" placeholder="Enter Company Name" onChange={handleInputChange} />
                </label>
                {formErrors.companyName && <p className="error-message">{formErrors.companyName}</p>}

                <label>
                    <h1>Store Name</h1>
                    <input type="text" value={formData.storeName} name="storeName" placeholder="Enter Store Name" onChange={handleInputChange} />
                </label>
                {formErrors.storeName && <p className="error-message">{formErrors.storeName}</p>}

                <label>
                    <h1>Street Address</h1>
                    <input type="text" value={formData.streetAddress} name="streetAddress" placeholder="Enter Address" onChange={handleInputChange} />
                </label>
                {formErrors.streetAddress && <p className="error-message">{formErrors.streetAddress}</p>}

                <label>
                    <h1>City</h1>
                    <input type="text" value={formData.city} name="city" placeholder="Select City" onChange={handleInputChange} />
                </label>
                {formErrors.city && <p className="error-message">{formErrors.city}</p>}

                <label>
                    <h1>Province</h1>
                    <input type="text" value={formData.province} name="province" placeholder="Select Province" onChange={handleInputChange} />
                </label>
                {formErrors.province && <p className="error-message">{formErrors.province}</p>}

                <label>
                    <h1>National Tax Number</h1>
                    <input type="text" value={formData.nationalTaxNumber} name="nationalTaxNumber" placeholder="Enter National Tax Number" onChange={handleInputChange} />
                </label>
                {formErrors.nationalTaxNumber && <p className="error-message">{formErrors.nationalTaxNumber}</p>}

                <label>
                    <h1>SECP Number</h1>
                    <input type="text" value={formData.secpNumber} name="secpNumber" placeholder="Enter SECP Number" onChange={handleInputChange} />
                </label>
                {formErrors.secpNumber && <p className="error-message">{formErrors.secpNumber}</p>}

                <button type="submit" className="submit-btn">Submit</button>
            </form>
            {modal.visible && (
                <div className={`modal-content ${modal.color}`}>
                    {modal.message}
                </div>
            )}
        </div>


    );


};

export default VendorRegistration;
