import React from 'react';
import { useForm } from "react-hook-form";
import { useState } from 'react';

function InserirAluno(props) {
    return (<>
    
        <h3>InserirAluno</h3>
        <InsertAluno academic={props.academic} />
        <h3>GetAlunoById</h3>
        <GetAlunoById academic={props.academic} />
    </>
    )
}

function InsertAluno(props) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    async function inserir(aluno) {
        if (props.academic) {
            var result = props.academic.insert(parseInt(aluno.id), aluno.name, aluno.aluno)
            console.log(result)
        } else {
            throw new Error('Not connected');
        }
    }

    return (<>
        <form onSubmit={handleSubmit(inserir)}>
            <label for="id">id:</label>
            <input id="id" name="id" defaultValue="55" {...register("id", { required: true })} />
            {errors.exampleRequired && <span>This field is required</span>}
            <br></br>
            <label for="name">name:</label>
            <input id="name" name="name" {...register("name", { required: true })} />
            {errors.exampleRequired && <span>This field is required</span>}
            <br></br>
            <label for="aluno">aluno address:</label>
            <input id="aluno" name="aluno" {...register("aluno", { required: true })} />
            {errors.exampleRequired && <span>This field is required</span>}
            <br></br>
            <input type="submit" />
        </form>
    </>
    )
}


export function GetAlunoById(props) {
    var loaded = false;
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [aluno, setAluno] = useState()
    async function getbyid(diciplina) {
        if (props.academic) {
            var result = await props.academic.getAluno(parseInt(diciplina.id))
            setAluno(result)
            loaded = true;
            console.log(result)
        } else {
            throw new Error('Not connected');
        }
    }

    return (<>
        <form onSubmit={handleSubmit(getbyid)}>
            <label for="id">diciplina id:</label>
            <input id="id" name="id" defaultValue="55" {...register("id", { required: true })} />
            {errors.exampleRequired && <span>This field is required</span>}
            <br></br>
            <input type="submit" />
        </form>
    {aluno !== undefined?(<div>
    <p>nome: {aluno?.nome}</p>
    <p>endereço: {aluno?.aluno}</p>
    <p>graduado : {aluno?.isGraduated? "sim": "não"}</p></div>
    ):<div>nada</div>}
    </>
    )
}

export default InserirAluno;
