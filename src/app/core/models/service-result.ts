export interface ServiceResult<T> {

    correct: boolean;
    status: number;
    object: T | null;
    objects: T[];
    ErrorMessage: string;
    ex: any;

}
