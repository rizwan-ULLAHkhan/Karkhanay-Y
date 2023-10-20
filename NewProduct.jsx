'use client'
import { useState, useRef } from 'react';
import { Sclient } from '@/app/sanityclientsetup'
import { useSession } from 'next-auth/react';


export default function NewProduct() {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productQuantity, setProductQuantity] = useState('');
  const [productImages, setProductImages] = useState([]);
  const [notification, setNotification] = useState({ visible: false, message: '' });
  const [modal, setModal] = useState({ visible: false, message: '' });
  const fileInputRef = useRef(null);
  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [inStock, setInStock] = useState(true);
  const [productCategory, setProductCategory] = useState('');

  
  const { data: session } = useSession();
  const userEmail = session?.user?.email;
  console.log(userEmail)

  const categories = [
    "Sports Items",
    "Medical Supplies",
    "Minerals",
    "Agricultural",
  ];





  const validateForm = () => {
    let errors = {};

    if (!productName.trim()) errors.name = "Product Name is required.";
    if (!productDescription.trim()) errors.description = "Description is required.";
    if (!productPrice || productPrice <= 0) errors.price = "Please enter a valid price.";
    if (!productQuantity || productQuantity <= 0) errors.quantity = "Please enter a valid quantity.";
    if (productImages.length === 0) errors.images = "At least one image is required.";
    if (!productCategory) errors.category = "Product Category is required.";


    return errors;
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setProductImages(prevImages => [...prevImages, ...files]);
  };



  const baseImageUrl = 'https://cdn.sanity.io/images';

  const constructImageUrl = async (refId) => {

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

  const addOrUpdateCategory = async () => {
    try {
      console.log("hello poineer")
      // Make a request to check if the category exists in C-collection
      const response = await fetch('/api/checkAndUpdateCategory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ category }), // send the category to the API route
      });

      if (!response.ok) {
        console.error(`Error adding or updating category : ${response.status} - ${response.statusText}`);
        return
      }
    } catch (error) {
      console.error("Error with add or update category process:", error);
      return
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    await addOrUpdateCategory(productCategory);



    // if (productImages.length === 0) {
    //   setNotification({ visible: true, message: 'Please select an image first.' });
    //   setTimeout(() => {
    //     setNotification({ visible: false, message: '' });
    //   }, 2000);
    //   return;
    // }

    // let errors = validateForm();
    // if (Object.keys(errors).length > 0) {
    //   setFormErrors(errors);
    //   return;
    // }

    // setIsLoading(true)

    // // Upload image(s) to Sanity
    // console.log(productImages, "checking")
    // let imageReferences = [];

    // for (let image of productImages) {
    //   // 1. Upload the image asset
    //   try {
    //     const uploadedImageAsset = await Sclient.assets.upload('image', image);

    //     // 2. Create imageData with _id from uploaded asset
    //     const imageData = {
    //       _type: 'productImage',
    //       image: {
    //         _type: 'image',
    //         asset: {
    //           _ref: uploadedImageAsset._id,
    //           _type: 'reference'
    //         }
    //       },
    //       description: `${productDescription}`
    //     };

    //     // 3. Create the productImage document
    //     const createdImageDoc = await Sclient.create(imageData);
    //     if (!createdImageDoc || !createdImageDoc._id) {
    //       setIsLoading(false);
    //       throw new Error("Failed to create the image document or received an unexpected response from Sanity.");
    //     }
    //     imageReferences.push({ _ref: createdImageDoc._id, _type: 'reference' });
    //     console.log(imageReferences, 'check')
    //   }
    //   catch (error) {
    //     console.error("Error uploading image:", error); // For developer to see
    //   }
    // }

    // // 3. Check if imageReferences is populated
    // if (imageReferences.length === 0) {
    //   setModal({ visible: true, message: 'Unable to process the image. Please try again.', color: 'text-red-500' });
    //   setTimeout(() => {
    //     setModal({ visible: false, message: '' });
    //   }, 3000);
    //   return;
    // }


    // const imageUrls = [];
    // for (let imageRef of imageReferences) {
    //   console.log(imageRef._ref)
    //   const url = await constructImageUrl(imageRef._ref);

    //   if (url) {
    //     imageUrls.push(url);
    //   }
    // }
    // console.log(imageUrls, 'URLs of uploaded images');






    // const productData = {
    //   userEmail: userEmail,
    //   name: productName,
    //   description: productDescription,
    //   price: productPrice,
    //   quantity: productQuantity,
    //   urls: imageUrls,
    //   imageReferences: imageReferences,
    //   inStock: inStock,
    //   category: productCategory,
    //   is_trending: true,
    // };

    // try {
    //   const response = await fetch('/api/newproduct', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(productData),
    //   });

    //   if (!response.ok) {
    //     setIsLoading(false);
    //     console.error(`Error : ${response.status} - ${response.statusText}`);
    //     // handle the error, maybe set an error state or show a notification to the user
    //     return;
    //   }
    // } catch (error) {
    //   setIsLoading(false);
    //   console.error("Error submitting product:", error);
    //   alert('An error occurred. Please try again.');
    // }

    // setIsLoading(false);
    // setModal({
    //   visible: true,
    //   message: 'Data uploaded successfully!',
    //   color: 'text-green-500'
    // });

    // setTimeout(() => {
    //   setModal({ visible: false, message: '' });
    // }, 3000);

    // setProductImages([]);
    // if (fileInputRef.current) {
    //   fileInputRef.current.value = "";
    // }


  };


  return (
    <div>
      <h2 className="text-xl mb-4">Add New Product</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="productName" className="block mb-2">Product Name</label>
          <input
            type="text"
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="border w-full p-2 rounded"
          />
          {formErrors.name && <p className="text-red-500">{formErrors.name}</p>}
        </div>
        <div>
          <label htmlFor="productCategory" className="block mb-2">Category</label>
          <select
            id="productCategory"
            value={productCategory}
            onChange={(e) => setProductCategory(e.target.value)}
            className="border w-full p-2 rounded"
          >
            <option value="">Select a category</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          {formErrors.category && <p className="text-red-500">{formErrors.category}</p>} {/* Display the error message if not selected */}
        </div>

        <div>
          <label htmlFor="productDesc" className="block mb-2 ">Description</label>
          <textarea
            id="productDesc"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            className="border w-full p-2 rounded"
            rows="5"
          ></textarea>
          {formErrors.description && <p className="text-red-500">{formErrors.description}</p>}
        </div>
        <div>
          <label htmlFor="productPrice" className="block mb-2">Price</label>
          <input
            type="number"
            id="productPrice"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            className="border w-full p-2 rounded"
          />
          {formErrors.price && <p className="text-red-500">{formErrors.price}</p>}
        </div>
        <div>
          <label htmlFor="productQuantity" className="block mb-2">Quantity</label>
          <input
            type="number"
            id="productQuantity"
            value={productQuantity}
            onChange={(e) => setProductQuantity(e.target.value)}
            className="border w-full p-2 rounded"
          />
          {formErrors.quantity && <p className="text-red-500">{formErrors.quantity}</p>}
        </div>
        <div>
          <label className="block mb-2">Product Images</label>
          <input
            type="file"
            ref={fileInputRef}
            multiple
            onChange={handleImageChange}
            className="border p-2 rounded w-full"
          />
          <ul className="mt-2 space-y-2">
            {productImages.map((file, index) => (
              <li key={index} className="flex justify-between items-center">
                <span>{file.name}</span>
                <button
                  onClick={() => {
                    console.log('Before removal:', productImages); // Before removal
                    setProductImages(prev => {
                      const updated = prev.filter((_, i) => i !== index);
                      console.log('After removal:', updated); // After removal
                      return updated;
                    });
                  }}
                  className="text-red-500"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
        {notification.visible && (
          <div className="notification text-red-500">
            {notification.message}
          </div>
        )}
        {modal.visible && (
          <div className={`modal-content ${modal.color} `}>
            <p>{modal.message}</p>
          </div>
        )}
        {isLoading && <div className="loader">Loading...</div>}

        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">List Product</button>
      </form>
    </div>
  );
}














// const fetchImageData = async () => {
//   try {
//     const imageData = await client.fetch(`*[_id == "${imageReferences}"].image.url`);

//     console.log(imageData)
//     return imageData

//   } catch (error) {
//     console.error('Error fetching image:', error);
//   }
// }

// useEffect(() => {
//   (async () => {
//     const url = await fetchImageData();
//     console.log(url,'url')
//   })();
// }, []);