import { Specification } from "../entities/specification";

interface ISpecificationRepositoryDTO {
    name: string;
    description: string;
}
interface ISpecificationRepository {
    create({ description, name }: ISpecificationRepositoryDTO): Promise<void>;
    findByName(name: string): Promise<Specification>;
}

export { ISpecificationRepository, ISpecificationRepositoryDTO };
