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
		titulo: "",
		descricao: "",
		imagem: "",
		preco: 0,
		categoria: {
			id: 0,
			tipo: "",
			descricao: "",
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
			<h1 className="text-3xl md:text-4xl text-center py-4 text-white drop-shadow-md">
				Deletar Produto
			</h1>
			<p className="text-center font-semibold mb-4 text-base md:text-lg text-slate-200">
				Você tem certeza de que deseja apagar o produto a seguir?
			</p>
			<div className="border border-white/20 flex flex-col rounded-2xl overflow-hidden justify-between shadow-2xl bg-white/10 backdrop-blur-md text-white">
				<header className="py-3 px-4 md:px-6 bg-violet-900/80 text-white font-bold text-lg md:text-2xl border-b border-white/20">
					Produto
				</header>
				<p className="p-4 md:p-8 text-xl md:text-3xl h-full drop-shadow-md">
					{produto.titulo}
				</p>
				<div className="flex flex-row">
					<button
						type="button"
						onClick={cancelarExclusao}
						disabled={isLoading}
						className="text-white bg-red-500/80 hover:bg-red-500 disabled:bg-slate-400 w-full py-4 text-base md:text-lg transition-colors"
					>
						Não
					</button>
					<button
						type="button"
						onClick={confirmarExclusao}
						disabled={isLoading}
						className="w-full text-white bg-amber-500 hover:bg-amber-600 disabled:bg-slate-400 flex items-center justify-center text-base md:text-lg transition-colors"
					>
						{isLoading ? (
							<ClipLoader color="#ffffff" size={24} />
						) : (
							<span className="font-bold">Sim</span>
						)}
					</button>
				</div>
			</div>
		</div>
	)
}

export default DeletarProduto
