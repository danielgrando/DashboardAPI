

export interface ICampusRepository {
    save(campus: string): Promise<any[]>
    index(campus: any): Promise<any[]>
    findOne(campus: string): Promise<any[]>
    getCountAll(): Promise<any[]>
    getCoursesFromCampus(): Promise<any[]>
    getAll(): Promise<any[]>
}