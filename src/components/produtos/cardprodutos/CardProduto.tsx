import { PencilIcon, TrashIcon } from '@phosphor-icons/react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'

import { CartContext } from '../../../contexts/CartContext'
import type Produto from '../../../models/Produto'

interface CardProdutoProps {
	produto: Produto
}

function CardProduto({ produto }: CardProdutoProps) {
	const { adicionarProduto } = useContext(CartContext)

	const precoFormatado = new Intl.NumberFormat('pt-BR', {
		style: 'currency',
		currency: 'BRL',
	}).format(Number(produto.preco))

	return (
		<div className="flex flex-col justify-between overflow-hidden bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-white shadow-xl hover:shadow-2xl hover:border-white/30 transition-all duration-300">
			<div className="flex items-end justify-end pt-2 pr-2">
				<Link to={`/editarproduto/${produto.id}`}>
					<PencilIcon
						size={24}
						className="mr-1 text-slate-300 hover:text-amber-400 transition-colors"
						aria-label={`Editar ${produto.titulo}`}
					/>
				</Link>

				<Link to={`/deletarproduto/${produto.id}`}>
					<TrashIcon
						size={24}
						className="mr-1 text-slate-300 hover:text-red-500 transition-colors"
						aria-label={`Deletar ${produto.titulo}`}
					/>
				</Link>
			</div>

			<div className="py-4">
				<img
					src={produto.imagem}
					className="mx-auto mt-1 h-44 max-w-75"
					alt={produto.titulo}
				/>

				<div className="p-4">
					<p className="text-sm text-center uppercase text-white font-semibold">
						{produto.titulo}
					</p>
					<p className="text-xs text-center text-slate-300 mb-2 px-2 line-clamp-2">
						{produto.descricao}
					</p>
					<h3 className="text-xl font-bold text-center uppercase text-amber-400 drop-shadow-md">
						{precoFormatado}
					</h3>
					<p className="text-sm italic text-center text-slate-300">
						Categoria:{' '}
						{produto.categoria?.tipo ?? 'Sem categoria'}
					</p>
				</div>
			</div>
			<div className="flex flex-wrap">
				<button
					type="button"
					onClick={() => adicionarProduto(produto)}
					className="flex items-center justify-center w-full py-3 text-white transition-colors bg-amber-500 hover:bg-amber-600 font-bold"
				>
					Comprar
				</button>
			</div>
		</div>
	)
}

export default CardProduto
