// function transform(input) {
//   const json = JSON.parse(String(input));
//   console.log(json);
//   // return transform_JSONSchema(json);
// }

function transform_JSONSchema(input) {
  let res = [];
  for (let key in input) {
    console.log(input[key]);
    const element = input[key];
    console.log(element['type']);
    if (element['type'] === 'string' || element['type'] === 'number' || element['type'] === 'boolean') {
      const item = {
        field: key,
        type: element['type'],
        children: null,
      };
      res.push(item);
    } else if (element['type'] === 'object') {
      transform_JSONSchema(element['properties']);
    } else if (element['type'] === 'array') {
      console.log(`element['items']`, element['items']);
      const item = {
        field: key,
        type: 'array',
        children: transform_JSONSchema(element['items']),
      };
      res.push(item);
    }
    console.log(res);
  }
  // return res;
}

let test = {
  type: 'object',
  properties: {
    logo: {
      type: 'string',
    },
    name: {
      type: 'string',
    },
    menus: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          type: {
            type: 'number',
          },
          ext_data: {
            type: 'object',
            properties: {
              url: {
                type: 'string',
              },
            },
          },
          menu_name: {
            type: 'string',
          },
          sub_menu_list: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                type: {
                  type: 'number',
                },
                ext_data: {
                  type: 'object',
                  properties: {
                    url: {
                      type: 'string',
                    },
                  },
                },
              },
            },
          },
        },
        required: ['type', 'ext_data', 'menu_name', 'sub_menu_list'],
      },
    },
  },
};

const res = transform_JSONSchema(test);
console.log(res);
