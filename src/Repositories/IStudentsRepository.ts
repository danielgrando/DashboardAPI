
export interface IStudentsRepository {
    save(student: string): Promise<any[]>
    indexByNames(students: string[]): Promise<any[]>
    getByDateStartAndEnd(start: string, end: string): Promise<any[]>
    getByStatus(status: string): Promise<any[]>
}