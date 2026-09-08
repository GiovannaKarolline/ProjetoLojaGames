import type Categoria from "./Categoria"

export default interface Produto {
	id: number
	nome: string
	foto: string
	preco: number
	categoria: Categoria
}
