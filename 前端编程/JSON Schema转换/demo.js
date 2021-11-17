// 法一
function transform_Array(input) {
  let res = [];
  for (let key in input) {
    // console.log(input[key]);
    const element = input[key];
    // console.log(element['type']);
    if (element['type'] === 'string' || element['type'] === 'number' || element['type'] === 'boolean') {
      const item = {
        field: key,
        type: element['type'],
        children: null,
      };
      res.push(item);
    } else if (element['type'] === 'array') {
      // console.log(`element['items']`, element['items']);
      const item = {
        field: key,
        type: 'array',
        children: transform_Object(element['items']),
      };
      res.push(item);
    } else if (element['type'] === 'object') {
      // console.log(`element['items']`, element['items']);
      const item = {
        field: key,
        type: 'object',
        children: transform_Object(element['properties']),
      };
      res.push(item);
    }
    // console.log(res);
  }
  return res;
}

function transform_Object(input) {
  let res = [];
  for (let key in input) {
    const element = input[key];
    if (input[key] === 'object') {
      // console.log(input['properties']);
      res.push(transform_Array(input['properties']));
    } else if (element['type'] === 'string' || element['type'] === 'number' || element['type'] === 'boolean') {
      const item = {
        field: key,
        type: element['type'],
        children: null,
      };
      res.push(item);
    }
  }
  return res;
}

let test = {
  $schema: 'http://json-schema.org/draft-04/schema#',
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

const res = transform_Object(test);
console.log(res);
console.log(JSON.stringify(res));

// 法二
function changeData(data, list) {
  let obj = data.properties;
  for (let i in obj) {
    if (['string', 'number', 'boolean'].includes(obj[i].type)) {
      list.push({ field: i, type: obj[i].type, children: null });
    } else if (obj[i].type === 'array') {
      list.push({ field: i, type: obj[i].type, children: changeData(obj[i].items, []) });
    } else {
      list.push({ field: i, type: obj[i].type, children: changeData(obj[i], []) });
    }
  }
  return list;
}

const res1 = changeData(test, []);
console.log(res1);
console.log(JSON.stringify(res1));
