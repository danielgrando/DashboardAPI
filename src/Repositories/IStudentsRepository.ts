

export interface IStudentsRepository {
    save(student: string): Promise<any[]>
}