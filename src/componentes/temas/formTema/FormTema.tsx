import { ChangeEvent, useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Tema from "../../../models/Tema";
import { AuthContext } from "../../../contexts/AuthContext";
import { buscar, atualizar, cadastrar } from "../../../services/service";
import { RotatingLines } from "react-loader-spinner";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function FormTema() {

  const navigate = useNavigate()

  const [tema, setTema] = useState<Tema>({} as Tema);
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { usuario, handleLogout } = useContext(AuthContext)
  const token = usuario.token

  const { id } = useParams<{ id: string }>()

  async function buscaPorId(id: string) {
    try {
      await buscar(`/temas/${id}`, setTema, {
        Headers: { Authorization: token }
      })
    } catch (error: any) {
      if (error.toString().includes('401')) {
        ToastAlerta('O token expirou!', 'info')
        handleLogout()
      }
    }
  }

  useEffect(() => {
    if (token === '') {
      ToastAlerta('Voce precisa estar logado!', 'info')
      navigate('/')
    }
  }, [token])

  useEffect(() => {
    if (id !== undefined) {
      buscaPorId(id)
    }
  }, [id])

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setTema({
      ...tema,
      [e.target.name]: e.target.value
    })
  }
  function retornar() {
    navigate('/temas')

  }
  async function gerarNovoTema(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)

    if (id !== undefined) {

      try {
        await atualizar(`/temas`, tema, setTema, {
          Headers: { 'Authorization': token }
        });
        ToastAlerta('Tema atualizado com sucesso!', 'sucesso');
      } catch (error: any) {
        if (error.toString().includes('401')) {
          ToastAlerta('O token Expirou!', 'info')
          handleLogout()
        } else {
          ToastAlerta('Erro ao atualizar o Tema!', 'erro')
        }
      }

    } else {

      try {
        await cadastrar(`/temas`, tema, setTema, {
          Headers: { 'Authorization': token }
        });
        ToastAlerta('Tema cadastrado com sucesso!', 'sucesso');
      } catch (error: any) {
        if (error.toString().includes('401')) {
          ToastAlerta('O token Expirou!', 'info')
          handleLogout()
        } else {
          ToastAlerta('Erro ao cadastrar o Tema!', 'erro')
        }
      }

    }

    setIsLoading(false)
    retornar()
  }

  return (
    <div className='container flex flex-col items-center justify-center mx-auto'>
      <h1 className='text-4xl text-center my-8'>
      {id === undefined ? 'Cadastrar Tema' : 'Editar Tema'}
      </h1>


      <form className='w-1/2 flex flex-col gap-4' onSubmit={gerarNovoTema}>
        <div className='flex flex-col gap-2'>
          <label htmlFor="descricao">Descricao do tema</label>
          <input type="text"
            placeholder='Descrição'
            name='descricao'
            className='border-2 border-slate-700 rounded p-2'
            value={tema.descricao}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)} />
        </div>
        <button
                    className="rounded text-slate-100 bg-indigo-400 
                               hover:bg-indigo-800 w-1/2 py-2 mx-auto flex justify-center"
                    type="submit">

                    {isLoading ? <RotatingLines
                        strokeColor="white"
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="24"
                        visible={true}
                    /> :
                        <span>{id === undefined ? 'Cadastrar' : 'Atualizar'}</span>
                    }

                </button>
      </form>
    </div>
  )
}

export default FormTema