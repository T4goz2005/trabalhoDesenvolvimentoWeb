// Carregar histórico ao abrir a página
document.addEventListener("DOMContentLoaded", carregarHistorico);

function calcularMedia() {
  const nome = document.getElementById("nome").value.trim();
  const disciplina = document.getElementById("disciplina").value;
  const nota1 = parseFloat(document.getElementById("nota1").value) || 0;
  const nota2 = parseFloat(document.getElementById("nota2").value) || 0;
  const nota3 = parseFloat(document.getElementById("nota3").value) || 0;
  const nota4 = parseFloat(document.getElementById("nota4").value) || 0;

  // Validação de campos obrigatórios
  if (!nome || !disciplina) {
    alert("⚠️ Por favor, preencha o nome e selecione uma disciplina.");
    return;
  }

  // Cálculo da média
  const media = (nota1 + nota2 + nota3 + nota4) / 4;
  const resultado = document.getElementById("resultado");

  // Definir status
  const status = media >= 60 ? "✅ Aprovado" : "❌ Reprovado";
  resultado.textContent = `📊 Média: ${media.toFixed(2)} - ${status}`;
  resultado.style.color = media >= 60 ? "green" : "red";

  // Salvar histórico e recarregar
  salvarHistorico(nome, disciplina, media.toFixed(2), status);
  carregarHistorico();

  // Notificação personalizada
  alert(`✅ Dados salvos! Aluno: ${nome}, Disciplina: ${disciplina}, Média: ${media.toFixed(2)}, Status: ${status}`);
}

function salvarHistorico(nome, disciplina, media, status) {
  // Recuperar ou inicializar histórico no localStorage
  const historico = JSON.parse(localStorage.getItem("historico")) || [];
  historico.push({ nome, disciplina, media, status });
  localStorage.setItem("historico", JSON.stringify(historico));
}

function carregarHistorico() {
  // Recuperar histórico
  const historico = JSON.parse(localStorage.getItem("historico")) || [];
  const lista = document.getElementById("listaHistorico");
  lista.innerHTML = "";

  // Exibir histórico formatado
  historico.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      🧑‍🎓 <strong>Aluno:</strong> ${item.nome} <br>
      📘 <strong>Disciplina:</strong> ${item.disciplina} <br>
      📊 <strong>Média:</strong> ${item.media} <br>
      🎯 <strong>Status:</strong> ${item.status}
    `;
    lista.appendChild(li);
  });
}

function limparFormulario() {
  // Limpar mensagem de resultado
  document.getElementById("resultado").textContent = "";
}
