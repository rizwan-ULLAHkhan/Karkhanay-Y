import React, { useState } from 'react';
import '../dropdown/homepagedropdown.css'

type Subcategory = {
  name: string;
};

type Category = {
  name: string;
  subcategories: Subcategory[];
};

const categories: Category[] = [
  {
    name: 'Agriculture',
    subcategories: [
      { name: 'Tractors' },
      { name: 'Harvesters' },
      { name: 'Planters' },
      { name: 'Irrigation Equipment' },
    ],
  },
  {
    name: 'Engineering',
    subcategories: [
      { name: 'Electrical' },
      { name: 'Mechanical' },
      { name: 'Civil' },
      { name: 'Chemical' },
    ],
  },
  {
    name: 'Fisheries & Seafood',
    subcategories: [
      { name: 'Aquaculture' },
      { name: 'Fishing Gear' },
      { name: 'Fish Processing' },
      { name: 'Seafood Markets' },
    ],
  },
  {
    name: 'Furniture & Handicrafts',
    subcategories: [
      { name: 'Chairs' },
      { name: 'Tables' },
      { name: 'Decorative Items' },
      { name: 'Handmade Crafts' },
    ],
  },
  {
    name: 'Gems & Jewellery',
    subcategories: [
      { name: 'Rings' },
      { name: 'Necklaces' },
      { name: 'Bracelets' },
      { name: 'Earrings' },
    ],
  },
  {
    name: 'Leather',
    subcategories: [
      { name: 'Bags' },
      { name: 'Shoes' },
      { name: 'Belts' },
      { name: 'Jackets' },
    ],
  },
  {
    name: 'Meat & Poultry',
    subcategories: [
      { name: 'Chicken' },
      { name: 'Beef' },
      { name: 'Pork' },
      { name: 'Turkey' },
    ],
  },
  {
    name: 'Personal Care & Pharma',
    subcategories: [
      { name: 'Skincare' },
      { name: 'Supplements' },
      { name: 'Medications' },
      { name: 'Wellness Products' },
    ],
  },
  {
    name: 'Sports Wear & Goods',
    subcategories: [
      { name: 'Athletic Clothing' },
      { name: 'Gym Equipment' },
      { name: 'Sporting Accessories' },
      { name: 'Outdoor Recreation' },
    ],
  },
  {
    name: 'Textiles',
    subcategories: [
      { name: 'Fabrics' },
      { name: 'Yarn' },
      { name: 'Threads' },
      { name: 'Textile Machinery' },
    ],
  },
];

const DropdownMenu = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const handleMouseOver = (categoryName: string) => {
    setActiveCategory(categoryName);
  };

  const handleMouseOut = () => {
    setActiveCategory(null);
  };

  return (
    <div className="dropdown" onMouseLeave={handleMouseOut}>
      <button className="dropdown-button">Product Categories</button>
      <div className="dropdown-content">
        {categories.map((category) => (
          <div
            key={category.name}
            className="dropdown-item"
            onMouseOver={() => handleMouseOver(category.name)}
            onMouseOut={handleMouseOut}
          >
            <a href="#">{category.name}</a>
            {activeCategory === category.name && (
              <div className="sub-dropdown-content">
                {category.subcategories.map((subcat) => (
                  <a href="#" key={subcat.name}>
                    {subcat.name}
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DropdownMenu;
