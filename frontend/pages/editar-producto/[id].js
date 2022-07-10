import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { gql, useMutation, useQuery } from "@apollo/client";
import Layout from "./../../components/layout/Layout";
import ProductForm from "./../../components/product/ProductForm";
import ProductDelete from "./../../components/product/ProductDelete";
import useFileUploadCloudinary from "../../hooks/useFileUploadCloudinary";
import { PrivateRoute } from "./../../components/routes/PrivateRoute";
import useAuth from "../../context/authState";
import ProductContext from "../../context/productContext";
import Loader from "../../components/templates/Loader";
const GET_PRODUCT = gql`
  query ($id: ID!) {
    getProduct(id: $id) {
      id
      name
      model
      genre
      created
      category
      price
      discount
      description
      quantity
      sizes {
        size
      }
      photos {
        photo
      }
    }
  }
`;

const EDIT_PRODUCT = gql`
  mutation editProduct($id: ID!, $input: ProductUpdateInput) {
    editProduct(id: $id, input: $input) {
      id
      name
      model
      genre
      created
      category
      price
      discount
      description
      quantity
      sizes {
        size
      }
      photos {
        photo
      }
    }
  }
`;

const DELETE_PRODUCT = gql`
  mutation deleteProduct($id: ID!) {
    deleteProduct(id: $id)
  }
`;

const updateProduct = () => {
  const { resetCart, clearProducts } = useContext(ProductContext);
  const router = useRouter();
  const [loader, saveLoader] = useState(false);
  const [modalDelete, saveModalDelete] = useState(false);

  const { user } = useAuth();
  const {
    query: { id },
  } = router;

  const { data, loading, error } = useQuery(GET_PRODUCT, {
    variables: {
      id,
    },
  });

  const [editProduct] = useMutation(EDIT_PRODUCT);
  const [deleteProduct] = useMutation(DELETE_PRODUCT);
  const onSubmitImage = useFileUploadCloudinary();

  useEffect(() => {
    if (user && user.role !== "admin") {
      router.push("/");
    }
  }, [user]);
  if (loading) return <Loader />;

  if (!data) {
    return "aun no hay datos";
  }

  const submitProductAction = async (values, files) => {
    saveLoader(true);

    let {
      name,
      model,
      description,
      category,
      genre,
      quantity,
      price,
      sizes,
      discount,
      photos,
    } = values;

    onSubmitImage(files, values.name, async (result) => {
      try {
        sizes = await sizes.map((item) => {
          return {
            size: item.size ? item.size : item,
          };
        });

        photos = await photos.map((item) => {
          return {
            photo: item.photo,
          };
        });
        await editProduct({
          variables: {
            id,
            input: {
              name,
              model,
              description,
              category,
              genre,
              quantity,
              price,
              sizes,
              discount,
              photos: result !== null ? result : photos,
            },
          },
        });
        resetCart();
        clearProducts();
        router.push("/");
      } catch (error) {
        console.log(error.message);
        saveLoader(false);
      }
    });
  };
  const removeProduct = async () => {
    saveModalDelete(true);
  };

  const removeProductAction = async () => {
    saveModalDelete(false);
    saveLoader(true);
    await deleteProduct({
      variables: {
        id,
      },
    });
    resetCart();
    clearProducts();
    router.push("/");
  };
  const { getProduct } = data;
  console.log(getProduct);
  getProduct.sizes = getProduct.sizes.map((item) => item.size);
  return (
    <Layout>
      <section className="form top-bottom-space">
        <div className="container">
          <div className="section-format">
            <div className="box-title">
              <h2>Editar producto </h2>
            </div>
            <ProductForm
              initialValues={getProduct}
              submitProductAction={submitProductAction}
              loader={loader}
              uploadedPhotos={getProduct.photos}
              editForm={true}
              removeProduct={removeProduct}
            />
          </div>
        </div>

        <ProductDelete
          modalDelete={modalDelete}
          saveModalDelete={saveModalDelete}
          removeProductAction={removeProductAction}
        />
      </section>
    </Layout>
  );
};

export default PrivateRoute(updateProduct);
