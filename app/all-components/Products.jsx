export default function Products({ product }) {
    return (
      <div className="border p-4 mb-4 rounded">
        <h3 className="text-lg mb-2">{product.name}</h3>
  
        <div className="relative w-full h-48 mb-4">
          {product.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Image ${index + 1} for ${product.name}`}
              className={`absolute w-full h-full object-cover transition-opacity duration-300 ${index !== 0 ? 'opacity-0' : ''}`}
            />
          ))}
          {/* You can add carousel controls here */}
        </div>
  
        <div className="mb-2">
          <p className="text-sm">Price: {product.price}</p>
          <p className="text-sm">Quantity: {product.quantity}</p>
        </div>
  
        <div className="mt-2">
          <button className="mr-2 px-3 py-1 bg-blue-500 text-white rounded">Edit</button>
          <button className="px-3 py-1 bg-red-500 text-white rounded">Remove</button>
        </div>
      </div>
    );
  }
  