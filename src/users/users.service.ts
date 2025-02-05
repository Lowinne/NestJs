import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private dataSource: DataSource,
    private jwtService: JwtService
  ) {}

  update(arg0: number, updateUserDto: UpdateUserDto) {
    throw new Error('Method not implemented.');
  }
  async create(createUserDto: RegisterDto) {

    //Check if the email is already taken
    const findUserByEmail = await this.findOnebyEmail(createUserDto.email)
    if(findUserByEmail){
      throw new ConflictException("Email already taken");
    }

    //Check if the pseudo is already taken
    const findUserByPseudo = await this.findOnebyEmail(createUserDto.pseudo)
    if(findUserByPseudo){
      throw new ConflictException("Pseudo already taken");
    }

    //hachage du mot de passe
    const saltOrRounds = await bcrypt.genSalt();
    const password = createUserDto.password;
    const hash = await bcrypt.hash(password, saltOrRounds);
    
    //Creation de l'objet a sauvegarder
    const user = {
      email : createUserDto.email,
      pseudo : createUserDto.pseudo,
      firstName : createUserDto.firstName,
      lastName : createUserDto.lastName,
      password : hash
    }

    //Sauvegarde
    this.usersRepository.create(user);
    const savedUser = await this.usersRepository.save(user);

    //Renvoi de l'objet créer
    return { 
      message: "Utilisateur sauvegarder",
      user: {
        email : savedUser.email,
        pseudo : savedUser.pseudo,
        firstName : savedUser.firstName,
        lastName : savedUser.lastName,
        }
     }
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOnebyEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email });
  }

  findOnebyPseudo(pseudo: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ pseudo });
  }
  

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
  async createMany(users: User[]) {
    await this.dataSource.transaction(async manager => {
      await manager.save(users[0]);
      await manager.save(users[1]);
    });
  }

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.findOnebyEmail(email);
    if(!user){
      throw new NotFoundException("Utilisateur non trouvé");
    }
    //Verifie si le mot de passe haché correspond
    const isMatch = await bcrypt.compare(pass, user.password);
    console.log(isMatch)
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.pseudo };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}