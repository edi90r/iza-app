import { routes } from '../../../../utils/routes';
import Breadcrumb from '../../Atoms/Breadcrumb/Breadcrumb';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import { v4 as uuidv4 } from 'uuid';

const Breadcrumbs = () => {
    const breadcrumbs = useBreadcrumbs(routes, {
        disableDefaults: true,
    });

    return (
        <div className='top-bar-height w-100 breadcrumbs hidden border-b border-primary text-sm lg:flex'>
            <ul className='p-4'>
                {breadcrumbs.map(({ breadcrumb, match }, index) => (
                    <li key={uuidv4()}>
                        <Breadcrumb
                            path={match.pathname}
                            last={index === breadcrumbs.length - 1 ? true : null}
                        >
                            {breadcrumb}
                        </Breadcrumb>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Breadcrumbs;
