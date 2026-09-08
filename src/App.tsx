import { BrowserRouter, Route, Routes } from "react-router-dom"
import "react-toastify/dist/ReactToastify.css"

import Footer from "./components/footer/Footer"
import Navbar from "./components/navbar/Navbar"
import { AuthProvider } from "./contexts/AuthContext"
import { CartProvider } from "./contexts/CartContext"
import Cadastro from "./pages/cadastro/Cadastro"
import Home from "./pages/home/Home"
import Login from "./pages/login/Login"
import Perfil from "./pages/perfil/Perfil"
import ListarCategorias from "./components/categorias/listarcategorias/ListarCategorias"
import FormCategoria from "./components/categorias/formcategoria/FormCategoria"
import DeletarCategoria from "./components/categorias/deletarcategorias/DeletarCategoria"
import Cart from "./components/carrinho/cart/Cart"
import DeletarProduto from "./components/produtos/deletarproduto/DeletarProduto"
import FormProduto from "./components/produtos/formproduto/FormProduto"
import ListaProdutos from "./components/produtos/listaprodutos/ListaProdutos"

function App() {
	return (
		<AuthProvider>
			<CartProvider>
				<BrowserRouter>
					<Navbar />

					<div className="flex flex-col min-h-[70vh] bg-violet-950">
						<Routes>
							<Route path="/" element={<Login />} />
							<Route path="/cadastro" element={<Cadastro />} />
							<Route path="/home" element={<Home />} />
							<Route path="/perfil" element={<Perfil />} />
							<Route path="/categorias" element={<ListarCategorias />} />
							<Route path="/cadastrarcategoria" element={<FormCategoria />} />
							<Route path="/deletarcategoria/:id" element={<DeletarCategoria />} />
							<Route path="/editarcategoria/:id" element={<FormCategoria />} />
							<Route path="/produtos" element={<ListaProdutos />} />
							<Route path="/cadastrarproduto" element={<FormProduto />} />
							<Route path="/deletarproduto/:id" element={<DeletarProduto />} />
							<Route path="/editarproduto/:id" element={<FormProduto />} />
							<Route path="/carrinho" element={<Cart />} />
						</Routes>
					</div>

					<Footer />
				</BrowserRouter>
			</CartProvider>
		</AuthProvider>
	)
}

export default App
