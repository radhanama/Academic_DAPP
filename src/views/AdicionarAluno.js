import React from 'react';
import { useForm } from "react-hook-form";

function InserirAluno(props) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    function inserir(aluno) {
        if (props.academic) {
            props.academic.insert(parseInt(aluno.id), aluno.name)
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
        <form onSubmit={handleSubmit(inserir)}>
            <label for="id">id:</label>
            <input id="id" name="id" defaultValue="55" {...register("id", { required: true })} />
            {errors.exampleRequired && <span>This field is required</span>}
            <br></br>
            <label for="name">name:</label>
            <input id="name" name="name" {...register("name", { required: true })} />
            {errors.exampleRequired && <span>This field is required</span>}
            <br></br>
            <input type="submit" />
        </form>
    )
}

export default InserirAluno;
