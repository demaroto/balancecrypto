import React from 'react';
import { useSelector } from 'react-redux';

const ModalNumeros = ({numeros, title, pontos}) => {

    const theme = useSelector((state) => state.theme.value)
    const themeText = theme === 'dark' ? 'light' : 'dark';

    return (
        <div className={`modal fade`} tabindex="-1" id="modalNum">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{title}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                    
                        {numeros.map(n => <div className={`col-3 border border-${pontos.includes(n) ? 'dark' : 'warning'} rounded-3 bg-${pontos.includes(n) ? 'danger' : theme} text-${themeText}`} ><h4 className='text-center align-middle'>{n}</h4></div>)}
                        
                        
                        </div>
                    </div>
                    <div className='modal-footer fw-bold'>
                        Soma: {numeros.reduce((acc, n) => acc +n, 0)} | Pares: {numeros.filter(n => n % 2 === 0).length} | Ímpares: {numeros.filter(n => n % 2 === 1).length} | Pontos: {pontos.length || 0}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                       
                    </div>
                    </div>
                </div>
            </div>
    );
}

export default ModalNumeros;
