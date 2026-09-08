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
		nome: "",
		foto: "",
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

		const nomeTratado = produto.nome.trim()
		const fotoTratada = produto.foto.trim()

		if (nomeTratado.length < 3 || nomeTratado.length > 100) {
			alert("O nome deve possuir entre 3 e 100 caracteres.")
			return
		}

		if (fotoTratada.length < 5 || fotoTratada.length > 100) {
			alert("A URL da foto deve possuir entre 5 e 100 caracteres.")
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
			nome: nomeTratado,
			foto: fotoTratada,
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
					<label htmlFor="nome" className="font-medium">
						Nome do Produto
					</label>
					<input
						type="text"
						placeholder="Insira aqui o nome do Produto"
						name="nome"
						id="nome"
						value={produto.nome}
						onChange={atualizarCampo}
						disabled={isLoading}
						required
						minLength={3}
						maxLength={100}
						className="border-2 border-violet-700 rounded p-2 bg-white text-base focus:outline-none focus:ring-2 focus:ring-violet-500"
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
					<label htmlFor="foto" className="font-medium">
						Foto do Produto
					</label>
					<input
						type="text"
						placeholder="Adicione aqui a URL da foto do Produto"
						name="foto"
						id="foto"
						value={produto.foto}
						onChange={atualizarCampo}
						disabled={isLoading}
						required
						minLength={5}
						maxLength={100}
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
