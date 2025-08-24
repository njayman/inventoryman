import React from "react";
import { useForm } from "react-hook-form";

const ProductForm = () => {
  const {} = useForm({
    defaultValues: {
      name: "",
      description: "",
    },
  });
  return <form></form>;
};

export default ProductForm;
