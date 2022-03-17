import "./App.css";
import {currencies, usdPresets} from "./constants";
import {useState} from "react";


function App() {
    const currenciesList = currencies;
    const defaultCurrency = currenciesList[0];
    const defaultPresets = usdPresets;
    const preSelectedPreset = defaultPresets[0];

    let [selectedCurrency, setSelectedCurrency] = useState(defaultCurrency);

    //"master" value
    let [value, setValue] = useState(preSelectedPreset.toString());

    //"slave" value
    let [presetsListPrettified, setPresetsListPrettified] = useState(defaultPresets);
    let [valuePrettified, setValuePrettified] = useState(preSelectedPreset.toString());

    const handleCurrencyChange = (code) => {
        const newCurrency = currenciesList.filter(value => value.code === code).pop()
        const newValue =  value / selectedCurrency.rate * newCurrency.rate;

        const isAmongPresets = presetsListPrettified.filter(preset => preset.toString() === valuePrettified).length > 0

        const convertPreset = (value) => {
            return value * newCurrency.rate;
        }

        const roundValue = (value) => {
          return Math.round(value);
        }

        const prettifyValue = (value) => {
            const shaver = Math.pow(10, value.toString().length - 1) / 2
            return Math.round(value / shaver) * shaver;
        }

        setValue(newValue.toString())

        setPresetsListPrettified(defaultPresets.map(convertPreset).map(roundValue).map(prettifyValue))
        setValuePrettified((isAmongPresets ? prettifyValue(roundValue(newValue)) : roundValue(newValue)).toString())

        setSelectedCurrency(newCurrency)
    }


    return <div className="App">
        <div className="widget-container">
            <div className="suggestions">
                {presetsListPrettified.map((preset) =>
                    (
                        <div className={value === preset.toString() ? "suggestion active" : "suggestion"}>
                            {preset}
                        </div>
                    )
                )
                }
            </div>
            <div className="input-container">
                <div className="currency-sign">
                    {(selectedCurrency.symbol)}
                </div>
                <div className="input">
                    <input type="number" value={valuePrettified} onChange={(event) => {
                        setValue(event.target.value)
                        setValuePrettified(event.target.value)
                    }}/>
                </div>
                <select value={selectedCurrency.code} onChange={(event => handleCurrencyChange(event.target.value))}>
                    {
                        currenciesList.map((currency) => (
                            <option key={currency.code} value={currency.code}>{currency.name}</option>
                        ))
                    }
                </select>
            </div>
        </div>
    </div>;
}

export default App;
