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

const setNumerosSorteados = (numeros) => {
    localStorage.setItem('numeros_sorteados', JSON.stringify(numeros))
}

const getNumerosSorteados = () => {
    const numero = localStorage.getItem('numeros_sorteados');
    if (!numero) {
        return [];
    }
    const result = numero ? JSON.parse(numero) : [];
    const res = Array.isArray(result) ? result : JSON.parse(result)
    return res
}

const apiLotofacil = async () => {
    const result = await fetch(`https://loteriascaixa-api.herokuapp.com/api/lotofacil`)
    return result.json()
}


export { getNumeros, setNumeros, getFixoNumero, setNumeroFixo, setNumerosSorteados, getNumerosSorteados, apiLotofacil }