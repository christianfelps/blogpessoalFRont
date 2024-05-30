
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import Home from './paginas/home/home';
import Navbar from './componentes/navbar/Navbar';
import Login from './paginas/login/login';
import Footer from './componentes/footer/footer';
import ListaTemas from './componentes/temas/listatemas/ListaTemas';
import FormTema from './componentes/temas/formTema/FormTema';
import { AuthProvider } from './contexts/AuthContext';
import Cadastro from './paginas/cadastro/Cadastro';
import ListaPostagem from './componentes/postagem/listapostagem/ListaPostagem';
import FormPostagem from './componentes/postagem/formpostagem/FormPostagem';
import DeleteTemas from './componentes/temas/deleteTema/DeleteTemas';


function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <div className='min-h-[80vh]'>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/home" element={<Home />} />
              <Route path="/cadastrar" element={<Cadastro />} />
              <Route path="/login" element={<Login />} />
              <Route path="/cadastrarTema" element={<FormTema />} />
              <Route path="/temas" element={<ListaTemas />} />
              <Route path="/editartema/:id" element={<FormTema />} />
              <Route path="/deletartema/:id" element={<DeleteTemas />} />
              <Route path='/postagens' element={<ListaPostagem/>} />
              <Route path="/cadastroPostagem" element={<FormPostagem />} />
              <Route path="/editarPostagem/:id" element={<FormPostagem />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>

    </>
  );
}

export default App
