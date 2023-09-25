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

const getNumeroEliminadoGrupo = () => {
    const numero = localStorage.getItem('numero_grupo');
    if (!numero) {
        return [];
    }
    const result = numero ? JSON.parse(numero) : [];
    const res = Array.isArray(result) ? result : JSON.parse(result)
    return res
}

const getLocalStorage = (item) => {
    const numero = localStorage.getItem(item);
    if (!numero) {
        return [];
    }
    const result = numero ? JSON.parse(numero) : [];
    const res = Array.isArray(result) ? result : JSON.parse(result)
    return res
}

const setLocalStorage = (item, num) => {
    localStorage.setItem(item, JSON.stringify(num))
}

const setNumeroEliminadoGrupo = (num) => {
    localStorage.setItem('numero_grupo', JSON.stringify(num))
}

const apiLotofacil = async () => {
    const updated = localStorage.getItem('updated_api')

    const date2 = new Date();
    if (updated) {
        const date1 = new Date(updated.replaceAll('"', ''));
        const diffTime = date2.getDate() - date1.getDate();
        
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays > 0){
            console.log('buscando dados na api')
            const result = await fetch(`https://loteriascaixa-api.herokuapp.com/api/lotofacil`)
            setLocalStorage('updated_api', new Date())
            const response = result.json()
            return response
        }else{
            console.log('buscando dados localmente')
            const response = JSON.parse(localStorage.getItem('api_lotofacil'))
            return response
        }
    }else {
        console.log('buscando dados na api')
        const result = await fetch(`https://loteriascaixa-api.herokuapp.com/api/lotofacil`)
            setLocalStorage('updated_api', new Date())
            const response = result.json()
            return response
    }
}


export { getNumeros, setNumeros, getFixoNumero, setNumeroFixo, setNumerosSorteados, getNumerosSorteados, apiLotofacil, setNumeroEliminadoGrupo, getNumeroEliminadoGrupo, getLocalStorage, setLocalStorage }