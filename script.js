const apiUrl = 'http://localhost:3000/medicamentos';

document.addEventListener('DOMContentLoaded', () => {
  fetchMedicamentos();
  document.getElementById('medicamento-form').addEventListener('submit', adicionarMedicamento);
});

async function fetchMedicamentos() {
  const response = await fetch(apiUrl);
  const medicamentos = await response.json();
  const medicamentoList = document.getElementById('medicamento-list');
  medicamentoList.innerHTML = '';
  medicamentos.forEach(medicamento => {
    const medicamentoItem = document.createElement('li');
    medicamentoItem.className = 'list-group-item';
    medicamentoItem.innerHTML = `
      <strong>${medicamento.nome}</strong> - ${medicamento.descricao} - R$${medicamento.preco.toFixed(2)}
      <button class="btn btn-danger btn-sm float-right" onclick="deletarMedicamento(${medicamento.id})">Deletar</button>
      <button class="btn btn-info btn-sm float-right mr-2" onclick="editarMedicamento(${medicamento.id})">Editar</button>
    `;
    medicamentoList.appendChild(medicamentoItem);
  });
}

async function adicionarMedicamento(event) {
  event.preventDefault();
  const nome = document.getElementById('nome').value;
  const descricao = document.getElementById('descricao').value;
  const preco = parseFloat(document.getElementById('preco').value);

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ nome, descricao, preco })
  });

  if (response.ok) {
    fetchMedicamentos();
    document.getElementById('medicamento-form').reset();
    showAlert('Medicamento adicionado com sucesso!', 'success');
  } else {
    showAlert('Erro ao adicionar medicamento.', 'danger');
  }
}

async function deletarMedicamento(id) {
  const response = await fetch(`${apiUrl}/${id}`, {
    method: 'DELETE'
  });

  if (response.ok) {
    fetchMedicamentos();
    showAlert('Medicamento deletado com sucesso!', 'success');
  } else {
    showAlert('Erro ao deletar medicamento.', 'danger');
  }
}

function editarMedicamento(id) {
  // Implementar lógica de edição aqui
  // Sei fazer essa parte não kkk...
}

function showAlert(message, type) {
  const alertContainer = document.getElementById('alert-container');
  const alert = document.createElement('div');
  alert.className = `alert alert-${type}`;
  alert.textContent = message;
  alertContainer.appendChild(alert);
  setTimeout(() => {
    alert.remove();
  }, 3000);
}
