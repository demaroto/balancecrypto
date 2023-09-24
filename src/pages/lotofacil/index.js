import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import LinkListComponent from '../../components/LinkList.Component';
import QuadoNumeros from '../../components/QuadoNumeros';
import { setNumeros, getNumeros, setNumeroFixo, getFixoNumero, getNumerosSorteados, apiLotofacil, setNumerosSorteados } from '../../services/lotofacil';
import ModalNumeros from '../../components/ModalNumeros';
import FooterComponent from '../../components/Footer.Component';
import QuadoNumerosSorteados from '../../components/QuadoNumerosSorteados';
import { ArrowLeftShort, ArrowRightShort, Star, StarFill } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';

const Index = () => {
    const theme = useSelector((state) => state.theme.value)
    const themeText = theme === 'dark' ? 'light' : 'dark';
    const [impares, setImpares] = useState(0)
    const [pares, setPares] = useState(0)
    const [qtd, setQtd] = useState(0)
    const [numeroModal, setNumeroModal] = useState([])
    const [titleModal, setTitleModal] = useState("Jogos")
    const [pontos, setPontos] = useState([])
    const [pontosModal, setPontosModal] = useState([])
    const [totalSorteado, setTotalSorteado] = useState(0)
    const [sorteados, setSorteados] = useState([])
    const [concursos, setConcursos] = useState([])
    const [concurso, setConcurso] = useState({})
    const [idConcurso, setIdConcurso] = useState(0)

    const regras = []
    regras[0] = [2,4,17].map(i => i - 1)
    regras[1] = [3,10,13].map(i => i - 1)
    regras[2] = [3,11,17].map(i => i - 1)
    regras[3] = [1,13,16].map(i => i - 1)
    regras[4] = [5,14,15].map(i => i - 1)
    regras[5] = [6,9,12].map(i => i - 1)
    regras[6] = [7,12,17].map(i => i - 1)
    regras[7] = [4,5,13].map(i => i - 1)
    regras[8] = [3,4,12].map(i => i - 1)
    regras[9] = [7,10,14].map(i => i - 1)


    const [jogos, setJogos] = useState([])

    const openModal = (i) => {
        setNumeroModal(jogos[i])
        setPontosModal(pontos[i])
        console.log(jogos[i])
        console.log(pontos[i])
        setTitleModal(`Jogos #${i+1}`)
    }

    const changeNumerosSelecionados = (numero, fixo) => {
        const nums = getNumeros()
           
        if (fixo && nums.includes(numero)) {
            setNumeroFixo([fixo])
            changeImpares() 
            
        }else{
            if (nums.includes(numero)) {
                let res = nums.filter(n => numero !== n)
                
                setNumeros(res.sort((a,b) => a - b))
                changeImpares() 
                
            }else{
                if (nums.length < 18) {
                    let numeros = nums
                    numeros.push(numero)
                    setNumeros(numeros.sort((a,b) => a - b))
                    changeImpares() 
                }else{
                    alert("Número máximo já selecionado!")
                }
             
            }

        }

        if (getNumeros().length === 18 && getFixoNumero().length === 1){
            montaJogos();
        }

    }

    const montaJogos = () => {
        const numeros = getNumeros()
        const fixo = getFixoNumero()
        if (numeros.length === 18 && fixo.length > 0) {
            const semFixo = numeros.filter(n => n !== fixo[0])
           
            const criarJogo = []
            for (let k = 0; k < 10; k++) {
                criarJogo[k] =  semFixo.filter((s,i) => !regras[k].includes(i))
                criarJogo[k].push(fixo[0])
                criarJogo[k].sort((a,b) => a - b)
            }
            
            setJogos(criarJogo)
        }

    }

    const changeImpares = () => {
        const nums = getNumeros()
        setQtd(nums.length)
        if (nums.length > 0 && nums.length <= 18){
            //Impares
           const ip = nums.filter(num => {
                return num % 2 === 1
            })

            //Pares
            const pa = nums.filter(num => {
                return num % 2 === 0
            })
            setPares(pa.length)
            setImpares(ip.length)
        }else{
            if(nums.length === 0){
            setPares(0)
            setImpares(0)
            }
        }
    }

    const changeNumerosSorteado = (num, total) => {
        const sorteados = getNumerosSorteados()
  
        if (sorteados.length <= total) {
            const pontuacao = []
            jogos.map((j, i) => {
                pontuacao[i] = jogos[i].filter(k => sorteados.includes(k))
                return true
            })
            setPontos(pontuacao)
            
        }
    }

    const checkPontos = (pontos) => {
        switch (pontos) {
            case 11:
            case 12:
                return <div className='d-flex justify-content-start align-items-center'><StarFill className='text-secondary'/><h5 className='align-middle'><span className='bg-secondary badge'>{pontos}</span></h5></div>
            case 13:
                return <div className='d-flex justify-content-start align-items-center text-white align-middle'><StarFill className='text-primary'/><h5 className='align-middle'><span className='bg-primary badge'>{pontos}</span></h5></div>
            case 14:
                return <div className='d-flex justify-content-start align-items-center'><StarFill className='text-success'/><h5 className='align-middle'><span className='bg-success badge'>{pontos}</span></h5></div>
            case 15:
            return <div className='d-flex justify-content-start align-items-center'><StarFill className='text-danger'/><h5 className='align-middle'><span className='bg-danger badge'>{pontos}</span></h5></div>
            default:
                return <div className='d-flex justify-content-start align-items-center'><Star />{pontos}</div>
        }
    }

    const insertResult = (key) => {
       if (concursos.length > 0) {

           const c = concursos[key]
         
           const obj = {data: c.data, premiacoes: c.premiacoes}
          
           setConcurso(obj)
           if (c.dezenas.length > 0) {
               setNumerosSorteados([])
               setTotalSorteado(0)
                
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
        changeImpares()
        montaJogos()
        setIdConcurso(0)
        apiLotofacil().then(res => { 
            setConcursos(res) 
        })
    }, []);

    useEffect(() => {
        changeNumerosSorteado(null, 15)
        insertResult(idConcurso)
        setPontosModal(pontos)
    }, [jogos, idConcurso, concursos]);

    

    return (
        <div className='h-100'>
            <LinkListComponent />
            <main className={[theme, "container", "h-100", `bg-${theme}`].join(" ")}>
                <h1 className={`text-${themeText}`}>Lotofácil</h1>
                <div className='row'>
                    <div className='col-md-6 col-sm-12'>
                        <QuadoNumeros inicio={1} fim={5} retornar={(num,f) => changeNumerosSelecionados(num,f)} classesNumero={`p-2 mb-1 me-1 col rounded-3 text-center`} classesQuadro={`row`} />
                        <QuadoNumeros inicio={6} fim={10} retornar={(num,f) => changeNumerosSelecionados(num,f)} classesNumero={`p-2 col mb-1 me-1 col rounded-3 text-center`} classesQuadro={`row`} />
                        <QuadoNumeros inicio={11} fim={15} retornar={(num,f) => changeNumerosSelecionados(num,f)} classesNumero={`p-2 col mb-1 me-1 col rounded-3 text-center`} classesQuadro={`row`} />
                        <QuadoNumeros inicio={16} fim={20} retornar={(num,f) => changeNumerosSelecionados(num,f)} classesNumero={`p-2 col mb-1 me-1 col rounded-3 text-center`} classesQuadro={`row`} />
                        <QuadoNumeros inicio={21} fim={25} retornar={(num, f) => changeNumerosSelecionados(num,f)} classesNumero={`p-2 col mb-1 me-1 col rounded-3 text-center`} classesQuadro={`row`} />
                    </div>
                    <div className='col-md-6 col-sm-12'>
                        <div className='text-center'>
                            <div className={`text-${themeText} h4`}>Pares: {pares} / Ímpares: {impares}</div>
                            <div className={`text-${themeText} h4`}>Qtd: {qtd} de 18</div>

                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-12 my-2'>
                        <h5 className={`text-${themeText} text-center`}>Concursos Lotofácil - {concursos.length > 0 ? '#' + concursos[idConcurso].concurso : 'Carregando..'}</h5>
                    {changeConcurso()}
                    </div>
                    <table className={`table table-${theme} table-striped`}>
                        <thead>
                            <tr>
                                <th>Jogos</th>
                                <th>Soma</th>
                                <th>Pontos</th>
                            </tr>
                        </thead>
                        <tbody>
                            {jogos.map((jogo, i) => {
                                return <tr><td><button className='btn bg-warning fw-bold text-dark' onClick={() => openModal(i)} data-bs-toggle="modal" data-bs-target="#modalNum" >{`Visualizar Jogo #${i+1}`}</button></td>
                                <td>{jogo.reduce((acc,v) => acc + v, 0)}</td>
                                <td>{sorteados.length > 0 ? checkPontos(sorteados.reduce((acc, v) => acc + (jogo.includes(v) ? 1 : 0), 0)) : 0}</td>
                                </tr>
                            })}
                          
                        </tbody>
                    </table>
                </div>
            
                <div className="row">
                    
                    <div className="col-md-6 col-sm-12">
                            <QuadoNumerosSorteados inicio={1} fim={5} retornar={(num, t) => changeNumerosSorteado(num, t)} classesNumero={`text-${theme} p-2 mb-1 me-1 col rounded-3 text-center fw-bold`} classesQuadro={`row`} />
                            <QuadoNumerosSorteados inicio={6} fim={10} retornar={(num, t) => changeNumerosSorteado(num, t)} classesNumero={`text-${theme} p-2 mb-1 me-1 col rounded-3 text-center fw-bold`} classesQuadro={`row`} />
                            <QuadoNumerosSorteados inicio={11} fim={15} retornar={(num, t) => changeNumerosSorteado(num, t)} classesNumero={`text-${theme} p-2 mb-1 me-1 col rounded-3 text-center fw-bold`} classesQuadro={`row`} />
                            <QuadoNumerosSorteados inicio={16} fim={20} retornar={(num, t) => changeNumerosSorteado(num, t)} classesNumero={`text-${theme} p-2 col mb-1 me-1 col rounded-3 text-center fw-bold`} classesQuadro={`row`} />
                            <QuadoNumerosSorteados inicio={21} fim={25} retornar={(num, t) => changeNumerosSorteado(num, t)} classesNumero={`text-${theme} p-2 col mb-1 me-1 col rounded-3 text-center fw-bold`} classesQuadro={`row`} />
                    </div>
                    <div className="col-md-3 col-sm-12">
                        <h4 className={`text-${themeText} text-center`}>Concursos Lotofacil</h4>
                        
                        {concurso.premiacoes && concurso.premiacoes.map(p => {
                            return <div className={`card bg-${theme}`}>
                                <div className="card-body">
                                    <h5 className={`card-title text-${themeText}`}>{p.descricao} - {concurso.data}</h5>
                                    <p className={`card-text text-${themeText}`}>Ganhadores: {new Intl.NumberFormat("pt-BR").format(p.ganhadores) || 0}</p>
                                    <p className={`card-text text-${themeText}`}>Prêmio: {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(p.valorPremio) || 0}</p>
                                </div>
                            </div>;
                        })}
                    </div>
                    <div className="col-md-3 col-sm-12">
                        <div className="d-grid gap-2 mx-auto">
                            <Link className={`btn text-${themeText} btn-outline-success`} to={'/lotofacil/grupos'}>Configuração de Grupos</Link>
                        </div>
                    </div>
                </div>
                <FooterComponent />
            </main>
            <ModalNumeros numeros={numeroModal} title={titleModal} pontos={pontosModal} resultado={sorteados}/>
        </div>
    );
}

export default Index;
