const getPokemonAbilities = async (pokemonAbilities) => {
    let arr = [];
    for (let ele of pokemonAbilities) {
        const response = await fetch(ele.ability.url);
        const specificdata = await response.json();
        let newObj = {
            effect_entries: specificdata.effect_entries,
        };
        arr.push(newObj);
    }
    return arr;
};

const getPokemonForms = async (pokemonForms) => {
    let arr = [];
    for (let ele of pokemonForms) {
        const response = await fetch(ele.url);
        const specificdata = await response.json();
        let newObj = {
            is_battle_only: specificdata.is_battle_only,
            is_default: specificdata.is_default,
            version_group: specificdata.version_group.name,
        };
        arr.push(newObj);
    }
    return arr;
};

const getPokemonSpeciesInfo = async (pokemonSpeciesUrl) => {
    let arr = [];
    const response = await fetch(pokemonSpeciesUrl);
    const specificdata = await response.json();
    let newObj = {
        generation: specificdata.generation.name,
        color: specificdata.color.name,
        shape: specificdata.shape.name,
        capture_rate: specificdata.capture_rate,
        base_happiness: specificdata.base_happiness,
    };
    arr.push(newObj);
    return arr;
};

const getPokemonTypes = async (pokemonTypes) => {
    let arr = [];
    for (let ele of pokemonTypes) {
        const response = await fetch(ele.type.url);
        const specificdata = await response.json();
        let newObj = {
            generation: specificdata.generation.name,
            type: specificdata.name,
            moves: specificdata.moves.length,
            pokemons: specificdata.pokemon.length,
        };
        arr.push(newObj);
    }
    return arr;
};

export const getPokemonAbilities = getPokemonAbilities; 
export const getPokemonForms = getPokemonForms;
export const getPokemonSpeciesInfo = getPokemonSpeciesInfo;
export const getPokemonTypes = getPokemonTypes;
