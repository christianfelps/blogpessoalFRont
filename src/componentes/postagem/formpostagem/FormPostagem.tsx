import { ChangeEvent, useContext, useEffect, useState } from "react";
import Tema from "../../../models/Tema"
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import Postagem from "../../../models/Postagem";
import { atualizar, buscar, cadastrar } from "../../../services/service";
import { RotatingLines } from "react-loader-spinner";
import { ToastAlerta } from "../../../utils/ToastAlerta";


function FormPostagem() {
    const navigate = useNavigate()

    const {id} = useParams<{id: string}>()
  
    const{ usuario, handleLogout} = useContext(AuthContext);
    const token = usuario.token
    
    const [temas, setTemas] = useState<Tema[]>([]);

    const [tema, setTema] = useState<Tema> ({
      id: 0,
      descricao: '',
  })

  const [postagem, setPostagem] = useState<Postagem>({} as Postagem);


    async function buscarPostagemPorId(id: string) {
   await buscar(`/postagens/${id}`, setPostagem,{
          headers:{
              Authorization: token,
          },
      })
    }
    async function buscarTemaPorId(id: string) {
    
        await buscar(`/temas/${id}`, setTema, {
            headers: {
                Authorization: token,
            },
        })  
}
async function buscarTemas() {

    await buscar(`/temas`, setTemas, {
        headers: { 
          Authorization: token, 
        }
    })
} 

useEffect(() => {
    if (token === '') {
      ToastAlerta('Você precisa estar logado', 'erro');
      navigate('/');
    }
  }, [token]);

  useEffect(() => {
    setPostagem({
      ...postagem,
      tema: tema,
    });
  }, [tema]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setPostagem({
      ...postagem,
      [e.target.name]: e.target.value,
      tema: tema,
      usuario: usuario,
    });
  }
  
  function retornar() {
    navigate('/postagens');
  }

    const [isLoading, setIsLoading] = useState<boolean>(false)


    async function gerarNovaPostagem(e: ChangeEvent<HTMLFormElement>) {
      e.preventDefault();
      setIsLoading(true)
  
      if (id !== undefined) {
        try {
          await atualizar(`/postagens`, postagem, setPostagem, {
            headers: {
              Authorization: token,
            },
          });
          ToastAlerta('Postagem atualizada com sucesso', 'sucesso');
        
        } catch (error: any) {
          if (error.toString().includes('401')) {
            handleLogout()
          } else {
            ToastAlerta('Erro ao atualizar a Postagem', 'erro');
          }
        }
      } else {
        try {()=>{
          

              postagem.date = new Date().getFullYear.toString()
              }
            
          await cadastrar(`/postagens`, postagem, setPostagem, {
            headers: {
              Authorization: token,
            },
          });
  
          ToastAlerta('Postagem cadastrada com sucesso', 'sucesso');
         
        } catch (error: any) {
          if (error.toString().includes('401')) {
            ToastAlerta('O token expirou, favor logar novamente', 'info')
            handleLogout()
          } else {
            ToastAlerta('Erro ao cadastrar a Postagem', 'erro');
          }
        }
      }
      setIsLoading(false)
      retornar()
      
    }
    
    const carregandoTema = tema.descricao === '';

    useEffect(() => {
      buscarTemas();
      if (id !== undefined) {
        buscarPostagemPorId(id);
      }
    }, [id]);
    
    useEffect(() => {
        if (token === '') {
          ToastAlerta('Voce precisa estar logado!', 'info')
          navigate('/')
        }
    },[token])


  return ( 
    <div className="container flex flex-col mx-auto items-center">
        
            <h1  className="text-4xl text-center my-8">{id!== undefined ? "Editar Postagem" : "Cadastrar Postagem"}</h1>
       
        <form className="flex flex-col w-1/2 gap-4" onSubmit={gerarNovaPostagem}>
            <div className="flex flex-col gap-2">
                <label htmlFor="">Titulo</label>
                <input 
                placeholder="titulo"
                value={postagem.titulo}
                onChange={(e: ChangeEvent<HTMLInputElement>)=> atualizarEstado(e)}
                 name='titulo'
                 required
                 type="text" 
                 className="border-2
                 border-slate-700 rounded p-2"/>
            </div>

            <div className="flex flex-col gap-2">
            <label htmlFor="">Texto</label>
            <input
            placeholder="Texto"
             value={postagem.texto}
             onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
             name='texto' 
             type="text"
             className="border-2
             border-slate-700 
             rounded p-2" />
            </div>

            <div className="flex flex-col gap-2">
                <p>Tema da postagem</p>
                <select 
                    name="tema" 
                    id="tema" 
                    className='border p-2
                  border-slate-800 rounded'
                  onChange={(e) => buscarTemaPorId(e.currentTarget.value)}>

                    <option value='' selected disabled>Selecione um tema</option>
                    {temas.map((tema) => (
              <>
                <option value={tema.id} >{tema.descricao}</option>
              </>
            ))}
                </select>
            </div>
            <button
                    type='submit'
                    className='rounded disabled:bg-slate-200 bg-indigo-400 
                            hover:bg-indigo-800 text-white font-bold w-1/2 
                            mx-auto py-2 flex justify-center'
                    disabled={carregandoTema}
                >
                    {isLoading ?
                        <RotatingLines
                            strokeColor="white"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="24"
                            visible={true}
                        /> :
                        <span>{id !== undefined ? 'Atualizar' : 'Cadastrar'}</span>
                    }
                </button>
        </form>
     </div>
  )
}

export default FormPostagem