import Popup from 'reactjs-popup'
import FormPostagem from '../postagem/formpostagem/FormPostagem'

function ModalPostagem() {
  return (
    <>
    <Popup
        trigger={<button className='border rounded px-4 hover:bg-white hover:text-indigo-800'>Nova postagem</button>} modal>
        <div className='bg-white border rounded'>
          <FormPostagem />
        </div>        
        </Popup>
        </>
  )
}

export default ModalPostagem