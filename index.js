const fs = require("fs");
const prompt = require("readline-sync");

let tarefas = [];

if (fs.existsSync("tarefas.json")) {
  const dados = fs.readFileSync("tarefas.json");
  tarefas = JSON.parse(dados);
}

function mostrarMenu() {
  console.log("\n--- Lista de Tarefas ---");
  console.log("1 - Adicionar tarefa");
  console.log("2 - Listar tarefas");
  console.log("3 - Concluir tarefa");
  console.log("4 - Remover tarefa");
  console.log("0 - Sair");
}

function salvarTarefas() {
  fs.writeFileSync("tarefas.json", JSON.stringify(tarefas, null, 2));
}

function adicionarTarefa() {
  const descricao = prompt.question("Digite a nova tarefa: ");
  tarefas.push({ descricao, concluida: false });
  console.log("✅ Tarefa adicionada!");
  salvarTarefas();
}

function listarTarefas() {
  console.log("\n📋 Suas tarefas:");
  tarefas.forEach((tarefa, index) => {
    const status = tarefa.concluida ? "✔️" : "❌";
    console.log(`${index + 1}. [${status}] ${tarefa.descricao}`);
  });
}

function concluirTarefa() {
  listarTarefas();
  const num = prompt.questionInt("Digite o número da tarefa que concluiu: ") - 1;
  if (tarefas[num]) {
    tarefas[num].concluida = true;
    console.log("🎉 Tarefa marcada como concluída!");
    salvarTarefas();
  } else {
    console.log("⚠️ Tarefa não encontrada.");
  }
}

function removerTarefa() {
  listarTarefas();
  const num = prompt.questionInt("Digite o número da tarefa para remover: ") - 1;
  if (tarefas[num]) {
    tarefas.splice(num, 1);
    console.log("🗑️ Tarefa removida.");
    salvarTarefas();
  } else {
    console.log("⚠️ Tarefa não encontrada.");
  }
}

let opcao;

do {
  mostrarMenu();
  opcao = prompt.questionInt("Escolha uma opção: ");

  switch (opcao) {
    case 1:
      adicionarTarefa();
      break;
    case 2:
      listarTarefas();
      break;
    case 3:
      concluirTarefa();
      break;
    case 4:
      removerTarefa();
      break;
    case 0:
      console.log("👋 Saindo...");
      break;
    default:
      console.log("❌ Opção inválida.");
  }

} while (opcao !== 0);

