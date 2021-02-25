export const VIEWS = [
  {
    value: '0',
    name: 'Không',
  },
  {
    value: '1',
    name: 'Biển',
  },
  {
    value: '2',
    name: 'Phố',
  },
  {
    value: '3',
    name: 'Bể bơi',
  },
];

export const getView = (value) => {
  const view = VIEWS.find((i) => i.value === `${value}`);
  if (view) return view.name;
  return 'Không';
};
