function toggleEdit(field) {
    const inputField = document.getElementById(field);
    const button = document.getElementById(`edit-${field}-button`);

    if (button.innerText === "Editar") {
        inputField.disabled = false;
        button.innerText = "Salvar";
    } else {
        inputField.disabled = true;
        button.innerText = "Editar";
    }
}

function viewSchedule() {
    alert("Aqui você verá os horários marcados.");
}
