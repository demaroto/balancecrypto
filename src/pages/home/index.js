import React from 'react';
import { useSelector } from 'react-redux'
import LinkListComponent from '../../components/LinkList.Component';
import FooterComponent from '../../components/Footer.Component';
import { Link } from 'react-router-dom';
import AnunciosGoogleComponent from '../../components/AnunciosGoogle.Component';
import { Calculator, Dice5 } from 'react-bootstrap-icons';
const Index = () => {
    const theme = useSelector((state) => state.theme.value)
    const themeText = theme === 'dark' ? 'light' : 'dark';
    return (
        <div className='h-100'>
            <LinkListComponent />
            <main className={[theme, "container", "h-100", `bg-${theme}`].join(" ")}>
                <div className='row'>
                    <div className={`bg-${theme} p-5 rounded-lg mt-3`}>
                        <h1 className={`display-4 text-${themeText}`}>Seja bem-vindo!</h1>
                        <p className={`lead text-${themeText}`}>Este site contém ferramentas como calculadora de investimento de Crypto e Fiis, como geradores de jogos para loterias.</p>
                        <p className={`lead text-${themeText}`}>Não solicitamos nenhum dado pessoal, nem fazemos recomendações de investimentos. Todos geradores, calculadoras e outras ferramentas serão auxiliadores financeiros.</p>
                        <hr className="my-4" />
                    </div>

                    <div>
                    <h2 className={`text-${themeText}`}>Novidades</h2>
                    <div className='row justify-content-center'>
                        <div className="card col-md-4 col-sm-12" >
                            
                            <div className="card-body">
                                <h5 className="card-title"><Calculator /> Calculadora Fundo Imobiliário</h5>
                                <p className="card-text">Está ferramenta auxilia o investidor no controle dos ativos imobiliário, com alguns detalhes sobre os rendimentos mensais e preço médio por ano.</p>
                                <Link to={`/fiis`} className="btn btn-primary">Conhecer</Link>
                                <button disabled className="ms-1 btn btn-secondary">Saiba Mais</button>
                            </div>
                        </div>

                        <div className="card col-md-4 col-sm-12">
                            
                            <div className="card-body">
                                <h5 className="card-title"><Dice5 /> Gerador Lotofácil</h5>
                                <p className="card-text">Esta ferramenta é um gerador de jogos para Loteria Lotofácil. Esta possuí dados dos sorteios passados, sendo possível verificar pontos dos jogos gerados.</p>
                                <Link to={`/lotofacil`}  className="btn btn-primary">Conhecer</Link>
                                <button disabled className="ms-1 btn btn-secondary">Saiba Mais</button>
                            </div>
                        </div>

                        <div className="card col-md-4 col-sm-12">
                           
                            <div className="card-body">
                                <h5 className="card-title"><Calculator /> Calculadora Cryptomoeda</h5>
                                <p className="card-text">Esta calculadora, tem uma cara de Wallet (Cateira) Crypto, mas é calculadora mesmo. Esta o auxiliará nos preços dos ativos e dados reais de cada ativo.</p>
                                <Link to={`/token`} className="btn btn-primary">Conhecer</Link>
                                <button disabled className="ms-1 btn btn-secondary">Saiba Mais</button>
                            </div>
                        </div>

                        
                    </div>

                    </div>
                </div>
                <AnunciosGoogleComponent />
            <FooterComponent />
            </main>
        </div>
    );
}

export default Index;
