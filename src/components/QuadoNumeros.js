import React from 'react';
import { getNumeros } from '../services/lotofacil';

const QuadoNumeros = ({inicio, fim, retornar, classesQuadro, classesNumero}) => {
 
    const changeNum = (e, i) => {
        const selecionados = getNumeros()
        if (selecionados.includes(i)){
            e.target.classList.remove('bg-success');
            e.target.classList.add('bg-white');
        }else{
            e.target.classList.remove('bg-white');
            e.target.classList.add('bg-success');
        }
        retornar(i)
    }

    const getClassName = (i) => {
        const selecionados = getNumeros()
        return selecionados.includes(i) ? 'bg-success' : 'bg-white'
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

export default QuadoNumeros;
