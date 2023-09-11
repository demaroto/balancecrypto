import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import LinkListComponent from '../../components/LinkList.Component';
import QuadoNumeros from '../../components/QuadoNumeros';
import { setNumeros, getNumeros } from '../../services/lotofacil';


const Index = () => {
    const theme = useSelector((state) => state.theme.value)
    const themeText = theme === 'dark' ? 'light' : 'dark';
    const [impares, setImpares] = useState(0)
    const [pares, setPares] = useState(0)

    const changeNumerosSelecionados = (numero) => {
           
        const nums = getNumeros()
        if (nums.includes(numero)) {
            let res = nums.filter(n => numero !== n)
            
            setNumeros(res.sort((a,b) => a - b))
            
        }else{
            let numeros = nums
            numeros.push(numero)
            setNumeros(numeros.sort((a,b) => a - b))
         
        }
        changeImpares() 

    }

    const changeImpares = () => {
        const nums = getNumeros()
        if (nums.length > 0){
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
            setPares(0)
            setImpares(0)
        }
    }

    useEffect(() => {
        changeImpares()
    }, []);

    return (
        <div className='h-100'>
            <LinkListComponent />
            <main className={[theme, "container", "h-100", `bg-${theme}`].join(" ")}>
                <h1 className={`text-${themeText}`}>Lotofácil</h1>
                <div className='row'>
                    <div className='col-md-6 col-sm-12'>
                        <QuadoNumeros inicio={1} fim={5} retornar={(num) => changeNumerosSelecionados(num)} classesNumero={`text-${theme} p-2 mb-1 me-1 col rounded-3 text-center`} classesQuadro={`row`} />
                        <QuadoNumeros inicio={6} fim={10} retornar={(num) => changeNumerosSelecionados(num)} classesNumero={`text-${theme} p-2 col mb-1 me-1 col rounded-3 text-center`} classesQuadro={`row`} />
                        <QuadoNumeros inicio={11} fim={15} retornar={(num) => changeNumerosSelecionados(num)} classesNumero={`text-${theme} p-2 col mb-1 me-1 col rounded-3 text-center`} classesQuadro={`row`} />
                        <QuadoNumeros inicio={16} fim={20} retornar={(num) => changeNumerosSelecionados(num)} classesNumero={`text-${theme} p-2 col mb-1 me-1 col rounded-3 text-center`} classesQuadro={`row`} />
                        <QuadoNumeros inicio={21} fim={25} retornar={(num) => changeNumerosSelecionados(num)} classesNumero={`text-${theme} p-2 col mb-1 me-1 col rounded-3 text-center`} classesQuadro={`row`} />
                    </div>
                    <div className='col-md-6 col-sm-12'>
                        <div className='text-center'>
                            <span className={`text-${themeText} h4`}>Pares: {pares} / Ímpares: {impares}</span>

                        </div>
                    </div>
                </div>
                <div className='row'>
                    <table className={`table table-${theme} table-striped`}>
                        <thead>
                            <tr>
                                <th>Jogos</th>
                                <th>Soma</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td>Jogo 1</td><td>0</td></tr>
                            <tr><td>Jogo 2</td><td>0</td></tr>
                            <tr><td>Jogo 3</td><td>0</td></tr>
                            <tr><td>Jogo 4</td><td>0</td></tr>
                            <tr><td>Jogo 5</td><td>0</td></tr>
                            <tr><td>Jogo 6</td><td>0</td></tr>
                            <tr><td>Jogo 7</td><td>0</td></tr>
                            <tr><td>Jogo 8</td><td>0</td></tr>
                            <tr><td>Jogo 9</td><td>0</td></tr>
                            <tr><td>Jogo 10</td><td>0</td></tr>
                        </tbody>
                    </table>
                </div>
                <div class="d-flex justify-content-end">
                    <button type="button" className='btn bg-warning' onClick={() => alert('Gerar resultado')}>Ver resultado</button>
                </div>
            </main>
        </div>
    );
}

export default Index;
