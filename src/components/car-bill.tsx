import React from 'react';

const CarDepreciation = () => {
  const carName = 'Honda Civic';
  const purchaseYear = 2020;
  const purchasePrice = 1000000; // ₹10,00,000
  const lifespan = 12;
  const currentYear = new Date().getFullYear();
  const depreciationPerYear = purchasePrice / lifespan;

  const generateDepreciationData = () => {
    const data = [];
    for (let i = 0; i < lifespan-1; i++) {
      const year = purchaseYear + i;
      const value = Math.max(purchasePrice - depreciationPerYear * (i + 1), 0);
      data.push({
        year,
        value: value.toFixed(2),
      });
    }
    return data;
  };

  const depreciationData = generateDepreciationData();

  return (
    <div className="p-4 max-w-xl mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-2">Depreciation: {carName}</h2>
      <p className="mb-4">
        Purchased in {purchaseYear} for ₹{purchasePrice.toLocaleString()} with a lifespan of {lifespan} years.
      </p>
      <table className="w-full text-left border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Year</th>
            <th className="p-2 border">Value at Year-End (₹)</th>
          </tr>
        </thead>
        <tbody>
          {depreciationData.map(({ year, value }) => (
            <tr key={year} className={year === currentYear ? 'bg-yellow-100' : ''}>
              <td className="p-2 border">{year}</td>
              <td className="p-2 border">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CarDepreciation;
