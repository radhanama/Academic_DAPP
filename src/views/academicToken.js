import React from 'react';

function AcademicToken (props){

    function tranfere()
    {
        if(props.academic){
            props.academic.transfer("0x70997970C51812dc3A010C7d01b50e0d17dc79C8", 1)
        }
    }
    
	return (
    <>
    <div>
    <button type="button" onClick={tranfere}>Transfere!</button> 
    </div>
    </>
    )
}

export default AcademicToken;
