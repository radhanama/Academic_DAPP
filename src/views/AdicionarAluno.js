import React from 'react';
import { useForm } from "react-hook-form";

function InserirAluno (props){
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    function inserir(aluno)
    {
        if(props.academic){
            props.academic.insert(parseInt(aluno.id), aluno.name)
        }
    }
    
	return (
        <form onSubmit={handleSubmit(inserir)}>
        <input defaultValue="55" {...register("id", { required: true })} />
        {errors.exampleRequired && <span>This field is required</span>}
        <input {...register("name", { required: true })} />
        {errors.exampleRequired && <span>This field is required</span>}
        <input type="submit" />
      </form>
    )
}

export default InserirAluno;
