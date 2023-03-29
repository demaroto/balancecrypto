import React from 'react';
import { useSelector } from 'react-redux'
import HeaderComponent from '../../components/Header.Component';

import ListCoinComponent from '../../components/ListCoin.Component';
import ListWalletComponent from '../../components/ListWallet.Component';
import WalletComponent from '../../components/Wallet.Component';

const Index = () => {
    const theme = useSelector((state) => state.theme.value)
    return (
        <div className='h-100'>
            <HeaderComponent />
            <main className={[theme, "container", "h-100", `bg-${theme}`].join(" ")}>
                <div className="row">
                    <div className="col-12 col-md-8">
                        <WalletComponent />
                        <ListWalletComponent />
                    </div>
                    <div className="col-12 col-md-4" >
                       <ListCoinComponent />
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Index;
