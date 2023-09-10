import React from "react";

const Numeros = ({numeros}) => {
    return <div className="row">
        {numeros.map(s => (<div key={s} className={`m-1 col-1 text-center text-dark bg-light rounded-3`}>{s}</div>))} 
    </div>
  };

export default Numeros