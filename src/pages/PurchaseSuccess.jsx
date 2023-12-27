import React from 'react';
import { MdDoneOutline } from "react-icons/md";



function PurchaseSuccess() {
    return (
        <div>
            <MdDoneOutline style={{ fontSize: '8.1em' , color: 'green'}}/>
            <h2 style={{  color: 'green'}}> Compra Realizada con exito! </h2>
        </div>
    );
}

export default PurchaseSuccess;