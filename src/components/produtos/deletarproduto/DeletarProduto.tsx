import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ClipLoader } from "react-spinners"

import { CartContext } from "../../../contexts/CartContext"
import { AuthContext } from "../../../contexts/AuthContext"
import type Produto from "../../../models/Produto"
import {
	buscarProdutoPorId,
	deletarProduto,
} from "../../../services/Service"

function DeletarProduto() {
	const navigate = useNavigate()
	const { id } = useParams<{ id: string }>()
	const { usuario } = useContext(AuthContext)
	const { removerProduto } = useContext(CartContext)

	const [produto, setProduto] = useState<Produto>({
		id: 0,
		nome: "",
		foto: "",
		preco: 0,
		categoria: {
			id: 0,
			tipo: "",
		},
	})
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		if (usuario.token === "") {
			navigate("/")
			return
		}

		const idProduto = Number(id)

		if (!id || Number.isNaN(idProduto)) {
			alert("Identificação do produto inválida.")
			navigate("/produtos")
			return
		}

		async function carregarProduto() {
			try {
				const resposta = await buscarProdutoPorId(
					idProduto,
					usuario.token,
				)

				setProduto(resposta)
			} catch (erro) {
				console.error(
					"Erro ao buscar produto:",
					erro,
				)
				alert("Não foi possível carregar o produto.")
				navigate("/produtos")
			} finally {
				setIsLoading(false)
			}
		}

		void carregarProduto()
	}, [id, usuario.token, navigate])

	async function confirmarExclusao() {
		if (!id) {
			return
		}

		setIsLoading(true)

		try {
			await deletarProduto(Number(id), usuario.token)

			removerProduto(Number(id))
			alert("Produto deletado com sucesso!")
			navigate("/produtos")
		} catch (erro) {
			console.error("Erro ao deletar produto:", erro)
			alert("Não foi possível deletar o produto.")
		} finally {
			setIsLoading(false)
		}
	}

	function cancelarExclusao() {
		navigate("/produtos")
	}

	if (usuario.token === "") {
		return null
	}

	if (isLoading && produto.id === 0) {
		return (
			<div className="flex justify-center items-center min-h-[50vh]">
				<ClipLoader color="#7c3aed" size={50} />
			</div>
		)
	}

	return (
		<div className="container w-full max-w-md mx-auto px-4 pt-20 md:pt-6">
			<h1 className="text-3xl md:text-4xl text-center py-4">
				Deletar Produto
			</h1>
			<p className="text-center font-semibold mb-4 text-base md:text-lg">
				Você tem certeza de que deseja apagar o produto a
				seguir?
			</p>
			<div className="border flex flex-col rounded-2xl overflow-hidden justify-between">
				<header className="py-2 px-4 md:px-6 bg-violet-800 text-white font-bold text-lg md:text-2xl">
					Produto
				</header>
				<p className="p-4 md:p-8 text-xl md:text-3xl bg-white h-full">
					{produto.nome}
				</p>
				<div className="flex flex-row">
					<button
						type="button"
						onClick={cancelarExclusao}
						disabled={isLoading}
						className="text-slate-100 bg-red-500 hover:bg-red-700 disabled:bg-slate-400 w-full py-2 text-base md:text-lg"
					>
						Não
					</button>
					<button
						type="button"
						onClick={confirmarExclusao}
						disabled={isLoading}
						className="w-full text-slate-100 bg-violet-600 hover:bg-violet-800 disabled:bg-slate-400 flex items-center justify-center text-base md:text-lg"
					>
						{isLoading ? (
							<ClipLoader color="#ffffff" size={24} />
						) : (
							<span>Sim</span>
						)}
					</button>
				</div>
			</div>
		</div>
	)
}

export default DeletarProduto
