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

const calcYieldByMonth = (ano, mes, sigla) => {

    
    const fiis = getAportes().filter(fi => {
        if (parseInt(fi.ano) === ano && String(fi.ativo).toUpperCase() === String(sigla).toUpperCase() && parseInt(fi.mes) <= parseInt(mes)) {
            return true;
        }

        if (parseInt(fi.ano) < ano && String(fi.ativo).toUpperCase() === String(sigla).toUpperCase()){
            return true;
        }
        return false;
        
    })
    const obj = {cotas: 0, yield: 0.00, investimentos: 0.00}
    if (fiis.length) {
        obj.yield = parseFloat(fiis.reduce((acc, fi) => {
            return acc + (fi.valorAtivo * fi.dy / 100) * parseInt(fi.valorAporteFixo / fi.valorAtivo)
        }, 0)).toFixed(2)

        obj.cotas = parseInt(fiis.reduce((acc, fi) => {
            return acc + parseInt(fi.valorAporteFixo / fi.valorAtivo)
        },0))

        obj.investimentos = parseFloat(fiis.reduce((acc, f) => acc + (f.valorAtivo * parseInt(f.valorAporteFixo / f.valorAtivo)), 0))

    }

    return obj

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
    obj.id = Math.random().toString(16).slice(2)
    if (result.length > 0) {
        result.push(obj)
        objAportes.aportes = result
        localStorage.setItem('aportes', JSON.stringify(objAportes));
    } else {
        const create = {"aportes": JSON.stringify([obj])};
        localStorage.setItem('aportes', JSON.stringify(create));
    }
}


const deleteAporte = id => {
    const aportes = getAportes()
    const deleted = aportes.filter(a => a.id !== id)
    const obj = {}
    obj.aportes = deleted
    localStorage.setItem('aportes', JSON.stringify(obj));
    return deleted
} 



export { calcYield, getAportes, getAportesByCode, getGroups, setAportes, calcYieldByMonth, deleteAporte }