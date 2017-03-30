import { ref } from "./fb";

export default async key => {
  const categories = await ref.child(key).once("value");
  return categories.val();
};
