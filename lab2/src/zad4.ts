const template = `<table border="{border}">
  <tr><td>{first}</td><td>{last}</td></tr>" 
</table>`;

function replace(template: string, data: Record<string, string>) {
  return Object.entries(data).reduce(
    (acc, [key, value]) => acc.replace(`{${key}}`, value),
    template,
  );
}

console.log(
  replace(template, {
    first: "Jan",
    last: "Kowalski",
    pesel: "97042176329",
  }),
);
