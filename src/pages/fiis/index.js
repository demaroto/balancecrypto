import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux'
import HeaderComponent from '../../components/Header.Component';
import LinkListComponent from '../../components/LinkList.Component';
import { getAportesByCode, getGroups, getAportes, calcYieldByMonth, deleteAporte } from '../../services/fiis';
import { Pencil, Plus, Trash } from 'react-bootstrap-icons';
import { Meses } from '../../utils/meses';
import  DashboardBlockComponent from '../../components/DashboardBlock.Component';
import ModalFormAportesComponent from '../../components/ModalForm.Component';


const Index = () => {
    const theme = useSelector((state) => state.theme.value)
    const themeText = theme === 'dark' ? 'light' : 'dark';

    const [listAtivos, setListAtivos] = useState([])
    const [anoSelecionado, setAnoSelecionado] = useState(new Date().getFullYear())
    const [groups, setGroups] = useState([])
    const [idForm, setIdForm] = useState(null)

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

    //Preparar valores para table
    const mountTable = () => {
       
        //Se existir aportes
        if (getAportes()) {
       
            const parseAportes = getAportes().filter(a => a.ano === anoSelecionado);
        
            
            const tableValues = parseAportes.map(v => {
                return v
            }) 
            

            setListAtivos(tableValues)
            //let datatable = $("#ativos_fiis").DataTable()
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
                        <button className={`btn btn-outline-success text-${themeText}`} data-bs-toggle="modal" data-bs-target="#formAdd" onClick={() => setIdForm(null)}><Plus /> Adicionar Aportes</button>
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
                            
                                <table className={`table text-${themeText} bg-${theme}`} id='ativos_fiis'>
                                    <thead>
                                        <tr>
                                            <th>Ativo</th>
                                            <th>Valor Ativo</th>
                                            <th>Valor Aporte</th>
                                            <th>Mês Aporte</th>
                                            <th>Ano Aporte</th>
                                            <th>DY Mensal</th>
                                            <th>Cotas Acumuladas</th>
                                            <th>Rendimento / Mês</th>
                                            <th></th>
                                        </tr>
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
                                                <td>
                                                    {
                                                    <div>
                                                        <button className='btn bg-primary text-light me-1' onClick={() => setIdForm(v.id)} data-bs-toggle="modal" data-bs-target="#formAdd"><Pencil /></button>
                                                        <button className='btn bg-danger text-light' onClick={() => removeAporte(v.id)}><Trash /></button>
                                                    </div>
                                                    }
                                                </td>
                                                </tr>)
                                        })}
                                    </tbody>
                                </table>
                            </div>

                        
                        }
                    </div>
                   
                </div>
            </main>
            <ModalFormAportesComponent id={idForm} update={mountTable}></ModalFormAportesComponent>
        </div>
    );
}

export default Index;
