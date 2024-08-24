// Problem:
// 1. Traverse the DOM tree and find any text node with the word Privacy and add a className privacy to the element. The className should turn the background color yellow, have a 2px black border around it
// 2. In the ul with id colors, change the background colors to their id's color when you click on the list li

// Helpful references:
// node.childNodes
// node.textContent
// node.nodeType
// node.parentNode
// document.getElementById

const findAndMarkPrivacyNodes = (node) => {
  if (!node) {
    return;
  }

  if ((node.nodeType === 3 && node.textContent.includes('Privacy')) || node.textContent.includes('privacy')) {
    node.parentNode.classList.add('privacy');
  }

  for (const item of node.childNodes) {
    findAndMarkPrivacyNodes(item);
  }
};

const isColor = () => {
  const color = document.getElementById('colors');

  if (color) {
    const lis = document.getElementsByTagName('li');

    for (const li of lis) {
      li.addEventListener('click', () => {
        li.style.backgroundColor = li.getAttribute('id');
      });
    }
  }
};

const div = document.getElementsByTagName('div');
findAndMarkPrivacyNodes(div[0]);
isColor();
