import React from 'react';
import { useSelector } from 'react-redux'
import HeaderComponent from '../../components/Header.Component';
import CalculatorComponent from '../../components/Calculator.Component';
import AnunciosGoogleComponent from '../../components/AnunciosGoogle.Component';
import WalletComponent from '../../components/Wallet.Component';
import ListWalletComponent from '../../components/ListWallet.Component';
import TwitterComponent from '../../components/Twitter.Component';
import TokenRouterComponent from '../../components/TokenRouter.Component';
import ListCoinComponent from '../../components/ListCoin.Component';
import LinkListComponent from '../../components/LinkList.Component';

const Index = () => {
    const theme = useSelector((state) => state.theme.value)
    return (
        <div className='h-100'>
            <LinkListComponent />
            <main className={[theme, "container", "h-100", `bg-${theme}`].join(" ")}>
                <div className="row">
                    <div className="col-12 col-md-8">
                        <CalculatorComponent />
                    </div>
                    <div className="col-12 col-md-4" >
                       <WalletComponent />
                        <ListWalletComponent />
                        <AnunciosGoogleComponent />

                    </div>
                </div>
               
                <div className='container-fluid'>
                    <div className="row">
                        <div className="col-12 col-md-6">
                        <ListCoinComponent />
                        </div>
                        <div className="col-12 col-md-6">
                            <TwitterComponent />
                        </div>
                    </div>
                    
                        <TokenRouterComponent />
                </div>
            </main>
        </div>
    );
}

export default Index;
