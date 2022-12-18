import React from 'react';

function AcademicCertificate(props) {

    function awardCertificate() {
        if (props.academic) {
            props.academic.awardCertificate(1)
                .them(
                    x => {
                        if (x === undefined)
                            throw new Error("Cannot make this operation")
                    });
        } else {
            throw new Error('Not connected');
        }
    }

    return (
        <div>
            <button type="button" onClick={awardCertificate}>Receber meu certificado!</button>
        </div>
    )
}

export default AcademicCertificate;
