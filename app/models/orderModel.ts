import {
  Document,
  Model,
  ObjectId,
  Schema,
  Types,
  model,
  models,
} from "mongoose";

interface OrderDocument extends Document {
  userId: ObjectId;
  stripeCustomerId: string;
  paymentIntent: string;
  totalAmount: number;
  shippingDetails: {
    address: {
      city: string;
      country: string;
      line1: string;
      line2?: string | null;
      postal_code: string;
      state: string;
    };
    email: string;
    name: string;
  };
  paymentStatus: string;
  deliveryStatus: "delivered" | "ordered" | "shipped";
  orderItems: {
    id: string;
    title: string;
    thumbnail: string;
    totalPrice: number;
    price: number;
    qty: number;
  }[];
  createdAt: Date;
}

const orderSchema = new Schema<OrderDocument>(
  {
    userId: { type: Types.ObjectId, ref: "User", required: true },
    stripeCustomerId: { type: String, required: true },
    paymentIntent: { type: String, required: true },
    totalAmount: { type: Number, required: true },
    shippingDetails: {
      address: {
        city: { type: String, required: true },
        country: { type: String, required: true },
        line1: { type: String, required: true },
        line2: { type: String, default: null },
        postal_code: { type: String, required: true },
        state: { type: String, required: true },
      },
      email: { type: String, required: true },
      name: { type: String, required: true },
    },
    paymentStatus: { type: String, required: true },
    deliveryStatus: {
      type: String,
      enum: ["delivered", "ordered", "shipped"],
      default: "ordered",
    },
    orderItems: [
      {
        id: { type: String, required: true },
        title: { type: String, required: true },
        thumbnail: { type: String, required: true },
        totalPrice: { type: Number, required: true },
        price: { type: Number, required: true },
        qty: { type: Number, required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const OrderModel = models.Order || model("Order", orderSchema);
export default OrderModel as Model<OrderDocument>;
