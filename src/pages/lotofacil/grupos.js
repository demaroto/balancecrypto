import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import LinkListComponent from '../../components/LinkList.Component';
import FooterComponent from '../../components/Footer.Component';
import QuadoNumerosGrupo from '../../components/QuadoNumerosGrupo';
const Grupos = () => {
    const theme = useSelector((state) => state.theme.value)
    const themeText = theme === 'dark' ? 'light' : 'dark';

    const changeSelecionado = (num,f) => {

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
                <FooterComponent />
            </main>
        </div>
    );
}

export default Grupos;
