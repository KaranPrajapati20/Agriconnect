import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from "./Navbar";

const Marketplace = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [market, setMarket] = useState('');
  const [commodity, setCommodity] = useState('');
  const [query, setQuery] = useState('');
  const [filteredStates, setFilteredStates] = useState([]);

  const apiKey = '579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b';
  const apiUrl = 'https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070';

  const allStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat',
    'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh',
    'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh',
    'Uttarakhand', 'West Bengal'
  ];

  useEffect(() => {
    if (query) {
      setLoading(true);

      const params = {
        'api-key': apiKey,
        format: 'json'
      };
      
      if (state) params['filters[state]'] = state;
      if (district) params['filters[district]'] = district;
      if (market) params['filters[market]'] = market;
      if (commodity) params['filters[commodity]'] = commodity;

      axios.get(apiUrl, { params })
        .then(response => {
          setData(response.data.records || []);
          setLoading(false);
        })
        .catch(err => {
          setError(err);
          setLoading(false);
        });
    }
  }, [query]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'state') {
      setState(value);
      if (value) {
        const filtered = allStates.filter((state) =>
          state.toLowerCase().startsWith(value.toLowerCase())
        );
        setFilteredStates(filtered);
      } else {
        setFilteredStates([]);
      }
    } else if (name === 'district') {
      setDistrict(value);
    } else if (name === 'market') {
      setMarket(value);
    } else if (name === 'commodity') {
      setCommodity(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setQuery(state.trim());
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl mb-6 md:text-3xl font-bold text-left border-l-4 border-green-500 pl-4">Commodity Price</h1>

        <form onSubmit={handleSubmit} className="mb-4 p-4 border rounded-lg shadow-md flex flex-wrap gap-4">
          <input
            name="state"
            list="states"
            type="text"
            value={state}
            onChange={handleInputChange}
            className="p-2 border rounded flex-grow"
            placeholder="Enter state"
          />
          <datalist id="states">
            {filteredStates.map((stateOption, index) => (
              <option key={index} value={stateOption} />
            ))}
          </datalist>

          <input
            name="district"
            type="text"
            value={district}
            onChange={handleInputChange}
            className="p-2 border rounded flex-grow"
            placeholder="Enter district (optional)"
          />
          <input
            name="market"
            type="text"
            value={market}
            onChange={handleInputChange}
            className="p-2 border rounded flex-grow"
            placeholder="Enter market (optional)"
          />
          <input
            name="commodity"
            type="text"
            value={commodity}
            onChange={handleInputChange}
            className="p-2 border rounded flex-grow"
            placeholder="Enter commodity (optional)"
          />

          <button type="submit" className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Search
          </button>
        </form>

        {loading ? (
          <div className="flex justify-center items-center h-32">
            <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <p className="text-center text-red-500">Error fetching data: {error.message}</p>
        ) : data.length > 0 ? (
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr>
                {['State', 'District', 'Market', 'Commodity', 'Date', 'Min Price', 'Max Price', 'Average Price'].map((header) => (
                  <th key={header} className="border p-2 bg-gray-100">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td className="border p-2">{item.state}</td>
                  <td className="border p-2">{item.district}</td>
                  <td className="border p-2">{item.market}</td>
                  <td className="border p-2">{item.commodity}</td>
                  <td className="border p-2">{item.arrival_date}</td>
                  <td className="border p-2">{item.min_price}</td>
                  <td className="border p-2">{item.max_price}</td>
                  <td className="border p-2">{item.modal_price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-500">No data available for the selected filters</p>
        )}
      </div>
    </>
  );
};

export default Marketplace;
