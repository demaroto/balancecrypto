import React, { useEffect, useState } from 'react';
import { getNumeros, getFixoNumero, getNumeroEliminadoGrupo, setNumeroEliminadoGrupo } from '../services/lotofacil';
import { useSelector } from 'react-redux';

const QuadoNumerosGrupo = ({inicio, fim, retornar, classesQuadro, classesNumero}) => {
 
    const theme = useSelector((state) => state.theme.value)
    const themeText = theme === 'dark' ? 'light' : 'dark';
    const [numFixado, setNumFixado] = useState(null)
    const changeNum = (e, i) => {
        setNumeroEliminadoGrupo([i])
        window.location.reload()
    }

    useEffect(() => {
       const fix = getFixoNumero()
       setNumFixado(fix[0])
    }, []);

    useEffect(() => {
        renderizaQuadro()
    }, [numFixado]);

    const getClassName = (i) => {
        const selecionados = getNumeroEliminadoGrupo()
        return selecionados.length ? selecionados.includes(i) ? 'bg-danger text-white' : `bg-success text-${themeText}` : 'bg-white text-dark'
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

export default QuadoNumerosGrupo;
