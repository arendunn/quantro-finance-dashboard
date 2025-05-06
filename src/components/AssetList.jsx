import React, { useState, useContext } from 'react';
import { FinanceContext } from '../context/FinanceContext';

const AssetList = () => {
    const { assets } = useContext(FinanceContext);
    const { removeAssets } = useContext(FinanceContext);
    const [selected, setSelected] = useState([]);

    const toggleSelect = (id) => {
        setSelected((prevSelected) => {
            if (prevSelected.includes(id)) {
                return prevSelected.filter((item) => item !== id);
            } else {
                return [...prevSelected, id];
            }
        });
    }

    const deleteSelected = () => {
        selected.forEach((id) => {
            removeAssets(id);
        });
        setSelected([]);
    }

    const sortedAssets = assets.sort((a, b) => b.assetValue - a.assetValue);

    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        width: '35vh',
    };

    const grouped = assets.reduce((acc, asset) => {
        const type = asset.assetType;
        if (!acc[type]) {
            acc[type] = [];
        }
        acc[type].push(asset);
        return acc;
    }, {});

    const sortedTypes = Object.keys(grouped).sort((a, b) => a.localeCompare(b));

    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <div style={formStyle}>
                <span style={{ width: '100%', textAlign: 'center' }}>
                    <h2>Asset List</h2>
                    {sortedTypes.map(type => (
                        <div key={type}>
                            <h3 style={{ paddingRight: '50vh' }}>{type}</h3>
                            <ul>
                                {grouped[type].map(asset => (
                                    <li 
                                        key={asset.id} 
                                        style={{
                                            width: '100%',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            listStyleType: 'none',}}
                                        >
                                        <span>
                                            <input
                                                type="checkbox"
                                                checked={selected.includes(asset.id)}
                                                onChange={() => toggleSelect(asset.id)}
                                            />
                                            {asset.assetAmount}x {asset.assetName}
                                        </span>
                                        <span>
                                            ${asset.assetValue.toFixed(2)}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                            <div style={{ width: '100%', display: 'flex', justifyContent: 'end' }}>
                                <h4>
                                    {(() => {
                                        const total = grouped[type].reduce((acc, asset) => acc + (asset.assetValue * asset.assetAmount), 0);  // Calculate total value
                                        return `${total < 0 ? '- $' : '$'}${Math.abs(total).toLocaleString()}`;  // Adding commas for total and formatting
                                    })()}
                                </h4>
                            </div>
                        </div>
                    ))}
                    {assets.length === 0 && (
                        <p>No assets available.</p>
                    )}
                    {assets.length > 0 && (
                        <button onClick={deleteSelected}>
                            Delete Selected
                        </button>
                    )}
                </span>
            </div>
        </div>
    )
}
export default AssetList;