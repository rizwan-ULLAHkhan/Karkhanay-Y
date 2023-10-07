'use client'
import { useState, useRef } from 'react';
import { createClient } from '@sanity/client';

// Setup the Sanity client
export const client = createClient({
  projectId: 'u8znbhbc',
  dataset: 'production',
  useCdn: false, // set to `false` to bypass the edge cache
  apiVersion: '2023-07-10', // use current date (YYYY-MM-DD) to target the latest API version
  token: 'skHhghHJ3cbVYlQYdKF89AjHXiUgjIGmbkS5vBWK4r3ktAkzkZQwbmgKOr7hW5aa42nWR9lHDjzaZjk8Yxu9YEsmTo633JyOMvExjDHbgMd13MEfLvEVOO7tjgMZBboivz5JgGZglqJFmZ3dzujXp8ViBssw9skOchHikSnPLzITR0mEjRve' // Only if you want to update content with the client
})

export default function NewProduct() {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productQuantity, setProductQuantity] = useState('');
  const [productImages, setProductImages] = useState([]);
  const fileInputRef = useRef(null); 







  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setProductImages(prevImages => [...prevImages, ...files]);
  };

  const fetchImageData = async (refId) => {
    try {
      const query = `*[_id == "${refId}"].image.url`;
      const result = await client.fetch(query);
      console.log(result)
      return result;
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  }



  const handleSubmit = async (e) => {
    e.preventDefault();

    // Upload image(s) to Sanity
    console.log(productImages, "checking")
    let imageReferences = [];
for (let image of productImages) {
    // 1. Upload the image asset
    const uploadedImageAsset = await client.assets.upload('image', image);
    
    // 2. Create imageData with _id from uploaded asset
    const imageData = {
        _type: 'productImage',
        image: {
            _type: 'image',
            asset: {
                _ref: uploadedImageAsset._id,
                _type: 'reference'
            }
        },
        description: `${productDescription}`
    };
    
    // 3. Create the productImage document
    const createdImageDoc = await client.create(imageData);
    imageReferences.push({ _ref: createdImageDoc._id, _type: 'reference' });
    console.log(imageReferences, 'check')
}



    const imageUrls = [];
    for (let imageRef of imageReferences) {
      const url = await fetchImageData(imageRef._ref);
      if (url) {
        imageUrls.push(url);
      }
    }
    console.log(imageUrls, 'URLs of uploaded images');






    const productData = {
      name: productName,
      description: productDescription,
      price: productPrice,
      quantity: productQuantity
    };

    try {
      const response = await fetch('/api/newproduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        console.error(`Error : ${response.status} - ${response.statusText}`);
        // handle the error, maybe set an error state or show a notification to the user
        return;
      }
    } catch (error) {
      console.error("Error submitting product:", error);
      alert('An error occurred. Please try again.');
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
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
        </div>
        <div>
          <label htmlFor="productDesc" className="block mb-2">Description</label>
          <textarea
            id="productDesc"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            className="border w-full p-2 rounded"
            rows="5"
          ></textarea>
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