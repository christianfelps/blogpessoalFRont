
import { Link } from 'react-router-dom'
import Postagem from '../../../models/Postagem'

interface CardPostagemProps{
    post: Postagem
}

function CardPostagens({post}: CardPostagemProps) {




  return (
    <div className='border-slate-900 border flex flex-col rounded overflow-hidden justify-between'>
        <div>
            <div className='bg-indigo-400 flex items-center justify-start '>
                <img src={post.usuario?.foto} alt="" className='h-12 rounded-full '/>
                <h3 className='text-lg font-bold text-center uppercase justify-start ml-3'>{post.usuario?.nome}</h3>
            </div>
            <div className='p-4'>
                <h4 className='text-lg font-semibold uppercase'> {post.titulo}</h4>
                <p>{post.texto}</p>
                <p>{post.tema?.descricao} </p>
                <p>Data: {new Intl.DateTimeFormat(undefined,{
                    dateStyle: 'full',
                    timeStyle: 'medium',
                }).format(new Date(post.date))}
                 </p>
            </div>

            <div className='flex'>
                <Link to={`/editarPostagem${post.id}`} className=' w-full text-white bg-indigo-400 hover:bg-indigo-800 flex items-center justify-center'> <button>Editar</button></Link>

                <Link to={`/deletarPostagem${post.id}`} className=' w-full text-white bg-red-400 hover:bg-red-700 flex items-center justify-center'> <button>Deletar</button></Link>


            </div>
        </div>
    </div>
  )
}

export default CardPostagens