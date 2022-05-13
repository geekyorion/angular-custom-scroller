export const getARandomNumber = (limit = 100) => {
  return ~~(Math.random() * 1e7) % limit;
}

export const getID = (id_length = 5) => {
  let id = 0;
  for (let i = 0; i < id_length; i++) {
    id = id * 10 + getARandomNumber(10);
  }
  return id;
}

export const getName = (name_length = 10) => {
  const str = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
  const length = str.length;

  let name = '';
  for (let i = 0; i < name_length; i++) {
    name += str[getARandomNumber(length)];
  }

  return name;
}
