import React from 'react';
import { useSelector } from 'react-redux'
import LinkListComponent from '../../components/LinkList.Component';
import FooterComponent from '../../components/Footer.Component';
import { Link } from 'react-router-dom';
import AnunciosGoogleComponent from '../../components/AnunciosGoogle.Component';
const Index = () => {
    const theme = useSelector((state) => state.theme.value)
    const themeText = theme === 'dark' ? 'light' : 'dark';
    return (
        <div className='h-100'>
            <LinkListComponent />
            <main className={[theme, "container", "h-100", `bg-${theme}`].join(" ")}>
                <div className='row'>
                    <div className={`bg-${theme} p-5 rounded-lg m-3`}>
                        <h1 className={`display-4 text-${themeText}`}>Seja bem-vindo!</h1>
                        <p className={`lead text-${themeText}`}>Este site contém ferramentas como calculadora de investimento de Crypto e Fiis, como geradores de jogos para loterias.</p>
                        <p className={`lead text-${themeText}`}>Não solicitamos nenhum dado pessoal, nem fazemos recomendações de investimentos. Todos geradores, calculadoras e outras ferramentas são auxiliadores, todas elas são gratuitas neste portal.</p>
                        <hr className="my-4" />
                        <p className={`text-${themeText}`}>Estou continuamente desenvolvendo calculadoras úteis referente a recursos monetários. Em breve, atualizaremos com mais recurso.</p>
                        
                        <Link className="btn bg-dark text-white btn-lg">Obrigado!   </Link>
                    </div>
                </div>
                <AnunciosGoogleComponent />
            <FooterComponent />
            </main>
        </div>
    );
}

export default Index;
