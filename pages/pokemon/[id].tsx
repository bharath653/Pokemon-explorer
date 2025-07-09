import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {fetchPokemonDetail} from '@/apis/apis';
import Loader from '@/components/loader';


export default function PokemonDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [pokemon, setPokemon] = useState<any>(null);
  const [tab, setTab] = useState<'stats' | 'abilities' | 'moves'>('stats');
  const [error, setError] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if(id){
    fetchPokemon();
    }
  }, [id]);


const fetchPokemon = async () => {
    try {
      setIsFetching(true);
      setError(null); 
      const res = await fetchPokemonDetail(id);
      console.log("hhhh",res);
    setPokemon(res || []);
    } catch (err) {
      console.error('Failed to fetch Pokémon:', err);
      setError('Something went wrong while fetching Pokémon. Please try again later.');
    } finally {
      setIsFetching(false);
    }
    };
  



  return (
    <div className="min-h-screen bg-gray-50 p-4 flex flex-col items-center">
      <button
        onClick={() => router.back()}
        className="self-start mb-4 text-blue-600 hover:underline"
      >
        ← Back
      </button>
      {isFetching ?
      <Loader/>
      :
      error ?
      (
      <div className="text-center text-red-600 font-medium mb-4">
            {error}
          </div>
      )
          :
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md text-center">
        <h1 className="text-4xl font-bold capitalize text-red-800 mb-4">
          {pokemon?.name}
        </h1>
        <img
          src={pokemon?.sprites.front_default}
          alt={pokemon?.name}
          className="w-32 h-32 mx-auto mb-4"
        />

        <p className="text-gray-700 mb-2">
          <strong className="text-black">Type:</strong>{' '}
          {pokemon?.types.map((t: any) => t.type.name).join(', ')}
        </p>

        <div className="flex justify-center mb-4 space-x-4 text-sm">
          {['stats', 'abilities', 'moves'].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t as typeof tab)}
              className={`px-3 py-1 rounded ${
                tab === t
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        <div className="text-left text-gray-700">
          {tab === 'stats' && (
            <ul className="list-disc list-inside space-y-1 text-sm">
              {pokemon?.stats.map((s: any, i: number) => (
                <li key={i}>
                  <span className="capitalize">{s.stat.name}:</span>{' '}
                  <span className="font-semibold text-blue-700">
                    {s.base_stat}
                  </span>
                </li>
              ))}
            </ul>
          )}

          {tab === 'abilities' && (
            <ul className="list-disc list-inside text-sm space-y-1">
              {pokemon?.abilities.map((a: any, i: number) => (
                <li key={i} className="capitalize">
                  {a.ability.name}
                </li>
              ))}
            </ul>
          )}

          {tab === 'moves' && (
            <p className="text-sm">
              {pokemon?.moves
                .slice(0, 5)
                .map((m: any) => m.move.name)
                .join(', ')}
            </p>
          )}
        </div>
      </div>
}
    </div>
  );
}
