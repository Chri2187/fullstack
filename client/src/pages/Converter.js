import React, { useEffect, useState } from 'react';
import ConvertRow from '../components/ConvertRow';
import axios from 'axios';

const Converter = () => {
    // const exchangeURL = 'https://api.apilayer.com/currency_data/list';
    const exchangeURL = 'https://api.freecurrencyapi.com/v1/latest';

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

    useEffect(() => {
        axios
            .get(exchangeURL, {
                headers: {
                    apikey: 'fca_live_sOtcQp9nvyBoUxIq7du76twbgRqbOYd0ezqYqaF3',
                },
            })
            .then((res) => {
                let values = res.data;
                const firstCurrency = Object.keys(values.data)[0];
                console.log(firstCurrency);
                setCurrencyOptions([
                    res.data.base,
                    ...Object.keys(values.data),
                ]);
                setFromCurrency('USD');
                setToCurrency(firstCurrency);
                setExchangeRate(values[firstCurrency]);
            })
            .catch((error) => console.log('error', error));
    }, []);

    useEffect(() => {
        if (fromCurrency != null && toCurrency != null) {
            fetch(
                `${exchangeURL}?base_currency=${fromCurrency}&currencies=${toCurrency}`,
                {
                    headers: {
                        apikey: 'fca_live_sOtcQp9nvyBoUxIq7du76twbgRqbOYd0ezqYqaF3',
                    },
                }
            )
                .then((res) => res.json())
                .then((data) => {
                    setExchangeRate(data.data[toCurrency]);
                });
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
