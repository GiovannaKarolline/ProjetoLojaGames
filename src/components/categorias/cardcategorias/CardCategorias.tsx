import { Link } from "react-router-dom"

import type Categoria from "../../../models/Categoria"

interface CardCategoriasProps {
	categoria: Categoria
}

function CardCategorias({
	categoria,
}: CardCategoriasProps) {
	return (
		<div className="border border-white/20 flex flex-col rounded-2xl overflow-hidden justify-between shadow-xl bg-white/10 backdrop-blur-md text-white hover:shadow-2xl hover:border-white/30 transition-all duration-300">
			<header className="py-3 px-6 bg-violet-900/80 text-white font-bold text-2xl border-b border-white/20">
				Categoria
			</header>

			<div className="p-8 h-full flex flex-col justify-center">
				<p className="text-3xl font-bold text-center text-white drop-shadow-md">{categoria.tipo}</p>
				<p className="text-base text-slate-300 text-center mt-2">{categoria.descricao}</p>
			</div>

			<div className="flex">
				<Link
					to={`/editarcategoria/${categoria.id}`}
					className="w-full text-white bg-amber-500/90 hover:bg-amber-500 flex items-center justify-center py-3 transition-colors font-bold"
				>
					Editar
				</Link>

				<Link
					to={`/deletarcategoria/${categoria.id}`}
					className="w-full text-white bg-red-500/80 hover:bg-red-500 flex items-center justify-center py-3 transition-colors font-bold"
				>
					Deletar
				</Link>
			</div>
		</div>
	)
}

export default CardCategorias