const wishlist = [
  {
    name: "Czajnik",
    netto: 100,
  },
  {
    name: "Lodówka",
    netto: 1300,
  },
  {
    name: "Mikrofalówka",
    netto: 340,
  },
  {
    name: "Mikser",
    netto: 120,
  },
  {
    name: "Piekarnik",
    netto: 2100,
  },
];
type Wishlist = typeof wishlist;

function toString(
  wishlist: Wishlist,
  transformFunc: (x: Wishlist[number]) => string,
) {
  return wishlist.reduce((acc, item) => {
    return acc + transformFunc(item);
  }, "");
}

console.log(toString(wishlist, ({ name, netto }) => `${name} -> ${netto}\n`));
