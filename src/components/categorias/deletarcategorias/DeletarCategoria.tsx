import { useContext, useEffect, useState } from "react"
import {
	useNavigate,
	useParams,
} from "react-router-dom"
import { ClipLoader } from "react-spinners"

import { AuthContext } from "../../../contexts/AuthContext"
import type Categoria from "../../../models/Categoria"
import {
	buscarCategoriaPorId,
	deletarCategoria,
} from "../../../services/Service"

function DeletarCategoria() {
	const navigate = useNavigate()
	const { id } = useParams<{ id: string }>()
	const { usuario } = useContext(AuthContext)

	const [categoria, setCategoria] = useState<Categoria>({
		id: 0,
		tipo: "",
	})

	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		if (usuario.token === "") {
			navigate("/")
			return
		}

		const idCategoria = Number(id)

		if (!id || Number.isNaN(idCategoria)) {
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
	}, [id, usuario.token, navigate])

	async function confirmarExclusao() {
		if (!id) {
			return
		}

		setIsLoading(true)

		try {
			await deletarCategoria(
				Number(id),
				usuario.token,
			)

			alert("Categoria deletada com sucesso!")
			navigate("/categorias")
		} catch (erro) {
			console.error(
				"Erro ao deletar categoria:",
				erro,
			)
			alert("Não foi possível deletar a categoria.")
		} finally {
			setIsLoading(false)
		}
	}

	function cancelarExclusao() {
		navigate("/categorias")
	}

	if (usuario.token === "") {
		return null
	}

	if (isLoading && categoria.id === 0) {
		return (
			<div className="flex justify-center items-center min-h-[50vh]">
				<ClipLoader color="#7c3aed" size={50} />
			</div>
		)
	}

	return (
		<div className="container w-full max-w-md px-4 pt-4 mx-auto md:pt-6">
			<h1 className="py-4 text-3xl text-center md:text-4xl">
				Deletar Categoria
			</h1>

			<p className="mb-4 text-base font-semibold text-center md:text-lg">
				Você tem certeza de que deseja apagar a
				categoria a seguir?
			</p>

			<div className="flex flex-col justify-between overflow-hidden border rounded-2xl">
				<header className="px-4 py-2 text-lg font-bold text-white md:px-6 bg-violet-800 md:text-2xl">
					Categoria
				</header>

				<p className="h-full p-4 text-xl bg-white md:p-8 md:text-3xl">
					{categoria.tipo}
				</p>

				<div className="flex flex-row">
					<button
						type="button"
						onClick={cancelarExclusao}
						disabled={isLoading}
						className="w-full py-2 text-base bg-red-500 text-slate-100 hover:bg-red-600 disabled:bg-slate-400 md:text-lg"
					>
						Não
					</button>

					<button
						type="button"
						onClick={confirmarExclusao}
						disabled={isLoading}
						className="flex items-center justify-center w-full py-2 text-base bg-violet-600 text-slate-100 hover:bg-violet-800 disabled:bg-slate-400 md:text-lg"
					>
						{isLoading ? (
							<ClipLoader
								color="#ffffff"
								size={24}
							/>
						) : (
							<span>Sim</span>
						)}
					</button>
				</div>
			</div>
		</div>
	)
}

export default DeletarCategoria
