import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <>
            <h2 className='font-montserrat'>Iza - Informatyczny Zdalny Asystent</h2>
            <h3 className='font-montserrat'>Twoja Codzienna Opieka i Wsparcie, W Zasięgu Ręki</h3>
            <p className='font-hind'>
                IZA to innowacyjna aplikacja zaprojektowana, aby ułatwić życie osób potrzebujących
                regularnej opieki. Nasza misja to zapewnienie Ci codziennej, spersonalizowanej
                opieki, niezależnie od tego, gdzie się znajdujesz.
            </p>
            <ul>
                <h4>Funkcje Aplikacji:</h4>
                <li>
                    Codzienne Raporty Samopoczucia: Każdego dnia IZA prosi o wypełnienie krótkiego
                    raportu na temat Twojego samopoczucia. Informacje te pomagają śledzić Twoje
                    zdrowie i dostosowywać opiekę do Twoich aktualnych potrzeb.
                </li>
                <li>
                    Łatwy Kontakt z Specjalistami: Czy potrzebujesz porady lekarza, dietetyka, czy
                    wsparcia opiekuna? IZA ułatwia skontaktowanie się z odpowiednimi specjalistami
                    zlokalizowanymi w Twojej placówce. Wystarczy jedno kliknięcie, aby poprosić o
                    kontakt lub konsultację.
                </li>
                <li>
                    Udział w Zajęciach Placówki: Nie możesz być osobiście na miejscu? Żaden problem!
                    IZA oferuje funkcję zdalnego uczestnictwa w zajęciach i wydarzeniach
                    organizowanych przez Twoją placówkę. Dołącz do streamingu na żywo i bądź częścią
                    wspólnoty, nie wychodząc z domu.
                </li>
                <h4>Korzyści:</h4>
                <li>
                    Komfort i Bezpieczeństwo: Z IZA masz pewność, że Twoje potrzeby są monitorowane
                    i że pomoc jest zawsze na wyciągnięcie ręki.
                </li>
                <li>
                    Personalizacja: Aplikacja dostosowuje się do Twojego rytmu dnia i indywidualnych
                    potrzeb.
                </li>
                <li>
                    Łączność: Utrzymuj stały kontakt z Twoją placówką i społecznością, nawet będąc w
                    domu.
                </li>
            </ul>
            <h2>Z IZA, Jesteś Zawsze Pod Dobrą Opieką</h2>
            <p>Pobierz Aplikację Dzisiaj i Zacznij Odkrywać Swoje Nowe Możliwości! 🌟</p>
            <div>
                zaloguj się jako:
                <Link to='/admin'>Administrator</Link>
                <Link to='/pwa'>Użytkownik</Link>
            </div>
        </>
    );
};

export default LandingPage;
