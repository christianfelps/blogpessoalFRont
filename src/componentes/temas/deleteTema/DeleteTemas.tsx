import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Tema from "../../../models/Tema"
import { AuthContext } from "../../../contexts/AuthContext";
import { buscar, deletar } from "../../../services/service";
import { RotatingLines } from "react-loader-spinner";
import { ToastAlerta } from "../../../utils/ToastAlerta";
function DeleteTemas() {
  const navigate = useNavigate()

  const [tema, setTema] = useState<Tema>({} as Tema);
  const [isLoading, SetIsLoading] = useState<boolean>(false)

  const {usuario, handleLogout} = useContext(AuthContext)
  const token = usuario.token

  const { id } = useParams<{id: string}>()

  async function  buscaPorId( id : string) {
    try{
      await buscar(`/temas/${id}`, setTema, {
        headers: {Authorization: token}
      })
    }catch(error: any){
      if(error.toString().includes('401')){
        handleLogout()
      }

    }

  }
  useEffect(() => {
    if(token === ''){
      ToastAlerta('Voce precisa estar logado!', 'erro')
      navigate('/')
    }
  }, [token])


  useEffect(() => {
    if(id !== undefined) {
      buscaPorId(id)
    }
  },[id])
  


function retornar(){
  navigate('/temas')
}

async function DeletarTemas(){
  SetIsLoading(true)

  try{
    await deletar(`/temas/${id}`, {
      headers: {Authorization: token}
    })
    ToastAlerta('O tema foi apagado com sucesso!','sucesso' )
  }catch(error: any){
    if(error.toString().includes('401')){
      handleLogout()
    }else{
      ToastAlerta('Erro ao excluir o tema', 'erro')
    }
  
  }
     
  SetIsLoading(false)
  retornar()

}


  return (
    <div className='container w-1/3 mx-auto'>
        <h1 className='text-4xl text-center my-4 '>Deletar tema</h1>

        <p className='text-center font-semibold mb-4'>Você tem certeza  de que deseja apagar o tema a seguir? </p>

        <div className='border flex flex-col rounded-2xl overflow-hidden justify-between'>
          <header className='py-2 px-6 bg-indigo-600 text-white folt-bold text-2xl '> Tema</header>  
          <p className='p-8 text-3xl bg-slate-200 h-full'>{tema.descricao}</p>
          <div className='flex'>
            <button className='text-slate-100 bg-red-400 hover:bg-red-600 w-full py-2' onClick={retornar}>Não</button>
            <button className='text-slate-100 bg-indigo-400 hover:bg-indigo-600 flex items-center justify-center w-full py-2' onClick={DeletarTemas}>{isLoading ? <RotatingLines
                        strokeColor="white"
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="24"
                        visible={true}
                    /> :
                        <span>Sim</span>
                        }</button>
  
          </div>
        </div>
   
    </div>
  )
}

export default DeleteTemas