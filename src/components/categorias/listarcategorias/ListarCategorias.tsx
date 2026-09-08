import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ClipLoader } from "react-spinners"

import { AuthContext } from "../../../contexts/AuthContext"
import type Categoria from "../../../models/Categoria"
import { buscarCategorias } from "../../../services/Service"
import CardCategorias from "../cardcategorias/CardCategorias"

function ListarCategorias() {
	const navigate = useNavigate()
	const { usuario } = useContext(AuthContext)

	const [categorias, setCategorias] = useState<Categoria[]>([])
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		if (usuario.token === "") {
			navigate("/")
			return
		}

		async function carregarCategorias() {
			try {
				const resposta = await buscarCategorias(
					usuario.token,
				)

				setCategorias(resposta)
			} catch (erro) {
				console.error(
					"Erro ao buscar categorias:",
					erro,
				)
				alert("Não foi possível carregar as categorias.")
			} finally {
				setIsLoading(false)
			}
		}

		void carregarCategorias()
	}, [usuario.token, navigate])

	if (usuario.token === "") {
		return null
	}

	if (isLoading) {
		return (
			<div className="flex justify-center items-center min-h-[50vh]">
				<ClipLoader color="#7c3aed" size={50} />
			</div>
		)
	}

	return (
		<div className="flex justify-center w-full overflow-x-hidden">
			<div className="box-border w-full px-4 py-4 mt-8 mb-4 max-w-8xl sm:px-6 md:px-8 lg:px-12 md:py-6">
				{categorias.length === 0 ? (
					<p className="text-center text-xl">
						Nenhuma categoria encontrada.
					</p>
				) : (
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-6 mb-4 md:mb-0">
						{categorias.map((categoria) => (
							<CardCategorias
								key={categoria.id}
								categoria={categoria}
							/>
						))}
					</div>
				)}
			</div>
		</div>
	)
}

export default ListarCategorias
