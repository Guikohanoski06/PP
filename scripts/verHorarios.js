async function fetchAtendimentos(psicologoId) {
    try {
        const response = await fetch(`http://localhost:3004/api/atendimentos?psicologo_id=${psicologoId}`);
        if (!response.ok) {
            throw new Error("Erro ao buscar atendimentos");
        }
        const data = await response.json();
        console.log(data);
        const tbody = document.getElementById('atendimentos-table-body');
        tbody.innerHTML = '';

        if (data.length > 0) {
            data.forEach(atendimento => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${atendimento.local}</td>
                    <td>${new Date(atendimento.data).toLocaleDateString()}</td>
                    <td>${atendimento.horario.slice(0, 5)}</td>
                    <td>${atendimento.contato}</td>
                    <td>${atendimento.status}</td>
                    <td><button class="agendar-btn" data-id="${atendimento.id}" ${atendimento.status === "Confirmado" ? 'disabled' : ''}>Agendar</button></td>
                `;
                tbody.appendChild(tr);
            });

            // Adiciona o evento de clique aos botões "Agendar"
            document.querySelectorAll('.agendar-btn').forEach(button => {
                button.addEventListener('click', async (event) => {
                    const atendimentoId = event.target.getAttribute('data-id');
                    await agendarAtendimento(atendimentoId, psicologoId); // Passa o psicologoId para a função
                    await fetchAtendimentos(psicologoId); // Atualiza a lista após o agendamento
                });
            });
        } else {
            const tr = document.createElement('tr');
            tr.innerHTML = `<td colspan="6">Nenhum atendimento encontrado.</td>`;
            tbody.appendChild(tr);
        }
    } catch (error) {
        console.error('Erro ao carregar os atendimentos:', error);
    }
}

async function agendarAtendimento(atendimentoId, psicologoId) {
    const user = JSON.parse(localStorage.getItem('user')); // Recupera o objeto user do localStorage
    const userId = user ? user.id : null; // Pega o id do usuário a partir do objeto user

    console.log('User:', user);  // Verifique o conteúdo de user aqui

    if (!userId || !psicologoId) {
        console.error('IDs ausentes: user_id ou psicologo_id não encontrados');
        return;
    }

    try {
        const response = await fetch(`http://localhost:3004/api/atendimentos/${atendimentoId}/agendar`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: 'Confirmado', user_id: userId, psicologo_id: psicologoId })
        });

        if (!response.ok) {
            throw new Error('Erro ao agendar o atendimento');
        }
        console.log(`Atendimento ${atendimentoId} agendado com sucesso.`);
    } catch (error) {
        console.error('Erro ao agendar atendimento:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const psicologoId = urlParams.get('psicologo_id');

    if (psicologoId) {
        fetchAtendimentos(psicologoId);
    } else {
        console.error('Parâmetro psicologo_id não encontrado na URL.');
    }
});
