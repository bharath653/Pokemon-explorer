import axios from 'axios';

export const fetchPokemons = async (limit = 1300, offset = 0) => {
  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching Pokeon:', error);
    throw error;
  }
};

export const fetchPokemonDetail=async(id:string | number)=>{
try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${id}`
    );
    return response?.data;
  } catch (error) {
    console.error('Error fetching Pokeon:', error);
    throw error;
  }
};