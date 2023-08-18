import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux'
import HeaderComponent from '../../components/Header.Component';

import TokenRouterComponent from '../../components/TokenRouter.Component';
import LinkListComponent from '../../components/LinkList.Component';
import { Meses } from '../../utils/meses';
const Index = () => {
    const theme = useSelector((state) => state.theme.value)
    const themeText = theme === 'dark' ? 'light' : 'dark';

    const [ativo, setAtivo] = useState(null)
    const [mes, setMes] = useState(null)
    const [ano, setAno] = useState(new Date().getFullYear())
    const [valorAtivo, setValorAtivo] = useState(null)
    const [valorAporte, setValorAporte] = useState(null)
    const [dy, setDy] = useState(null)
    const [listAtivos, setListAtivos] = useState([])
  
    const addAporte = () => {
        if (Number.parseFloat(valorAporte) < Number.parseFloat(valorAtivo)) {
            alert("Valor do Aporte é Menor que o valor do Ativo");
            console.log(valorAtivo, valorAporte);
            return false;
        }
       
        const getAportes = localStorage.getItem('aportes');
        const parseAportes = getAportes ? JSON.parse(getAportes) : null;

        console.log(parseAportes)
       
        if (parseAportes) {
            const aporteAtual = parseAportes.aportes.filter(v => {
                return v.ativo === ativo
            }).reduce((acc, v) => { 
                let rendimento = parseFloat(((v.valorAtivo * v.dy) / 100) * parseInt(v.valorAporte / v.valorAtivo))
                return parseFloat(v.valorAporte) + rendimento + acc
            }, 0);
            const novoAporte = parseFloat(valorAporte) + parseFloat(aporteAtual)
            parseAportes.aportes.push({ativo, mes, ano, valorAtivo, valorAporte: novoAporte, dy, data: new Date()})
            localStorage.setItem('aportes', JSON.stringify(parseAportes))
        }else{
            const aportes = {"aportes": [{ativo, mes, ano, valorAtivo, valorAporte, dy, data: new Date()}]}
            localStorage.setItem('aportes', JSON.stringify(aportes));
        }
        mountTable();
        return true;
    }

  

    //Preparar valores para table
    const mountTable = () => {
        const getAportes = localStorage.getItem('aportes'); 

        //Se existir aportes
        if (getAportes) {
            const parseAportes = JSON.parse(getAportes);
            
            const tableValues = parseAportes.aportes.map(v => {
                return v
            }) 

            setListAtivos(tableValues)
        }
        
    }

    useEffect(() => {
        mountTable();
    }, []);


    return (
        <div className='h-100'>
            <HeaderComponent />
            <LinkListComponent />
            <main className={[theme, "container", "h-100", `bg-${theme}`].join(" ")}>
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className={`input-group-prepend w-100 mt-1`}>
                            <span className={`input-group-text bg-${theme} text-${themeText}`} style={{borderBottom:"0"}}>{'Sigla Ativo'}</span>
                        </div>
                        <input id="me" className="form-control"  type="text" placeholder='Sigla Ativo' value={ativo} onChange={(e) => setAtivo(e.target.value)} /> 
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
                            <span className={`input-group-text bg-${theme} text-${themeText}`} style={{borderBottom:"0"}}>{'Valor do Aporte'}</span>
                        </div>
                        <input id="me" className="form-control"  type="number" min={0.1} placeholder='10.30' value={valorAporte} onChange={(e) => setValorAporte(e.target.value)} /> 
                    </div>
                    <div className="col-12 col-md-6">
                        <div className={`input-group-prepend w-100 mt-1`}>
                            <span className={`input-group-text bg-${theme} text-${themeText}`} style={{borderBottom:"0"}}>{'DY Médio Mensal'}</span>
                        </div>
                        <input id="me" className="form-control"  type="number" min={0.1} placeholder='10.30' value={dy} onChange={(e) => setDy(e.target.value)} /> 
                    </div>
                    <div className="col-12 mt-1 d-flex justify-content-end" >
                        <button className='btn btn-success text-white' onClick={() => addAporte()}>Adicionar Aportes</button>

                    </div>
                </div>
                
                <div className='container-fluid'>
                    <div className="row">
                        <div className="col-12 col-md-12">
                           
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
                                </thead>
                                <tbody>
                                    {listAtivos.map((v, i) => {
                                        return (<tr key={i}>
                                            <td>{v.ativo}</td>
                                            <td>{v.valorAtivo}</td>
                                            <td>{parseFloat(v.valorAporte).toFixed(2)}</td>
                                            <td>{Meses[v.mes]}</td>
                                            <td>{v.ano}</td>
                                            <td>{v.dy}%</td>
                                            <td>{parseInt(v.valorAporte / v.valorAtivo) || 0}</td>
                                            <td>R$ {parseFloat(((v.valorAtivo * v.dy) / 100) * parseInt(v.valorAporte / v.valorAtivo)).toFixed(2) || 0}</td>
                                            </tr>)
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    
                </div>
            </main>
        </div>
    );
}

export default Index;
