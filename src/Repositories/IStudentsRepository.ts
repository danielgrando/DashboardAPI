
export interface IStudentsRepository {
    save(student: string): Promise<any[]>
    indexByNames(students: string[]): Promise<any[]>
}