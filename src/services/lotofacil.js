const getNumeros = () => {
    const numeros = localStorage.getItem('numeros');
    if (!numeros) {
        return [];
    }
    const result = numeros ? JSON.parse(numeros) : [];
    const res = Array.isArray(result) ? result : JSON.parse(result)
    return res
}

const setNumeros = (numeros) => {
    localStorage.setItem('numeros', JSON.stringify(numeros))
}

export { getNumeros, setNumeros }