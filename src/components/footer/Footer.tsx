import { useContext } from "react"
import {
	FacebookLogoIcon,
	InstagramLogoIcon,
	LinkedinLogoIcon,
} from "@phosphor-icons/react"

import { AuthContext } from "../../contexts/AuthContext"

function Footer() {
	const { usuario } = useContext(AuthContext)

	if (usuario.token === "") {
		return null
	}

	return (
		<footer className="flex justify-center w-full px-2 text-white bg-violet-900 py-4 mt-auto">
			<div className="container flex flex-col items-center gap-2">
				<p className="text-base font-bold text-center md:text-xl">
					Loja de Games Generation | Copyright: 2026
				</p>

				<p className="text-sm text-center md:text-lg">
					Acesse nossas redes sociais
				</p>

				<nav
					className="flex flex-wrap justify-center gap-2"
					aria-label="Redes sociais"
				>
					<a
						href="#"
						className="flex items-center"
						aria-label="LinkedIn"
					>
						<span className="flex items-center justify-center w-10 h-10">
							<LinkedinLogoIcon
								size={28}
								weight="bold"
							/>
						</span>
					</a>

					<a
						href="#"
						className="flex items-center"
						aria-label="Instagram"
					>
						<span className="flex items-center justify-center w-10 h-10">
							<InstagramLogoIcon
								size={28}
								weight="bold"
							/>
						</span>
					</a>

					<a
						href="#"
						className="flex items-center"
						aria-label="Facebook"
					>
						<span className="flex items-center justify-center w-10 h-10">
							<FacebookLogoIcon
								size={28}
								weight="bold"
							/>
						</span>
					</a>
				</nav>
			</div>
		</footer>
	)
}

export default Footer
