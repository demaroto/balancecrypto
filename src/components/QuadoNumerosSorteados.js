import React from 'react';
import { getNumerosSorteados, setNumerosSorteados } from '../services/lotofacil';

const QuadoNumerosSorteados = ({inicio, fim, retornar, classesQuadro, classesNumero}) => {
 
    const changeNum = (e, i) => {
        const sorteados = getNumerosSorteados()
        if (sorteados.includes(i)) {
            const numeros = sorteados.filter(s => s !== i)
            e.target.classList.remove('bg-warning');
            e.target.classList.add('bg-white');
            setNumerosSorteados(numeros)
        }else{
            if (sorteados.length < 15) {
                const numeros = sorteados
                numeros.push(i)
                e.target.classList.remove('bg-white');
                e.target.classList.add('bg-warning');
                setNumerosSorteados(numeros)
            }
        }

        retornar(i, 15)
    }

    

  

    const getClassName = (i) => {
        const sorteados = getNumerosSorteados()
        
        return sorteados.includes(i) ? 'bg-warning' : 'bg-white'
    }
    const renderizaQuadro = () => {
        const result = [];
        for (let i = inicio; i <= fim; i++) {
            result.push(i)
        }
        return result;
    }
    return (
       <div className={`${classesQuadro}`}>
            {renderizaQuadro().map(i => <div className={`${classesNumero} ${getClassName(i)}`} key={i} style={{cursor: 'pointer'}} onClick={(e) => changeNum(e, i)}>{i}</div>)}
        </div>
    );
}

export default QuadoNumerosSorteados;
