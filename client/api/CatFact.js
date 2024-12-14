export const getCatFact = async () => {
    const url = `https://catfact.ninja/fact`;
    const response = await fetch(url);
    let catFact = null
    if (response.ok) {
        catFact = await response.json();
    }
    console.log(catFact);
    return catFact;
};