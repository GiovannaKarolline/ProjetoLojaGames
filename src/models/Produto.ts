import type Categoria from "./Categoria"

export default interface Produto {
	id: number
	titulo: string
	descricao: string
	imagem: string
	preco: number
	categoria: Categoria
}
