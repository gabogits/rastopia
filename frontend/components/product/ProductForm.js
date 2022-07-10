import React, { useState, useEffect } from "react";
import { Formik, FieldArray } from "formik";
import * as Yup from "yup";
import TextareaAutosize from "react-autosize-textarea";
import Error from "../../components/templates/Error";
import Loader from "../../components/templates/Loader";
import { useDropzone } from "react-dropzone";
import { CloudinaryContext, Image, Transformation } from "cloudinary-react";
import { CATEGORIES } from "../../constants";
import { of } from "zen-observable";

let sizesFilter = [
  { value: "XS", status: false },
  { value: "S", status: false },
  { value: "M", status: false },
  { value: "L", status: false },
  { value: "XL", status: false },
];

const ProductForm = ({
  initialValues,
  submitProductAction,
  loader,
  errorImage,
  uploadedPhotos,
  editForm,
  removeProduct,
}) => {
  const [checkValues, checkValuesSave] = useState(sizesFilter);
  const [fileToUpload, setFileToUpload] = useState([]);
  const [filePreview, setFilePreview] = useState([]);
  const [oneSize, setOneSize] = useState(false);
  const maxSize = 1048576;

  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    onDrop,
    accept: "image/*",
    minSize: 0,
    maxSize,
  });

  function onDrop(files) {
    setFileToUpload([...files]);
  }

  const onChangeValueChecks = (e) => {
    console.log("e.target.value", e.target.value);
    let setCheck;

    setCheck = sizesFilter.map((check) => {
      if (check.value === e.target.value) {
        check.status = e.target.checked;
        return check;
      }
      return check;
    });

    checkValuesSave(setCheck);
  };

  const schemaValidation = Yup.object({
    name: Yup.string().required("El nombre del producto es obligatorio"),
    model: Yup.string().required("El nombre del modelo es obligatorio"),
    category: Yup.string().required("La categoria es obligatoria"),
    genre: Yup.string().required("El genero es obligatorio"),
    quantity: Yup.array().required("Agrega la cantidad disponible"),
    price: Yup.number()
      .required("El precio es obligatorio")
      .positive("No se aceptar numeros negativos"),
    sizes: Yup.array().required("Debes agregar al menos una talla"),
  });
  useEffect(() => {
    let checksInit = sizesFilter.map((check) => {
      check.status = false;
      return check;
    });
    checkValuesSave(checksInit);
    if (initialValues.sizes) {
      let setCheck;
      const oneSize = initialValues.sizes.findIndex((item) => item === "OS");
      if (oneSize >= 0) {
        setOneSize(true);
      } else {
        initialValues.sizes.forEach((item) => {
          setCheck = sizesFilter.map((check) => {
            if (check.value === item) {
              check.status = true;
              return check;
            }
            return check;
          });
          checkValuesSave(setCheck);
        });
      }
    }
  }, []);

  useEffect(() => {
    let previewsImage = [];
    acceptedFiles.forEach((file) => {
      const obj = { preview: URL.createObjectURL(file) };
      previewsImage.push(obj);
    });

    setFilePreview([...previewsImage]);
    // eslint-disable-next-line
  }, [acceptedFiles]);

  return (
    <div className="new-content">
      <div className="new-content-form">
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={schemaValidation}
          onSubmit={(values) => {
            submitProductAction(values, fileToUpload);
          }}
        >
          {(props) => {
            const values = props.values;
            console.log(values);
            return (
              <form onSubmit={props.handleSubmit}>
                <div className="field">
                  <label>Nombre</label>

                  <input
                    type="text"
                    className="u-full-width"
                    placeholder="Nombre de producto"
                    name="name"
                    onChange={props.handleChange}
                    value={props.values.name}
                  />
                  {props.touched.name && props.errors.name && (
                    <Error msg={props.errors.name}></Error>
                  )}
                </div>
                <div className="field">
                  <label>Model</label>

                  <input
                    type="text"
                    className="u-full-width"
                    placeholder="Modelo de producto"
                    name="model"
                    onChange={props.handleChange}
                    value={props.values.model}
                  />
                  {props.touched.model && props.errors.model && (
                    <Error msg={props.errors.model}></Error>
                  )}
                </div>

                <div className="field">
                  <label>Descripción</label>
                  <TextareaAutosize
                    placeholder={`Escribe una descripción detallada acerca del producto`}
                    name="description"
                    rows={4}
                    onChange={props.handleChange}
                    value={props.values.description}
                  />
                </div>
                <div className="field">
                  <label>Categoría</label>

                  <div className="select-simple">
                    <div className="select-simple__container">
                      <select
                        name="category"
                        onChange={props.handleChange}
                        value={props.values.category}
                      >
                        <option value=""> Selecciona</option>
                        {CATEGORIES.map((item) => (
                          <option key={item.value} value={item.value}>
                            {item.value}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  {props.touched.category && props.errors.category && (
                    <Error msg={props.errors.category}></Error>
                  )}
                </div>
                <div className="field">
                  <label>Genero</label>

                  <div className="select-simple">
                    <div className="select-simple__container">
                      <select
                        name="genre"
                        onChange={props.handleChange}
                        value={props.values.genre}
                      >
                        <option value=""> Selecciona</option>
                        <option value="HOMBRE"> Hombre</option>
                        <option value="MUJER"> Mujer</option>
                      </select>
                    </div>
                  </div>
                  {props.touched.genre && props.errors.genre && (
                    <Error msg={props.errors.genre}></Error>
                  )}
                </div>

                <div className="field">
                  <label>Precio</label>

                  <input
                    type="number"
                    className="u-full-width"
                    placeholder="Precio del producto"
                    name="price"
                    onChange={props.handleChange}
                    value={props.values.price}
                  />
                  {props.touched.price && props.errors.price && (
                    <Error msg={props.errors.price}></Error>
                  )}
                </div>

                <div className="field-checks">
                  <label className="label-check">Tallas</label>

                  <ul>
                    <FieldArray
                      name="sizes"
                      render={() => (
                        <>
                          <li>
                            <label
                              className={`check-tags ${
                                values?.sizes?.findIndex((c) => c === "OS") >= 0
                                  ? "active"
                                  : ""
                              }`}
                            >
                              <strong>
                                <input
                                  name="sizes"
                                  type="checkbox"
                                  value={"OS"}
                                  checked={
                                    values?.sizes?.findIndex(
                                      (c) => c === "OS"
                                    ) >= 0
                                  }
                                  onChange={(e) => {
                                    values.sizes = [];
                                    values.quantity = [];
                                    if (e.target.checked) {
                                      setOneSize(true);
                                    } else {
                                      setOneSize(false);
                                    }
                                    props.handleChange(e);
                                    sizesFilter = sizesFilter.map((item) => ({
                                      ...item,
                                      status: false,
                                    }));
                                    checkValuesSave(sizesFilter);
                                  }}
                                />
                              </strong>
                              <span>OS (unitalla)</span>
                            </label>
                          </li>
                          {!oneSize &&
                            checkValues.map((option) => (
                              <li key={option.value}>
                                <label
                                  className={`check-tags ${
                                    option.status && "active"
                                  }`}
                                >
                                  <strong>
                                    <input
                                      name="sizes"
                                      type="checkbox"
                                      value={option.value}
                                      checked={
                                        values?.sizes?.findIndex(
                                          (c) => c === option.value
                                        ) >= 0
                                      }
                                      onChange={(e) => {
                                        onChangeValueChecks(e);
                                        props.handleChange(e);
                                      }}
                                    />
                                  </strong>
                                  <span>{option.value}</span>
                                </label>
                              </li>
                            ))}
                        </>
                      )}
                    />
                  </ul>
                  {props.touched.sizes && props.errors.sizes && (
                    <Error msg={props.errors.sizes}></Error>
                  )}
                </div>

                <FieldArray
                  name="quantity"
                  render={(arrayHelpers) => (
                    <>
                      {values.sizes.map((item, index) => (
                        <div key={item} className="field">
                          <label>Cantidad {item}</label>

                          <input
                            type="number"
                            className="u-full-width"
                            placeholder="Numero de disponibilidad"
                            name={`quantity`}
                            onChange={(e) => {
                              const exist = values.quantity.find(
                                (c) => c.size === item
                              );
                              if (exist) {
                                if (parseInt(e.target.value) > 0) {
                                  arrayHelpers.replace(index, {
                                    size: item,

                                    quantity: parseInt(e.target.value),
                                  });
                                } else {
                                  arrayHelpers.remove(index);
                                }
                              } else {
                                if (parseInt(e.target.value) > 0) {
                                  arrayHelpers.push({
                                    size: item,
                                    quantity: parseInt(e.target.value),
                                  });
                                }
                              }
                            }}
                            value={
                              values?.quantity?.find(
                                (element) => element.size === item
                              )?.quantity
                            }
                          />
                        </div>
                      ))}
                    </>
                  )}
                />
                {props.touched.quantity && props.errors.quantity && (
                  <Error msg={props.errors.quantity}></Error>
                )}
                <div className="field">
                  <label>Descuento</label>

                  <input
                    type="number"
                    className="u-full-width"
                    placeholder="Descuento de producto"
                    name="discount"
                    onChange={props.handleChange}
                    value={props.values.discount}
                  />
                </div>
                <div className="field">
                  <label>Agrega una imagen</label>
                  <div className="img-up-dashed" {...getRootProps()}>
                    <input {...getInputProps()} />
                  </div>

                  {fileToUpload.length > 0 &&
                    fileToUpload.map((acceptedFile, idx) => (
                      <li
                        key={acceptedFile.name + idx}
                        className="list-group-item list-group-item-success"
                      >
                        {acceptedFile.name}
                      </li>
                    ))}

                  {uploadedPhotos &&
                  uploadedPhotos.length > 0 &&
                  fileToUpload.length === 0 ? (
                    <>
                      {uploadedPhotos.map((item) => (
                        <div key={item.photo} className="info-img">
                          <figure>
                            <CloudinaryContext cloudName="chabelita">
                              <Image publicId={item.photo}>
                                <Transformation width="400" crop="scale" />
                              </Image>
                            </CloudinaryContext>
                          </figure>
                        </div>
                      ))}
                    </>
                  ) : (
                    <>
                      {filePreview.map((item) => (
                        <div key={item.preview} className="info-img">
                          <img src={item.preview} />
                        </div>
                      ))}
                    </>
                  )}

                  {errorImage && (
                    <Error msg={"Debes cargar al menos una fotografia"}></Error>
                  )}
                  {props.touched &&
                    Object.keys(props.errors).length !== 0 &&
                    props.errors.constructor === Object && (
                      <Error
                        msg={
                          "Revisa que todos los campos se hayan llenado correctamente"
                        }
                      ></Error>
                    )}
                </div>

                {loader ? (
                  <Loader />
                ) : (
                  <>
                    <div className="btns-block2">
                      {editForm && (
                        <div
                          className="btn-primary btn-color-1 btn-size-3"
                          onClick={removeProduct}
                        >
                          Borrar producto
                        </div>
                      )}

                      <button
                        type="submit"
                        className="btn-primary  btn-size-1 "
                        value="Publicar"
                      >
                        Publicar
                      </button>
                    </div>
                  </>
                )}
              </form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default ProductForm;
