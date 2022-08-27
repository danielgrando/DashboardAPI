
export interface IStudentsRepository {
    save(student: string): Promise<any[]>
    indexByNames(students: string[]): Promise<any[]>
    getStudentsByDateStartAndEnd(start: any, end: any): Promise<any[]>
}