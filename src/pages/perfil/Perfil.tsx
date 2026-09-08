import { UserIcon } from "@phosphor-icons/react";

function Perfil() {
  return (
    <div className='container mx-auto px-4 sm:px-6 max-w-7xl rounded-2xl overflow-hidden'>
      <div className="w-full mt-4 h-40 sm:h-56 md:h-72 border-b-8 border-violet-300 rounded-t-2xl bg-gradient-to-r from-violet-900 via-purple-800 to-violet-950 relative overflow-hidden flex items-center justify-center">
        <div className="absolute opacity-30 bg-[url('https://www.transparenttextures.com/patterns/hexellence.png')] w-full h-full mix-blend-overlay"></div>
      </div>

      <div className='rounded-full w-28 h-28 sm:w-40 sm:h-40 md:w-56 md:h-56 mx-auto -mt-16 sm:-mt-24 md:-mt-32 border-8 border-violet-300 relative z-10 bg-violet-100 flex items-center justify-center'>
        <UserIcon size={64} weight="bold" className="text-violet-600" />
      </div>

      <div className="relative -mt-12 sm:-mt-16 md:-mt-20 mb-4 min-h-64 flex flex-col gap-1 bg-violet-900 text-white text-base sm:text-xl md:text-2xl items-center justify-center rounded-b-2xl px-4 py-6 text-center">
        <p className="font-bold wrap-break-word">Nome do Usuário</p>
        <p className="text-violet-200 wrap-break-word">usuario@email.com</p>
        <p className="text-sm sm:text-base text-violet-300">
          Nascimento: 01/01/2000
        </p>
      </div>
    </div>
  )
}

export default Perfil
