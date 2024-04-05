import React from 'react';
import './Categorycard.css'; // Make sure to create a CSS file for styling

// Define a type for the category object
type Category = {
  name: string;
  imageUrl: string;
};

const categories: Category[] = [
  { name: 'textiles', imageUrl: '/categorycard/textilee.jpg' },
  { name: 'agriculture', imageUrl: '/categorycard/agriculture.jpg' },
  { name: 'leather', imageUrl: '/categorycard/leather.jpg' },
  { name: 'engineering', imageUrl: '/categorycard/engineering.jpg' },
  { name: 'gems & jewellery', imageUrl: '/categorycard/gems and jewelry.jpg' },
];

const CategoryCard: React.FC = () => {
  return (
    <div className="category-container my-10">
      {categories.map((category) => (
        <div className="category-card" key={category.name}>
          <img src={category.imageUrl} alt={category.name} />
          <div className="category-label">{category.name}</div>
        </div>
      ))}
    </div>
  );
};

export default CategoryCard;


