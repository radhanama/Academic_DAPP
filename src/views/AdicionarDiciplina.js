import React from 'react';
import { useForm } from "react-hook-form";

function InserirDiciplina(props) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    async function inserir(diciplina) {
        if (props.academic) {
            var result = await props.academic.insert(parseInt(diciplina.id), diciplina.name, diciplina.professor)
                
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
            <label for="professor">professor address:</label>
            <input id="professor" {...register("professor", { required: true })} />
            {errors.exampleRequired && <span>This field is required</span>}
            <br></br>
            <input type="submit" />
        </form>
        <h3>get diciplina by id</h3>
            <GetDisciplinaById academic={props.academic}/>
            <h3>inserir anuno na diciplina</h3>
            <InserirAlunoNaDisciplina academic={props.academic}/>
        </>
    )
}

export function InserirAlunoNaDisciplina(props) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    async function inserir(diciplina) {
        if (props.academic) {
            var result = await props.academic.inserirAlunoNaDisciplina(parseInt(diciplina.id), parseInt(diciplina.alunoId))

        } else {
            throw new Error('Not connected');
        }
    }

    return (
        <form onSubmit={handleSubmit(inserir)}>
            <label for="id">diciplina id:</label>
            <input id="id" name="id" defaultValue="55" {...register("id", { required: true })} />
            {errors.exampleRequired && <span>This field is required</span>}
            <br></br>
            <label for="alunoid">alunoId:</label>
            <input id="alunoid" name="alunoid" {...register("alunoId", { required: true })} />
            {errors.exampleRequired && <span>This field is required</span>}
            <br></br>
            <input type="submit" />
        </form>
    )
}

export function GetDisciplinaById(props) {
    var loaded = false;
    var diciplina = {}
    const { register, handleSubmit, formState: { errors } } = useForm();
    async function getbyid(diciplina) {
        if (props.academic) {
            var result = await props.academic.getDisciplinaById(parseInt(diciplina.id))
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
        {loaded == false ? (<div>não carregado</div>): (
            <div>carregado</div>
        )}
        <div></div>
        </>
    )
}

export default InserirDiciplina;
