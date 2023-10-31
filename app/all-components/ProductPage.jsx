import Image from 'next/image';
import '../styles/productpage.css'

function ProductPage({ product }) {
    return (
        <div className="product-page-container ">
            
            {/* Product Image Section */}
            <div className="product-image-section flex-wrap">
                {/* Main Image */}
                <Image 
                    src={product.mainImage} 
                    alt={product.name} 
                    layout="responsive"
                    width={500}
                    height={500}
                    className="main-product-image"
                />
                
                {/* Thumbnail Images */}
                <div className="thumbnail-images">
                    {product.thumbnails.map((thumb, index) => (
                        <Image 
                            key={index} 
                            src={thumb} 
                            alt={`Thumbnail ${index}`}
                            width={100}
                            height={100}
                            className="thumbnail"
                        />
                    ))}
                </div>
            </div>

            {/* Product Details Section */}
            <div className="product-details-section">
                <h1 className="product-title">{product.name}</h1>
                <p className="product-price">${product.price}</p>
                <p className="product-description">{product.description}</p>
                <button className="add-to-cart-btn">Add to Cart</button>
            </div>

            {/* Additional Information */}
            <div className="additional-info-section">
                <h2>Additional Information</h2>
                <p>{product.additionalInfo}</p>
            </div>

            {/* Reviews Section */}
            <div className="reviews-section">
                <h2>Customer Reviews</h2>
                {/* You can loop through and display reviews here */}
            </div>

           
        </div>
    );
}

export default ProductPage;
