export default {
    name: 'productImage',
    title: 'Product Image',
    type: 'document',
    fields: [
      {
        name: 'image',
        title: 'Image',
        type: 'image',
        options: {
          hotspot: true
        }
      },
      {
        name: 'description',
        title: 'Description',
        type: 'string'
      }
    ]
  };
  