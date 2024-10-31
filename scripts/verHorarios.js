document.addEventListener('DOMContentLoaded', () => {
    const tbody = document.getElementById('atendimentos-table-body');

    // Função para buscar os atendimentos da API
    const fetchAtendimentos = async () => {
        try {
            const response = await fetch('http://localhost:3004/api/atendimentos'); 
            if (!response.ok) {
                throw new Error('Erro ao buscar os atendimentos');
            }
            const atendimentos = await response.json();

            // Adiciona cada atendimento à tabela
            atendimentos.forEach(atendimento => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${atendimento.local}</td>
                    <td>${atendimento.horario}</td>
                    <td>${atendimento.contato}</td>
                    <td>${atendimento.status}</td>
                    <td>
                        <button class="delete" data-id="${atendimento.id}">Delete</button> <!-- Botão de delete -->
                    </td>
                `;
                tbody.appendChild(tr);
            });

            // Adiciona evento de click para os botões de delete
            const deleteButtons = document.querySelectorAll('.delete');
            deleteButtons.forEach(button => {
                button.addEventListener('click', deleteAtendimento);
            });
        } catch (error) {
            console.error('Erro:', error);
            const tr = document.createElement('tr');
            tr.innerHTML = `<td colspan="5">Erro ao carregar atendimentos.</td>`;
            tbody.appendChild(tr);
        }
    };

    // Função para deletar um atendimento
    const deleteAtendimento = async (event) => {
        const id = event.target.getAttribute('data-id'); // Obtém o ID do atendimento a ser deletado
        try {
            const response = await fetch(`http://localhost:3004/api/atendimentos/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Erro ao deletar o atendimento');
            }

            // Remove a linha da tabela
            event.target.closest('tr').remove();
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao deletar o atendimento.'); // Mensagem para o usuário
        }
    };

    fetchAtendimentos(); // Chama a função para buscar atendimentos
});
