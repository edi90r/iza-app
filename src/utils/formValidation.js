import Joi from 'joi';
import { joiPasswordExtendCore } from 'joi-password';
import { validatePesel, validatePhoneNumber } from './helpers';

const joiPassword = Joi.extend(joiPasswordExtendCore);

const schemaFormObj = {
    name: Joi.string()
        .min(3)
        .max(19)
        .regex(/^[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźżA-Z '.-]*[^-]$/)
        .required()
        .messages({
            'string.base': 'Imię użytkownika musi być stringiem',
            'string.min': 'Imię użytkownika musi się składać z conajmniej 3 znaków',
            'string.max': 'Imię użytkownika musi się składać z conajmniej 19 znaków',
            'string.pattern.base': 'Imię użytkwownika musi zaczynać się dużą literą',
            'string.empty': 'Imię użytkownika nie może być puste',
            'any.required': 'Imię użytkownika jest wymagane',
        }),
    lastname: Joi.string()
        .min(3)
        .max(30)
        .regex(/^[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźżA-Z '.-]*[^-]$/)
        .required()
        .messages({
            'string.base': 'Nazwisko użytkownika musi być stringiem',
            'string.min': 'Nazwisko użytkownika musi się składać z conajmniej 3 znaków',
            'string.max': 'Nazwisko użytkownika musi się składać z conajmniej 19 znaków',
            'string.pattern.base': 'Nazwisko użytkwownika musi zaczynać się dużą literą',
            'string.empty': 'Nazwisko użytkownika nie może być puste',
            'any.required': 'Nazwisko użytkownika jest wymagane',
        }),
    email: Joi.string()
        .email({ tlds: { value: ['com', 'pl', 'com.pl'] } })
        .required()
        .messages({
            'string.base': 'Email musi być stringiem',
            'string.email': 'Podany email jest nie prawidłowy',
            'string.empty': 'Email jest wymagany',
        }),
    password: joiPassword
        .string()
        .minOfNumeric(1)
        .minOfUppercase(1)
        .minOfLowercase(1)
        .min(8)
        .max(16)
        .noWhiteSpaces()
        .required()
        .messages({
            'string.base': 'Hasło musi być stringiem',
            'password.minOfNumeric': 'Podane hasło musi zawierać przynajmniej jedna cyfrę',
            'password.minOfUppercase':
                'Podane hasło musi zawierać przynajmniej jedną wielką literę',
            'password.minOfLowercase': 'Podane hasło musi zawierać przynajmniej jedną małą literę',
            'string.min': 'Podane hasło musi zawierać co najmniej 8 znaków',
            'string.max': 'Podane hasło może zawierać maksymalnie 16 znaków',
            'password.noWhiteSpaces': 'Podane hasło nie może zawierać żadnych białych znaków',
            'string.empty': 'Hasło jest wymagane',
        }),
    repeatPassword: Joi.any()
        .equal(Joi.ref('password'))
        .messages({ 'any.only': 'Podane hasła różnią się od siebie' }),
    dateOfBirth: Joi.date().min('1920-01-01').max('1970-01-01').messages({
        'date.base': 'Podaj prawidłową datę',
        'date.min': 'Data urodzenia nie może być wcześniejsza niż 1920-01-01',
        'date.max': 'Data urodzenia nie może być późniejsza niż 1970-01-01',
    }),
    personalIdentityNumber: Joi.number().required().custom(validatePesel).messages({
        'number.base': 'Pesel jest wymagany',
        'any.invalid': 'Podany pesel jest nie prawidłowy',
    }),

    city: Joi.string()
        .min(3)
        .max(30)
        .regex(/^[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźżA-Z '.-]*[^-]$/)
        .required()
        .messages({
            'string.base': 'Nazwa miasta musi być tekstem',
            'string.min': 'Nazwa miasta musi mieć co najmniej 3 znaki',
            'string.max': 'Nazwa miasta nie może być dłuższa niż 30 znaków',
            'string.pattern.base': 'Nazwa miasta musi zaczynać się dużą literą',
            'string.empty': 'Proszę podać nazwę miasta',
        }),
    street: Joi.string().allow('').min(3).max(100).messages({
        'string.base': 'Nazwa ulicy musi być tekstem',
        'string.min': 'Nazwa ulicy musi mieć co najmniej 3 znaki',
        'string.max': 'Nazwa ulicy nie może być dłuższa niż 100 znaków',
    }),
    houseNumber: Joi.number().min(1).required().messages({
        'number.base': 'Numer budynku musi składać się z cyfr',
        'number.min': 'Numer budynku musi być większy od 0',
        'number.empty': 'Proszę podać numer budynku',
    }),
    apartmentNumber: Joi.number().allow('').messages({
        'number.base': 'Numer mieszkania musi składać się z cyfr',
    }),
    phoneNumber: Joi.number().required().custom(validatePhoneNumber).messages({
        'number.base': 'Numer telefonu musi składać się z cyfr',
        'number.empty': 'Proszę podać numer telefonu',
    }),

    describe: Joi.string().min(15).max(300).required().messages({
        'string.min': 'Opis pacjenta nie może być krótszy niż 15 znaków',
        'string.max': 'Opis pacjenta nie może być dłuższy  niż 300 znaków',
        'string.empty': 'Proszę podać opis użytkownika',
        'any.required': 'Proszę podać opis użytkownika',
    }),
};

const schemaNoteObj = {
    note: Joi.string().min(15).max(300).required().messages({
        'string.min': 'Notatka nie może być krótsza niż 15 znaków',
        'string.max': 'Notatka nie może być dłuższa  niż 300 znaków',
        'string.empty': 'Nie możesz wysłać pustej notatki',
    }),
};

export const UserPersonalDataSchema = Joi.object(schemaFormObj).fork(
    [
        'city',
        'street',
        'houseNumber',
        'apartmentNumber',
        'phoneNumber',
        'email',
        'password',
        'repeatPassword',
    ],
    (schema) => schema.allow('').optional(),
);
export const UserContactDataSchema = Joi.object(schemaFormObj).fork(
    [
        'name',
        'lastname',
        'dateOfBirth',
        'personalIdentityNumber',
        'email',
        'password',
        'repeatPassword',
    ],
    (schema) => schema.allow('').optional(),
);

export const UserCredentialsSchema = Joi.object(schemaFormObj).fork(
    [
        'name',
        'lastname',
        'dateOfBirth',
        'personalIdentityNumber',
        'city',
        'street',
        'houseNumber',
        'apartmentNumber',
        'phoneNumber',
        'describe',
    ],

    (schema) => schema.allow('').optional(),
);
export const EditUserSchema = Joi.object(schemaFormObj).fork(
    ['email', 'password', 'repeatPassword'],

    (schema) => schema.allow('').optional(),
);

export const UserDataSummarySchema = Joi.object(schemaFormObj);
export const ContactRequestNoteSchema = Joi.object(schemaNoteObj);
