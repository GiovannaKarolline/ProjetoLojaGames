import { MinusIcon, PlusIcon, TrashIcon } from "@phosphor-icons/react"
import { useContext } from "react"

import {
	CartContext,
	type ItemCarrinho,
} from "../../../contexts/CartContext"

interface CardCartProps {
	item: ItemCarrinho
}

function formatarPreco(valor: number) {
	return new Intl.NumberFormat("pt-BR", {
		style: "currency",
		currency: "BRL",
	}).format(valor)
}

function CardCart({ item }: CardCartProps) {
	const { adicionarItem, removerItem, removerProduto } =
		useContext(CartContext)

	const subtotal = Number(item.preco) * item.quantidade

	return (
		<div className="flex flex-col gap-4 bg-violet-900 rounded-lg p-4 shadow-sm border border-violet-700 sm:flex-row">
			<div className="w-full h-32 shrink-0 bg-violet-800 rounded-lg p-2 flex items-center justify-center sm:w-32">
				<img
					src={item.foto}
					className="max-h-full max-w-full object-contain"
					alt={item.nome}
				/>
			</div>

			<div className="grow flex flex-col justify-between">
				<div>
					<h3 className="font-semibold text-violet-100 mb-1">
						{item.nome}
					</h3>
					<p className="text-sm text-violet-400 mb-2">
						Categoria:{" "}
						{item.categoria?.tipo ?? "Sem categoria"}
					</p>
					<p className="text-xl font-bold text-amber-400">
						{formatarPreco(Number(item.preco))}
					</p>
				</div>

				<div className="flex items-center gap-4 mt-3">
					<div className="flex items-center gap-2 border border-violet-600 rounded-lg">
						<button
							type="button"
							onClick={() => removerItem(item.id)}
							aria-label={`Diminuir quantidade de ${item.nome}`}
							className="p-2 hover:bg-violet-800 rounded-l-lg transition-colors"
						>
							<MinusIcon
								size={20}
								className="text-violet-300"
							/>
						</button>

						<span className="px-4 font-semibold text-violet-100 min-w-10 text-center">
							{item.quantidade}
						</span>

						<button
							type="button"
							onClick={() => adicionarItem(item.id)}
							aria-label={`Aumentar quantidade de ${item.nome}`}
							className="p-2 hover:bg-violet-800 rounded-r-lg transition-colors"
						>
							<PlusIcon
								size={20}
								className="text-violet-300"
							/>
						</button>
					</div>

					<button
						type="button"
						onClick={() => removerProduto(item.id)}
						className="p-2 text-red-400 hover:bg-violet-800 rounded-lg transition-colors"
						title="Remover produto"
						aria-label={`Remover ${item.nome} do carrinho`}
					>
						<TrashIcon size={20} />
					</button>
				</div>
			</div>

			<div className="flex flex-col items-start justify-between border-t border-violet-700 pt-3 sm:items-end sm:border-l sm:border-t-0 sm:pl-4 sm:pt-0">
				<p className="text-lg font-bold text-violet-100">
					{formatarPreco(subtotal)}
				</p>
			</div>
		</div>
	)
}

export default CardCart
