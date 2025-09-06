import { catalogoDeAnimais, todosOsBrinquedos } from "./dados-animais.js";

class AbrigoAnimais {

  _processarInput(inputString, catalogoValido, tipoErro) {
    const lista = inputString.split(',').map(item => item.trim().toUpperCase()).filter(Boolean);
    if (new Set(lista).size !== lista.length) return { erro: tipoErro };
    for (const item of lista) {
      if (!catalogoValido.has(item)) return { erro: tipoErro };
    }
    return { lista };
  }

  _eSubsequencia(pessoaBrinquedos, animalBrinquedos) {
    let i = 0;
    for (const brinquedo of pessoaBrinquedos) {
      if (i < animalBrinquedos.length && brinquedo === animalBrinquedos[i]) i++;
    }
    return i === animalBrinquedos.length;
  }

  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    const animaisConsideradosOriginal = ordemAnimais.split(',').map(a => a.trim()).filter(Boolean);

    const validacaoAnimais = this._processarInput(ordemAnimais, new Set(Object.keys(catalogoDeAnimais)), 'Animal inválido');
    if (validacaoAnimais.erro) return validacaoAnimais;
    const animaisChave = validacaoAnimais.lista;

    const validacaoBrinquedos1 = this._processarInput(brinquedosPessoa1, todosOsBrinquedos, 'Brinquedo inválido');
    if (validacaoBrinquedos1.erro) return validacaoBrinquedos1;
    const p1Brinquedos = validacaoBrinquedos1.lista;

    const validacaoBrinquedos2 = this._processarInput(brinquedosPessoa2, todosOsBrinquedos, 'Brinquedo inválido');
    if (validacaoBrinquedos2.erro) return validacaoBrinquedos2;
    const p2Brinquedos = validacaoBrinquedos2.lista;
    
    const adocoes = { pessoa1: [], pessoa2: [] };
    const resultadoFinal = [];

    for (let i = 0; i < animaisChave.length; i++) {
        const nomeChave = animaisChave[i];
        const animal = catalogoDeAnimais[nomeChave];
        let p1Apto = false, p2Apto = false;

        if (adocoes.pessoa1.length < 3) {
            if (animal.tipo === 'jabuti') { 
                p1Apto = adocoes.pessoa1.length > 0 && animal.brinquedos.every(b => p1Brinquedos.includes(b));
            } else { 
                p1Apto = this._eSubsequencia(p1Brinquedos, animal.brinquedos);
            }
        }

        if (adocoes.pessoa2.length < 3) {
            if (animal.tipo === 'jabuti') { 
                p2Apto = adocoes.pessoa2.length > 0 && animal.brinquedos.every(b => p2Brinquedos.includes(b));
            } else { 
                p2Apto = this._eSubsequencia(p2Brinquedos, animal.brinquedos);
            }
        }
        
        if (p1Apto && p2Apto) {
            resultadoFinal.push(`${animal.nomeOriginal} - abrigo`);
        } else if (p1Apto) {
            resultadoFinal.push(`${animal.nomeOriginal} - pessoa 1`);
            adocoes.pessoa1.push(nomeChave);
        } else if (p2Apto) {
            resultadoFinal.push(`${animal.nomeOriginal} - pessoa 2`);
            adocoes.pessoa2.push(nomeChave);
        } else {
            resultadoFinal.push(`${animal.nomeOriginal} - abrigo`);
        }
    }
    
    resultadoFinal.sort();
    return { lista: resultadoFinal };
  }
}

export { AbrigoAnimais as AbrigoAnimais };
