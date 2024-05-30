import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import Usuario from "../../models/Usuario"
import { cadastrarUsuario } from "../../services/service";
import { useNavigate } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";

function Cadastro(){

    const navigate = useNavigate();

    const [confirmarSenha, setConfirmaSenha] = useState<string>('');

    const [isLoading, setIsLoading] = useState<boolean>(false)
    //Estado Responsavel pelos dados do Usuario que será cadastrado
    const [usuario, setUsuario] = useState<Usuario>(
        {
            id: 0,
            nome: '',
            usuario: '',
            senha: '',
            foto: ''
        
        }
    );

useEffect(()=> {
    if(usuario.id !== 0){
        retornar();
    }
},
[usuario])

function retornar(){
    navigate('/login')
}
function atualizarEstado(e: ChangeEvent<HTMLInputElement>){
    setUsuario({
        ...usuario, 
        [e.target.name]: e.target.value,
    })
}

function handleConfirmaSenha(e: ChangeEvent<HTMLInputElement>){
    setConfirmaSenha(e.target.value)
}

async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if(confirmarSenha === usuario.senha && usuario.senha.length >= 8){
        setIsLoading(true)
        try{

            await cadastrarUsuario(`/usuarios/cadastrar`, usuario, setUsuario);
            alert('Usuario cadastrado com sucesso!');

        }catch(error){
            alert('Erro ao cadastrar usuario!')
        }
    } else {
        alert("Dados estão inconsistentes! Verifique os dados do usuário.");
        setUsuario({ ...usuario, senha: '' });
        setConfirmaSenha('');
      }
  
      setIsLoading(false)
    }

    return(
    <>
    <div className="flex flex-row">
        <div className="border-black w-full ">
            <img className="w-full" src="https://ik.imagekit.io/oar6yj13k/pessoasblog.jpg?updatedAt=1716210003534" alt="" />
        </div>
        <form  className="p-8 rounded-lg shadow-lg max-w-lg w-full" 
        onSubmit={cadastrarNovoUsuario}>
            <div className="grid grid-cols-1 mds:grid-cols-2 gap-4">
        <div className="col-span-1">
            <label className="block text-sm font-medium text-black">Nome</label>
            <input name="nome" type="text" id="nome" placeholder="Nome" className="mt-1 block w-full p-2 border border-gray-300 " value={usuario.nome} 
                onChange={(e: ChangeEvent<HTMLInputElement>)=> atualizarEstado(e)} />
        </div>

        <div className="col-span-1">
            <label  className="block text-sm font-medium text-black">Usuario</label>
            <input type="email" name="usuario" id="usuario" placeholder="Usuario:" className="mt-1 block w-full p-2 border border-gray-300 "value={usuario.usuario}
                onChange={(e: ChangeEvent<HTMLInputElement>)=> atualizarEstado(e)} />
        </div>

        <div className="col-span-1">
            <label  className="block text-sm font-medium text-black">Senha</label>
            <input type="password" id="senha" name="senha" placeholder="Senha" className="mt-1 block w-full p-2 border border-gray-300 "value={usuario.senha}
                onChange={(e: ChangeEvent<HTMLInputElement>)=> atualizarEstado(e)} />
        </div>
        <div className="col-span-1">
            <label  className="block text-sm font-medium text-black">Foto</label>
            <input type="text" id="foto" name="foto" placeholder="link da sua foto" className="mt-1 block w-full p-2 border border-gray-300 " value={usuario.foto} 
                onChange={(e: ChangeEvent<HTMLInputElement>)=> atualizarEstado(e)}/>
        </div>

        
            <label  className="block text-sm font-medium text-black">Confirmar senha</label>
            <input type="password" id="confirmarSenha" name='confirmarSenha' placeholder="Confirmar senha" className="mt-1 block w-full p-2 border border-gray-300 " 
            value={confirmarSenha} 
            onChange={(e: ChangeEvent<HTMLInputElement>)=> handleConfirmaSenha(e)} />
            
        

            <div className="flex justify-around w-full gap-8">
            <button className='rounded text-white bg-red-400 
                  hover:bg-red-700 w-1/2 py-2'
              onClick={retornar}
            >
              Cancelar
            </button>
            <button
              type='submit'
              className='rounded text-white bg-indigo-400 
                           hover:bg-indigo-900 w-1/2 py-2
                           flex justify-center'
            >
              {isLoading ? <RotatingLines
                strokeColor="white"
                strokeWidth="5"
                animationDuration="0.75"
                width="24"
                visible={true}
              /> :
                <span>Cadastrar</span>
              }
            </button> 
            </div>
            </div>
        </form>
        </div>
       
        </>
    )
}
export default Cadastro