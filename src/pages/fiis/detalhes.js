import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux'
import LinkListComponent from '../../components/LinkList.Component';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeftCircle } from 'react-bootstrap-icons';
import { Meses } from '../../utils/meses';
import { getAportes, calcYieldByMonth, deleteAporte } from '../../services/fiis';
import { Pencil, Trash } from 'react-bootstrap-icons';
import ModalFormAportesComponent from '../../components/ModalForm.Component';
import FooterComponent from '../../components/Footer.Component';


const Index = () => {
    const theme = useSelector((state) => state.theme.value)
    const themeText = theme === 'dark' ? 'light' : 'dark';
    const  { id } = useParams()
    const navigate = useNavigate()
    const [listAtivos, setListAtivos] = useState([])
    const [idForm, setIdForm] = useState(null)
    const [anosSelected, setAnosSelected] = useState([])
    const [anos, setAnos] = useState([])

    const filtrarAtivo = (ativos) => {
        setListAtivos(ativos)
    }

    const removeAporte = (id) => {
        let r = window.confirm('Deseja remover este aporte ?')
        if (r === false) return
        let updated = deleteAporte(id)
        setListAtivos(updated)
    }

    const filtrarPorAno = (anos, title) => {
        const aportes = getAportes()
        const result = aportes.filter(a => anos.map(selected => parseInt(selected)).includes(a.ano) && String(a.ativo).toUpperCase() === String(title).toUpperCase())
        if (result.length > 0) {
            filtrarAtivo(result)
        }
       
    }

    const insereAnos = () => {
        const aportes = getAportes()
        const res = [];
        const result = aportes.map(a => {
            let value = parseInt(a.ano)
            if (!res.includes(value) && a.ativo === id) {
                res.push(value)
            }
        })
        
        setAnos(res)
    }

    const handleSelectChange = function(e) {
        var options = e.target.options;
        var value = [];
        setAnosSelected([]);
        for (var i = 0, l = options.length; i < l; i++) {
          if (options[i].selected) {
            value.push(options[i].value);
          }
        }

        setAnosSelected(value)
        
      }

    useEffect(() => {
        filtrarPorAno(anosSelected, id);
    }, [anosSelected]);

    useEffect(() => {
        insereAnos()
    }, [])


    return (
        <div className='h-100'>
            <LinkListComponent />
            <main className={[theme, "container", "h-100", `bg-${theme}`].join(" ")}>
                
                    <div className='row m-1'>
                        <div className='col-sm-12 col-md-6'>
                            <h2 className={`text-${themeText}`}><button className={`bg-${theme} border-0`} onClick={() => navigate('/fiis')}><ArrowLeftCircle className={`text-${themeText}`}></ArrowLeftCircle></button>{id}</h2>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-sm-12 col-md-2'>
                            <label for="selectAno" className={`text-${themeText}`}>Selecione os anos</label>
                            <select className={`form-select bg-${theme} text-${themeText} form-select-lg`} multiple id="selectAno" aria-label="Selecione os anos" onChange={(e) => handleSelectChange(e)}>
                                {anos.map((ano, i) => <option>{ano}</option>)}
                            </select>
                        </div>
                        <div className='col-sm-12 col-md-10'>
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
                                                <td>{v.ano}</td>
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
                    </div>
                <FooterComponent />
            </main>
             <ModalFormAportesComponent id={idForm}></ModalFormAportesComponent>           
        </div>
    );
}

export default Index;
