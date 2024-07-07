document.addEventListener('DOMContentLoaded', () => {
    const cepInput = document.getElementById('cepInput');
    const searchBtn = document.getElementById('searchBtn');
    const addressInfo = document.getElementById('addressInfo');

    searchBtn.addEventListener('click', () => {
        const cep = cepInput.value.trim();
        getAddress(cep);
    });

    async function getAddress(cep) {
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();
            if (data.erro) {
                addressInfo.innerHTML = '<p>CEP não encontrado.</p>';
            } else {
                const addressHTML = `
                    <p><strong>CEP:</strong> ${data.cep}</p>
                    <p><strong>Logradouro:</strong> ${data.logradouro}</p>
                    <p><strong>Bairro:</strong> ${data.bairro}</p>
                    <p><strong>Cidade:</strong> ${data.localidade}</p>
                    <p><strong>Estado:</strong> ${data.uf}</p>
                `;
                addressInfo.innerHTML = addressHTML;
            }
        } catch (error) {
            console.error('Erro ao buscar endereço:', error);
            addressInfo.innerHTML = '<p>Ocorreu um erro ao buscar o endereço. Por favor, tente novamente mais tarde.</p>';
        }
    }
});
