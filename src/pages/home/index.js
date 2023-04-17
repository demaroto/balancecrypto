import React from 'react';
import { useSelector } from 'react-redux'
import HeaderComponent from '../../components/Header.Component';
import CalculatorComponent from '../../components/Calculator.Component';
import AboutCryptoComponent from '../../components/AboutCrypto.Component';
import AnunciosGoogleComponent from '../../components/AnunciosGoogle.Component';
import WalletComponent from '../../components/Wallet.Component';
import ListWalletComponent from '../../components/ListWallet.Component';
const Index = () => {
    const theme = useSelector((state) => state.theme.value)
    return (
        <div className='h-100'>
            <HeaderComponent />
            <main className={[theme, "container", "h-100", `bg-${theme}`].join(" ")}>
                <div className="row">
                    <div className="col-12 col-md-8">
                        <CalculatorComponent />
                        <AboutCryptoComponent />
                    </div>
                    <div className="col-12 col-md-4" >
                       <WalletComponent />
                        <AnunciosGoogleComponent />
                        <ListWalletComponent />

                    </div>
                </div>
               
            </main>
        </div>
    );
}

export default Index;
