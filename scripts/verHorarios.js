// verHorarios.js
document.addEventListener('DOMContentLoaded', () => {
    const tbody = document.getElementById('atendimentos-table-body');

    // Substitua por uma forma real de obter o ID do psicólogo logado
    const psicologoId = 1; // Exemplo, altere conforme necessário

    const fetchAtendimentos = async () => {
        try {
            const response = await fetch(`http://localhost:3004/api/atendimentos?psicologo_id=${psicologoId}`);
            if (!response.ok) {
                throw new Error('Erro ao buscar os atendimentos');
            }
            const atendimentos = await response.json();

            atendimentos.forEach(atendimento => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${atendimento.local}</td>
                    <td>${new Date(atendimento.data).toLocaleDateString()}</td>
                    <td>${atendimento.horario.slice(0, 5)}</td>
                    <td>${atendimento.contato}</td>
                    <td>${atendimento.status}</td>
                    <td>
                        <button class="delete" data-id="${atendimento.id}">Delete</button>
                    </td>
                `;
                tbody.appendChild(tr);
            });

            // Evento de click para o botão de delete
            const deleteButtons = document.querySelectorAll('.delete');
            deleteButtons.forEach(button => {
                button.addEventListener('click', deleteAtendimento);
            });
        } catch (error) {
            console.error('Erro:', error);
            const tr = document.createElement('tr');
            tr.innerHTML = `<td colspan="6">Erro ao carregar atendimentos.</td>`;
            tbody.appendChild(tr);
        }
    };

    const deleteAtendimento = async (event) => {
        const id = event.target.getAttribute('data-id');
        try {
            const response = await fetch(`http://localhost:3004/api/atendimentos/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Erro ao deletar o atendimento');
            }
            event.target.closest('tr').remove();
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao deletar o atendimento.');
        }
    };

    fetchAtendimentos();
});
