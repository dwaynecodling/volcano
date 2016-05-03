var toggle, drawer, content;

toggleButton = document.getElementById('toggle');
drawerButton = document.getElementById('toggleDrawer');
content = document.getElementById('content');

function toggleVisibility(){
  content.classList.toggle('visible');
}

function toggleStyle(){
  content.classList.toggle('drawer');
}