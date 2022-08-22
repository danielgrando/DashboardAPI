

export interface IAttributesRepository {
    save(attributes: string): Promise<any[]>
    index(attributes: any): Promise<any[]>
}