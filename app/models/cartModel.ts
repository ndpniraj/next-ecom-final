import { Document, Model, ObjectId, Schema, model, models } from "mongoose";

interface CartItem {
  productId: ObjectId;
  quantity: number;
}

interface CartDocument extends Document {
  userId: ObjectId;
  items: CartItem[];
}

const cartSchema = new Schema<CartDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, default: 1 },
      },
    ],
  },
  { timestamps: true }
);

const CartModel = models.Cart || model("Cart", cartSchema);
export default CartModel as Model<CartDocument>;
