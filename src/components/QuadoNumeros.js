import React, { useEffect, useState } from 'react';
import { getNumeros, getFixoNumero } from '../services/lotofacil';
import { useSelector } from 'react-redux';

const QuadoNumeros = ({inicio, fim, retornar, classesQuadro, classesNumero}) => {
 
    const theme = useSelector((state) => state.theme.value)
    const themeText = theme === 'dark' ? 'light' : 'dark';
    const [numFixado, setNumFixado] = useState(null)
    const changeNum = (e, i) => {
        const selecionados = getNumeros()
       if (selecionados.length < 18) {
           if (selecionados.includes(i)){
               e.target.classList.remove('bg-success');
               e.target.classList.add('bg-white');
           }else{
               e.target.classList.remove('bg-white');
               e.target.classList.add('bg-success');
           }
           retornar(i, null)
       }else {
        if (selecionados.includes(i)) {
            let confirmed = window.confirm('Deseja fixar o número ' + i + '?')
            if(confirmed) {
                e.target.classList.remove('bg-success');
                e.target.classList.add('bg-warning');
                setNumFixado(i)
                retornar(i, i)
                window.location.reload()
            }else{
                e.target.classList.remove('bg-success');
                e.target.classList.add('bg-white');
                retornar(i, null)
            }
        }
       }
    }

    useEffect(() => {
       const fix = getFixoNumero()
       setNumFixado(fix[0])
    }, []);

    useEffect(() => {
        renderizaQuadro()
    }, [numFixado]);

    const getClassName = (i) => {
        const selecionados = getNumeros()
        
        return numFixado === i ? 'bg-warning fw-bold' : selecionados.includes(i) ? 'bg-success text-white' : `bg-${themeText} text-${theme}`
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
