import { Document, Model, Schema, model, models } from "mongoose";

interface FeaturedProductDocument extends Document {
  banner: { url: string; id: string };
  title: string;
  link: string;
  linkTitle: string;
}

const featuredProductSchema = new Schema<FeaturedProductDocument>({
  banner: {
    url: { type: String, required: true },
    id: { type: String, required: true },
  },
  title: { type: String, required: true },
  link: { type: String, required: true },
  linkTitle: { type: String, required: true },
});

const FeaturedProductModel =
  models.FeaturedProduct || model("FeaturedProduct", featuredProductSchema);

export default FeaturedProductModel as Model<FeaturedProductDocument>;
