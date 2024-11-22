'use client';
import React, { useState } from 'react';
import axios from 'axios';

type Option = {
  name: string;
  values: string;
};

type Variant = {
  title: string;
  price: number;
  sku: string;
  inventoryQty: number;
};

type Image = {
  url: string;
};

const ProductForm = () => {
  const [product, setProduct] = useState({
    title: '',
    bodyHtml: '',
    vendor: '',
    productType: '',
    tags: '',
    options: [{ name: '', values: '' }] as Option[],
    variants: [{ title: '', price: 0, sku: '', inventoryQty: 0 }] as Variant[],
    images: [{ url: '' }] as Image[],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof typeof product) => {
    const { value } = e.target;
    setProduct((prevState) => ({ ...prevState, [field]: value }));
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>, field: keyof typeof product) => {
    const { value } = e.target;
    setProduct((prevState) => ({ ...prevState, [field]: value }));
  };

  const handleOptionsChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    field: keyof Option
  ) => {
    const newOptions = [...product.options];
    newOptions[index][field] = e.target.value;
    setProduct((prevState) => ({ ...prevState, options: newOptions }));
  };

  const handleVariantsChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    field: keyof Variant
  ) => {
    const newVariants = [...product.variants];

    if (field === 'price' || field === 'inventoryQty') {
      newVariants[index][field] = parseFloat(e.target.value) || 0;
    } else {
      newVariants[index][field] = e.target.value;
    }

    setProduct((prevState) => ({ ...prevState, variants: newVariants }));
  };

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newImages = [...product.images];
    newImages[index].url = e.target.value;
    setProduct((prevState) => ({ ...prevState, images: newImages }));
  };

  const addOption = () => {
    setProduct((prevState) => ({
      ...prevState,
      options: [...prevState.options, { name: '', values: '' }],
    }));
  };

  const addVariant = () => {
    setProduct((prevState) => ({
      ...prevState,
      variants: [...prevState.variants, { title: '', price: 0, sku: '', inventoryQty: 0 }],
    }));
  };

  const addImage = () => {
    setProduct((prevState) => ({
      ...prevState,
      images: [...prevState.images, { url: '' }],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await axios.get('/api/sellerId');
    const { sellerId }: { sellerId: string } = res.data;
    try {
      const response = await axios.post('/api/productCreation', { ...product, sellerId });
      console.log('Product created successfully:', response.data);
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-700">Create Product</h2>

      <div>
        <label className="block text-gray-600">Title</label>
        <input
          type="text"
          value={product.title}
          onChange={(e) => handleInputChange(e, 'title')}
          className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-gray-600">Body HTML</label>
        <textarea
          value={product.bodyHtml}
          onChange={(e) => handleTextareaChange(e, 'bodyHtml')}
          className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-gray-600">Vendor</label>
        <input
          type="text"
          value={product.vendor}
          onChange={(e) => handleInputChange(e, 'vendor')}
          className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-gray-600">Product Type</label>
        <input
          type="text"
          value={product.productType}
          onChange={(e) => handleInputChange(e, 'productType')}
          className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-gray-600">Tags</label>
        <input
          type="text"
          value={product.tags}
          onChange={(e) => handleInputChange(e, 'tags')}
          className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* <div>
        <label className="block text-gray-600">Seller ID</label>
        <input
          type="text"
          value={product.sellerId}
          onChange={(e) => handleInputChange(e, 'sellerId')}
          className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div> */}

      {/* Options Section */}
      <div>
        <label className="block text-gray-600">Options</label>
        {product.options.map((option, index) => (
          <div key={index} className="flex space-x-4 mb-4">
            <input
              type="text"
              value={option.name}
              onChange={(e) => handleOptionsChange(e, index, 'name')}
              placeholder="Option name"
              className="w-1/2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              value={option.values}
              onChange={(e) => handleOptionsChange(e, index, 'values')}
              placeholder="Option values (comma separated)"
              className="w-1/2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addOption}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
        >
          Add Option
        </button>
      </div>

      {/* Variants Section */}
      <div>
        <label className="block text-gray-600">Variants</label>
        {product.variants.map((variant, index) => (
          <div key={index} className="flex space-x-4 mb-4">
            <input
              type="text"
              value={variant.title}
              onChange={(e) => handleVariantsChange(e, index, 'title')}
              placeholder="Variant title"
              className="w-1/4 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="number"
              value={variant.price}
              onChange={(e) => handleVariantsChange(e, index, 'price')}
              style={{
                WebkitAppearance: 'none', 
                MozAppearance: 'textfield', 
              }}
              placeholder="Price"
              className="w-1/4 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              value={variant.sku}
              onChange={(e) => handleVariantsChange(e, index, 'sku')}
              placeholder="SKU"
              className="w-1/4 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              value={variant.inventoryQty}
              onChange={(e) => handleVariantsChange(e, index, 'inventoryQty')}
              style={{
                WebkitAppearance: 'none', 
                MozAppearance: 'textfield', 
              }}
              placeholder="Inventory Qty"
              className="w-1/4 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addVariant}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
        >
          Add Variant
        </button>
      </div>

      {/* Images Section */}
      <div>
        <label className="block text-gray-600">Images</label>
        {product.images.map((image, index) => (
          <div key={index} className="flex space-x-4 mb-4">
            <input
              type="text"
              value={image.url}
              onChange={(e) => handleImagesChange(e, index)}
              placeholder="Image URL"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addImage}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
        >
          Add Image
        </button>
      </div>

      <button
        type="submit"
        className="w-full px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200"
      >
        Submit
      </button>
    </form>
  );
};

export default ProductForm;
