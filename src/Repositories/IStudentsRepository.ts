
export interface IStudentsRepository {
    save(student: string): Promise<any[]>
    index(students: string[]): Promise<any[]>
}