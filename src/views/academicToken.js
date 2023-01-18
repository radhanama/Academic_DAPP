import React from 'react';

function AcademicToken(props) {

    async function tranfere() {
        if (props.academic) {
            var result = await props.academic.pagarDisciplina(1)
            console.log(result)
            const test = await result.wait()
            console.log(test)
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
