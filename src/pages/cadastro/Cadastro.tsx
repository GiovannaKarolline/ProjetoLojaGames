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
		<div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen place-items-center font-bold">
			<div
				className="bg-[url('/src/assets/cadastro-bg.jpg')]
			lg:block hidden bg-no-repeat w-full min-h-screen bg-cover bg-center"
			/>

			<form
				onSubmit={cadastrarNovoUsuario}
				className="flex justify-center items-center flex-col w-full max-w-md px-6 sm:px-8 py-10 lg:py-3 gap-3"
			>
				<h2 className="text-violet-900 text-3xl sm:text-4xl lg:text-5xl text-center">
					Cadastrar
				</h2>

				<div className="flex flex-col w-full">
					<label htmlFor="nome">Nome</label>
					<input
						type="text"
						id="nome"
						name="nome"
						placeholder="Nome"
						value={usuario.nome}
						onChange={atualizarEstado}
						className="border-2 border-violet-700 rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-violet-500"
						required
					/>
				</div>

				<div className="flex flex-col w-full">
					<label htmlFor="usuario">Usuário</label>
					<input
						type="email"
						id="usuario"
						name="usuario"
						placeholder="E-mail"
						value={usuario.usuario}
						onChange={atualizarEstado}
						className="border-2 border-violet-700 rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-violet-500"
						required
					/>
				</div>

				<div className="flex flex-col w-full">
					<label htmlFor="foto">
						Foto (URL) <span className="text-slate-400 font-normal">opcional</span>
					</label>

					<input
						id="foto"
						name="foto"
						type="text"
						placeholder="https://..."
						value={usuario.foto}
						onChange={atualizarEstado}
						className="border-2 border-violet-700 rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-violet-500"
					/>
				</div>

				<div className="flex flex-col w-full">
					<label htmlFor="dataNascimento">Data de Nascimento</label>

					<input
						type="date"
						id="dataNascimento"
						name="dataNascimento"
						value={usuario.dataNascimento}
						onChange={atualizarEstado}
						className="border-2 border-violet-700 rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-violet-500"
						required
					/>
				</div>

				<div className="flex flex-col w-full">
					<label htmlFor="senha">Senha</label>
					<input
						type="password"
						id="senha"
						name="senha"
						placeholder="Senha"
						value={usuario.senha}
						onChange={atualizarEstado}
						className="border-2 border-violet-700 rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-violet-500"
						required
					/>
				</div>

				<div className="flex flex-col w-full">
					<label htmlFor="confirmarSenha">Confirmar Senha</label>

					<input
						type="password"
						id="confirmarSenha"
						name="confirmarSenha"
						placeholder="Confirmar Senha"
						value={confirmarSenha}
						onChange={(evento) => setConfirmarSenha(evento.target.value)}
						className="border-2 border-violet-700 rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-violet-500"
						required
					/>
				</div>

				<div className="flex flex-col sm:flex-row justify-around w-full gap-3 sm:gap-8">
					<button
						type="button"
					onClick={() => navigate("/")}
						className="rounded text-white bg-red-500 hover:bg-red-700 w-full sm:w-1/2 py-2"
					>
						Cancelar
					</button>

					<button
						type="submit"
						disabled={isLoading}
						className="rounded text-white bg-violet-600 hover:bg-violet-800 disabled:bg-violet-400 w-full sm:w-1/2 py-2 flex justify-center"
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
