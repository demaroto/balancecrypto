import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import LinkListComponent from '../../components/LinkList.Component';
import FooterComponent from '../../components/Footer.Component';
import QuadoNumerosGrupo from '../../components/QuadoNumerosGrupo';
import { apiLotofacil, getLocalStorage, getNumerosSorteados, setLocalStorage, setNumeroFixo, setNumeros, setNumerosSorteados } from '../../services/lotofacil';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftShort, ArrowRightShort } from 'react-bootstrap-icons';
const Grupos = () => {
    const theme = useSelector((state) => state.theme.value)
    const themeText = theme === 'dark' ? 'light' : 'dark';
    const [grupos, setGrupos] = useState([])
    const [eliminado, setEliminado] = useState([])
    const [concursos, setConcursos] = useState([])
    const [concurso, setConcurso] = useState({})
    const [idConcurso, setIdConcurso] = useState(null)
    const [gruposComPontos, setGruposComPontos] = useState([])
    const [sorteados, setSorteados] = useState([])

    const navigate = useNavigate()
    
    const changeSelecionado = (num,f) => {
        if (!eliminado.includes(num)) {
            setLocalStorage('numero_grupo', [num])
            setEliminado([num])
        }
    }

    useEffect(() => {
        const numEliminado = async () => setEliminado(await getLocalStorage('numero_grupo'))
        numEliminado()
        apiLotofacil().then(res => { 
            setConcursos(res)
            setIdConcurso(0)
        })
    }, []);

    const configGroups = () => {
        const criarNumeros = Array(25).fill().map((_, i) => i + 1).filter(el =>  !eliminado.includes(el))
        const row_1 = [1,8,10,16,22,24]
        const row_2 = [2,7,11,15,23,24]
        const row_3 = [3,6,12,14,21,22]
        const row_4 = [4,5,13,15,19,21]
        const row_5 = [4,6,12,13,20,22]
        const row_6 = [3,7,9,11,19,20]
        const row_7 = [2,8,10,13,18,23]
        const row_8 = [1,9,11,17,18,23]
        
        const gr1 = criarNumeros.filter((l,index) => !row_1.includes(index + 1));
        const gr2 = criarNumeros.filter((l,index) => !row_2.includes(index + 1));
        const gr3 = criarNumeros.filter((l,index) => !row_3.includes(index + 1));
        const gr4 = criarNumeros.filter((l,index) => !row_4.includes(index + 1));
        const gr5 = criarNumeros.filter((l,index) => !row_5.includes(index + 1));
        const gr6 = criarNumeros.filter((l,index) => !row_6.includes(index + 1));
        const gr7 = criarNumeros.filter((l,index) => !row_7.includes(index + 1));
        const gr8 = criarNumeros.filter((l,index) => !row_8.includes(index + 1));
        setGrupos([gr1,gr2,gr3,gr4,gr5,gr6,gr7,gr8])
    }


    const insertResult = (key) => {
        if (concursos.length > 0) {
 
            const c = concursos[key]
           
            const obj = {data: c.data, premiacoes: c.premiacoes}
           
            setConcurso(obj)
            if (c.dezenas.length > 0) {
                setNumerosSorteados([])
                setNumerosSorteados(c.dezenas.map(v => parseInt(v)))
                setSorteados(c.dezenas.map(v => parseInt(v)))
                
            }
 
        }
         
     }
    const changeConcurso = () => {
        
        if (concursos.length === 0) {
            return <div className='d-flex justify-content-center'><button class="btn btn-primary" type="button" disabled>
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            <span> Carregando...</span>
          </button></div>
        }
        if (concursos.length > 0 && (idConcurso + 1) < concursos.length && (idConcurso) > 0) {
            return <div className='d-flex justify-content-center'>
                <button className='btn btn-primary me-2' onClick={() => setIdConcurso((idConcurso + 1))}><ArrowLeftShort /> Anterior</button>
                <button className='btn btn-primary' onClick={() => setIdConcurso((idConcurso - 1))}>Próximo <ArrowRightShort /></button>
            </div>
        }
        if (concursos.length > 0 && (idConcurso + 1) > concursos.length) {
            return <div className='d-flex justify-content-center'>
                
                <button className='btn btn-primary' onClick={() => setIdConcurso((idConcurso - 1))}>Próximo <ArrowRightShort /></button>
            </div>
        }

        if (concursos.length > 0 && (idConcurso - 1) < 0) {
            return <div className='d-flex justify-content-center'>
                
                <button className='btn btn-primary' onClick={() => setIdConcurso((idConcurso + 1))}><ArrowLeftShort /> Anterior</button>
            </div>
        }
    }

    useEffect(() => {
        configGroups()
        
       
        
    }, [eliminado ]);
    

    useEffect(() => {
        insertResult(idConcurso)
    }, [idConcurso]);




    const aplicarGrupo = index => {
        setNumeroFixo([])
        setNumeros(grupos[index]);
        navigate('/lotofacil')
    }

    return (
        <div className='h-100'>
            <LinkListComponent />
            <main className={[theme, "container", "h-100", `bg-${theme}`].join(" ")}>
                <h1 className={`text-${themeText}`}>Definição dos Grupos</h1>
                <div className='row'>
                    <div className='col-md-6 col-sm-12'>
                        <QuadoNumerosGrupo inicio={1} fim={5} retornar={(num,f) => changeSelecionado(num,f)} classesNumero={`p-2 mb-1 me-1 col rounded-3 text-center`} classesQuadro={`row`} />
                        <QuadoNumerosGrupo inicio={6} fim={10} retornar={(num,f) => changeSelecionado(num,f)} classesNumero={`p-2 mb-1 me-1 col rounded-3 text-center`} classesQuadro={`row`} />
                        <QuadoNumerosGrupo inicio={11} fim={15} retornar={(num,f) => changeSelecionado(num,f)} classesNumero={`p-2 mb-1 me-1 col rounded-3 text-center`} classesQuadro={`row`} />
                        <QuadoNumerosGrupo inicio={16} fim={20} retornar={(num,f) => changeSelecionado(num,f)} classesNumero={`p-2 mb-1 me-1 col rounded-3 text-center`} classesQuadro={`row`} />
                        <QuadoNumerosGrupo inicio={21} fim={25} retornar={(num,f) => changeSelecionado(num,f)} classesNumero={`p-2 mb-1 me-1 col rounded-3 text-center`} classesQuadro={`row`} />
                    </div>
                </div>
                <div className='row'>
                    <div className={`col-12`}>
                        <h5 className={`text-${themeText}`}>Resultado dos Concursos - {concursos.length > 0 ? '#' + concursos[idConcurso].concurso : 'Carregando..'}</h5>
                        {changeConcurso()}
                    </div>
                    {grupos.map((grupo, i) => {
                        return <div className='col-md-6 col-sm-12 mt-1'>
                            <div className={`card bg-${themeText}`}>
                                <h5 class="card-header">Grupo - {i+1} <span className='badge bg-danger'>{sorteados.filter(s => {
                                      return grupo.includes(s)  
                                    }).length} Pontos</span></h5>
                                
                                <div className='card-body d-flex'>
                                    <div className='row'>
                                    {grupo.map(num => {
                                        return <div className={`p-2 mb-1 col-2 rounded-3 text-center bg-warning text-dark fw-bold`}>{num}</div>  
                                    })}
                                    <button className='btn p-2 mb-1 me-1 col-12 rounded-3 text-center bg-primary text-white' onClick={() => aplicarGrupo(i)}>Aplicar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    })}
                </div>
                <FooterComponent />
            </main>
        </div>
    );
}

export default Grupos;
