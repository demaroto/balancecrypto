const getNumeros = () => {
    const numeros = localStorage.getItem('numeros');
    if (!numeros) {
        return [];
    }
    const result = numeros ? JSON.parse(numeros) : [];
    const res = Array.isArray(result) ? result : JSON.parse(result)
    return res
}

const getFixoNumero = () => {
    const numero = localStorage.getItem('numero_fixo');
    if (!numero) {
        return [];
    }
    const result = numero ? JSON.parse(numero) : [];
    const res = Array.isArray(result) ? result : JSON.parse(result)
    return res
}

const setNumeros = (numeros) => {
    localStorage.setItem('numeros', JSON.stringify(numeros))
}

const setNumeroFixo = (numero) => {
    localStorage.setItem('numero_fixo', JSON.stringify(numero))
}

export { getNumeros, setNumeros, getFixoNumero, setNumeroFixo }