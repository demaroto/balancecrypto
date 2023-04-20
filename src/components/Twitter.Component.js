import React, { useState, useEffect } from 'react';
import { Timeline } from 'react-twitter-widgets'
import { useSelector } from 'react-redux'

const TwitterComponent = () => {

    const twitter = useSelector((state) => state.twitter.value)
    const theme = useSelector((state) => state.theme.value)
    const [twitterPage, setTwitterPage] = useState(null)
    const randomPage = (min, max) => {
        // get number between min (inclusive) and max (inclusive)
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const listPages = [
        'BabyDogeCoin',
        'dogecoin',
        'ShibToken',
        'Bitcoin',
        'ethereum',
        'Tether_to',
        'binance',
        'Ripple',
        'Cardano_CF',
        'LidoFinance',
        '0xPolygon',
        'solana',
        'Polkadot',
        'LTCFoundation',
        'trondao',
        'AaveAave',
        'PancakeSwap',
        'HuobiGlobal',
        'loopringorg'
    ]
  
    useEffect(() => {
        console.log(twitter)
        getPage()
    }, [twitter]);

    const getPage = () => {
        const page = randomPage(0, listPages.length)
        setTwitterPage(twitter != null ? twitter : listPages[page])
    }
    return (
        <div>
            <Timeline
                dataSource={{
                    sourceType: 'profile',
                    screenName: twitterPage || getPage()
                }}
                renderError={_err =>
                    ''
                  }
                options={{
                    height: '400',
                    theme: theme
                }}
                />
        </div>
    );
}

export default TwitterComponent;
