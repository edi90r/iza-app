import { routes } from '../../../../utils/routes';
import Breadcrumb from '../../Atoms/Breadcrumb/Breadcrumb';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import { v4 as uuidv4 } from 'uuid';

const Breadcrumbs = () => {
    const breadcrumbs = useBreadcrumbs(routes, {
        disableDefaults: true,
    });

    return (
        <div className='w-100 breadcrumbs p-0'>
            <ul className='p-4'>
                {breadcrumbs.map(({ breadcrumb, match }) => (
                    <li key={uuidv4()}>
                        <Breadcrumb path={match.pathname}>{breadcrumb}</Breadcrumb>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Breadcrumbs;
