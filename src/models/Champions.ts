export class Champions {    
    constructor(
        private id: string,
        private name: string,
        private type: string,
        private role: string,
        private createdAt: string
    ) {}

    public getId(): string {
        return this.id
    }
    
    public setId(value: string): void {
        this.id = value
    }

    public getName(): string {
        return this.name
    }

    public setName(value: string): void {
        this.name = value
    }

    public getType(): string {
        return this.type
    }

    public setType(value: string): void {
        this.type = value
    }

    public getRole(): string {
        return this.role
    }

    public setRole(value: string): void {
        this.role = value
    }

    public getCreatedAt(): string {
        return this.createdAt
    }

    public setCreatedAt(value: string): void {
        this.createdAt = value
    }
}