import React from 'react';

const content = (
  <React.Fragment>
    <h2>W jakim celu powstał projekt toruń.onthe.bike?</h2>
    <p>
      Od dawna brakowało mi aktualnej mapy dróg dla rowerów na terenie Torunia. Jako, że sam poruszam się w mieście głównie na rowerze uznałem, że warto poświęcić wolny czas na zgromadzenie danych i przygotowanie ich interaktywnej prezentacji, tak by każdy mógł sprawdzić aktualny stan infrastruktury rowerowej w Toruniu.
    </p>
    <p>
      Chcąc by mapa wykraczała poza zwykłe oznaczenie przebiegu dróg rowerowych, do każdego odcinka dodałem jego charakterystykę składającą się z typu drogi, rodzaju nawierzchni i jej obecnego stanu.
    </p>
    <p>Nie ukrywam, że dalszy rozwój mapy jest silnie uzależniony od aktywności użytkowników.</p>
    <h3>Założenia</h3>
    <ul>
      <li>mapa obejmuje wyłącznie granice miasta Toruń</li>
      <li>drogi są prezentowane w formie fragmentów, których podział opiera się zazwyczaj o rodzaj nawierzchni lub najważniejsze w mojej opinii ulice przecinające daną DDR</li>
      <li>jezdnie z kontraruchem zostają pominięte chyba, że stanowią spójne przedłużenie drogi dla rowerów</li>
      <li>Starówka zostaje pominięta</li>
      <li>z czasem mapa może być uzupełniona o nowe warstwy - w najbliższych planach jest mapa stacji roweru miejskiego oraz mapa serwisów i sklepów rowerowych</li>
    </ul>
    <hr />
    <h2>FAQ</h2>
    <h3>Jak mogę pomóc w tworzeniu mapy?</h3>
    <p>
      Możesz zgłosić uwagi za pomocą anonimowego formularza kontaktowego. Będę wdzięczny za wszelkie informacje na temat braków i nieścisłości w mojej mapie, robót drogowych obejmujących DDR itp. Nie mam żadnych związków z władzami miasta i robię mapę pro bono więc jakieś wpadki mogą się zawsze zdarzyć.
    </p>
    <h3>Czy po wszystkich zaznaczonych drogach można legalnie poruszać się rowerem?</h3>
    <p>
      Nie jestem prawnikiem ani policjantem i nie mam pewności - dlatego chciałbym zaznaczyć, że nie odpowiadam za ewentualne mandaty, chociaż będę bardzo wdzięczny za informacje jeśli na którejś z oznaczonych na mapie dróg są wręczane ;)<br/>W wielu miejscach istnieje problem z niespójnością oznakowania poziomego i pionowego, a także z określeniem gdzie się zaczyna i kończy dozwolony ruch rowerem. Tworząc mapę starałem się mimo wszystko wierzyć w logiczną spójność infrastruktury i dlatego uznaję, że np. na całej długości Lubickiej możemy jechać rowerem, choć na podstawie oznakowania jest to trudne do ustalenia.
    </p>
    <h3>Po co kolejna mapa? Przecież na GoogleMaps/OpenStreetMap/OpenCycleMaps są już DDR w Toruniu</h3>
    <p>
      W przypadku wszystkich powyższych źródeł spotkałem się z wieloma nieaktualnymi i brakującymi informacjami. Jeśli wierzyć Google Maps mamy 3 pasy dla rowerów na Al. Solidarności ;) Dodatkowo, chciałem uniknąć mieszania infrastruktury rowerowej z tzw. "drogami przyjaznymi dla rowerzystów" czyli jezdniami z kontraruchem rowerowym, które choć przydatne, nie stanowią w mojej opinii infrastruktury rowerowej.
    </p>
    <h3>Na jakiej podstawie oceniasz jakość nawierzchni?</h3>
    <p>
      Ocena stanu dróg jest czysto subiektywna i bazuje - w zależności od fragmentu - na moich tegorocznych doświadczeniach lub na ocenie zdjęć z Google Maps StreetView. Około 90% fragmentów przejechałem przynajmniej raz w tym roku (2019).
    </p>
    <h3>Dlaczego nie ma Starówki?</h3>
    <p>
      Ruch rowerowy na Starym Mieście jest oparty o jezdnie z kontraruchem i chodniki z warunkowym dopuszczeniem ruchu rowerów, a oznakowanie jest chaotyczne i uniemożliwia wygodne poruszanie się po Starówce. Być może <strong>w nieokreślonej przyszłości</strong> stworzę oddzielną mapę dla samego ruchu rowerowego na Starym Mieście.
    </p>
    <h3>Dokąd tupta nocą jeż?</h3>
    <p>Nie mnie to oceniać, ale jest kilka miejsc w Toruniu gdzie przy odrobinie pecha może nam się władować pod koła dzika zwierzyna, np. okolice Carrefoura.</p>
    <hr />
    <h2>Uwagi końcowe</h2>
    <p>Nośta kaski i złaźta z rowerów na przejściach. Czaszka jest jedna, a dwie tony blachy nie wybaczają ;)</p>
  </React.Fragment>
);

export default content;