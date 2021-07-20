import { IUserTokenDTO } from "../dtos/IUserTokenDTO";
import { UserToken } from "../infra/typeorm/entities/UserToken";

interface IUsersTokensRepository {
    create({
        user_id,
        refresh_token,
        expires_date,
    }: IUserTokenDTO): Promise<UserToken>;
    findByUserIdAndRefreshToken(
        user_id: string,
        refresh_token: string
    ): Promise<UserToken>;
    deleteById(id: string): Promise<void>;
    findByRefreshToken(refresh_token: string): Promise<UserToken>;
}

export { IUsersTokensRepository };
