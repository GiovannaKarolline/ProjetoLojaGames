import { ShoppingCartIcon } from "@phosphor-icons/react"
import { useContext } from "react"
import { Link } from "react-router-dom"

import { CartContext } from "../../../contexts/CartContext"
import CardCart from "../cardcart/CardCart"

function formatarPreco(valor: number) {
	return new Intl.NumberFormat("pt-BR", {
		style: "currency",
		currency: "BRL",
	}).format(valor)
}

function Cart() {
	const { items, quantidadeItems, valorTotal, limparCarrinho } =
		useContext(CartContext)

	function finalizarCompra() {
		alert("Compra finalizada com sucesso!")
		limparCarrinho()
	}

	return (
		<div className="min-h-screen bg-violet-950 py-8">
			<div className="container mx-auto px-4">
				<h1 className="text-3xl md:text-4xl text-center text-violet-100 mb-8">
					Carrinho de Compras
				</h1>

				{items.length === 0 ? (
					<div className="flex flex-col items-center rounded-lg bg-violet-900 px-6 py-16 text-center shadow-sm">
						<ShoppingCartIcon
							size={64}
							className="text-violet-400"
						/>
						<h2 className="mt-4 text-2xl font-bold text-violet-100">
							Seu carrinho está vazio
						</h2>
						<p className="mt-2 text-violet-300">
							Adicione alguns jogos para começar.
						</p>
						<Link
							to="/produtos"
							className="mt-6 rounded-lg bg-amber-500 px-6 py-3 font-semibold text-white hover:bg-amber-700"
						>
							Ver produtos
						</Link>
					</div>
				) : (
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
						<div className="lg:col-span-2 space-y-4">
							{items.map((item) => (
								<CardCart key={item.id} item={item} />
							))}
						</div>

						<div className="lg:col-span-1">
							<div className="bg-violet-900 rounded-lg shadow-sm p-6 sticky top-4">
								<h2 className="text-xl font-bold text-violet-100 mb-4 pb-4 border-b border-violet-700">
									Resumo da Compra
								</h2>

								<div className="space-y-3 mb-6">
									<div className="flex justify-between text-violet-300">
										<span>
											Produtos ({quantidadeItems})
										</span>
										<span className="font-semibold text-violet-100">
											{formatarPreco(valorTotal)}
										</span>
									</div>

									<div className="flex justify-between text-violet-300">
										<span>Frete</span>
										<span className="font-semibold text-green-400">
											Grátis
										</span>
									</div>

									<div className="flex justify-between text-violet-300">
										<span>Desconto</span>
										<span className="font-semibold text-violet-100">
											{formatarPreco(0)}
										</span>
									</div>
								</div>

								<div className="flex justify-between items-center text-lg font-bold py-4 mb-6 border-t border-violet-700">
									<span className="text-violet-100">Total</span>
									<span className="text-2xl text-amber-400">
										{formatarPreco(valorTotal)}
									</span>
								</div>

								<div className="mb-4 pb-4 border-b border-violet-700">
									<p className="text-sm text-violet-300 mb-3">
										Formas de pagamento:
									</p>
									<div className="flex flex-wrap gap-2 justify-center">
										<div className="flex flex-row bg-violet-800 p-2 rounded text-xs font-semibold text-violet-200">
											<img
												src="https://ik.imagekit.io/vzr6ryejm/ecommerce/credit-card.png"
												alt="Cartão de crédito"
												className="w-10"
											/>
										</div>
										<div className="flex flex-row items-center gap-1 bg-violet-800 p-2 rounded text-xs font-semibold text-violet-200">
											<img
												src="https://ik.imagekit.io/vzr6ryejm/ecommerce/pix-svgrepo-com.svg"
												alt="PIX"
												className="w-4"
											/>
											<span>PIX</span>
										</div>
										<div className="flex flex-row bg-violet-800 p-2 rounded text-xs font-semibold text-violet-200">
											<img
												src="https://ik.imagekit.io/vzr6ryejm/ecommerce/google-pay-svgrepo-com.svg"
												alt="Google Pay"
												className="w-8"
											/>
										</div>
										<div className="flex flex-row bg-violet-800 p-2 rounded text-xs font-semibold text-violet-200">
											<img
												src="https://ik.imagekit.io/vzr6ryejm/ecommerce/apple-pay-svgrepo-com.svg"
												alt="Apple Pay"
												className="w-8"
											/>
										</div>
										<div className="bg-violet-800 p-2 rounded text-xs font-semibold text-violet-200">
											<img
												src="https://ik.imagekit.io/vzr6ryejm/ecommerce/boleto-logo.svg"
												alt="Boleto bancário"
												className="w-10"
											/>
										</div>
									</div>
								</div>

								<button
									type="button"
									onClick={finalizarCompra}
									className="w-full bg-amber-500 hover:bg-amber-700 text-white font-semibold py-3 rounded-lg transition-colors"
								>
									Finalizar Compra
								</button>

								<p className="text-xs text-violet-400 text-center mt-4">
									Frete grátis para todo o Brasil
								</p>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default Cart
