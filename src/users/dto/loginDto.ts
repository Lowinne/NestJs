import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, MinLength } from "class-validator";

export class LoginDto{
    @ApiProperty({
        description: "Email of the User",
        type: String,
        required: true,
        example: "test@provider.com"
    })
    @IsNotEmpty()
    readonly email: string;

    @ApiProperty({
        description: "password of the User",
        type: String,
        required: true,
        example: "test",
        minLength: 4
    })
    @IsNotEmpty()
    @MinLength(4, { message: 'Password must be at least 4 characters' })
    readonly password: string;
}