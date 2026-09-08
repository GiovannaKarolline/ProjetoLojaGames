import { createContext, useState } from "react"
import type { ReactNode } from "react"

import type UsuarioLogin from "../models/UsuarioLogin"
import { autenticarUsuario } from "../services/Service"

interface AuthContextData {
	usuario: UsuarioLogin
	isLoading: boolean
	handleLogin(usuarioLogin: UsuarioLogin): Promise<void>
	handleLogout(): void
}

interface AuthProviderProps {
	children: ReactNode
}

const usuarioInicial: UsuarioLogin = {
	id: 0,
	nome: "",
	usuario: "",
	senha: "",
	foto: "",
	dataNascimento: "",
	token: "",
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
	const [usuario, setUsuario] = useState<UsuarioLogin>(usuarioInicial)

	const [isLoading, setIsLoading] = useState(false)

	async function handleLogin(usuarioLogin: UsuarioLogin): Promise<void> {
		setIsLoading(true)

		try {
			const usuarioAutenticado = await autenticarUsuario(usuarioLogin)

			setUsuario(usuarioAutenticado)
		} finally {
			setIsLoading(false)
		}
	}

	function handleLogout() {
		setUsuario({ ...usuarioInicial })
	}

	return (
		<AuthContext.Provider
			value={{
				usuario,
				isLoading,
				handleLogin,
				handleLogout,
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}
