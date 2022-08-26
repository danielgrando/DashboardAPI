

export interface ICoursesRepository {
    index(courses: any): Promise<any[]>
    save(course: string): Promise<any[]>
    getAndCountStudents(): Promise<any[]>
} 