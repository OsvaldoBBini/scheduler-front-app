import ReactDOM from 'react-dom';

interface IReactPortal {
  containerID?: string,
  children: React.ReactNode
}

export function ReactPortal({ containerID = 'portal-root', children }: IReactPortal): JSX.Element {
  let container = document.getElementById(containerID);

  if (!container) {
    container = document.createElement('div');
    container.setAttribute('id', containerID);
    document.body.appendChild(container);
  }

  return ReactDOM.createPortal(children, container);
}