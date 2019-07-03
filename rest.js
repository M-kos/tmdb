const a = {
    name: "Kos",
    age: 33,
    width: 120
}

const b = {
    url: "//os",
    jos: 12333,
    width: 50
}

let c = {
    ...a,
    ...b
}
console.log(a);
console.log(b);
console.log(c);