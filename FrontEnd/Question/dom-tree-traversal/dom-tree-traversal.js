// Problem:
// 1. Traverse the DOM tree and find any text node with the word Privacy and add a className privacy to the element. The className should turn the background color yellow, have a 2px black border around it
// 2. In the ul with id colors, change the background colors to their id's color when you click on the list li

// Helpful references:
// node.childNodes
// node.textContent
// node.nodeType
// node.parentNode
// document.getElementById

const isPrivacy = (node) => {
  if ((node.nodeType === 3 && node.textContent.includes('Privacy')) || node.textContent.includes('privacy')) {
    console.log(node);

    node.parentNode.setAttribute('class', 'privacy');
  }
};

const isColor = () => {
  const ul = document.getElementById('colors');

  if (ul) {
    const lis = document.getElementsByTagName('li');

    for (const li of lis) {
      li.addEventListener('click', () => {
        li.style.backgroundColor = li.getAttribute('id');
      });
    }
  }
};

const traverse = (node) => {
  if (!node) {
    return;
  }

  isPrivacy(node);

  for (const item of node.childNodes) {
    traverse(item);
  }
};

const div = document.getElementsByTagName('div');
traverse(div[0]);
isColor();
