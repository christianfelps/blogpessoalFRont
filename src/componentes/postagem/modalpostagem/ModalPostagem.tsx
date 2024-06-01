import Popup from 'reactjs-popup'
import FormPostagem from '../formpostagem/FormPostagem'
import './ModalPostagem.css'
import 'reactjs-popup/dist/index.css'
function ModalPostagem() {
  return (
    <>
    <Popup
        trigger={<button className='border rounded px-4 hover:bg-white hover:text-indigo-800'>Nova postagem</button>} modal>
        <div>
          <FormPostagem />
        </div>        
        </Popup>
        </>
  )
}

export default ModalPostagem