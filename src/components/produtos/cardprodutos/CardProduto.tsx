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
		<div className="flex flex-col justify-between overflow-hidden bg-white rounded-lg">
			<div className="flex items-end justify-end pt-2 pr-2">
				<Link to={`/editarproduto/${produto.id}`}>
					<PencilIcon
						size={24}
						className="mr-1 hover:fill-violet-600"
						aria-label={`Editar ${produto.titulo}`}
					/>
				</Link>

				<Link to={`/deletarproduto/${produto.id}`}>
					<TrashIcon
						size={24}
						className="mr-1 hover:fill-red-700"
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
					<p className="text-sm text-center uppercase">
						{produto.titulo}
					</p>
					<p className="text-xs text-center text-gray-500 mb-2 px-2 line-clamp-2">
						{produto.descricao}
					</p>
					<h3 className="text-xl font-bold text-center uppercase">
						{precoFormatado}
					</h3>
					<p className="text-sm italic text-center">
						Categoria:{' '}
						{produto.categoria?.tipo ?? 'Sem categoria'}
					</p>
				</div>
			</div>
			<div className="flex flex-wrap">
				<button
					type="button"
					onClick={() => adicionarProduto(produto)}
					className="flex items-center justify-center w-full py-2 text-white bg-amber-500 hover:bg-amber-700"
				>
					Comprar
				</button>
			</div>
		</div>
	)
}

export default CardProduto
