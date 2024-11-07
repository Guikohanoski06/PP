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
                `;
                tbody.appendChild(tr);
            });
        } else {
            const tr = document.createElement('tr');
            tr.innerHTML = `<td colspan="5">Nenhum atendimento encontrado.</td>`;
            tbody.appendChild(tr);
        }
    } catch (error) {
        console.error('Erro ao carregar os atendimentos:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const psicologoId = urlParams.get('psicologo_id');
    console.log(psicologoId);

    if (psicologoId) {
        fetchAtendimentos(psicologoId);
    } else {
        console.error('Parâmetro psicologo_id não encontrado na URL.');
    }
});
