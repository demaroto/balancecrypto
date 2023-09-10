import React from 'react';
import { useSelector } from 'react-redux'
import LinkListComponent from '../../components/LinkList.Component';

const Index = () => {
    const theme = useSelector((state) => state.theme.value)
    const themeText = theme === 'dark' ? 'light' : 'dark';

    return (
        <div className='h-100'>
            <LinkListComponent />
            <main className={[theme, "container", "h-100", `bg-${theme}`].join(" ")}>
                <h1 className={`text-${themeText}`}>Lotofácil</h1>
                <div className='row'>
                    <div className='col-md-6 col-sm-12'>
                        <span className={`text-${themeText}`}>Quadro dos números</span>
                    </div>
                    <div className='col-md-6 col-sm-12'>
                        <span className={`text-${themeText}`}>Números Selecionados</span>
                        <div>
                            <span className={`text-${themeText}`}>Pares: 0 / Ímpares: 0</span>

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
