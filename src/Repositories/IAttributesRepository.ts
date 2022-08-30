

export interface IAttributesRepository {
    save(attributes: string): Promise<any[]>
    show(attributes: any): Promise<any[]>
}