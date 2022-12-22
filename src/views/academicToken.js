import React from 'react';

function AcademicToken(props) {

    function tranfere() {
        if (props.academic) {
            props.academic.pagarDisciplina(1)
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
            <button type="button" onClick={tranfere}>Transfere!</button>
        </div>
    )
}

export default AcademicToken;
