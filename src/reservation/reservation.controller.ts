import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { createResaDto } from './dto/createResaDto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('reservation')
export class ReservationController {
    constructor(private readonly reservationService : ReservationService){}

    @ApiResponse({ status: 404, description: "booking or user not found"})
    @ApiResponse({ status: 201, description: "Booking created"})
    @Post('create')
    async createResa(@Body() createResa : createResaDto){
        return this.reservationService.createResa(createResa.userId, createResa.seanceId);
    }

    @ApiResponse({ status: 404, description: "booking or user not found"})
    @ApiResponse({ status: 201, description: "Booking deleted"})
    @Delete('delete')
    async deleteResa(@Body() createResa : createResaDto){
        return this.reservationService.deleteResaofUser(createResa.userId, createResa.seanceId)
    }

    @ApiResponse({ status: 404, description: "user not found"})
    @ApiResponse({ status: 201, description: "List of booking"})
    @Get('resa')
    async getBookingOfUser(@Body() userId: number){
        return this.reservationService.getResaOfUser(userId);
    }
}
