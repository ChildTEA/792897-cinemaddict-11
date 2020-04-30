const positionToRenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};


const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

const render = (container, component, place = positionToRenderPosition.BEFOREEND) => {
  switch (place) {
    case positionToRenderPosition.AFTERBEGIN:
      container.prepend(component.getElement());
      break;
    case positionToRenderPosition.BEFOREEND:
      container.append(component.getElement());
      break;
  }
};

const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};


export {positionToRenderPosition, createElement, render, remove};
