import Logo from '../common-components/Logo/Logo';
import InstallPWA from './InstallButton/InstallPWA';
import HeroIllustration from '../assets/illustrations/hero_illustration.svg?react';
import Benefit1 from '../assets/images/benefits_photo-1.jpg';
import Benefit2 from '../assets/images/benefits_photo-2.jpg';
import Benefit3 from '../assets/images/benefits_photo-3.jpg';

const LandingPage = () => {
    return (
        <>
            <div>
                <div className='relative text-pureWhite'>
                    <div className='navbar fixed inset-x-0 left-1/2 z-50 max-w-7xl -translate-x-1/2 bg-transparent'>
                        <div className='flex-1'>
                            <Logo className='w-12' />
                        </div>
                        <div className='flex-none'>
                            <ul className='menu menu-horizontal px-1'>
                                <li>
                                    <a>O aplikacji IZA</a>
                                </li>
                                <li>
                                    <a>Funkcje</a>
                                </li>
                                <li>
                                    <a>Korzyści</a>
                                </li>
                                <li>
                                    <a>Kontakt</a>
                                </li>
                                <li>
                                    <a>Zaloguj</a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className='bg-gradient-to-r hero min-h-[600px] bg-hero-pattern'>
                        <div className='hero-content grid grid-cols-2 text-left'>
                            <div className='max-w-md'>
                                <h1 className='text-3xl font-bold'>
                                    Gotowy na nowy standard opieki?
                                </h1>
                                <p className='py-6'>
                                    Odkryj wygodę i wsparcie, na które zasługujesz
                                </p>
                                <button className='btn btn-primary text-pureWhite'>
                                    Dowiedz się więcej!
                                </button>
                            </div>
                            <div className='pl-16 pt-16'>
                                <HeroIllustration className='w-full' />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='bg-white pt-24 sm:pt-32'>
                    <div className='mx-auto max-w-7xl px-6 lg:px-4'>
                        <div className='mx-auto '>
                            <p className='mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
                                Iza - Innowacyjny Zdalny Asystent
                            </p>
                            <p className='mt-6 text-lg leading-8 text-gray-600'>
                                Aplikacja Iza to nowoczesne narzędzie, które zapewnia kompleksową
                                opiekę zdrowotną w sposób wygodny i dostępny. Dzięki
                                spersonalizowanym funkcjom i łatwemu kontaktowi z ekspertami,
                                użytkownicy mogą szybko otrzymać potrzebną pomoc. Iza umożliwia
                                także uczestnictwo w zajęciach online, zapewniając wsparcie
                                zdrowotne bez względu na odległość.
                            </p>
                        </div>
                        <div className='mx-auto max-w-2xl pt-10 lg:text-center'>
                            <p className='my-6 text-lg leading-8 text-gray-600'>
                                Pobierz Aplikację Dzisiaj i Zacznij Odkrywać Swoje Nowe Możliwości!
                            </p>
                            <InstallPWA label='Pobierz Aplikację' />
                        </div>
                    </div>
                    <div className='bg-white py-24 sm:py-32'>
                        <div className='mx-auto max-w-7xl px-6 lg:px-4'>
                            <div className='mx-auto max-w-2xl lg:text-center'>
                                <p className='mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
                                    Funkcje:
                                </p>
                                <p className='mt-6 text-lg leading-8 text-gray-600'>
                                    Odkryj naszą aplikację, która zapewnia łatwy dostęp do
                                    kompleksowych funkcji, umożliwiając Ci lepszą opiekę zdrowotną w
                                    zasięgu Twojej ręki.
                                </p>
                            </div>
                            <div className='mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-full'>
                                <dl className='grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3 lg:gap-y-16'>
                                    <div className='relative pl-16'>
                                        <dt className='text-base font-semibold leading-7 text-gray-900'>
                                            <div className='bg-indigo-600 absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg'>
                                                icon
                                            </div>
                                            Spersonalizowana opieka
                                        </dt>
                                        <dd className='mt-2 text-base leading-7 text-gray-600'>
                                            IZA to innowacyjna aplikacja zaprojektowana, aby ułatwić
                                            życie osób potrzebujących regularnej opieki. Nasza misja
                                            to zapewnienie Ci codziennej, spersonalizowanej opieki,
                                            niezależnie od tego, gdzie się znajdujesz.
                                        </dd>
                                    </div>
                                    <div className='relative pl-16'>
                                        <dt className='text-base font-semibold leading-7 text-gray-900'>
                                            <div className='bg-indigo-600 absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg'>
                                                icon
                                            </div>
                                            Codzienne Raporty Samopoczucia
                                        </dt>
                                        <dd className='mt-2 text-base leading-7 text-gray-600'>
                                            Każdego dnia IZA prosi o wypełnienie krótkiego raportu
                                            na temat Twojego samopoczucia. Informacje te pomagają
                                            śledzić Twoje zdrowie i dostosowywać opiekę do Twoich
                                            aktualnych potrzeb.
                                        </dd>
                                    </div>
                                    <div className='relative pl-16'>
                                        <dt className='text-base font-semibold leading-7 text-gray-900'>
                                            <div className='bg-indigo-600 absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg'>
                                                icon
                                            </div>
                                            Udział w Zajęciach Placówki
                                        </dt>
                                        <dd className='mt-2 text-base leading-7 text-gray-600'>
                                            Nie możesz być osobiście na miejscu? Żaden problem! IZA
                                            oferuje funkcję zdalnego uczestnictwa w zajęciach i
                                            wydarzeniach organizowanych przez Twoją placówkę. Dołącz
                                            do streamingu na żywo i bądź częścią wspólnoty, nie
                                            wychodząc z domu.
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='bg-white py-24 sm:py-32'>
                    <div className='mx-auto max-w-7xl px-6 lg:px-4'>
                        <div className='mx-auto max-w-2xl lg:text-center'>
                            <p className='mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
                                Korzyści:
                            </p>
                            <p className='mt-6 text-lg leading-8 text-gray-600'>
                                Odkryj zalety korzystania z naszej aplikacji - spersonalizowaną
                                opiekę na każdym kroku oraz łatwą komunikację z ekspertami zawsze w
                                zasięgu Twojej ręki.
                            </p>
                        </div>

                        <div className='mt-16 grid max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-full lg:grid-cols-3'>
                            <div className='card w-96 bg-base-100 shadow-xl'>
                                <div className='card-body'>
                                    <h2 className='card-title'>Komfort i Bezpieczeństwo</h2>
                                    <p>
                                        Z IZA masz pewność, że Twoje potrzeby są monitorowane i że
                                        pomoc jest zawsze na wyciągnięcie ręki.
                                    </p>
                                </div>
                                <figure className='max-h-64'>
                                    <img src={Benefit1} alt='person_make_a_call' />
                                </figure>
                            </div>
                            <div className='card w-96 bg-base-100 shadow-xl'>
                                <div className='card-body'>
                                    <h2 className='card-title'>Personalizacja</h2>
                                    <p>
                                        Aplikacja dostosowuje się do Twojego rytmu dnia i
                                        indywidualnych potrzeb.
                                    </p>
                                </div>
                                <figure className='max-h-64'>
                                    <img src={Benefit2} alt='person_fullfilling_papers' />
                                </figure>
                            </div>
                            <div className='card w-96 bg-base-100 shadow-xl'>
                                <div className='card-body'>
                                    <h2 className='card-title'>Łączność</h2>
                                    <p>
                                        Utrzymuj stały kontakt z Twoją placówką i społecznością,
                                        nawet będąc w domu.
                                    </p>
                                </div>
                                <figure className='max-h-64'>
                                    <img src={Benefit3} alt='Shoes' />
                                </figure>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <footer className='bg-darkBlue p-10 text-center text-pureWhite'>
                <p>Copyright © 2024 - All right reserved by r_Com</p>
            </footer>
        </>
    );
};

export default LandingPage;
