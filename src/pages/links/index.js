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
        <div className={`h-100 bg-${theme}`}>
               <LinkListComponent />
            <main className={[theme, "container-fluid", "h-100", `bg-${theme}`].join(" ")}>
           
                    
               
                    <div className='row h-100 justify-content-center align-items-center'>
                        <div className="card col-10" >
                            
                            <Link target='_blank' to={`https://www.mql5.com/en/market/product/109431?source=balancecrypto.com.br`} className="btn btn-primary">
                            <div>
                                <h4 className='h1'><Robot /></h4>
                                <h5 className="card-title">FMW Auto Trend - EA Experts</h5>
                                <p className="card-text">Robô para Metatrader 5, utilizando técnicas avançadas de suportes e resistências.</p>
                            </div>
                            </Link>
                        </div>
                    
                

                    
                </div>
                <AnunciosGoogleComponent />
            <FooterComponent />
            </main>
        </div>
    );
}

export default Index;
