import React, { useContext, useState} from "react";
import { FinanceContext } from "../context/FinanceContext";
import { v4 as uuidv4 } from "uuid";

const AssetForm = () => {
    const { addAssets } = useContext(FinanceContext);
    const [assetName, setAssetName] = useState('');
    const [assetType, setAssetType] = useState('');
    const [assetAmount, setAssetAmount] = useState('');
    const [assetValue, setAssetValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            assetName &&
            assetType &&
            parseFloat(assetAmount) > 0 &&
            parseFloat(assetValue) > 0
          ) {
            addAssets({
                id: uuidv4(),
                assetName,
                assetType,
                assetAmount: parseFloat(assetAmount),
                assetValue: parseFloat(assetValue),
            });
            setAssetName("");
            setAssetType("");
            setAssetAmount("");
            setAssetValue("");
        }
    };

    const formStyle = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        width: "35vh",
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
            <form onSubmit={handleSubmit} style={formStyle}>
                <h2>Add Assets</h2>
                <h3>Select Asset Type:</h3>
                <select
                    type="text"
                    placeholder="Asset Type"
                    value={assetType}
                    onChange={(e) => setAssetType(e.target.value)}
                    required
                >
                    <option value="">Select Asset Type</option>
                    <option value="Real Estate">Real Estate</option>
                    <option value="Stocks">Stocks</option>
                    <option value="Cryptocurrency">Cryptocurrency</option>
                    <option value="Cash">Cash</option>
                </select>
                <h3>Enter Asset Name:</h3>
                <input
                    type="text"
                    placeholder="BTC, MSFT, ect."
                    value={assetName}
                    onChange={(e) => setAssetName(e.target.value)}
                    required
                />
                <h3>Enter Asset Quantity</h3>
                <input
                    type="number"
                    placeholder="Quantity"
                    value={assetAmount}
                    onChange={(e) => setAssetAmount(e.target.value)}
                    required
                />
                <h3>Enter Asset Value</h3>
                <span>$
                    <input
                        type="number"
                        placeholder="Asset Value"
                        value={assetValue}
                        onChange={(e) => setAssetValue(e.target.value)}
                        required
                    />
                </span>
                <h3>
                    <button type="submit">Add Asset</button>
                </h3>
            </form>
        </div>
    );
}

export default AssetForm;