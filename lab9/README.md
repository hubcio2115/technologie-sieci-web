# Vue.js — „Pojedynek na wietrze” (prosta gra online)

Mamy przed sobą przeciwnika, z którym mamy stoczyć „pojedynek”. W trakcie jego trwania, możemy korzystać z następujących narzędzi:

- **Starcie** – Nacisnięcie tego przycisku powinno rozegrać kolejną „rundę” pojedynku podczas której, zarówno my jak i nasz przeciwnik ponosimy losowej wartości „straty”, których wielkość jest jednocześnie obrazowana na „wykresach” oraz umieszczana w „logu gry”.
- **Starcie++** – Naciśniecie tego przycisku powoduje wylosowanie wartości naszego „ataku” z poszerzonego przedziału (czyli potencjalnie o większej „sile rażenia”). Przeciwnik odpowiada wartością losowaną z przedziału identycznego, jak w przypadku obsługi guzika **Starcie**. Z opcji **++** możemy skorzystać, powiedzmy co 3-ci ruch – w innych momentach guzik staje się nieaktywny.
- **Odzyskanie sił** – Pozwala na dodanie do naszych „sił” losowej wartości. Akcja ta połączona powinna być jednak z atakiem przeciwnika, który to atak może zniwelować korzyści, jakie odnieśliśmy odzyskując siły. Załóżmy, że odyskiwanie sił będzie możliwe nie częściej niż co 5-te starcie.
- **Kapitulacja** – Poddajemy się i gra wraca do punktu wyjścia.
