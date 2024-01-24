const pers:Array<any> = [
    {
        name: "Ion",
        surname: "cojocari"
    },
    {
        name: "Lercik",
        surname: "cojocari"
    },
]

export const load = async () => {

    const req = await fetch("https://jsonplaceholder.typicode.com/posts")

    const data = await req.json()
    return {data}
}