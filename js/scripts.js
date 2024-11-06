// Função para adicionar um novo usuário na lista
function adicionarUsuarioNaLista(usuario) {
    const listaUsuarios = document.getElementById('listaUsuarios');
    const li = document.createElement('li');
    li.textContent = `${usuario.nome} - ${usuario.email}`;
    listaUsuarios.appendChild(li);
}

// Função para listar todos os usuários cadastrados
async function listarUsuarios() {
    const resposta = await fetch('https://gerenciamento-usuarios.onrender.com:10000/usuarios');

    if (resposta.ok) {
        const usuarios = await resposta.json();
        const listaUsuarios = document.getElementById('listaUsuarios');
        listaUsuarios.innerHTML = ''; // Limpa a lista antes de adicionar os usuários

        usuarios.forEach(usuario => {
            adicionarUsuarioNaLista(usuario);
        });
    } else {
        console.error('Erro ao listar usuários');
    }
}

// Chama a função listarUsuarios quando a página for carregada
window.onload = listarUsuarios;

// Função para enviar um novo usuário ao backend
document.getElementById('formUsuario').addEventListener('submit', async function(e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;

    const resposta = await fetch('https://gerenciamento-usuarios.onrender.com:10000/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email })
    });

    if (resposta.ok) {
        const usuario = await resposta.json();
        adicionarUsuarioNaLista(usuario);
        document.getElementById('nome').value = '';
        document.getElementById('email').value = '';
    } else {
        console.error('Erro ao adicionar usuário');
    }
});
