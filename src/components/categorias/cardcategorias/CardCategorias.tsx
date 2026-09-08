import { Link } from "react-router-dom"

import type Categoria from "../../../models/Categoria"

interface CardCategoriasProps {
	categoria: Categoria
}

function CardCategorias({
	categoria,
}: CardCategoriasProps) {
	return (
		<div className="border flex flex-col rounded-2xl overflow-hidden justify-between">
			<header className="py-2 px-6 bg-violet-800 text-white font-bold text-2xl">
				Categoria
			</header>

			<div className="p-8 bg-white h-full">
				<p className="text-3xl font-bold text-center">{categoria.tipo}</p>
				<p className="text-base text-gray-600 text-center mt-2">{categoria.descricao}</p>
			</div>

			<div className="flex">
				<Link
					to={`/editarcategoria/${categoria.id}`}
					className="w-full text-slate-100 bg-violet-600 hover:bg-violet-700 flex items-center justify-center py-2"
				>
					Editar
				</Link>

				<Link
					to={`/deletarcategoria/${categoria.id}`}
					className="w-full text-slate-100 bg-red-500 hover:bg-red-700 flex items-center justify-center py-2"
				>
					Deletar
				</Link>
			</div>
		</div>
	)
}

export default CardCategorias