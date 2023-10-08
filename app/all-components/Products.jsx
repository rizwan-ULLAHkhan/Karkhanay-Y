export default function Products({ product }) {
  return (
    <div style={{ border: '1px solid #e1e1e1', borderRadius: '5px', padding: '20px', margin: '20px 0' }}>
          <h3 style={{ borderBottom: '1px solid #e1e1e1', paddingBottom: '10px' }}>{product.name}</h3>
          <div style={{ margin: '10px 0' }}>
            <strong>Description:</strong>
            <p>{product.description}</p>
          </div>
          <div style={{ margin: '10px 0' }}>
            <strong>Price:</strong> {product.price}
          </div>
          <div style={{ margin: '10px 0' }}>
            <strong>Quantity:</strong> {product.quantity}
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            {product.urls && product.urls.length > 0 ? product.urls.map((url, index) => (
              <img key={index} src={url} alt={`Product Image ${index + 1}`} style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '5px' }} />
            )) : null}
          </div>
      </div>
  );
}
