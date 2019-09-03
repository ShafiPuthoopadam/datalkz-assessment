const data = [];
for (let i = 0; i < 25; i++) {
  data.push({
    key: i.toString(),
    name: `no-name ${i}`,
    email: `no-name${i}@domain.com`,
  });
}

const tableConfig = {
  userData: data
}

export default tableConfig;