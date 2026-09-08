import axios from "axios"

import type Categoria from "../models/Categoria"
import type Produto from "../models/Produto"
import type Usuario from "../models/Usuario"
import type UsuarioLogin from "../models/UsuarioLogin"

const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
})

function criarCabecalho(token: string) {
	return {
		headers: {
			Authorization: token,
		},
	}
}

export async function cadastrarUsuario(usuario: Usuario): Promise<Usuario> {
	const resposta = await api.post<Usuario>("/usuarios/cadastrar", usuario)

	return resposta.data
}

export async function autenticarUsuario(usuarioLogin: UsuarioLogin): Promise<UsuarioLogin> {
	const resposta = await api.post<UsuarioLogin>("/usuarios/logar", usuarioLogin)

	return resposta.data
}

export async function buscarCategorias(token: string): Promise<Categoria[]> {
	const resposta = await api.get<Categoria[]>("/categorias", criarCabecalho(token))

	return resposta.data
}

export async function buscarCategoriaPorId(id: number, token: string): Promise<Categoria> {
	const resposta = await api.get<Categoria>(`/categorias/${id}`, criarCabecalho(token))

	return resposta.data
}

export async function cadastrarCategoria(categoria: Categoria, token: string): Promise<Categoria> {
	const resposta = await api.post<Categoria>("/categorias", categoria, criarCabecalho(token))

	return resposta.data
}

export async function atualizarCategoria(categoria: Categoria, token: string): Promise<Categoria> {
	const resposta = await api.put<Categoria>("/categorias", categoria, criarCabecalho(token))

	return resposta.data
}

export async function deletarCategoria(id: number, token: string): Promise<void> {
	await api.delete(`/categorias/${id}`, criarCabecalho(token))
}

export async function buscarProdutos(token: string): Promise<Produto[]> {
	const resposta = await api.get<Produto[]>("/produtos", criarCabecalho(token))

	return resposta.data
}

export async function buscarProdutoPorId(id: number, token: string): Promise<Produto> {
	const resposta = await api.get<Produto>(`/produtos/${id}`, criarCabecalho(token))

	return resposta.data
}

export async function cadastrarProduto(produto: Produto, token: string): Promise<Produto> {
	const resposta = await api.post<Produto>("/produtos", produto, criarCabecalho(token))

	return resposta.data
}

export async function atualizarProduto(produto: Produto, token: string): Promise<Produto> {
	const resposta = await api.put<Produto>("/produtos", produto, criarCabecalho(token))

	return resposta.data
}

export async function deletarProduto(id: number, token: string): Promise<void> {
	await api.delete(`/produtos/${id}`, criarCabecalho(token))
}

export default api
