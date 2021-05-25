export default {
  bind: (el) => {
    el.addEventListener('click', func)
  },

  unbind: (el) => {
    el.removeEventListener('click', func);
  },
};
const func = () => {
  const selected = document.querySelector('.voice-list .voice-item.selected');
  if (selected) {
    selected.scrollIntoView({block: "center", behavior: "smooth"})
  }
};