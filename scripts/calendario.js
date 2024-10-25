const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
const calendar = document.getElementById('calendar');
const selectedDays = new Set();

// Simulando o ID do psicólogo
const psicologoId = 1;

// Gera o calendário de dias do mês
for (let i = 1; i <= 30; i++) {
    const dayButton = document.createElement('button');
    dayButton.textContent = `${days[(i + 6) % 7]} ${i}`; // Ajusta a indexação para os dias da semana
    dayButton.addEventListener('click', () => toggleDay(i, dayButton));
    calendar.appendChild(dayButton);
}

// Função para selecionar/deselecionar um dia
function toggleDay(day, button) {
    if (selectedDays.has(day)) {
        selectedDays.delete(day);
        button.classList.remove('selected');
    } else {
        selectedDays.add(day);
        button.classList.add('selected');
        // Chama função para buscar horários disponíveis para o dia selecionado
        const dia = `2024-10-${day.toString().padStart(2, '0')}`; // Formata a data
        getHorariosDisponiveis(psicologoId, dia);
    }
}

// Função para buscar horários disponíveis de um psicólogo em um dia específico
function getHorariosDisponiveis(psicologoId, dia) {
    fetch(`/api/calendar/horarios?psicologoId=${psicologoId}&dia=${dia}`)
        .then(response => response.json())
        .then(data => {
            const horariosList = document.getElementById('horariosList');
            horariosList.innerHTML = '';
            if (data.length === 0) {
                horariosList.innerHTML = '<li>Nenhum horário disponível</li>';
            } else {
                data.forEach(horario => {
                    const li = document.createElement('li');
                    li.textContent = `Horário: ${horario.hora}`;
                    horariosList.appendChild(li);
                });
            }
        })
        .catch(error => console.error('Erro ao buscar horários:', error));
}

// Enviar disponibilidade
function submitSchedule() {
    const selectedArray = Array.from(selectedDays);
    if (selectedArray.length === 0) {
        alert('Nenhum dia selecionado!');
        return;
    }

    // Envia a disponibilidade para o backend
    const requests = selectedArray.map(day => {
        const dia = `2024-10-${day.toString().padStart(2, '0')}`;
        return fetch('/api/calendar/disponibilidade', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                psicologoId: psicologoId,
                dia: dia,
                hora: '09:00' // Substitua por uma hora fixa ou escolha a partir dos horários disponíveis
            })
        });
    });

    Promise.all(requests)
        .then(responses => {
            return Promise.all(responses.map(res => res.json()));
        })
        .then(messages => {
            alert('Disponibilidades confirmadas:\n' + messages.map(msg => msg.message).join('\n'));
            selectedDays.clear(); // Limpa a seleção após confirmar
            document.querySelectorAll('.calendar button').forEach(btn => btn.classList.remove('selected')); // Remove a seleção visual
        })
        .catch(error => console.error('Erro ao confirmar disponibilidades:', error));
}
