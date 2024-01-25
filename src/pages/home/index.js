import React from 'react';
import { useSelector } from 'react-redux'
import LinkListComponent from '../../components/LinkList.Component';
import FooterComponent from '../../components/Footer.Component';
import { Link } from 'react-router-dom';
import AnunciosGoogleComponent from '../../components/AnunciosGoogle.Component';
import { Calculator, Dice5, Robot } from 'react-bootstrap-icons';
const Index = () => {
    const theme = useSelector((state) => state.theme.value)
    const themeText = theme === 'dark' ? 'light' : 'dark';
    return (
        <div className='h-100'>
            <LinkListComponent />
            <main className={[theme, "container", "h-100", `bg-${theme}`].join(" ")}>
                <div className='row'>
                    <div>
                    <h2 className={`text-${themeText}`}>Novidades</h2>
                    <div className='row justify-content-start'>
                        <div className="card col-md-4 col-sm-12" >
                            
                            <div className="card-body">
                                <h4 className='h1'><Robot /></h4>
                                <h5 className="card-title">FMW - EA Experts</h5>
                                <p className="card-text">Robô para Metatrader 5, utilizando técnicas avançadas de suportes e resistências.</p>
                                <Link target='_blank' to={`https://www.mql5.com/en/market/product/109431?source=balancecrypto.com.br`} className="btn btn-primary">Conhecer</Link>
                                <Link target='_blank' to={`https://www.youtube.com/watch?v=DoAsJ-Vem60`} className="ms-1 btn btn-secondary">Saiba Mais</Link>
                               
                            </div>
                        </div>
                        <div className="card col-md-4 col-sm-12" >
                            
                            <div className="card-body">
                                <h4 className="h1"><Calculator /> </h4>
                                <h5 className="card-title">Calculadora Fundo Imobiliário</h5>
                                <p className="card-text">Está ferramenta auxilia o investidor no controle dos ativos imobiliário, com alguns detalhes sobre os rendimentos mensais e preço médio por ano.</p>
                                <Link to={`/fiis`} className="btn btn-primary">Conhecer</Link>
                                <button disabled className="ms-1 btn btn-secondary">Saiba Mais</button>
                            </div>
                        </div>

                        <div className="card col-md-4 col-sm-12">
                            
                            <div className="card-body">
                                <h4 className="h1"><Dice5 /></h4>
                                <h5 className="card-title">Gerador Lotofácil</h5>
                                <p className="card-text">Esta ferramenta é um gerador de jogos para Loteria Lotofácil. Esta possuí dados dos sorteios passados, sendo possível verificar pontos dos jogos gerados.</p>
                                <Link to={`/lotofacil`}  className="btn btn-primary">Conhecer</Link>
                                <button disabled className="ms-1 btn btn-secondary">Saiba Mais</button>
                            </div>
                        </div>

                        <div className="card col-md-4 col-sm-12 mt-1">
                           
                            <div className="card-body">
                                <h4 className="h1"><Calculator /></h4>
                                <h5 className="card-title">Calculadora Cryptomoeda</h5>
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
