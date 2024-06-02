interface IError {
    PAGE_NOT_EXIST: string
    ACCESS_DENIED: string
}

export const ERROR: IError = {
    PAGE_NOT_EXIST: 'Такая страница не существует',
    ACCESS_DENIED: 'Доступ запрещен',
}