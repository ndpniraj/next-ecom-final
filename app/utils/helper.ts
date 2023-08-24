import { getCloudConfig, getCloudSignature } from "../(admin)/products/action";

export const uploadImage = async (file: File) => {
  const { signature, timestamp } = await getCloudSignature();
  const cloudConfig = await getCloudConfig();

  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", cloudConfig.key);
  formData.append("signature", signature);
  formData.append("timestamp", timestamp.toString());

  const endpoint = `https://api.cloudinary.com/v1_1/${cloudConfig.name}/image/upload`;

  const res = await fetch(endpoint, {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  return { url: data.secure_url, id: data.public_id };
};

export const formatPrice = (amount: number) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
  });

  return formatter.format(amount);
};

export const extractPublicId = (url: string) => {
  const splittedData = url.split("/");
  const lastItem = splittedData[splittedData.length - 1];

  return lastItem.split(".")[0];
};
