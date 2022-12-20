import React from 'react';
import { useForm } from "react-hook-form";

function InserirDiciplina(props) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    function inserir(diciplina) {
        if (props.academic) {
            props.academic.insert(parseInt(diciplina.id), diciplina.name, diciplina.professor)
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
            <label for="professor">professor address:</label>
            <input id="professor" {...register("professor", { required: true })} />
            {errors.exampleRequired && <span>This field is required</span>}
            <br></br>
            <input type="submit" />
        </form>
    )
}

export default InserirDiciplina;
