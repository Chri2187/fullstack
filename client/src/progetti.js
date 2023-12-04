import meteo_img from './img/weather_2.png';
import task_img from './img/taskList.jpeg';
import convert_img from './img/currency_converter.png';
const progetti = [
    {
        id: 1,
        titolo: 'Meteo App',
        testo: 'Con questa app puoi controlare il meteo di tutte le città',
        img: meteo_img,
        link: '/meteo',
    },
    {
        id: 2,
        titolo: 'Convertitore Euro - Dollaro',
        testo: 'Permette di convertire una valore da Euro a Dollaro',
        img: convert_img,
        link: '/converter',
    },
    {
        id: 3,
        titolo: 'Task List App',
        testo: 'Una semplice app per non dimenticarti niente',
        img: task_img,
        link: '/tasks',
    },
];

export default progetti;
