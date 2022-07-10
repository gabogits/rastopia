import { gql, useMutation } from "@apollo/client";
const UPLOAD_IMAGE_TO_CLOUDINARY = gql`
  mutation UploadImageToCloudinary(
    $file: String!
    $uploadOptions: UploadOptionsInput
  ) {
    uploadImage(file: $file, uploadOptions: $uploadOptions) {
      public_id
      url
      tags {
        tag_name
      }
    }
  }
`;
const useFileUploadCloudinary = () => {
  const [uploadImage] = useMutation(UPLOAD_IMAGE_TO_CLOUDINARY);
  const onSubmitImage = async (files, name, getDataImg) => {
    if (files.length > 0) {
      let urls = [];
      let counter = 0;

      for await (const file of files) {
        const reader = new FileReader();
        reader.addEventListener("load", async () => {
          const { data } = await uploadImage({
            variables: {
              file: reader.result,
              uploadOptions: {
                public_id: name + Math.floor(Math.random() * 100),
              },
            },
          });
          urls.push({ photo: data.uploadImage.public_id });
          counter = counter + 1;
          if (counter === files.length) {
            return getDataImg(urls);
          }
        });
        reader.readAsDataURL(file);
      }
    } else {
      return getDataImg(null);
    }
  };

  return onSubmitImage;
};

export default useFileUploadCloudinary;
