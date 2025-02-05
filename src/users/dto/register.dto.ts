import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterDto {

    @ApiProperty({
        description: "Email of the User",
        type: String,
        required: true,
        example: "test@provider.com",
    })
    @IsEmail()
    readonly email: string;

    @ApiProperty({
        description: "Pseudo of the User",
        type: String,
        required: true,
        example: "thanos"
    })
    @IsNotEmpty()
    readonly pseudo: string;

    @ApiProperty({
        description: "first name of the User",
        type: String,
        required: true,
        example: "Jean"
    })
    @IsNotEmpty()
    readonly firstName: string;

    @ApiProperty({
        description: "last name of the User",
        type: String,
        required: true,
        example: "Martin"
    })
    @IsNotEmpty()
    readonly lastName: string;

    @ApiProperty({
        description: "password of the User",
        type: String,
        required: true,
        example: "test"
    })
    @IsNotEmpty()
    readonly password: string;
}
