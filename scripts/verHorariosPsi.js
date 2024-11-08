async function fetchAtendimentos(psicologoId) {
    try {
        const response = await fetch(`http://localhost:3004/api/atendimentos?psicologo_id=${psicologoId}`);
        
        // Verifique se a resposta da API é válida
        if (!response.ok) {
            throw new Error('Falha ao buscar os atendimentos.');
        }

        const data = await response.json();
        
        // Verifique o que está vindo da API
        console.log(data);  // Adicione esta linha para depuração

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
                    <td><button class="agendar-btn" data-id="${atendimento.id}">Agendar</button></td>
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
