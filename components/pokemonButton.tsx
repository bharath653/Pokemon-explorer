import Link from "next/link"

type pokemon = {
   index:number,
   name:string,
}
const PokemonButton = (pokeData:pokemon)=>{
    return(
        <Link  href={`/pokemon/${pokeData.index}`}>
              <div className="flex items-center bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:bg-blue-50 transition-all duration-200 cursor-pointer p-4">
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                    pokeData.index
                  }.png`}
                  alt={pokeData.name}
                  className="w-16 h-16 mr-4"
                />
                <p className="capitalize font-medium text-lg text-red-800">
                  {pokeData.name}
                </p>
              </div>
            </Link>
    )
}
export default PokemonButton;