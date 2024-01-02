import React, { useEffect, useState } from 'react';
import ConvertRow from '../components/ConvertRow';
import axios from 'axios';

const Converter = () => {
    const exchangeURL = 'https://api.apilayer.com/currency_data/list';

    const [currencyOptions, setCurrencyOptions] = useState([]);
    const [fromCurrency, setFromCurrency] = useState();
    const [toCurrency, setToCurrency] = useState();
    const [exchangeRate, setExchangeRate] = useState();
    const [amount, setAmount] = useState(1);
    const [amountFromCurrency, setAmountFromCurrency] = useState(true);

    let toAmount, fromAmount;
    if (amountFromCurrency) {
        fromAmount = amount;
        toAmount = amount * exchangeRate;
    } else {
        toAmount = amount;
        fromAmount = toAmount / exchangeRate;
    }
    var myHeaders = new Headers();
    myHeaders.append('apikey', 'rmEFNRdDwRCT388vpCMGlYiWeXkvUdgp');

    var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders,
    };
    useEffect(() => {
        fetch(exchangeURL, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                console.log(result);
                console.log(...Object.keys(result));
                const firstCurrency = Object.keys(result)[0];
            })
            // .then((data) => {
            //     const firstCurrency = Object.keys(data.rates)[0];
            //     setCurrencyOptions([data.base, ...Object.keys(data.rates)]);
            //     setFromCurrency(data.base);
            //     setToCurrency(firstCurrency);
            //     setExchangeRate(data.rates[firstCurrency]);
            // })
            .catch((error) => console.log('error', error));
    }, []);

    useEffect(() => {
        if (fromCurrency != null && toCurrency != null) {
            fetch(`${exchangeURL}&base${fromCurrency}&symbols${toCurrency}`)
                .then((res) => res.json())
                .then((data) => setExchangeRate(data.rates[toCurrency]));
        }
    }, [fromCurrency, toCurrency]);

    const handleFromAmount = (e) => {
        setAmount(e.target.value);
        setAmountFromCurrency(true);
    };
    const handleToAmount = (e) => {
        setAmount(e.target.value);
        setAmountFromCurrency(false);
    };

    return (
        <main className='container mt-3 '>
            <div className='text-center my-5'>
                <h1>Converitore Euro - Dollaro</h1>
            </div>
            <div className='d-flex justify-content-center text-center'>
                <div className='shadow-lg p-3 mb-5 bg-body rounded'>
                    <ConvertRow
                        currencyOptions={currencyOptions}
                        selectedCurrency={fromCurrency}
                        onChangeCurrency={(e) =>
                            setFromCurrency(e.target.value)
                        }
                        onChangeAmount={handleFromAmount}
                        amount={fromAmount}
                    />
                    <div style={{ fontWeight: 'bold', fontSize: '2rem' }}>
                        =
                    </div>
                    <ConvertRow
                        currencyOptions={currencyOptions}
                        selectedCurrency={toCurrency}
                        onChangeCurrency={(e) => setToCurrency(e.target.value)}
                        onChangeAmount={handleToAmount}
                        amount={toAmount}
                    />
                </div>
            </div>
        </main>
    );
};

export default Converter;
