import React, { useState } from "react";
import "./index.css";

export default function StockData() {

  const [d, setD] = useState(null);
  const [data, setData] = useState([]);
  const [noRes, setRes] = useState(null);

  const getDate = (e) => {
    setD(e.target.value);
  }

  const getData = async () => {
    if(d) {
      const values = await fetch(`https://jsonmock.hackerrank.com/api/stocks?date=${d}`);
      const jsonValues = await values.json();
      console.log(jsonValues);

      if(jsonValues.data.length){
        setRes(null);
        setData(jsonValues.data);
      } else {
        setRes('No Results Found');
        setData([]);
      }
    }
  }

  return (
    <div className="layout-column align-items-center mt-50">
      <section className="layout-row align-items-center justify-content-center">
        <input type="text" className="large" placeholder="5-January-2000" id="app-input" data-testid="app-input" onChange={(e)=>getDate(e)}/>
        <button className="" id="submit-button" data-testid="submit-button" onClick={()=>getData()}>Search</button>
      </section>
        {data.length ? data.map(item => {
          return <ul key={`Ul_${item.page}`} className="mt-50 slide-up-fade-in styled" id="stockData" data-testid="stock-data">
          <li className="py-10" key={`open_${item.page}`}>{`Open: ${item.open}`}</li>
          <li className="py-10" key={`close_${item.page}`}>{`Close: ${item.close}`}</li>
          <li className="py-10" key={`high_${item.page}`}>{`High: ${item.high}`}</li>
          <li className="py-10" key={`low_${item.page}`}>{`Low: ${item.low}`}</li>
          </ul>
        }): null}
        {noRes && <div className="mt-50 slide-up-fade-in" id="no-result" data-testid="no-result">{noRes}</div>}
    </div>
  );
}
