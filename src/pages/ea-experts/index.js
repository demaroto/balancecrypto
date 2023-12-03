import React, {useState} from 'react';
import { useSelector } from 'react-redux'
import LinkListComponent from '../../components/LinkList.Component';
import FooterComponent from '../../components/Footer.Component';
import { Link } from 'react-router-dom';
import { PlayBtn } from 'react-bootstrap-icons';

const Index = () => {
    const theme = useSelector((state) => state.theme.value)
    const themeText = theme === 'dark' ? 'light' : 'dark';
    return (
        <div className='h-100'>
             <LinkListComponent />
             <main className={[theme, "container", "h-100", `bg-${theme}`].join(" ")}>
                <h1 className={`text-${themeText}`}>FMW - Trading for Software</h1>
                <p className={`text-${themeText} h4`}>
                    This smart tool, once set up and launched, will analyze the chart and the price zones initially set. Placing orders according to the closing of prices in the chosen timeframe automatically.
                </p>
                <div className="row">
                    <div className="col-md-6 col-12 text-center">
                        <img className="img-fluid" src='/mockup_fmw.png' alt="Layout of EA Experts" />
                    </div>
                    <div className="col-md-6 col-12">
                        <p className={`text-${themeText}`}>
                            This Expert EA sets Stop Loss and Take Profit automatically. Moving the Stop Loss automatically when the opportunity arises to move and stay in the trade, until it reaches the Take Profit or changes the market direction ...
                        </p>
                        <p className={`text-${themeText} h2`}>
                            Start with FMW and you can go to sleep to your heart's content.
                        </p>
                        <ul className={`text-${themeText}`}>
                            <li>Multiple Charts</li>
                            <li>Stop Loss Moving Automatically</li>
                            <li>Automatic analysis</li>
                            <li>Opening Orders</li>
                        </ul>
                        <div className='row d-grid gap-2'>
                          
                                <Link className="btn btn-lg bg-success text-white" to={"#"}>Start Now</Link>
                                <Link className="btn btn-lg bg-primary text-white text-center" to={"#"}><PlayBtn /> Watch the video</Link>
                 
                        </div>
                    </div>
                </div>
                <div className="row mt-3">
                <div className="col-12 text-center">
                        <h3 className={`text-${themeText} text-start`}>Screenshots</h3>
                        <img className="img-fluid" src='/chart_fmw.png' alt="Print of Charts" />
                        <img className="img-fluid mt-5" src='/operation.jpg' alt="Print of Charts 2" />
                    </div>
                </div>
                
             </main>
        </div>
    );
}

export default Index;
