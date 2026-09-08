import { useContext, useState } from "react"
import {
	ListIcon,
	ShoppingCartIcon,
	SignOutIcon,
	UserIcon,
	XIcon,
	GameController,
} from "@phosphor-icons/react"
import { Link, useNavigate } from "react-router-dom"

import { AuthContext } from "../../contexts/AuthContext"
import { CartContext } from "../../contexts/CartContext"
import SearchForm from "./SearchForm"

function Navbar() {
	const navigate = useNavigate()
	const { usuario, handleLogout } =
		useContext(AuthContext)
	const { quantidadeItems } = useContext(CartContext)

	const [menuAberto, setMenuAberto] = useState(false)

	function fecharMenu() {
		setMenuAberto(false)
	}

	function sair() {
		fecharMenu()
		handleLogout()
		alert("Usuário desconectado com sucesso!")
		navigate("/")
	}

	if (usuario.token === "") {
		return null
	}

	return (
		<>
			<div className="w-full flex justify-center py-4 text-white bg-violet-900 md:py-2">
				<div className="container flex items-center justify-between mx-6 mt-2 text-lg">
					<Link
						to="/home"
						onClick={fecharMenu}
						className="flex items-center gap-2 hover:opacity-80 transition-opacity"
					>
						<GameController size={48} weight="fill" className="text-amber-500" />
						<span className="text-2xl font-bold tracking-wider text-violet-100 uppercase hidden sm:block">
							Nex<span className="text-amber-500">Games</span>
						</span>
					</Link>

					<div className="relative flex items-center justify-center w-2/5 text-black max-md:hidden">
						<SearchForm />
					</div>

					<div className="items-center hidden gap-4 py-4 md:flex">
						<Link
							to="/produtos"
							className="hover:underline"
						>
							Produtos
						</Link>

						<Link
							to="/categorias"
							className="hover:underline"
						>
							Categorias
						</Link>

						<Link
							to="/cadastrarcategoria"
							className="hover:underline"
						>
							Cadastrar Categoria
						</Link>

						<Link
							to="/perfil"
							aria-label="Minha conta"
							className="hover:opacity-80 transition-opacity"
						>
							<UserIcon size={32} weight="bold" />
						</Link>

						<Link
							to="/carrinho"
							aria-label="Carrinho de compras"
							className="relative flex items-center hover:opacity-80 transition-opacity"
						>
							<ShoppingCartIcon
								size={32}
								weight="bold"
							/>

							{quantidadeItems > 0 && (
								<span className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs font-bold rounded-full min-w-5 h-5 px-1 flex items-center justify-center">
									{quantidadeItems}
								</span>
							)}
						</Link>

						<button
							type="button"
							onClick={sair}
							aria-label="Sair"
							className="hover:opacity-80 transition-opacity cursor-pointer"
						>
							<SignOutIcon
								size={32}
								weight="bold"
							/>
						</button>
					</div>

					<button
						type="button"
						className="md:hidden text-white p-2"
						onClick={() =>
							setMenuAberto(
								(estadoAtual) => !estadoAtual,
							)
						}
						aria-label={
							menuAberto
								? "Fechar menu"
								: "Abrir menu"
						}
						aria-expanded={menuAberto}
					>
						{menuAberto ? (
							<XIcon size={28} />
						) : (
							<ListIcon size={28} />
						)}
					</button>
				</div>
			</div>

			<div
				className={`${
					menuAberto ? "flex" : "hidden"
				} md:hidden flex-col gap-3 w-full bg-violet-900 text-white px-6 py-4 border-t border-violet-700`}
			>
				<div className="text-black">
					<SearchForm />
				</div>

				<Link
					to="/produtos"
					onClick={fecharMenu}
					className="hover:underline"
				>
					Produtos
				</Link>

				<Link
					to="/categorias"
					onClick={fecharMenu}
					className="hover:underline"
				>
					Categorias
				</Link>

				<Link
					to="/cadastrarcategoria"
					onClick={fecharMenu}
					className="hover:underline"
				>
					Cadastrar Categoria
				</Link>

				<Link
					to="/perfil"
					onClick={fecharMenu}
					className="flex items-center gap-2 hover:underline"
				>
					<UserIcon size={24} weight="bold" />
					Minha conta
				</Link>

				<Link
					to="/carrinho"
					onClick={fecharMenu}
					className="flex items-center gap-2 hover:underline"
				>
					<span className="relative flex items-center">
						<ShoppingCartIcon
							size={24}
							weight="bold"
						/>

						{quantidadeItems > 0 && (
							<span className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs font-bold rounded-full min-w-5 h-5 px-1 flex items-center justify-center">
								{quantidadeItems}
							</span>
						)}
					</span>
					Carrinho
				</Link>

				<button
					type="button"
					onClick={sair}
					className="flex items-center gap-2 hover:underline text-left cursor-pointer"
				>
					<SignOutIcon size={24} weight="bold" />
					Sair
				</button>
			</div>
		</>
	)
}

export default Navbar
