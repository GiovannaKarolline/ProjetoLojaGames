import { useContext, useEffect, useState } from "react"
import type { FormEvent } from "react"
import {
	useNavigate,
	useParams,
} from "react-router-dom"
import { ClipLoader } from "react-spinners"

import { AuthContext } from "../../../contexts/AuthContext"
import type Categoria from "../../../models/Categoria"
import {
	atualizarCategoria,
	buscarCategoriaPorId,
	cadastrarCategoria,
} from "../../../services/Service"

function FormCategoria() {
	const navigate = useNavigate()
	const { id } = useParams<{ id: string }>()
	const { usuario } = useContext(AuthContext)

	const estaEditando = id !== undefined

	const [categoria, setCategoria] = useState<Categoria>({
		id: 0,
		tipo: "",
		descricao: "",
	})

	const [isLoading, setIsLoading] =
		useState(estaEditando)

	useEffect(() => {
		if (usuario.token === "") {
			navigate("/")
			return
		}

		if (!estaEditando) {
			return
		}

		const idCategoria = Number(id)

		if (Number.isNaN(idCategoria)) {
			alert("Identificação da categoria inválida.")
			navigate("/categorias")
			return
		}

		async function carregarCategoria() {
			try {
				const resposta =
					await buscarCategoriaPorId(
						idCategoria,
						usuario.token,
					)

				setCategoria(resposta)
			} catch (erro) {
				console.error(
					"Erro ao buscar categoria:",
					erro,
				)
				alert("Não foi possível carregar a categoria.")
				navigate("/categorias")
			} finally {
				setIsLoading(false)
			}
		}

		void carregarCategoria()
	}, [
		estaEditando,
		id,
		usuario.token,
		navigate,
	])

	async function salvarCategoria(
		evento: FormEvent<HTMLFormElement>,
	) {
		evento.preventDefault()

		const tipoTratado = categoria.tipo.trim()
		const descricaoTratada = categoria.descricao.trim()

		if (
			tipoTratado.length < 3 ||
			tipoTratado.length > 100
		) {
			alert(
				"A categoria deve possuir entre 3 e 100 caracteres.",
			)
			return
		}

		if (
			descricaoTratada.length < 3 ||
			descricaoTratada.length > 100
		) {
			alert(
				"A descrição deve possuir entre 3 e 100 caracteres.",
			)
			return
		}

		const categoriaParaEnviar: Categoria = {
			...categoria,
			tipo: tipoTratado,
			descricao: descricaoTratada,
		}

		setIsLoading(true)

		try {
			if (estaEditando) {
				await atualizarCategoria(
					categoriaParaEnviar,
					usuario.token,
				)

				alert("Categoria atualizada com sucesso!")
			} else {
				await cadastrarCategoria(
					categoriaParaEnviar,
					usuario.token,
				)

				alert("Categoria cadastrada com sucesso!")
			}

			navigate("/categorias")
		} catch (erro) {
			console.error(
				"Erro ao salvar categoria:",
				erro,
			)
			alert("Não foi possível salvar a categoria.")
		} finally {
			setIsLoading(false)
		}
	}

	if (usuario.token === "") {
		return null
	}

	if (
		isLoading &&
		estaEditando &&
		categoria.id === 0
	) {
		return (
			<div className="flex justify-center items-center min-h-[50vh]">
				<ClipLoader color="#7c3aed" size={50} />
			</div>
		)
	}

	return (
		<div className="container flex flex-col items-center justify-center px-4 pt-12 pb-12 mx-auto md:min-h-[70vh]">
			<h1 className="mb-6 text-3xl text-center text-white md:text-4xl drop-shadow-md">
				{estaEditando
					? "Editar Categoria"
					: "Cadastrar Categoria"}
			</h1>

			<form
				onSubmit={salvarCategoria}
				className="relative z-10 flex flex-col items-center justify-center w-full max-w-lg gap-4 px-6 py-10 shadow-2xl sm:px-8 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 text-white"
			>
				<div className="flex flex-col w-full gap-2">
					<label htmlFor="tipo" className="font-medium text-slate-200">Categoria</label>

					<input
						type="text"
						placeholder="Categoria"
						id="tipo"
						name="tipo"
						value={categoria.tipo}
						onChange={(evento) =>
							setCategoria({
								...categoria,
								tipo: evento.target.value,
							})
						}
						disabled={isLoading}
						maxLength={100}
						className="w-full p-2 text-white transition-colors border rounded-lg border-white/20 bg-black/20 focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder-slate-400"
					/>
				</div>

				<div className="flex flex-col w-full gap-2">
					<label htmlFor="descricao" className="font-medium text-slate-200">Descrição</label>

					<input
						type="text"
						placeholder="Descrição"
						id="descricao"
						name="descricao"
						value={categoria.descricao}
						onChange={(evento) =>
							setCategoria({
								...categoria,
								descricao: evento.target.value,
							})
						}
						disabled={isLoading}
						maxLength={100}
						className="w-full p-2 text-white transition-colors border rounded-lg border-white/20 bg-black/20 focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder-slate-400"
					/>
				</div>

				<button
					type="submit"
					disabled={isLoading}
					className="flex justify-center w-full py-3 mt-4 text-white transition-colors rounded-lg shadow-lg bg-amber-500 hover:bg-amber-600 disabled:bg-slate-500"
				>
					{isLoading ? (
						<ClipLoader
							color="#ffffff"
							size={24}
						/>
					) : (
						<span>
							{estaEditando
								? "Atualizar"
								: "Cadastrar"}
						</span>
					)}
				</button>
			</form>
		</div>
	)
}

export default FormCategoria
