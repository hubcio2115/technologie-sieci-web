const people = [
  {
    id: "abc",
    name: "Ala",
  },
  {
    id: "def",
    name: "Tomek",
  },
  {
    id: "ghi",
    name: "Jan",
  },
];

const parsedPeople = people.reduce(
  (acc, human) => ({
    ...acc,
    [human.id]: human,
  }),
  {},
);

console.log(parsedPeople);
