import { createContext, useState } from "react"
import type { ReactNode } from "react"

import type Produto from "../models/Produto"

export interface ItemCarrinho extends Produto {
	quantidade: number
}

interface CartContextData {
	items: ItemCarrinho[]
	quantidadeItems: number
	valorTotal: number
	adicionarProduto(produto: Produto): void
	adicionarItem(id: number): void
	removerItem(id: number): void
	removerProduto(id: number): void
	limparCarrinho(): void
}

interface CartProviderProps {
	children: ReactNode
}

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext<CartContextData>(
	{} as CartContextData,
)

export function CartProvider({ children }: CartProviderProps) {
	const [items, setItems] = useState<ItemCarrinho[]>([])

	const quantidadeItems = items.reduce(
		(total, item) => total + item.quantidade,
		0,
	)

	const valorTotal = items.reduce(
		(total, item) =>
			total + Number(item.preco) * item.quantidade,
		0,
	)

	function adicionarProduto(produto: Produto) {
		setItems((itensAtuais) => {
			const produtoAdicionado = itensAtuais.find(
				(item) => item.id === produto.id,
			)

			if (produtoAdicionado) {
				return itensAtuais.map((item) =>
					item.id === produto.id
						? {
								...item,
								quantidade:
									item.quantidade + 1,
							}
						: item,
				)
			}

			return [
				...itensAtuais,
				{
					...produto,
					quantidade: 1,
				},
			]
		})
	}

	function adicionarItem(id: number) {
		setItems((itensAtuais) =>
			itensAtuais.map((item) =>
				item.id === id
					? {
							...item,
							quantidade: item.quantidade + 1,
						}
					: item,
			),
		)
	}

	function removerItem(id: number) {
		setItems((itensAtuais) =>
			itensAtuais
				.map((item) =>
					item.id === id
						? {
								...item,
								quantidade:
									item.quantidade - 1,
							}
						: item,
				)
				.filter((item) => item.quantidade > 0),
		)
	}

	function removerProduto(id: number) {
		setItems((itensAtuais) =>
			itensAtuais.filter((item) => item.id !== id),
		)
	}

	function limparCarrinho() {
		setItems([])
	}

	return (
		<CartContext.Provider
			value={{
				items,
				quantidadeItems,
				valorTotal,
				adicionarProduto,
				adicionarItem,
				removerItem,
				removerProduto,
				limparCarrinho,
			}}
		>
			{children}
		</CartContext.Provider>
	)
}
