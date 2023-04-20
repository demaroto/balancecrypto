import React, { useState } from 'react';
import Select from 'react-select';
import { SearchCoin } from '../services/coingecko';

const Select2CoinsComponent = (props) => {

    const [isLoading, setIsLoading] = useState(false);
    const [options, setOptions] = useState([])
    const [messageNoOptions, setMessageNoOptions] = useState('Type the name of token')

    const searchOption = (value) => {
        if (value.length >= 3) {
            const searchCoins = SearchCoin(value)
            setIsLoading(true)
            searchCoins.then(result => {
                
                if (result.coins.length > 0) {
                    
                    setIsLoading(false)
                    setMessageNoOptions('Type the name of token')
                    setOptions(result.coins.map(coin => ({value: String(coin.symbol).toLowerCase(), label: coin.name})))
                }else{
                    setIsLoading(false)
                    setMessageNoOptions('Not found token')
                }
            })
        }else{
            setMessageNoOptions('Type the name of token')
        }
    }
    
    return (
        <>
            <Select
                className="basic-single w-100 bg-dark"
                classNamePrefix="select"
                defaultValue={''}
                placeholder="Select a coin..."
                noOptionsMessage={() => { return messageNoOptions; }}
                isDisabled={false}
                isLoading={isLoading}
                isClearable={true}
                isRtl={false}
                isSearchable={true}
                name="coins"
                options={options}
                onInputChange={(value) => searchOption(value)}
                onChange={(value) => props.handleChange(value ? value.value : '')}
                
                
                
                
                
            />
        </>
    );
}

export default Select2CoinsComponent;
