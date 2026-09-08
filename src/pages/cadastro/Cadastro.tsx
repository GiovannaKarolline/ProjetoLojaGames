import { useState } from "react"
import type { ChangeEvent, FormEvent } from "react"
import dayjs from "dayjs"
import { useNavigate } from "react-router-dom"
import { ClipLoader } from "react-spinners"

import type Usuario from "../../models/Usuario"
import { cadastrarUsuario } from "../../services/Service"

function Cadastro() {
	const navigate = useNavigate()

	const [usuario, setUsuario] = useState<Usuario>({
		id: 0,
		nome: "",
		usuario: "",
		senha: "",
		foto: "",
		dataNascimento: "",
	})

	const [confirmarSenha, setConfirmarSenha] = useState("")
	const [isLoading, setIsLoading] = useState(false)

	function atualizarEstado(evento: ChangeEvent<HTMLInputElement>) {
		const { name, value } = evento.target

		setUsuario((estadoAnterior) => ({
			...estadoAnterior,
			[name]: value,
		}))
	}

	function validarFormulario(): boolean {
		if (usuario.senha.length < 8) {
			alert("A senha deve possuir pelo menos 8 caracteres.")
			return false
		}

		if (usuario.senha !== confirmarSenha) {
			alert("As senhas não são iguais.")
			return false
		}

		const nascimento = dayjs(usuario.dataNascimento)

		if (!usuario.dataNascimento || !nascimento.isValid()) {
			alert("Informe uma data de nascimento válida.")
			return false
		}

		const idade = dayjs().diff(nascimento, "year")

		if (idade < 18) {
			alert("É necessário ter 18 anos ou mais.")
			return false
		}

		return true
	}

	async function cadastrarNovoUsuario(evento: FormEvent<HTMLFormElement>) {
		evento.preventDefault()

		if (!validarFormulario()) {
			return
		}

		setIsLoading(true)

		try {
			await cadastrarUsuario(usuario)

			alert("Usuário cadastrado com sucesso!")
			navigate("/")
		} catch (erro) {
			console.error("Erro ao cadastrar usuário:", erro)
			alert("Não foi possível cadastrar o usuário.")
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className="flex items-center justify-center min-h-screen font-bold bg-center bg-cover bg-[url('/src/assets/cadastro-bg.jpg')] relative py-12">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

			<form
				onSubmit={cadastrarNovoUsuario}
				className="relative z-10 flex flex-col items-center justify-center w-full max-w-lg gap-4 px-6 py-10 shadow-2xl sm:px-8 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 text-white"
			>
				<h2 className="text-3xl text-center text-white sm:text-4xl lg:text-5xl drop-shadow-md mb-4">
					Cadastrar
				</h2>

				<div className="flex flex-col w-full">
					<label htmlFor="nome" className="text-slate-200 mb-1">Nome</label>
					<input
						type="text"
						id="nome"
						name="nome"
						placeholder="Nome"
						value={usuario.nome}
						onChange={atualizarEstado}
						className="w-full p-2 text-white border border-white/20 rounded-lg bg-black/20 focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder-slate-400 transition-colors"
						required
					/>
				</div>

				<div className="flex flex-col w-full">
					<label htmlFor="usuario" className="text-slate-200 mb-1">Usuário</label>
					<input
						type="email"
						id="usuario"
						name="usuario"
						placeholder="E-mail"
						value={usuario.usuario}
						onChange={atualizarEstado}
						className="w-full p-2 text-white border border-white/20 rounded-lg bg-black/20 focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder-slate-400 transition-colors"
						required
					/>
				</div>

				<div className="flex flex-col w-full">
					<label htmlFor="foto" className="text-slate-200 mb-1">
						Foto (URL) <span className="text-slate-400 font-normal">opcional</span>
					</label>

					<input
						id="foto"
						name="foto"
						type="text"
						placeholder="https://..."
						value={usuario.foto}
						onChange={atualizarEstado}
						className="w-full p-2 text-white border border-white/20 rounded-lg bg-black/20 focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder-slate-400 transition-colors"
					/>
				</div>

				<div className="flex flex-col w-full">
					<label htmlFor="dataNascimento" className="text-slate-200 mb-1">Data de Nascimento</label>

					<input
						type="date"
						id="dataNascimento"
						name="dataNascimento"
						value={usuario.dataNascimento}
						onChange={atualizarEstado}
						className="w-full p-2 text-white border border-white/20 rounded-lg bg-black/20 focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder-slate-400 transition-colors [color-scheme:dark]"
						required
					/>
				</div>

				<div className="flex flex-col w-full">
					<label htmlFor="senha" className="text-slate-200 mb-1">Senha</label>
					<input
						type="password"
						id="senha"
						name="senha"
						placeholder="Senha"
						value={usuario.senha}
						onChange={atualizarEstado}
						className="w-full p-2 text-white border border-white/20 rounded-lg bg-black/20 focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder-slate-400 transition-colors"
						required
					/>
				</div>

				<div className="flex flex-col w-full">
					<label htmlFor="confirmarSenha" className="text-slate-200 mb-1">Confirmar Senha</label>

					<input
						type="password"
						id="confirmarSenha"
						name="confirmarSenha"
						placeholder="Confirmar Senha"
						value={confirmarSenha}
						onChange={(evento) => setConfirmarSenha(evento.target.value)}
						className="w-full p-2 text-white border border-white/20 rounded-lg bg-black/20 focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder-slate-400 transition-colors"
						required
					/>
				</div>

				<div className="flex flex-col w-full gap-3 mt-4 sm:flex-row justify-around">
					<button
						type="button"
					    onClick={() => navigate("/")}
						className="w-full py-3 text-white transition-colors rounded-lg bg-red-500/80 hover:bg-red-500 sm:w-1/2 shadow-lg backdrop-blur-sm"
					>
						Cancelar
					</button>

					<button
						type="submit"
						disabled={isLoading}
						className="flex justify-center w-full py-3 text-white transition-colors rounded-lg bg-amber-500 hover:bg-amber-600 disabled:bg-slate-500 sm:w-1/2 shadow-lg"
					>
						{isLoading ? (
							<ClipLoader color="#ffffff" size={24} />
						) : (
							<span>Cadastrar</span>
						)}
					</button>
				</div>
			</form>
		</div>
	)
}

export default Cadastro
