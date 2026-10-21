async function buscarCEP() {
  const cep = document.getElementById('cep').value;
  const elMensagem = document.getElementById('mensagem');

  elMensagem.textContent = '';
  elMensagem.className = '';

  try {
    const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const dados = await resposta.json();

    if (!resposta.ok || dados.erro) {
      throw new Error('CEP não encontrado');
    }

    document.getElementById('rua').value = dados.logradouro;
    document.getElementById('bairro').value = dados.bairro;
    document.getElementById('cidade').value = `${dados.localidade} / ${dados.uf}`;

    elMensagem.textContent = 'Endereço encontrado com sucesso!';
    elMensagem.className = 'sucesso';

  } catch (erro) {
    document.getElementById('rua').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';

    elMensagem.textContent = 'Não foi possível buscar o CEP.';
    elMensagem.className = 'erro';
  }
}