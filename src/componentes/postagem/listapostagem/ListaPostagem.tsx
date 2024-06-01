import { useContext, useEffect, useState } from 'react';
import Postagem from '../../../models/Postagem'
import { AuthContext } from '../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { buscar } from '../../../services/service';
import { Dna } from 'react-loader-spinner';
import CardPostagens from '../cardPostagem/CardPostagens';
import { ToastAlerta } from '../../../utils/ToastAlerta';

function ListaPostagem() {

    const [postagens, setPostagens] = useState<Postagem []> ([]);

    const navigate = useNavigate()

    const {usuario, } = useContext(AuthContext)

    const token = usuario.token;

    useEffect(() => {
        if (token === '') {
          ToastAlerta('Você precisa estar logado', 'erro');
          navigate('/login');
        }
      }, [token]);

      async function buscarPostagens() {
       
          await buscar('/postagens', setPostagens,{
            headers: {Authorization: token,},
          });
        }
        
        useEffect(()=>{
          buscarPostagens();
        }, [postagens.length]);

  
    

        

  return (<>
    {postagens.length === 0 &&(
        <Dna 
        visible={true}
        height="200"
        width="200"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper mx-auto"
        />
      )}
    

    <div className='container mx-auto  my-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols3 gap-4'>
    {postagens.map((postagem)=>(
                  <>
                  <CardPostagens key={postagem.id} post={postagem}/>
                  </>
                ))}
    </div>
    </>
  )
}

export default ListaPostagem

