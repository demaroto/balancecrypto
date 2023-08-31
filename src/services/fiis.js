const getAportes = () => {
    const aportes = localStorage.getItem('aportes');
    if (!aportes) {
        return [];
    }
    const result = aportes ? JSON.parse(aportes) : [];
    const res = Array.isArray(result.aportes) ? result.aportes : JSON.parse(result.aportes)
    return res
}

const calcYield = (valorAtivo, dy, cotas) => {
    if (valorAtivo < 0 && dy < 0 && cotas < 0) {
        return 0;
    }
    const dividend = valorAtivo * dy / 100 * cotas
    console.log(dividend)

    return dividend

}

const calcYieldByMonth = (ativo, ano, mes, sigla) => {

    console.log(getAportes())
    const fiis = getAportes().filter(fi => parseInt(fi.ano) === ano && String(fi.ativo).toUpperCase() === String(sigla).toUpperCase() && parseInt(fi.mes) <= parseInt(mes))
    if (fiis.length) {
        return parseFloat(fiis.reduce((acc, fi) => {
            return acc + (fi.valorAtivo * fi.dy / 100) * parseInt(fi.valorAporteFixo / fi.valorAtivo)
        }, 0)).toFixed(2)
    }else{
        console.log(fiis)
        return 100
    }

}

const getAportesByCode = (code) => {
    const aportes = getAportes();
    const result = aportes ? aportes : null;
    const results = [];
    
    if (result.length > 0) {
        result.map(aporte => {
            if (aporte.ativo === code) {
                results.push(aporte);
            }
            return true
        })
    }

    return results
 }

const getGroups = () => {
    const aportes = getAportes();
    const result = aportes ? aportes : [];
    const results = [];
    if (result) {
        result.map(aporte => {
            if (!results.includes(aporte.ativo)) {
                results.push(aporte.ativo);
            }
            return true
        })
    }
    console.log(results)
    return results;
}

const setAportes = (obj) => {
    const aportes = getAportes();
    const result = aportes;
    const objAportes = {'aportes' : []}
    if (result.length > 0) {
        result.push(obj)
        objAportes.aportes = result
        localStorage.setItem('aportes', JSON.stringify(objAportes));
    } else {
        const create = {"aportes": JSON.stringify([obj])};
        localStorage.setItem('aportes', JSON.stringify(create));
    }
}



export { calcYield, getAportes, getAportesByCode, getGroups, setAportes, calcYieldByMonth }