import React from 'react';
import { useSelector } from 'react-redux'
import LinkListComponent from '../../components/LinkList.Component';
import FooterComponent from '../../components/Footer.Component';
import { Link } from 'react-router-dom';
import AnunciosGoogleComponent from '../../components/AnunciosGoogle.Component';
import { Calculator, Dice5, Instagram, Robot, Youtube } from 'react-bootstrap-icons';
import './links.css';
const Index = () => {
    const theme = useSelector((state) => state.theme.value)
    const themeText = theme === 'dark' ? 'light' : 'dark';
    return (
        <div className={`h-100 bg-${theme}`}>
               <LinkListComponent />
            <main className={[theme, "container-fluid", "h-100", `bg-${theme}`].join(" ")}>
           
                    
               
                    <div className='row h-100 justify-content-center align-items-center'>
                        <div className="card col-10 p-0" >
                            
                            <Link target='_blank' to={`https://www.mql5.com/en/market/product/109431?source=balancecrypto.com.br`} className="btn btn-primary">
                            <div>
                                <h4 className='h1'><Robot /></h4>
                                <h5 className="card-title">FMW Auto Trend - MQL5</h5>
                            </div>
                            </Link>

                            <Link target='_blank' to={`https://www.youtube.com/channel/UCeo2jrw9dmSUmgugM5jDQhg`} className="btn btn-danger mt-2">
                            <div>
                                <h4 className='h1'><Youtube /></h4>
                                <h5 className="card-title">FMW Auto Trend - Youtube</h5>
                            </div>
                            </Link>

                            <Link target='_blank' to={`https://www.instagram.com/balancecrypto2024/`} className="btn bg-pink mt-2">
                            <div>
                                <h4 className='h1'><Instagram /></h4>
                                <h5 className="card-title">FMW Auto Trend - Instagram</h5>
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
