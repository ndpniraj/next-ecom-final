import { Document, Model, ObjectId, Schema, model, models } from "mongoose";

interface HistoryDocument extends Document {
  owner: ObjectId;
  items: { product: ObjectId; date: Date }[];
}

const historySchema = new Schema<HistoryDocument>({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      date: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
});

// for new user - first the history will be new
// for old users - there will history for same product so now we just want to update time
// for old users - there will history but the product can be new so we need to update time and product
export const updateOrCreateHistory = async (
  ownerId: string,
  productId: string
) => {
  const history = await HistoryModel.findOneAndUpdate(
    {
      owner: ownerId,
      "items.product": productId,
    },
    {
      $set: { "items.$.date": Date.now() },
    }
  );

  if (!history) {
    await HistoryModel.findOneAndUpdate(
      {
        owner: ownerId,
      },
      {
        $push: { items: { product: productId, date: Date.now() } },
      },
      {
        upsert: true,
      }
    );
  }
};

const HistoryModel = models.History || model("History", historySchema);

export default HistoryModel as Model<HistoryDocument>;
