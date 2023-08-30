import React, {useState, useEffect} from 'react';

import { calcYield } from './../services/fiis';
import { realCurrency } from '../utils/usCurrency';
import { getAportes } from './../services/fiis';

const DashboardBlockComponent = (props) => {

    const [precoMedio, setPrecoMedio] = useState(0)
    const [investimento, setInvestimento] = useState(0)
    const [proventos, setProventos] = useState(0)
    const [cotas, setCotas] = useState(0)
    const [exists, setExists] = useState(false)

    const filterByYear = () => {
        const aportes = getAportes()
        const result = aportes.filter(a => a.ano === props.ano && String(a.ativo).toUpperCase() === String(props.title).toUpperCase())
        return result
    }


    const filterByTitle = () => {
        const aportes = getAportes()
        console.log(aportes)
        const result = aportes.filter(a => String(a.ativo).toUpperCase() === String(props.title).toUpperCase())
        return result
    }

    const totais = () => {
       
        const fiis = getAportes().filter(f => f.ano === parseInt(props.ano) && f.ativo === props.title)
        const prov = fiis.sort((a,b) => parseInt(b.mes) - parseInt(a.mes))
        const precos = fiis.reduce((acc, f) => acc + parseFloat(f.valorAtivo), 0)
        const totalInvestido = fiis.reduce((acc, f) => acc + (f.valorAtivo * parseInt(f.valorAporteFixo / f.valorAtivo)), 0)
        console.log(fiis)
        fiis.length > 0 ? setExists(true) : setExists(false)
        
        if ( fiis.length > 0) {
            setInvestimento(parseFloat(totalInvestido))
            setPrecoMedio(parseFloat(precos) / fiis.length)

            const ultimoValorAtivo = parseFloat(prov[0].valorAtivo)
            const ultimoDivendYield = parseFloat(prov[0].dy)
            const ultimoQtdCotas = prov.reduce((acc,f) => acc + (parseInt(f.valorAporteFixo / f.valorAtivo)), 0)
           setCotas(ultimoQtdCotas)
            setProventos(parseFloat(calcYield(ultimoValorAtivo, ultimoDivendYield, ultimoQtdCotas)))
        }
    }

    useEffect(() => {
        
        totais()
    }, [props]);

    return (
        exists && <div className="card" style={{width: "18rem"}}>
            <div className="card-body">
                <div style={{cursor: "pointer"}} onClick={() => props.filtrar(filterByYear())}>
                    <h5 className="card-title">{String(props.title).toUpperCase()}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{props.ano}</h6>
                </div>
                <p className="card-text">Preço Médio: <strong>{realCurrency.format(precoMedio.toFixed(2))}</strong></p>
                <p className="card-text">Total Investimento: <strong>{realCurrency.format(investimento.toFixed(2))}</strong></p>
                <p className="card-text">Último Rendimento: <strong>{realCurrency.format(proventos.toFixed(2))}</strong></p>
                <p className="card-text">Qtd. Cotas: <strong>{(cotas)}</strong></p>
                <div className='row'>
                    <div className='col-md-6 col-sm-12'>
                        <button className="btn bg-primary text-light" onClick={() => props.filtrar(filterByTitle())}>Detalhes</button>
                    </div>
                    <div className='col-md-6 col-sm-12'>
                        <select className="form-control" onChange={(e) => props.filtrarPorAno(e.target.value,props.title)}>
                            {
                                getAportes()
                                    .filter(f => String(f.ativo).toUpperCase() === String(props.title).toUpperCase())
                                    .map(f => f.ano)
                                    .filter((item, i, ar) => ar.indexOf(item) === i)
                                    .map(a => {
                                    return <option value={a}>{a}</option>;
                                })
                            }
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardBlockComponent;
