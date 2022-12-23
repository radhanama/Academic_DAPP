import React from 'react';
import { useForm } from "react-hook-form";

function InserirAluno(props) {
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
        <h3>get aluno by id</h3>
        <GetAlunoById academic={props.academic} />
    </>
    )
}


export function GetAlunoById(props) {
    var loaded = false;
    var diciplina = {}
    const { register, handleSubmit, formState: { errors } } = useForm();
    async function getbyid(diciplina) {
        if (props.academic) {
            var result = await props.academic.getAluno(parseInt(diciplina.id))
            loaded = true;
            diciplina = result
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
        {loaded == false ? (<div>não carregado</div>) : (
            <div>carregado</div>
        )}
        <div></div>
    </>
    )
}

export default InserirAluno;
