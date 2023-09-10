import React from 'react';

const QuadoNumeros = ({inicio, fim, retornar, classesQuadro, classesNumero}) => {
    const renderizaQuadro = () => {
        const result = [];
        for (let i = inicio; i <= fim; i++) {
            result.push(i)
        }
        return result;
    }
    return (
        <div className={`${classesQuadro}`}>
            {renderizaQuadro().map(i => <div className={`${classesNumero}`} onClick={(e) => retornar(i)}>{i}</div>)}
        </div>
    );
}

export default QuadoNumeros;
