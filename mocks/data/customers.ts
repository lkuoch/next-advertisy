import faker from "faker";

const customers = [
  {
    id: faker.datatype.uuid(),
    name: "Default",
  },
  {
    id: faker.datatype.uuid(),
    name: "SecondBite",
    offers: {
      "fdc697e8-dec8-4c67-ba5c-23b23a9ce21a": [
        {
          type: "XYDeal",
          values: [3, 2],
        },
      ],
    },
  },
  {
    id: faker.datatype.uuid(),
    name: "Axil Coffee Roasters",
    offers: {
      "2258da74-7a25-46fd-b2d3-dacfe30464ce": [
        {
          type: "NewPrice",
          values: [299.99],
        },
      ],
    },
  },
  {
    id: faker.datatype.uuid(),
    name: "MYER",
    offers: {
      "2258da74-7a25-46fd-b2d3-dacfe30464ce": [
        {
          type: "XYDeal",
          values: [5, 4],
        },
      ],
      "01562650-3000-42b7-9147-56822ed009fc": [
        {
          type: "NewPrice",
          values: [389.99],
        },
      ],
    },
  },
].concat(
  [...Array(faker.datatype.number(0))].map(() => ({
    id: faker.datatype.uuid(),
    name: faker.company.companyName(),
  }))
);

export default customers;
