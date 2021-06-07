import { Specification } from "../entities/specification";

interface ISpecificationRepositoryDTO {
    name: string;
    description: string;
}
interface ISpecificationRepository {
    create({ description, name }: ISpecificationRepositoryDTO): void;
    findByName(name: string): Specification;
}

export { ISpecificationRepository, ISpecificationRepositoryDTO };
