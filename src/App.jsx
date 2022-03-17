import "./App.css";
import {currencies, usdPresets} from "./constants";
import {useState} from "react";


function App() {
    const currenciesList = currencies;
    const defaultCurrency = currenciesList[0];

    let [selectedCurrency, setSelectedCurrency] = useState(defaultCurrency);

    let [presetsList, setPresetsList] = useState(usdPresets);
    let [value, setValue] = useState(presetsList[0].toString());

    let [presetsListPrettified, setPresetsListPrettified] = useState(usdPresets);
    let [valuePrettified, setValuePrettified] = useState(presetsList[0].toString());

    const handleCurrencyChange = (code) => {
        const newCurrency = currenciesList.filter(value => value.code === code).pop()

        const convertPreset = (value) => {
            return value * newCurrency.rate;
        }

        const convertValue = (value) => {
            return value / selectedCurrency.rate * newCurrency.rate;
        }

        const prettifyValue = (value) => {
            value = Math.round(value)
            const shaver = Math.pow(10, value.toString().length - 1) / 2
            return Math.round( value / shaver) * shaver;
        }

        setPresetsList(usdPresets.map(convertPreset))
        setValue(convertValue(value).toString())

        setPresetsListPrettified(usdPresets.map(convertPreset).map(prettifyValue))
        setValuePrettified(prettifyValue(convertValue(value)).toString())

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
                    <input type="number" value={valuePrettified} onChange={(event)=> {
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
