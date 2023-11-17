import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { handleInsertProduct } from "@/lib/insertsupabase";

const FormAddProducts: React.FC = async () => {
  return (
    <form action={(formData) => handleInsertProduct(formData)}>
      <label htmlFor="productName">Name</label>
      <Input
        type="text"
        name="name"
        id="productName"
        placeholder="Name of the product"
      />
      <label htmlFor="productDescription">Description</label>
      <Input
        type="text"
        name="description"
        id="productDescription"
        placeholder="Description of the product"
      />
      <label htmlFor="productPrice">Price </label>
      <Input type="number" id="productPrice" name="price" placeholder="Price" />
      <label htmlFor="productImage">URL of the image</label>
      <Input type="file" id="productImage" name="image" />
      <button type="submit">submit</button>
    </form>
  );
};

export default FormAddProducts;
