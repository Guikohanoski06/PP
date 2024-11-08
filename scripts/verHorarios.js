async function fetchAtendimentos(psicologoId) {
    try {
        const response = await fetch(`http://localhost:3004/api/atendimentos?psicologo_id=${psicologoId}`);
        const data = await response.json();

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

            document.querySelectorAll('.agendar-btn').forEach(button => {
                button.addEventListener('click', async (event) => {
                    const atendimentoId = event.target.getAttribute('data-id');
                    await agendarAtendimento(atendimentoId);
                    await fetchAtendimentos(psicologoId);
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

async function agendarAtendimento(atendimentoId) {
    try {
        const response = await fetch(`http://localhost:3004/api/atendimentos/${atendimentoId}/agendar`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: 'confirmado' })
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
