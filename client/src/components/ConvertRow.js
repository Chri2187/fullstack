export default function ConvertRow(props) {
    const {
        currencyOptions,
        selectedCurrency,
        onChangeCurrency,
        amount,
        onChangeAmount,
    } = props;
    return (
        <div className='input-group my-3 justify-content-end  '>
            <input
                type='number'
                className='form-control'
                value={amount}
                onChange={onChangeAmount}
            />
            <select
                className='form-select '
                value={selectedCurrency}
                onChange={onChangeCurrency}
            >
                {currencyOptions.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
}
