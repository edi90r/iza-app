import avatar from '../../../../assets/iCons/avatar.svg';

const Avatar = () => {
    return (
        <div className='text-gray h-14 w-14'>
            <img src={avatar} alt='admin-avatar' />
        </div>
    );
};

export default Avatar;
