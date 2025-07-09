'use client';
import { useEffect, useRef, useState } from 'react';
import PokemonButton from '@/components/pokemonButton';
import axios from 'axios';
import Loader from '@/components/loader';
import { fetchPokemons } from '@/apis/apis';

type Pokemon = {
  name: string;
  url: string;
};

export default function Home() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [search, setSearch] = useState('');
  const [offset, setOffset] = useState(0);
  const [count, setCount] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const debounceTimeoutRef = useRef(null);

  useEffect(() => {
    fetchPokemon();
  }, []);

   const fetchPokemon = async () => {
    try {
      setIsFetching(true);
      setError(null); // Clear previous error
      const res = await fetchPokemons();
      setPokemons(res?.results || []);
      setCount(res?.count || 0);
    } catch (err) {
      console.error('Failed to fetch Pokémon:', err);
      setError('Something went wrong while fetching Pokémon. Please try again later.');
    } finally {
      setIsFetching(false);
    }
    };

//-------------------Handle scroll pagination when we need-----------------------//
//   useEffect(() => {
//     const handleScroll = () => {
//       const el = scrollRef.current;
//       if (!el || isFetching) return;

//       const { scrollTop, scrollHeight, clientHeight } = el;
//       const scrollPercentage = (scrollTop + clientHeight) / scrollHeight;

//       if (scrollPercentage >= 0.8 && !debounceTimeoutRef.current && pokemons.length < count) {
//         console.log("ggggggggggggg", pokemons.length, count);

//         debounceTimeoutRef.current = setTimeout(() => {
//           setOffset((prev) => prev + 100);
//           debounceTimeoutRef.current = null;
//         }, 500);
//       }
//     };

//     const el = scrollRef.current;
//     el?.addEventListener('scroll', handleScroll);
//     return () => {
//       el?.removeEventListener('scroll', handleScroll);
//       if (debounceTimeoutRef.current) {
//         clearTimeout(debounceTimeoutRef.current);
//       }
//     };
//   }, [isFetching, pokemons.length, count]);


// useEffect(() => {
//   const el = scrollRef.current;
//   if (!el || isFetching) return;

//   const { scrollTop, scrollHeight, clientHeight } = el;
//   const scrollPercentage = (scrollTop + clientHeight) / scrollHeight;

//   if (
//     scrollPercentage >= 0.8 &&
//     !debounceTimeoutRef.current &&
//     pokemons.length < count
//   ) {
//     debounceTimeoutRef.current = setTimeout(() => {
//       setOffset((prev) => prev + 100);
//       debounceTimeoutRef.current = null;
//     }, 500);
//   }
// }, [pokemons]); 


  const filtered = pokemons.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      ref={scrollRef}
      ref={scrollRef} className="min-h-screen pb-6 px-4 transition-colors duration-500">
      <div className="max-w-5xl mx-auto">
       <div className="sticky top-15 z-10 bg-white py-4">

        <div className="flex justify-center mb-8">
          <input
            type="text"
            placeholder="Search Pokemon..."
            className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
</div>
 {error && (
          <div className="text-center text-red-600 font-medium mb-4">
            {error}
          </div>
        )}
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {filtered.map((pokemon, index) => {
            const id = pokemon.url.split('/').filter(Boolean).pop();
            return(
            <PokemonButton key={pokemon.name} index={Number(id)} name={pokemon.name} />
          )}
        )}
        </div>

         {isFetching && <Loader/>}       
      </div>
    </div>
  );
};
