import React, {useState, useEffect} from 'react';

import { calcYieldByMonth } from '../services/fiis';
import { Meses } from '../utils/meses'
const DashboardBlockComponent = (props) => {

    const [listAtivos, setListAtivos] = useState([])
   
    useEffect(() => {
        
        
    }, []);

    return (
                <table className={`table text-${props.themeText}`} id='ativos_fiis'>
                                <thead>
                                    <th>Ativo</th>
                                    <th>Valor Ativo</th>
                                    <th>Valor Aporte</th>
                                    <th>Mês Aporte</th>
                                    <th>Ano Aporte</th>
                                    <th>DY Média Mensal</th>
                                    <th>Cotas</th>
                                    <th>Rendimento / Mês</th>
                                </thead>
                                <tbody>
                                    {listAtivos.map((v, i) => {
                                        return (<tr key={i}>
                                            <td>{v.ativo}</td>
                                            <td>{v.valorAtivo}</td>
                                            <td>{parseFloat(v.valorAporte).toFixed(2)}</td>
                                            <td>{Meses[v.mes]}</td>
                                            <td>{v.ano}</td>
                                            <td>{v.dy}%</td>
                                            <td>{parseInt(v.valorAporte / v.valorAtivo) || 0}</td>
                                            <td>R$ {calcYieldByMonth(listAtivos, v.ano, v.mes, v.ativo) || 0}</td>
                                            </tr>)
                                    })}
                                </tbody>
                            </table>
                     
    );
}

export default DashboardBlockComponent;
