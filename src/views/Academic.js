import React from 'react';
import { useForm } from "react-hook-form";

function Academic(props) {

    async function awardCertificate() {
        if (props.academic) {
            var result = await props.academic.awardCertificate(1)
            console.log(result)
        } else {
            throw new Error('Not connected');
        }
    }

    return (<>
        <div>
            <button type="button" onClick={awardCertificate}>Receber meu certificado!</button>
        </div>
        <h3>SetAlunoGraduated</h3>
        <SetAlunoGraduated academic={props.academic}/>
        <h3>AbrirLancamentoNota</h3>
        <AbrirLancamentoNota academic={props.academic}/>
        <h3>InserirNota</h3>
        <InserirNota academic={props.academic}/>
        <h3>GetNotaAlunoByDisciplinaId</h3>
        <GetNotaAlunoByDisciplinaId academic={props.academic}/>
        <h3>ListarNotasDisciplina</h3>
        <ListarNotasDisciplina academic={props.academic}/>
        </>
    )
}

function SetAlunoGraduated(props) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    async function ecxecute(form) {
        if (props.academic) {
            const result = await props.academic.setAlunoGraduated(form.id)
            console.log(result)
        } else {
            throw new Error('Not connected');
        }
    }
    return (<form onSubmit={handleSubmit(ecxecute)}>
        <label for="id">id:</label>
        <input id="id" name="id" defaultValue="55" {...register("id", { required: true })} />
        {errors.exampleRequired && <span>This field is required</span>}
        <br></br>
        <input type="submit" />
    </form>)
}
function AbrirLancamentoNota(props) {
    async function ecxecute() {
        if (props.academic) {
            const result = await props.academic.abrirLancamentoNota()
            console.log(result)
        } else {
            throw new Error('Not connected');
        }
    }
    return(
        <div>
            <button type="button" onClick={ecxecute}>abrir lançamento de nota!</button>
        </div>)
}
function InserirNota(props) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    async function ecxecute(form) {
        if (props.academic) {
            const result = await props.academic.inserirNota(form.id, form.disciplina, form.nota)
            console.log(result)
        } else {
            throw new Error('Not connected');
        }
    }
    return (<form onSubmit={handleSubmit(ecxecute)}>
        <label for="id">id:</label>
        <input id="id" name="id" defaultValue="55" {...register("id", { required: true })} />
        {errors.exampleRequired && <span>This field is required</span>}
        <br></br>
        <label for="disciplina">Disciplina:</label>
        <input id="disciplina" {...register("disciplina", { required: true })} />
        {errors.exampleRequired && <span>This field is required</span>}
        <br></br>
        <label for="nota">Nota:</label>
        <input id="nota" {...register("nota", { required: true })} />
        {errors.exampleRequired && <span>This field is required</span>}
        <br></br>
        <input type="submit" />
    </form>)
}
function GetNotaAlunoByDisciplinaId(props) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    async function ecxecute(form) {
        if (props.academic) {
            const result = await props.academic.getNotaAlunoByDisciplinaId(form.id, form.disciplina)
            console.log(result)
        } else {
            throw new Error('Not connected');
        }
    }
    return (<form onSubmit={handleSubmit(ecxecute)}>
        <label for="id">id:</label>
        <input id="id" name="id" defaultValue="55" {...register("id", { required: true })} />
        {errors.exampleRequired && <span>This field is required</span>}
        <br></br>
        <label for="disciplina">Disciplina:</label>
        <input id="disciplina" {...register("disciplina", { required: true })} />
        {errors.exampleRequired && <span>This field is required</span>}
        <br></br>
        <input type="submit" />
    </form>)
}
function ListarNotasDisciplina(props) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    async function ecxecute(form) {
        if (props.academic) {
            const result = await props.academic.listarNotasDisciplina(form.disciplina)
            console.log(result)
        } else {
            throw new Error('Not connected');
        }
    }
    return (<form onSubmit={handleSubmit(ecxecute)}>
        <label for="disciplina">Disciplina:</label>
        <input id="disciplina" {...register("disciplina", { required: true })} />
        {errors.exampleRequired && <span>This field is required</span>}
        <br></br>
        <input type="submit" />
    </form>)
}

export default Academic;
