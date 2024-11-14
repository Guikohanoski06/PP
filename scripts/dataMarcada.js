const user = JSON.parse(localStorage.getItem('user'));
const userId = user ? user.id : null;

console.log(user);
console.log(userId);

async function fetchAtendimentos() {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const userId = user ? user.id : null;

        if (!userId) {
            console.error('user_id não encontrado no localStorage');
            return;
        }

        console.log('Buscando atendimentos para o user_id:', userId);

        const response = await fetch(`http://localhost:3004/api/atendimentos/user/${userId}`);
        if (!response.ok) {
            throw new Error("Erro ao buscar atendimentos");
        }

        const data = await response.json();
        console.log('Atendimentos:', data);

        const atendimentosFiltrados = data.filter(atendimento => atendimento.user_id === userId);

        const tbody = document.getElementById('atendimentos-table-body');
        tbody.innerHTML = '';

        if (atendimentosFiltrados.length > 0) {
            atendimentosFiltrados.forEach(atendimento => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${atendimento.local}</td>
                    <td>${new Date(atendimento.data).toLocaleDateString()}</td>
                    <td>${atendimento.horario.slice(0, 5)}</td>
                    <td>${atendimento.contato}</td>
                    <td>${atendimento.status}</td>
                `;
                tbody.appendChild(tr);
            });

            document.querySelectorAll('.agendar-btn').forEach(button => {
                button.addEventListener('click', async (event) => {
                    const atendimentoId = event.target.getAttribute('data-id');
                    const psicologoId = new URLSearchParams(window.location.search).get('psicologo_id');
                    await agendarAtendimento(atendimentoId, psicologoId);
                    await fetchAtendimentos();
                });
            });
        } else {
            const tr = document.createElement('tr');
            tr.innerHTML = `<td colspan="6">Nenhum atendimento encontrado para este usuário.</td>`;
            tbody.appendChild(tr);
        }
    } catch (error) {
        console.error('Erro ao carregar os atendimentos:', error);
    }
}

async function agendarAtendimento(atendimentoId, psicologoId) {
    try {
        const response = await fetch(`http://localhost:3004/api/atendimentos/agendar/${atendimentoId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                status: 'Confirmado',
                user_id: userId,
                psicologo_id: psicologoId
            })
        });

        if (!response.ok) {
            throw new Error('Erro ao agendar atendimento');
        }

        console.log('Atendimento agendado com sucesso');
    } catch (error) {
        console.error('Erro ao agendar atendimento:', error);
    }
}

// Inicializar a função para carregar os atendimentos
fetchAtendimentos();
