import { ref, auth } from "./fb";

export function observe(movieId, categoryId, fn) {
  const onval = data => fn(data.val());
  const onrem = data => {
    if (data.numChildren() > 0) fn(data.val());
    else fn(0);
  };
  const votes = ref
    .child("medias")
    .child(movieId)
    .child(categoryId)
    .limitToLast(1);
  votes.on("child_added", onval);
  votes.on("child_changed", onval);
  votes.on("child_removed", onrem);
  return () => votes.off();
}

export default (movieId, categoryId, fn) => {
  const uid = auth.currentUser.uid;
  const onval = data => {
    if (data.child(uid).exists()) fn(true);
    else fn(false);
  };
  const votes = ref
    .child("medias")
    .child(movieId)
    .child(categoryId)
    .child("votes");
  votes.on("value", onval);
  return () => votes.off("value", onval);
};
