'use client'
import { useSelector } from 'react-redux';
import { RootState } from '@/app/redux/store';
import { useDispatch } from 'react-redux';
import { setSelectedProduct } from '@/app/redux/features/productpage/productpageSlice'
import Link from 'next/link';


const ProductSearchPage = () => {
  const searchData = useSelector((state: RootState) => state.productSearch.results);
  const dispatch = useDispatch();
  const isDataArray = Array.isArray(searchData);
  

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center  sm:py-12">
      
      <div className="relative py-3 sm:max-w-xl sm:mx-auto mx-4">
        {isDataArray ? (
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            
            {searchData.map(product => (
              <Link href={`/pages/ProductPage/${product._id}`} key={product._id} className=" p-8 border-2 border-Kgreen rounded-2xl shadow-md hover:bg-lime-50 transition bg-white mt-3" onClick={() => dispatch(setSelectedProduct(product))}>
              <div key={product._id} className="bg-white p-4 rounded shadow-lg relative overflow-hidden">
                {product.imageReferences[0] && (
                  <img
                    src={product.urls[0] || ''}
                    alt={product.name}
                    className="w-full h-48 object-cover mb-4 rounded"
                  />
                )}
                <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                <p className="text-gray-700 truncate">{product.description}</p>
                <p className="text-gray-700 truncate">{product.category}</p>
                <div className="mt-4">
                  <span className="text-indigo-600 font-bold">${product.price}</span>
                </div>
                {!product.inStock && (
                  <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">Out of Stock</span>
                )}
              </div>
              </Link>
            ))}
            
          </div>
          
        ) : (
          <div className="flex items-center justify-center h-64">
            <p className="text-xl text-center text-gray-500">{searchData.message}</p>
          </div>
        )}
      </div>
      
    </div>
  );
};

export default ProductSearchPage;
