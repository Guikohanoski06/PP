// Função para formatar a data
function formatarData(dataISO) {
    const data = new Date(dataISO);
    return data.toLocaleDateString('pt-BR');
}

// Função para formatar o horário
function formatarHorario(horarioISO) {
    const hora = new Date(horarioISO);
    return hora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

// Função para carregar as consultas confirmadas
async function fetchHorariosConfirmados() {
    try {
        const psicologo = JSON.parse(localStorage.getItem("psicologo"));
        console.log("Dados do psicólogo:", psicologo);

        if (!psicologo || !psicologo.id) {
            console.error("ID do psicólogo não encontrado no localStorage.");
            return;
        }

        const psicologoId = psicologo.id;

        const response = await fetch(`http://localhost:3004/api/consultas/agendadas?psicologo_id=${psicologoId}`);
        console.log(response);

        if (!response.ok) {
            throw new Error('Falha ao buscar as consultas confirmadas.');
        }

        const data = await response.json();
        console.log("Dados retornados pela API:", data);

        const tbody = document.getElementById('consultas-table-body');
        tbody.innerHTML = '';

        if (data.success && data.data.length > 0) {
            data.data.forEach(consulta => {
                const dataFormatada = formatarData(consulta.data);  // Formata a data

                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${consulta.local}</td>
                    <td>${dataFormatada}</td>
                    <td>${consulta.horario.slice(0, 5)}</td>
                    <td>${consulta.contato}</td>
                    <td>${consulta.status}</td>
                    <td>
                        <button onclick="deletarConsulta(${consulta.id})">Deletar</button>
                        <button onclick="editarStatus(${consulta.id})">Editar</button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        } else {
            const tr = document.createElement('tr');
            tr.innerHTML = `<td colspan="6">Nenhuma consulta confirmada encontrada.</td>`;
            tbody.appendChild(tr);
        }
    } catch (error) {
        console.error('Erro ao carregar as consultas:', error);
    }
}

// Função para deletar consulta
async function deletarConsulta(id) {
    console.log('Deletando consulta com ID:', id);  // Verifique o ID
    try {
        const response = await fetch(`http://localhost:3004/api/consultas/${id}`, { method: 'DELETE' });

        if (response.ok) {
            alert('Consulta deletada com sucesso.');
            fetchHorariosConfirmados(); // Recarrega as consultas
        } else {
            alert('Erro ao deletar consulta.');
        }
    } catch (error) {
        console.error('Erro ao deletar consulta:', error);
    }
}

// Função para editar o status da consulta
async function editarStatus(id) {
    const novoStatus = prompt('Digite o novo status (Confirmado, Pendente, Cancelado):');
    if (!novoStatus) return;

    try {
        const response = await fetch(`http://localhost:3004/api/consultas/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: novoStatus })
        });

        if (response.ok) {
            alert('Status atualizado com sucesso.');
            fetchHorariosConfirmados(); // Recarrega as consultas
        } else {
            alert('Erro ao atualizar status.');
        }
    } catch (error) {
        console.error('Erro ao atualizar status:', error);
    }
}

// Chama a função para carregar as consultas quando a página for carregada
fetchHorariosConfirmados();
