import { useContext, useEffect, useState } from "react"
import type { ChangeEvent, FormEvent } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { NumericFormat } from "react-number-format"
import { ClipLoader } from "react-spinners"

import { AuthContext } from "../../../contexts/AuthContext"
import type Categoria from "../../../models/Categoria"
import type Produto from "../../../models/Produto"
import {
	atualizarProduto,
	buscarProdutoPorId,
	buscarCategorias,
	cadastrarProduto,
} from "../../../services/Service"

function FormProduto() {
	const navigate = useNavigate()
	const { id } = useParams<{ id: string }>()
	const { usuario } = useContext(AuthContext)

	const estaEditando = id !== undefined

	const [produto, setProduto] = useState<Produto>({
		id: 0,
		titulo: "",
		descricao: "",
		imagem: "",
		preco: 0,
		categoria: {
			id: 0,
			tipo: "",
		},
	})
	const [categorias, setCategorias] = useState<Categoria[]>([])
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		if (usuario.token === "") {
			navigate("/")
			return
		}

		const idProduto = Number(id)

		if (estaEditando && Number.isNaN(idProduto)) {
			alert("Identificação do produto inválida.")
			navigate("/produtos")
			return
		}

		async function carregarDados() {
			try {
				setIsLoading(true)

				const categoriasEncontradas =
					await buscarCategorias(usuario.token)

				setCategorias(categoriasEncontradas)

				if (estaEditando) {
					const produtoEncontrado =
						await buscarProdutoPorId(
							idProduto,
							usuario.token,
						)

					setProduto(produtoEncontrado)
				}
			} catch (erro) {
				console.error(
					"Erro ao carregar os dados do produto:",
					erro,
				)
				alert("Não foi possível carregar os dados do produto.")

				if (estaEditando) {
					navigate("/produtos")
				}
			} finally {
				setIsLoading(false)
			}
		}

		void carregarDados()
	}, [estaEditando, id, usuario.token, navigate])

	function atualizarCampo(
		evento: ChangeEvent<HTMLInputElement>,
	) {
		const { name, value } = evento.target

		setProduto((produtoAtual) => ({
			...produtoAtual,
			[name]: value,
		}))
	}

	function atualizarCategoria(
		evento: ChangeEvent<HTMLSelectElement>,
	) {
		const categoriaSelecionada = categorias.find(
			(categoria) =>
				categoria.id === Number(evento.target.value),
		)

		if (!categoriaSelecionada) {
			return
		}

		setProduto((produtoAtual) => ({
			...produtoAtual,
			categoria: categoriaSelecionada,
		}))
	}

	async function salvarProduto(
		evento: FormEvent<HTMLFormElement>,
	) {
		evento.preventDefault()

		const tituloTratado = produto.titulo.trim()
		const descricaoTratada = produto.descricao.trim()
		const imagemTratada = produto.imagem.trim()

		if (tituloTratado.length < 3 || tituloTratado.length > 100) {
			alert("O título deve possuir entre 3 e 100 caracteres.")
			return
		}

		if (descricaoTratada.length < 3 || descricaoTratada.length > 100) {
			alert("A descrição deve possuir entre 3 e 100 caracteres.")
			return
		}

		if (imagemTratada.length < 8) {
			alert("A URL da imagem deve possuir pelo menos 8 caracteres.")
			return
		}

		if (produto.preco <= 0) {
			alert("Informe um preço maior do que zero.")
			return
		}

		if (produto.categoria.id === 0) {
			alert("Selecione uma categoria.")
			return
		}

		const produtoParaEnviar: Produto = {
			...produto,
			titulo: tituloTratado,
			descricao: descricaoTratada,
			imagem: imagemTratada,
			preco: Number(produto.preco),
			categoria: {
				id: produto.categoria.id,
				tipo: produto.categoria.tipo,
			},
		}

		setIsLoading(true)

		try {
			if (estaEditando) {
				await atualizarProduto(
					produtoParaEnviar,
					usuario.token,
				)

				alert("Produto atualizado com sucesso!")
			} else {
				await cadastrarProduto(
					produtoParaEnviar,
					usuario.token,
				)

				alert("Produto cadastrado com sucesso!")
			}

			navigate("/produtos")
		} catch (erro) {
			console.error("Erro ao salvar produto:", erro)
			alert("Não foi possível salvar o produto.")
		} finally {
			setIsLoading(false)
		}
	}

	if (usuario.token === "") {
		return null
	}

	if (isLoading && estaEditando && produto.id === 0) {
		return (
			<div className="flex justify-center items-center min-h-[50vh]">
				<ClipLoader color="#7c3aed" size={50} />
			</div>
		)
	}

	return (
		<div className="container flex flex-col items-center justify-center mx-auto my-4 md:min-h-[70vh] px-4 py-12">
			<h1 className="text-3xl md:text-4xl text-center mb-6">
				{estaEditando
					? "Editar Produto"
					: "Cadastrar Produto"}
			</h1>

			<form
				onSubmit={salvarProduto}
				className="w-full max-w-lg flex flex-col gap-4"
			>
				<div className="flex flex-col gap-2">
					<label htmlFor="titulo" className="font-medium">
						Título do Produto
					</label>
					<input
						type="text"
						placeholder="Insira aqui o título do Produto"
						name="titulo"
						id="titulo"
						value={produto.titulo}
						onChange={atualizarCampo}
						disabled={isLoading}
						required
						minLength={3}
						maxLength={100}
						className="border-2 border-violet-700 rounded p-2 bg-white text-base focus:outline-none focus:ring-2 focus:ring-violet-500"
					/>
				</div>

				<div className="flex flex-col gap-2">
					<label htmlFor="descricao" className="font-medium">
						Descrição
					</label>
					<textarea
						placeholder="Descreva o Produto"
						name="descricao"
						id="descricao"
						value={produto.descricao}
						onChange={atualizarCampo as unknown as React.ChangeEventHandler<HTMLTextAreaElement>}
						disabled={isLoading}
						required
						minLength={3}
						maxLength={100}
						rows={3}
						className="border-2 border-violet-700 rounded p-2 bg-white text-base focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
					/>
				</div>

				<div className="flex flex-col gap-2">
					<label htmlFor="preco" className="font-medium">
						Preço (R$)
					</label>
					<NumericFormat
						id="preco"
						name="preco"
						value={produto.preco || ""}
						onValueChange={(valores) =>
							setProduto((produtoAtual) => ({
								...produtoAtual,
								preco: valores.floatValue ?? 0,
							}))
						}
						thousandSeparator="."
						decimalSeparator=","
						decimalScale={2}
						fixedDecimalScale
						allowNegative={false}
						prefix="R$ "
						disabled={isLoading}
						required
						className="border-2 border-violet-700 rounded p-2 bg-white text-base focus:outline-none focus:ring-2 focus:ring-violet-500"
						placeholder="R$ 0,00"
					/>
				</div>

				<div className="flex flex-col gap-2">
					<label htmlFor="imagem" className="font-medium">
						Imagem do Produto
					</label>
					<input
						type="text"
						placeholder="Adicione aqui a URL da imagem do Produto"
						name="imagem"
						id="imagem"
						value={produto.imagem}
						onChange={atualizarCampo}
						disabled={isLoading}
						required
						minLength={8}
						className="border-2 border-violet-700 rounded p-2 bg-white text-base focus:outline-none focus:ring-2 focus:ring-violet-500"
					/>
				</div>

				<div className="flex flex-col gap-2">
					<label htmlFor="categoria" className="font-medium">
						Categoria do Produto
					</label>
					<select
						name="categoria"
						id="categoria"
						value={produto.categoria.id}
						onChange={atualizarCategoria}
						disabled={isLoading}
						required
						className="p-2 bg-white border-2 rounded border-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500"
					>
						<option value={0} disabled>
							Selecione uma Categoria
						</option>

						{categorias.map((categoria) => (
							<option
								key={categoria.id}
								value={categoria.id}
							>
								{categoria.tipo}
							</option>
						))}
					</select>
				</div>

				<button
					className="rounded text-slate-100 bg-violet-600 hover:bg-violet-900 disabled:bg-violet-400 w-full py-2 mt-2 flex justify-center items-center text-base transition-colors"
					type="submit"
					disabled={isLoading}
				>
					{isLoading ? (
						<ClipLoader color="#ffffff" size={24} />
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

export default FormProduto
