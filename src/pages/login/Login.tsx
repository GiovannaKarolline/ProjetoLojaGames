import { useContext, useState } from "react"
import type { ChangeEvent, FormEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ClipLoader } from "react-spinners"

import { AuthContext } from "../../contexts/AuthContext"
import type UsuarioLogin from "../../models/UsuarioLogin"

function Login() {
	const navigate = useNavigate()

	const { handleLogin, isLoading } = useContext(AuthContext)

	const [usuarioLogin, setUsuarioLogin] =
		useState<UsuarioLogin>({
			id: 0,
			nome: "",
			usuario: "",
			senha: "",
			foto: "",
			dataNascimento: "",
			token: "",
		})

	function atualizarEstado(
		evento: ChangeEvent<HTMLInputElement>,
	) {
		const { name, value } = evento.target

		setUsuarioLogin((estadoAnterior) => ({
			...estadoAnterior,
			[name]: value,
		}))
	}

	async function fazerLogin(
		evento: FormEvent<HTMLFormElement>,
	) {
		evento.preventDefault()

		try {
			await handleLogin(usuarioLogin)

			alert("Usuário logado com sucesso!")
			navigate("/home")
		} catch (erro) {
			console.error("Erro ao realizar login:", erro)
			alert("Usuário ou senha inválidos.")
		}
	}

	return (
		<div className="flex items-center justify-center min-h-screen font-bold bg-center bg-cover bg-[url('/src/assets/login-bg.jpg')] relative">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            
			<form
				onSubmit={fazerLogin}
				className="relative z-10 flex flex-col items-center justify-center w-full max-w-sm gap-4 px-6 py-10 shadow-2xl sm:px-8 lg:py-10 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 text-white"
			>
				<h2 className="text-3xl text-center text-white sm:text-4xl lg:text-5xl drop-shadow-md">
					Entrar
				</h2>

				<div className="flex flex-col w-full">
					<label htmlFor="usuario" className="text-slate-200 mb-1">Usuário</label>

					<input
						type="email"
						id="usuario"
						name="usuario"
						placeholder="E-mail"
						value={usuarioLogin.usuario}
						onChange={atualizarEstado}
						required
						className="w-full p-2 text-white border border-white/20 rounded-lg bg-black/20 focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder-slate-400 transition-colors"
					/>
				</div>

				<div className="flex flex-col w-full">
					<label htmlFor="senha" className="text-slate-200 mb-1">Senha</label>

					<input
						type="password"
						id="senha"
						name="senha"
						placeholder="Senha"
						value={usuarioLogin.senha}
						onChange={atualizarEstado}
						required
						className="w-full p-2 text-white border border-white/20 rounded-lg bg-black/20 focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder-slate-400 transition-colors"
					/>
				</div>

				<button
					type="submit"
					disabled={isLoading}
					className="flex justify-center w-full py-3 mt-4 text-white transition-colors rounded-lg bg-amber-500 hover:bg-amber-600 disabled:bg-slate-500 shadow-lg"
				>
					{isLoading ? (
						<ClipLoader color="#ffffff" size={24} />
					) : (
						<span>Entrar</span>
					)}
				</button>

				<hr className="w-full border-white/20 my-2" />

				<p className="text-center text-slate-300">
					Ainda não tem uma conta?{" "}
					<Link
						to="/cadastro"
						className="text-amber-400 hover:text-amber-300 hover:underline transition-colors"
					>
						Cadastre-se
					</Link>
				</p>
			</form>
		</div>
	)
}

export default Login
