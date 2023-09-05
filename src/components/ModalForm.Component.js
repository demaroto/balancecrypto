import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';

import { setAportes, getAportes, getAportesById, deleteAporte } from '../services/fiis';
import { Meses } from '../utils/meses';

const ModalFormAportesComponent = ({id, update}) => {

    const idAporte = id === null ? false : id;
    const title = idAporte ? "Editar Aporte" : "Adicionar Aporte";

    const theme = useSelector((state) => state.theme.value)
    const themeText = theme === 'dark' ? 'light' : 'dark';

    const [ativo, setAtivo] = useState(null)
    const [mes, setMes] = useState(1)
    const [ano, setAno] = useState(new Date().getFullYear())
    const [valorAtivo, setValorAtivo] = useState(null)
    const [valorAporte, setValorAporte] = useState(null)
    const [qtdCotas, setQtdCotas] = useState(1)
    const [dy, setDy] = useState(null)
    const [selectMeses, setSelectMeses] = useState([])

    const changeValorAporte = (qtd) => {
        setQtdCotas(qtd)
        setValorAporte(valorAtivo * qtd)
    }

    const UpdateSelectMeses = () => {
        const result = []
        for (const key in Meses) {
            if (parseInt(mes) === parseInt(key)) {
                result.push({mes:  Meses[key], selected: 'selected', value: key})
            }else {
                result.push({mes:  Meses[key], selected: '', value: key})
            }
        }
        setSelectMeses(result)
    }

    useEffect(() => {
       
        if (idAporte){
            
            const valores = getAportesById(idAporte)
            setAtivo(valores[0].ativo)
            setMes(valores[0].mes)
            setAno(valores[0].ano)
            setValorAtivo(valores[0].valorAtivo)
            setValorAporte(valores[0].valorAporte)
            setQtdCotas(Number.parseInt(valores[0].valorAporteFixo / valores[0].valorAtivo)) //
            setDy(Number.parseFloat(valores[0].dy))
            
        }else{
           
            setAtivo("")
            setMes(1)
            setAno(new Date().getFullYear())
            setValorAtivo(0)
            setValorAporte(0)
            setQtdCotas(1)
            setDy(0)
          
        }
    }, [idAporte]);

    useEffect(() => {
        UpdateSelectMeses()
    }, [mes]);

    const updateAporte = async id => {
       await deleteAporte(id)
       novoAporte()
       update()
    }

    const novoAporte = () => {
        if (Number.parseFloat(valorAporte) < Number.parseFloat(valorAtivo)) {
            alert("Valor do Aporte é Menor que o valor do Ativo");
            console.log(valorAtivo, valorAporte);
            return false;
        }
       
        
        const parseAportes = getAportes() ? getAportes() : null;

        if (parseAportes) {
            const ultimoRendimento = parseAportes.filter(aporte => aporte.ativo === ativo && parseInt(aporte.ano) === parseInt(ano) && parseInt(aporte.mes) <= parseInt(mes))
            const rendimento = ultimoRendimento.length > 0 ? ultimoRendimento[ultimoRendimento.length - 1] : null
            const aporteAtual = rendimento ? ultimoRendimento[ultimoRendimento.length - 1].valorAporte : 0
            
            const calcRendimento = rendimento ? rendimento.valorAtivo * rendimento.dy / 100 * parseInt(rendimento.valorAporte / rendimento.valorAtivo) : 0
            const novoAporte = parseFloat(valorAporte) + parseFloat(aporteAtual) + calcRendimento

            setAportes({ativo, mes, ano: parseInt(ano), valorAtivo, valorAporte: novoAporte, dy, data: new Date(), valorAporteFixo: valorAporte})
            
        }else{
            setAportes({ativo, mes, ano: parseInt(ano), valorAtivo, valorAporte, dy, data: new Date(), valorAporteFixo: valorAporte})
           
        }
        
        update()
    }

    return (
        <div className={`modal fade`} tabindex="-1" id="formAdd">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{title}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                        
                        <div className="col-12 col-md-6">
                            <div className={`input-group-prepend w-100 mt-1`}>
                                <span className={`input-group-text bg-${theme} text-${themeText}`} style={{borderBottom:"0"}}>{'Sigla Ativo'}</span>
                            </div>
                            <input id="me" className="form-control"  type="text" placeholder='Sigla Ativo' value={ativo} onChange={(e) => setAtivo(String(e.target.value).toUpperCase())} /> 
                        </div>
                        <div className="col-12 col-md-6">
                            <div className={`input-group-prepend w-100 mt-1`}>
                                <span className={`input-group-text bg-${theme} text-${themeText}`} style={{borderBottom:"0"}}>{'Mês'}</span>
                            </div>
                            <select className="form-control" onChange={(e) => setMes(e.target.value)}>
                                {selectMeses.map((month, k) => <option key={k} value={month.value} selected={month.selected} >{month.mes}</option>)}
                            </select>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className={`input-group-prepend w-100 mt-1`}>
                                <span className={`input-group-text bg-${theme} text-${themeText}`} style={{borderBottom:"0"}}>{'Ano'}</span>
                            </div>
                            <input id="me" className="form-control"  type="number" min={1} placeholder='2023' value={ano} onChange={(e) => setAno(e.target.value)} /> 
                        </div>
                        <div className="col-12 col-md-6">
                            <div className={`input-group-prepend w-100 mt-1`}>
                                <span className={`input-group-text bg-${theme} text-${themeText}`} style={{borderBottom:"0"}}>{'Valor do Ativo'}</span>
                            </div>
                            <input id="me" className="form-control"  type="number" min={0.1} placeholder='10.30' value={valorAtivo} onChange={(e) => setValorAtivo(e.target.value)} /> 
                        </div>
                        <div className="col-12 col-md-6">
                            <div className={`input-group-prepend w-100 mt-1`}>
                                <span className={`input-group-text bg-${theme} text-${themeText}`} style={{borderBottom:"0"}}>{'Quantidade de Cotas'}</span>
                            </div>
                            <input id="meqtd" className="form-control"  type="number" min={1} placeholder='2' value={qtdCotas} onChange={(e) => changeValorAporte(e.target.value)} /> 
                        </div>
                        <div className="col-12 col-md-6">
                            <div className={`input-group-prepend w-100 mt-1`}>
                                <span className={`input-group-text bg-${theme} text-${themeText}`} style={{borderBottom:"0"}}>{'DY Mensal'}</span>
                            </div>
                            <input id="me" className="form-control"  type="number" min={0.1} placeholder='10.30' value={dy} onChange={(e) => setDy(e.target.value)} /> 
                        </div>
                        
                    </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button type="button" className="btn btn-success" data-bs-dismiss="modal" aria-label="Close" onClick={() => { idAporte ? updateAporte(idAporte) : novoAporte()}}>Salvar</button>
                    </div>
                    </div>
                </div>
            </div>
    );
}

export default ModalFormAportesComponent;
