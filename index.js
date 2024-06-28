const apiUrl = "http://localhost:3000/medicamentos";

// Criando funcao GET
async function getMedicamentos() {
  const response = await fetch(apiUrl);
  const medicamentos = await response.json();

  // Criando os elementos da tabela
  const listaDeMedicamentos = document.querySelector("#tabela-medicamentos");
  medicamentos.forEach((medicamentos) => {
    const tr = document.createElement("tr");
    const tbody = document.createElement("tbody");
    const tdNome = document.createElement("td");
    const tdDescricao = document.createElement("td");
    const tdPreco = document.createElement("td");
    const tdImage = document.createElement("td");
    const divBtnAdd = document.createElement("div");
    const divBtnEdit = document.createElement("div");
    const divBtnDelete = document.createElement("div");

    divBtnAdd.className = "d-inline";
    divBtnEdit.className = "d-inline";
    divBtnDelete.className = "d-inline";

    //Botão de Adicionar item
    divBtnAdd.innerHTML = ` 
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
      Adicionar
    </button>
    
    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Adicionar novo item</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
          <form>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Nome</label>
            <input type="text" class="form-control" id="nome-medicamento" aria-describedby="emailHelp">            
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Descrição</label>
            <input type="text" class="form-control" id="descricao-medicamento">
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Preço</label>
            <input type="number" class="form-control" id="preco-medicamento">
          </div>
          
          
        </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button type="submit" id="btn-add" onclick="AddMedicamento" class="btn btn-primary">Adicionar</button>
          </div>
        </div>
      </div>
    </div>
    `;
    //Botão de Editar

    divBtnEdit.innerHTML = `<button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#modaleditar">
    Editar
  </button>
  
  <!-- Modal -->
  <div class="modal fade" id="modaleditar" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Adicionar novo item</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
        <form>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Nome</label>
          <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">            
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Descrição</label>
          <input type="text" class="form-control" id="exampleInputPassword1">
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Preço</label>
          <input type="number" class="form-control" id="exampleInputPassword1">
        </div>
        
        
      </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
          <button type="submit" class="btn btn-primary">Salvar</button>
        </div>
      </div>
    </div>
  </div>`;

    //Botão para deletar
    divBtnDelete.innerHTML = `
    <!-- Button trigger modal -->
<button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#modalexcluir">
  Excluir
</button>

<!-- Modal -->
<div class="modal fade" id="modalexcluir" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Excluir item</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        Tem certeza que deseja excluir?
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        <button type="button" class="btn btn-danger">Excluir</button>
      </div>
    </div>
  </div>
</div>
    
        `;

    tdImage.innerHTML = `${medicamentos.imagem}`;
    tdNome.innerHTML = `<strong> ${medicamentos.nome} </strong>`;
    tdDescricao.innerHTML = ` ${medicamentos.descricao} `;
    tdPreco.innerHTML = `R$ ${medicamentos.preco.toFixed(2)} `;

    tr.appendChild(tdImage);
    tr.appendChild(tdNome);
    tr.appendChild(tdDescricao);
    tr.appendChild(tdPreco);
    tbody.appendChild(tr);
    tr.appendChild(divBtnAdd);
    tr.appendChild(divBtnEdit);
    tr.appendChild(divBtnDelete);
    listaDeMedicamentos.appendChild(tbody);
  });
}



//Função para Adicionar novo item

async function AddMedicamento() {
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, descricao, preco })
      });

      const name = document.querySelector('#nome-medicamento').value;
      const description = document.querySelector('#descricao-medicamento').value;
      const price = document.querySelector('#preco-medicamento').value;


}

document.addEventListener('DOMContentLoaded', () => {
    getMedicamentos();
    document.querySelector('#btn-add').addEventListener('submit', AddMedicamento);
  });



