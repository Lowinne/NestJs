import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, MinLength } from "class-validator";

export class createResaDto {
    @ApiProperty({
        description: "id of the user that want to book",
        type: Number,
        required: true,
        example: 1
    })
    @IsNotEmpty()
    readonly userId: number;

    @ApiProperty({
        description: "id of the seance that will be book",
        type: Number,
        required: true,
        example: 1
    })
    @IsNotEmpty()
    readonly seanceId: number;
}