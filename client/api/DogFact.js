export const getDogFact = async () => {
    const url = `https://dog-api.kinduff.com/api/facts`;
    const response = await fetch(url);
    let dogFact = null
    if (response.ok) {
        dogFact = await response.json();
    }
    console.log("dogfact",dogFact.facts[0]);
    return dogFact.facts[0];
};