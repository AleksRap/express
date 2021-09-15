let servers = [
  { id: '1', name: 'AWS', status: 'working' },
  { id: '2', name: 'Google Cloud', status: 'working' },
  { id: '3', name: 'Yandex Cloud', status: 'working' },
  { id: '4', name: 'Microsoft', status: 'pending' },
];

export const getAll = (req, res) => {
  res.status(200).json(servers);
}

export const create = (req, res) => {
  const newServer = {
    id: Date.now().toString(),
    ...req.body,
  };

  servers.push(newServer);
  res.status(201).json(newServer);
};

export const remove = (req, res) => {
  servers = servers.filter(({ id }) => id !== req.params.idServer);
  res.status(202).json({ id: req.params.idServer });
};
