export const catalogoDeAnimais = {
    'REX': { nomeOriginal: 'Rex', tipo: 'cao', brinquedos: ['RATO', 'BOLA'] },
    'MIMI': { nomeOriginal: 'Mimi', tipo: 'gato', brinquedos: ['BOLA', 'LASER'] },
    'FOFO': { nomeOriginal: 'Fofo', tipo: 'gato', brinquedos: ['BOLA', 'RATO', 'LASER'] },
    'ZERO': { nomeOriginal: 'Zero', tipo: 'gato', brinquedos: ['RATO', 'BOLA'] },
    'BOLA': { nomeOriginal: 'Bola', tipo: 'cao', brinquedos: ['CAIXA', 'NOVELO'] },
    'BEBE': { nomeOriginal: 'Bebe', tipo: 'cao', brinquedos: ['LASER', 'RATO', 'BOLA'] },
    'LOCO': { nomeOriginal: 'Loco', tipo: 'jabuti', brinquedos: ['SKATE', 'RATO'] }
};

// lista única de todos os brinquedos válidos
export const todosOsBrinquedos = new Set(
    Object.values(catalogoDeAnimais).flatMap(animal => animal.brinquedos)
);