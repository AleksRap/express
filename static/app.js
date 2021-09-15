document.addEventListener('DOMContentLoaded', () => {
  let servers = [];

  const spinner = document.querySelector('[data-id=spinner]');
  const listServers = document.querySelector('[data-id=servers]');

  const removeServer = async (idServer) => {
    const res = await fetch(`/api/server/${idServer}`, {
      method: 'DELETE',
    });

    const { id } = await res.json();

    servers = servers.filter(({ id: idServer }) => idServer !== id);
    listServers.querySelector(`[data-id="${id}"]`).remove();
  };

  listServers.addEventListener('click', ({ target }) => {
    const { id } = target.dataset;
    removeServer(id);
  });

  (async () => {
    const res = await fetch('/api/server');
    servers = await res.json();

    const listTemplate = servers.map(({ id, name, status }) => `
      <li class="list-group-item" data-id="${id}">
        ${name}
        <strong>${status}</strong>
      </li>
    `);

    listServers.innerHTML = listTemplate.join('');

    listServers.removeAttribute('hidden');
    spinner.setAttribute('hidden', '');
  })();

  let name = '';

  const input = document.querySelector('[data-id=input]');
  input.addEventListener('input', ({ currentTarget: { value } }) => name = value);

  const createServer = async () => {
    const data = {
      name,
      status: 'created',
    };

    const res = await fetch('/api/server', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    name = '';
    input.value = '';

    const newServer = await res.json();
    servers.push(newServer);
    listServers.insertAdjacentHTML('afterend', `
      <li class="list-group-item" data-id="${newServer.id}">
        ${newServer.name}
        <strong>${newServer.status}</strong>
      </li>
    `);
  };

  const form = document.querySelector('[data-id=form]');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    createServer();
  });
});
