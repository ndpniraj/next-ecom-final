"use client";
import {
  Button,
  Input,
  Option,
  Select,
  Textarea,
} from "@material-tailwind/react";
import React, {
  useEffect,
  useState,
  useTransition,
  ChangeEventHandler,
} from "react";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import categories from "@/app/utils/categories";
import ImageSelector from "@/app/components/ImageSelector";
import { NewProductInfo } from "../types";

interface Props {
  initialValue?: InitialValue;
  onSubmit(values: NewProductInfo): void;
  onImageRemove?(source: string): void;
}

export interface InitialValue {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  images?: string[];
  bulletPoints: string[];
  mrp: number;
  salePrice: number;
  category: string;
  quantity: number;
}

const defaultValue = {
  title: "",
  description: "",
  bulletPoints: [""],
  mrp: 0,
  salePrice: 0,
  category: "",
  quantity: 0,
};

export default function ProductForm(props: Props) {
  const { onSubmit, onImageRemove, initialValue } = props;
  const [isPending, startTransition] = useTransition();
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [thumbnail, setThumbnail] = useState<File>();
  const [isForUpdate, setIsForUpdate] = useState(false);
  const [productInfo, setProductInfo] = useState({ ...defaultValue });
  const [thumbnailSource, setThumbnailSource] = useState<string[]>();
  const [productImagesSource, setProductImagesSource] = useState<string[]>();

  const fields = productInfo.bulletPoints;

  const addMoreBulletPoints = () => {
    setProductInfo({
      ...productInfo,
      bulletPoints: [...productInfo.bulletPoints, ""],
    });
  };

  const removeBulletPoint = (indexToRemove: number) => {
    const points = [...productInfo.bulletPoints];
    const filteredPoints = points.filter((_, index) => index !== indexToRemove);
    setProductInfo({
      ...productInfo,
      bulletPoints: [...filteredPoints],
    });
  };

  const updateBulletPointValue = (value: string, index: number) => {
    const oldValues = [...fields];
    oldValues[index] = value;

    setProductInfo({ ...productInfo, bulletPoints: [...oldValues] });
  };

  const removeImage = async (index: number) => {
    if (!productImagesSource) return;

    // if image is from cloud we want to remove it from cloud.
    const imageToRemove = productImagesSource[index];
    const cloudSourceUrl = "https://res.cloudinary.com";
    if (imageToRemove.startsWith(cloudSourceUrl)) {
      onImageRemove && onImageRemove(imageToRemove);
    } else {
      // if this image is from local state we want to update local state
      const fileIndexDifference =
        productImagesSource.length - imageFiles.length;
      const indexToRemove = index - fileIndexDifference;
      const newImageFiles = imageFiles.filter((_, i) => {
        if (i !== indexToRemove) return true;
      });

      setImageFiles([...newImageFiles]);
    }

    // also we want to update UI
    const newImagesSource = productImagesSource.filter((_, i) => {
      if (i !== index) return true;
    });

    setProductImagesSource([...newImagesSource]);
  };

  const getBtnTitle = () => {
    if (isForUpdate) return isPending ? "Updating" : "Update";
    return isPending ? "Creating" : "Create";
  };

  useEffect(() => {
    if (initialValue) {
      setProductInfo({ ...initialValue });
      setThumbnailSource([initialValue.thumbnail]);
      setProductImagesSource(initialValue.images);
      setIsForUpdate(true);
    }
  }, []);

  const onImagesChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const files = target.files;
    if (files) {
      const newImages = Array.from(files).map((item) => item);
      const oldImages = productImagesSource || [];
      setImageFiles([...imageFiles, ...newImages]);
      setProductImagesSource([
        ...oldImages,
        ...newImages.map((file) => URL.createObjectURL(file)),
      ]);
    }
  };

  const onThumbnailChange: ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => {
    const files = target.files;
    if (files) {
      const file = files[0];
      setThumbnail(file);
      setThumbnailSource([URL.createObjectURL(file)]);
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="mb-2 text-xl">Add new product</h1>

      <form
        action={() =>
          startTransition(async () => {
            await onSubmit({ ...productInfo, images: imageFiles, thumbnail });
          })
        }
        className="space-y-6"
      >
        <div className="space-y-4">
          <h3>Poster</h3>
          <ImageSelector
            id="thumb"
            images={thumbnailSource}
            onChange={onThumbnailChange}
          />

          <h3>Images</h3>
          <ImageSelector
            multiple
            id="images"
            images={productImagesSource}
            onRemove={removeImage}
            onChange={onImagesChange}
          />
        </div>

        <Input
          label="Title"
          value={productInfo.title}
          onChange={({ target }) =>
            setProductInfo({ ...productInfo, title: target.value })
          }
        />

        <Textarea
          className="h-52"
          label="Description"
          value={productInfo.description}
          onChange={({ target }) =>
            setProductInfo({ ...productInfo, description: target.value })
          }
        />

        <Select
          onChange={(category) => {
            if (category) setProductInfo({ ...productInfo, category });
          }}
          value={productInfo.category}
          label="Select Category"
        >
          {categories.map((c) => (
            <Option value={c} key={c}>
              {c}
            </Option>
          ))}
        </Select>

        <div className="flex space-x-4">
          <div className="space-y-4 flex-1">
            <h3>Price</h3>

            <Input
              value={productInfo.mrp}
              label="MRP"
              onChange={({ target }) => {
                const mrp = +target.value;
                setProductInfo({ ...productInfo, mrp });
              }}
              className="mb-4"
            />
            <Input
              value={productInfo.salePrice}
              label="Sale Price"
              onChange={({ target }) => {
                const salePrice = +target.value;
                setProductInfo({ ...productInfo, salePrice });
              }}
              className="mb-4"
            />
          </div>

          <div className="space-y-4 flex-1">
            <h3>Stock</h3>

            <Input
              value={productInfo.quantity}
              label="Qty"
              onChange={({ target }) => {
                const quantity = +target.value;
                if (!isNaN(quantity))
                  setProductInfo({ ...productInfo, quantity });
              }}
              className="mb-4"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3>Bullet points</h3>
          {fields.map((field, index) => (
            <div key={index} className="flex items-center">
              <Input
                type="text"
                value={field}
                label={`Bullet point ${index + 1}`}
                onChange={({ target }) =>
                  updateBulletPointValue(target.value, index)
                }
                className="mb-4"
              />
              {fields.length > 1 ? (
                <button
                  onClick={() => removeBulletPoint(index)}
                  type="button"
                  className="ml-2"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              ) : null}
            </div>
          ))}

          <button
            disabled={isPending}
            type="button"
            onClick={addMoreBulletPoints}
            className="flex items-center space-x-1 text-gray-800 ml-auto"
          >
            <PlusIcon className="w-4 h-4" />
            <span>Add more</span>
          </button>
        </div>

        <Button disabled={isPending} type="submit">
          {getBtnTitle()}
        </Button>
      </form>
    </div>
  );
}
