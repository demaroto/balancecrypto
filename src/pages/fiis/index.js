import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux'
import HeaderComponent from '../../components/Header.Component';
import LinkListComponent from '../../components/LinkList.Component';
import { getAportesByCode, getGroups, setAportes, getAportes, calcYieldByMonth, deleteAporte } from '../../services/fiis';
import { Plus, Trash } from 'react-bootstrap-icons';
import { Meses } from '../../utils/meses';
import  DashboardBlockComponent from '../../components/DashboardBlock.Component';

const Index = () => {
    const theme = useSelector((state) => state.theme.value)
    const themeText = theme === 'dark' ? 'light' : 'dark';

    const [ativo, setAtivo] = useState(null)
    const [mes, setMes] = useState(null)
    const [ano, setAno] = useState(new Date().getFullYear())
    const [valorAtivo, setValorAtivo] = useState(null)
    const [valorAporte, setValorAporte] = useState(null)
    const [qtdCotas, setQtdCotas] = useState(0)
    const [dy, setDy] = useState(null)
    const [listAtivos, setListAtivos] = useState([])
    const [anoSelecionado, setAnoSelecionado] = useState(new Date().getFullYear())
    const [groups, setGroups] = useState([])
    const [formVisible, setFormVisible] = useState(false)

  
    const changeValorAporte = (qtd) => {
        setQtdCotas(qtd)
        setValorAporte(valorAtivo * qtd)
    }

    const removeAporte = (id) => {
        let r = window.confirm('Deseja remover este aporte ?')
        if (r === false) return
        let updated = deleteAporte(id)
        setListAtivos(updated)
    }

    const filtrarAtivo = (ativos) => {
        console.log(ativos)
        setAnoSelecionado(ativos[0].ano)
        setListAtivos(ativos)
    }

    const filtrarPorAno = (ano, title) => {
        const aportes = getAportes()
        const result = aportes.filter(a => parseInt(a.ano) === parseInt(ano) && String(a.ativo).toUpperCase() === String(title).toUpperCase())
        if (result.length > 0) {
            filtrarAtivo(result)
        }else{
            console.log([ano, title], aportes)
        }
    }

    const addAporte = () => {
       
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
        mountTable();
        
        if (formVisible) {
            setFormVisible(false)
        }
        return true;
    }

  

    //Preparar valores para table
    const mountTable = () => {
       
        //Se existir aportes
        if (getAportes()) {
       
            const parseAportes = getAportes().filter(a => a.ano === anoSelecionado);
        
            
            const tableValues = parseAportes.map(v => {
                return v
            }) 
            

            setListAtivos(tableValues)
        }
        
    }


    const clearAllListeners = () => {
        let r = window.confirm('Deseja apagar todos os aportes ?')
        if (r === false) return
        localStorage.removeItem('aportes')
        setListAtivos([])
        mountTable()
    }

    useEffect(() => {
        mountTable();
        
        setGroups(getGroups())
        console.log(groups)
        
    }, [anoSelecionado]);


    return (
        <div className='h-100'>
            <HeaderComponent />
            <LinkListComponent />
            <main className={[theme, "container", "h-100", `bg-${theme}`].join(" ")}>
                
                 
                
                <div className="container-fluid">
                    <div className="col-12 mt-1 d-flex justify-content-end" >
                        <button className={`btn btn-outline-success text-${themeText}`} data-bs-toggle="modal" data-bs-target="#formAdd"><Plus /> Adicionar Aportes</button>
                        <button className={`btn btn-outline-danger text-${themeText} ms-1`} type='button' onClick={() => clearAllListeners()} ><Trash /> Apagar Todos</button>

                    </div>
                        <div className='row mb-2 mt-2'>
                            {groups.length > 0 ? <h3 className={`text-${themeText}`}>Aportes Realizados</h3> : ''}
                            {
                            anoSelecionado && groups.map((a, i) => {
                                return <div key={i} className='col-md-3 col-sm-12 mb-1'><DashboardBlockComponent title={a} ano={anoSelecionado} fiis={getAportesByCode(a)} filtrar={filtrarAtivo} filtrarPorAno={filtrarPorAno}></DashboardBlockComponent></div>
                                })
                            }
                        </div>
                        <div className='table-responsive'>
                            {listAtivos && <div className="col-12">
                            
                                <table className={`table text-${themeText}`} id='ativos_fiis'>
                                    <thead>
                                        <th>Ativo</th>
                                        <th>Valor Ativo</th>
                                        <th>Valor Aporte</th>
                                        <th>Mês Aporte</th>
                                        <th>Ano Aporte</th>
                                        <th>DY Média Mensal</th>
                                        <th>Cotas</th>
                                        <th>Rendimento / Mês</th>
                                        <th></th>
                                    </thead>
                                    <tbody>
                                        {listAtivos.map((v, i) => {
                                            return (<tr key={i}>
                                                <td>{v.ativo}</td>
                                                <td>{v.valorAtivo}</td>
                                                <td>{parseFloat(v.valorAporteFixo).toFixed(2)}</td>
                                                <td>{Meses[v.mes]}</td>
                                                <td onClick={() => filtrarPorAno(v.ano, v.ativo)}>{v.ano}</td>
                                                <td>{v.dy}%</td>
                                                <td>{calcYieldByMonth(v.ano, v.mes, v.ativo).cotas}</td>
                                                <td>R$ {calcYieldByMonth(v.ano, v.mes, v.ativo).yield}</td>
                                                <td>{<button className='btn bg-danger text-light' onClick={() => removeAporte(v.id)}><Trash /></button>}</td>
                                                </tr>)
                                        })}
                                    </tbody>
                                </table>
                            </div>

                        
                        }
                    </div>
                    
                </div>
            </main>
            <div className={`modal fade`} tabindex="-1" id="formAdd">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Adicionar Aporte</h5>
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
                                <option value="">{'Mês'}</option>
                                <option value="1">Janeiro</option>
                                <option value="2">Fevereiro</option>
                                <option value="3">Março</option>
                                <option value="4">Abril</option>
                                <option value="5">Maio</option>
                                <option value="6">Junho</option>
                                <option value="7">Julho</option>
                                <option value="8">Agosto</option>
                                <option value="9">Setembro</option>
                                <option value="10">Outubro</option>
                                <option value="11">Novembro</option>
                                <option value="12">Dezembro</option>
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
                                <span className={`input-group-text bg-${theme} text-${themeText}`} style={{borderBottom:"0"}}>{'DY Médio Mensal'}</span>
                            </div>
                            <input id="me" className="form-control"  type="number" min={0.1} placeholder='10.30' value={dy} onChange={(e) => setDy(e.target.value)} /> 
                        </div>
                        
                    </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button type="button" className="btn btn-success" data-bs-dismiss="modal" aria-label="Close" onClick={() => addAporte()}>Salvar</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Index;
