"use client";
import { PencilIcon } from "@heroicons/react/24/solid";
import { PlusIcon } from "@heroicons/react/24/outline";
import {
  Typography,
  CardBody,
  CardFooter,
  Avatar,
  IconButton,
  Button,
} from "@material-tailwind/react";
import truncate from "truncate";
import { useRouter } from "next/navigation";
import Link from "next/link";
import SearchForm from "@components/SearchForm";

export interface Product {
  id: string;
  title: string;
  thumbnail: string;
  description: string;
  price: {
    mrp: number;
    salePrice: number;
    saleOff: number;
  };
  category: string;
  quantity: number;
}

const formatPrice = (amount: number) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
  });

  return formatter.format(amount);
};

const TABLE_HEAD = [
  "Product",
  "MRP",
  "Sale Price",
  "Quantity",
  "Category",
  "Edit",
];

interface Props {
  products: Product[];
  currentPageNo: number;
  hasMore?: boolean;
  showPageNavigator?: boolean;
}

export default function ProductTable(props: Props) {
  const router = useRouter();
  const {
    products = [],
    currentPageNo,
    hasMore,
    showPageNavigator = true,
  } = props;

  const handleOnPrevPress = () => {
    const prevPage = currentPageNo - 1;
    if (prevPage > 0) router.push(`/products?page=${prevPage}`);
  };

  const handleOnNextPress = () => {
    const nextPage = currentPageNo + 1;
    router.push(`/products?page=${nextPage}`);
  };

  return (
    <div className="py-5">
      <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
        <div>
          <Typography variant="h5" color="blue-gray">
            Products
          </Typography>
        </div>
        <div className="flex w-full shrink-0 gap-2 md:w-max">
          <SearchForm submitTo="/products/search?query=" />
          <Link
            href="/products/create"
            className="select-none font-bold text-center uppercase transition-all text-xs py-2 px-4 rounded-lg bg-blue-500 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none flex items-center gap-3"
          >
            <PlusIcon strokeWidth={2} className="h-4 w-4" />{" "}
            <span>Add New</span>
          </Link>
        </div>
      </div>
      <CardBody className="px-0">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.map((item, index) => {
              const { id, thumbnail, title, price, quantity, category } = item;
              const isLast = index === products.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={id}>
                  <td className={classes}>
                    <div className="flex items-center gap-3">
                      <Avatar
                        src={thumbnail}
                        alt={title}
                        size="md"
                        variant="rounded"
                      />
                      <Link href={`/${title}/${id}`}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-bold"
                        >
                          {truncate(title, 30)}
                        </Typography>
                      </Link>
                    </div>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {formatPrice(price.mrp)}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {formatPrice(price.salePrice)}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <div className="w-max">
                      <Typography variant="small" color="blue-gray">
                        {quantity}
                      </Typography>
                    </div>
                  </td>
                  <td className={classes}>
                    <div className="w-max">
                      <Typography variant="small" color="blue-gray">
                        {category}
                      </Typography>
                    </div>
                  </td>
                  <td className={classes}>
                    <Link href={`/products/update/${id}`}>
                      <IconButton variant="text" color="blue-gray">
                        <PencilIcon className="h-4 w-4" />
                      </IconButton>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardBody>
      {showPageNavigator ? (
        <CardFooter className="flex items-center justify-center border-t border-blue-gray-50 p-4">
          <div className="flex items-center gap-2">
            <Button
              disabled={currentPageNo === 1}
              onClick={handleOnPrevPress}
              variant="text"
            >
              Previous
            </Button>
            <Button
              disabled={!hasMore}
              onClick={handleOnNextPress}
              variant="text"
            >
              Next
            </Button>
          </div>
        </CardFooter>
      ) : null}
    </div>
  );
}
