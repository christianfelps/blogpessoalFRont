import { ChangeEvent, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext";
import UsuarioLogin from "../../models/UsuarioLogin";
import { RotatingLines } from "react-loader-spinner";

function Login() {
    const navigate = useNavigate();


    const { usuario, handleLogin, isLoading } = useContext(AuthContext)

    const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>(
        {} as UsuarioLogin
    );
    useEffect(() => {
        if (usuario.token !== '') {
            navigate('/home')
        }
    }, [usuario])

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setUsuarioLogin({
            ...usuarioLogin,
            [e.target.name]: e.target.value,
        })
    }

    function login(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        handleLogin(usuarioLogin)
    }

    return (
        <>
            <div className="flex flex-row flex-wrap justify-around">

                <div className="border-black w-1/2">
                    <img className="w-full h-full" src="https://img.freepik.com/fotos-premium/grupo-de-pessoas-interagindo-entre-si_107420-82511.jpg" alt="" />
                </div>

                <form action="" className="p-8 rounded-lg shadow-lg max-w-lg w-1/2 bg-slate-100" onSubmit={login}>
                    <h1 className="font-bold text-4xl pt-16 pb-16">Entrar</h1>
                    <div className="grid grid-cols-1 mds:grid-cols-2 gap-4" >
                        <div className="col-span-1">
                            <label >Usuario</label>
                            <input type="email" name="usuario" className="mt-1 block w-full p-2 border border-gray-300 " value={usuarioLogin.usuario}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                            />
                        </div>
                        <div className="col-span-1">
                            <label>Senha</label>
                            <input type="password" name="senha" className="mt-1 block w-full p-2 border border-gray-300 " value={usuarioLogin.senha}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)} />

                        </div>
                        <div className="col-span-1 flex flex-row justify-center">
                            <button type="submit" className="font-bold">
                                {isLoading ?

                                    <RotatingLines
                                        strokeColor='black'
                                        strokeWidth="5"
                                        animationDuration="0.75"
                                        width="24"
                                        visible={true}
                                    />
                                    :
                                    <span>Entrar</span>
                                }
                            </button>
                        </div>
                        <hr className="border-black" />
                        <div >
                            <Link to="/cadastrar" className="hover:underline flex flex-row justify-center font-bold">Ainda não tem uma conta {' '}</Link>
                            Cadastra-se</div>


                    </div>
                </form>
            </div>

        </>
    )
}
export default Login