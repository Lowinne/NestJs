import { Test, TestingModule } from '@nestjs/testing';
import { ReservationService } from './reservation.service';

describe('ReservationService', () => {
  let service: ReservationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReservationService],
    }).compile();

    service = module.get<ReservationService>(ReservationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

/**
import { Test, TestingModule } from '@nestjs/testing';
import { ReservationService } from './reservation.service';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { Resa } from 'src/movies/entities/resa.entity';
import { User } from 'src/users/entities/user.entity';
import { Session } from 'src/movies/entities/session.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('ReservationService', () => {
  let service: ReservationService;
  let resaRepo: Repository<Resa>;
  let sessionRepo: Repository<Session>;
  let userRepo: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReservationService,
        { provide: getRepositoryToken(Resa), useClass: Repository },
        { provide: getRepositoryToken(Session), useClass: Repository },
        { provide: getRepositoryToken(User), useClass: Repository },
      ],
    }).compile();

    service = module.get<ReservationService>(ReservationService);
    resaRepo = module.get<Repository<Resa>>(getRepositoryToken(Resa));
    sessionRepo = module.get<Repository<Session>>(getRepositoryToken(Session));
    userRepo = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should create a reservation if session and user exist and user has not booked', async () => {
    jest.spyOn(sessionRepo, 'findOneBy').mockResolvedValue(new Session());
    jest.spyOn(userRepo, 'findOneBy').mockResolvedValue(new User());
    jest.spyOn(resaRepo, 'findOneBy').mockResolvedValue(null);
    jest.spyOn(resaRepo, 'save').mockResolvedValue({ id: 1, userId: 1, seanceId: "1" } as Resa);

    const result = await service.createResa(1, 1);
    expect(result).toEqual({ id: 1, userId: 1, seanceId: 1 });
  });

  it('should throw NotFoundException if session does not exist', async () => {
    jest.spyOn(sessionRepo, 'findOneBy').mockResolvedValue(null);

    await expect(service.createResa(1, 999)).rejects.toThrow(NotFoundException);
  });

  it('should throw ConflictException if user already booked the session', async () => {
    jest.spyOn(sessionRepo, 'findOneBy').mockResolvedValue(new Session());
    jest.spyOn(userRepo, 'findOneBy').mockResolvedValue(new User());
    jest.spyOn(resaRepo, 'findOneBy').mockResolvedValue(new Resa());

    await expect(service.createResa(1, 1)).rejects.toThrow(ConflictException);
  });

  it('should delete a reservation if it exists', async () => {
    jest.spyOn(resaRepo, 'findOneBy').mockResolvedValue({ id: 1, userId: 1, seanceId: "1" } as Resa);
    jest.spyOn(resaRepo, 'remove').mockResolvedValue({ id: 1, userId: 1, seanceId: "1" } as Resa);

    const result = await service.deleteResaofUser(1, 1);
    expect(result).toEqual({ id: 1, userId: 1, seanceId: 1 });
  });

  it('should throw NotFoundException when deleting non-existing reservation', async () => {
    jest.spyOn(resaRepo, 'findOneBy').mockResolvedValue(null);

    await expect(service.deleteResaofUser(1, 999)).rejects.toThrow(NotFoundException);
  });
});
*/