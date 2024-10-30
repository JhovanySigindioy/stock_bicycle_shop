export const methodArrays = () => {
    const data = [
        { id: 1, name: "William", age: 25, profession: "Developer", country: "USA" },
        { id: 2, name: "Jovany", age: 30, profession: "Designer", country: "Mexico" },
        { id: 3, name: "Carlos", age: 28, profession: "Manager", country: "Spain" },
        { id: 4, name: "Mariana", age: 22, profession: "QA Engineer", country: "Brazil" },
        { id: 5, name: "Sofia", age: 27, profession: "Product Manager", country: "Argentina" },
        { id: 6, name: "Lucas", age: 35, profession: "Developer", country: "Canada" },
        { id: 7, name: "Daniel", age: 29, profession: "DevOps Engineer", country: "UK" },
        { id: 8, name: "Fernanda", age: 26, profession: "UX/UI Designer", country: "Colombia" },
        { id: 9, name: "Mateo", age: 31, profession: "Data Analyst", country: "Germany" }
    ]

    //Ordenar por nombre
    let newData1 = data.sort((a, b) => {
        return a.name.localeCompare(b.name);
    });

    //Ordenar por nombre
    let newData2 = data.sort((a, b) => {
        return b.id - a.id;

    });

    console.log(newData2)
}