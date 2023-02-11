export interface DatabaseAdapter{
    select(query:string,replacement:([]|object)):Promise<object[]>
    insert(query:string,replacement:([]|object)):Promise<boolean>
    update(query:string,replacement:([]|object)):Promise<boolean>
    delete(query:string,replacement:([]|object)):Promise<boolean>
}