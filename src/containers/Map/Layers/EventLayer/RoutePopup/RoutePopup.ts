import styles from './RoutePopup.module.css';

const getType = (type: number): string => {
  switch (String(type)) {
    case '0':
      return 'Droga dla rowerów';
    case '1':
      return 'Droga dla rowerów i pieszych';
    case '2':
      return 'Kontrapas rowerowy';
    case '3':
      return 'Pas rowerowy';
    case '4':
      return 'Chodnik z dopuszczonym ruchem rowerów';
    case '5':
      return 'Jezdnia z kontraruchem';
    case '9':
      return 'Przejazd rowerowy';
    default:
      return '';
  }
}

const getSurface = (surface: number): string => {
  switch (String(surface)) {
    case '0':
      return 'Asfalt';
    case '1':
      return 'Kostka bauma (fazowana)';
    case '2':
      return 'Płyta chodnikowa mała';
    case '3':
      return 'Płyta chodnikowa duża';
    case '4':
      return 'Utwardzona naturalna';
    case '5':
      return 'Luźna (Szuter/Piach)';
    case '6':
      return 'Inna';
    case '7':
      return 'Kostka bauma (niefaz.)';
    default:
      return '';
  }
}

const getQuality = (quality: number): string => {
  switch (String(quality)) {
    case '0':
      return 'Brak informacji';
    case '1':
      return 'Nieprzejezdna';
    case '2':
      return 'Popękana/zniszczona';
    case '3':
      return 'Miejscowe uszkodzenia';
    case '4':
      return 'Drobne ubytki';
    case '5':
      return 'Idealna';
    default:
      return '';
  }
}

const createStreet = (name: string): string => {
  return (
    `<p class="${ styles.street }">${ name }</p>`
  );
};

interface CreateFromToProps {
  nameFrom: string;
  nameTo: string;
  type: number;
}

const createFromTo = ({ nameFrom, nameTo, type }: CreateFromToProps) => {
  let inner = `<strong>od</strong> <span class="from">${ nameFrom }</span> <strong>do</strong> <span class="to">${ nameTo }</span>`;
  let isBikeCrossing = type === 9;

  if (isBikeCrossing) {
    inner = `<span class="from">${ nameFrom }</span> <span class="to">${ nameTo }</span>`;
  }
  
  return `<p class="${ styles.fromTo }">${ inner }</p>`;
}

const createType = (lanetype: number) => {
  let isBikeCrossing = lanetype === 9;

  if (isBikeCrossing) {
    return null;
  }
  
  return `<p class="${ styles.type }"><strong>Typ:</strong> <span>${ getType(lanetype) }</span></p>`;
}

const createSurface = (surfaceType: number) => {
  return (
    `<p class="${ styles.surface }">
      <strong>Nawierzchnia:</strong>
      &nbsp;
      <span>${ getSurface(surfaceType) }</span>
    </p>`
  );
};

const createQuality = (qualityType: number) => {
  return (
    `<p class="${ styles.quality }">
      <strong>Jakość:</strong>
      &nbsp;
      <span>${ getQuality(qualityType) }</span>
    </p>`
  );
};

interface CreatePopupProps {
  name: string;
  description: string;
  street: string;
  type: number;
  surface: number;
  quality: number;
  nameFrom: string;
  nameTo: string;
}

export const createRoutePopup = (popupType: string, properties: CreatePopupProps): string => {
  const { description, street, type, surface, quality, nameFrom, nameTo } = properties;

  switch (popupType.toString()) {
    case 'alert':
      return `<div><p class="${ styles.text }">${ description }</p></div>`;
  
    default:
      return `<div class="popupStreet">
        ${ createStreet(street) }
        ${ createFromTo({ nameFrom, nameTo, type }) }
        ${ createType(type) }
        ${ createSurface(surface) }
        ${ createQuality(quality) }
      </div>`;
  }
}

export const createStationPopup = (name: string) => {
  return `<div><p class="${ styles.text }">${ name }</p></div>`;
}
