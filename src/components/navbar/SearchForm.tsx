import { MagnifyingGlassIcon } from "@phosphor-icons/react";

function SearchForm() {

	return (
		<form className="relative flex items-center w-full">
			<div className="relative w-full flex items-center">
				<input
					className="w-full h-10 pl-4 pr-12 text-white bg-white/10 border border-white/20 rounded-lg shadow-sm backdrop-blur-md placeholder-slate-300 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all duration-200"
					type="search"
					placeholder="Buscar jogos..."
					id="busca"
					name="busca"
				/>
				<button
					type="submit"
					className="absolute right-1 h-8 w-8 rounded-md
                             bg-amber-500 hover:bg-amber-600 active:bg-amber-700
                             text-white 
                             flex items-center justify-center
                             transition-all duration-200
                             hover:scale-105 active:scale-95
                             shadow-sm hover:shadow-md"
					aria-label="Buscar"
				>
					<MagnifyingGlassIcon size={18} weight="bold" />
				</button>
			</div>
		</form>
	)
}

export default SearchForm
