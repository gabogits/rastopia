import React, { useState, useEffect, useContext } from "react";
import Layout from "./../components/layout/Layout";
import ProductForm from "./../components/product/ProductForm";
import { gql, useMutation } from "@apollo/client";
import useFileUploadCloudinary from "../hooks/useFileUploadCloudinary";
import { useRouter } from "next/router";
import { PrivateRoute } from "./../components/routes/PrivateRoute";
import useAuth from "../context/authState";
import ProductContext from "../context/productContext";
const NEW_PRODUCT = gql`
  mutation newProduct($input: ProductInput) {
    newProduct(input: $input) {
      name
      price
      description
      discount
      sizes {
        size
      }
      genre
      created
      category
      photos {
        photo
      }
    }
  }
`;

const NewProductComponent = () => {
  const { resetCart, clearProducts } = useContext(ProductContext);
  const [newProduct] = useMutation(NEW_PRODUCT);
  const router = useRouter();
  const [loader, saveLoader] = useState(false);
  const { user } = useAuth();
  const [errorImage, setErrorImage] = useState(false);
  const initialValues = {
    name: "",
    model: "",
    description: "",
    category: "",
    genre: "",
    quantity: [],
    price: 0,
    sizes: [],
    discount: 0,
    photos: "",
  };
  const onSubmitImage = useFileUploadCloudinary();
  const submitProductAction = async (values, files) => {
    console.log(values);
    if (files.length === 0) {
      setErrorImage(true);
    } else {
      setErrorImage(false);
      saveLoader(true);
      onSubmitImage(files, values.name, async (result) => {
        try {
          values.photos = result;
          values.sizes = await values.sizes.map((item) => {
            return {
              size: item,
            };
          });
          console.log(values);

          await newProduct({
            variables: {
              input: values,
            },
          });
          resetCart();
          clearProducts();
          router.push("/");
        } catch (error) {
          saveLoader(false);
          console.log(error.message);
        }
      });
    }
  };
  useEffect(() => {
    if (user && user.role !== "admin") {
      router.push("/");
    }
  }, [user]);
  return (
    <Layout>
      <section className="form top-bottom-space">
        <div className="container">
          <div className="section-format">
            <div className="box-title">
              <h2>Nuevo producto</h2>
            </div>
            <ProductForm
              initialValues={initialValues}
              submitProductAction={submitProductAction}
              loader={loader}
              errorImage={errorImage}
            />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PrivateRoute(NewProductComponent);
