/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schema/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  // Crear un nuevo usuario
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      const newUser = new this.userModel(createUserDto);
      return await newUser.save();
    } catch (error) {
      throw new InternalServerErrorException('Error creating user');
    }
  }

  // Obtener todos los usuarios
  async findAll(): Promise<User[]> {
    try {
      return await this.userModel.find().exec();
    } catch (error) {
      throw new InternalServerErrorException('Error fetching users');
    }
  }

  // Obtener un usuario por su ID
  async findById(id: string): Promise<User> {
    try {
      const user = await this.userModel.findById(id).exec();
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      return user;
    } catch (error) {
      throw new InternalServerErrorException('Error fetching user by ID');
    }
  }

  // Obtener un usuario por su correo electrónico
  async findOneByEmail(email: string): Promise<User | null> {
    try {
      return await this.userModel.findOne({ email }).exec();
    } catch (error) {
      throw new InternalServerErrorException('Error fetching user by email');
    }
  }

  // Actualizar un usuario por su ID
  async updateUser(id: string, updateData: Partial<User>): Promise<User> {
    try {
      if (updateData.password) {
        updateData.password = await bcrypt.hash(updateData.password, 10);
      }
      const updatedUser = await this.userModel
        .findByIdAndUpdate(id, updateData, { new: true })
        .exec();
      if (!updatedUser) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      return updatedUser;
    } catch (error) {
      throw new InternalServerErrorException('Error updating user');
    }
  }

  // Eliminar un usuario por su ID
  async deleteUser(id: string): Promise<User> {
    try {
      const deletedUser = await this.userModel.findByIdAndDelete(id).exec();
      if (!deletedUser) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      return deletedUser;
    } catch (error) {
      throw new InternalServerErrorException('Error deleting user');
    }
  }

  // Cambiar la contraseña de un usuario
  async changePassword(
    id: string,
    oldPassword: string,
    newPassword: string,
  ): Promise<User> {
    try {
      const user = await this.userModel.findById(id).exec();
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        throw new NotFoundException('Old password is incorrect');
      }

      user.password = await bcrypt.hash(newPassword, 10);
      return await user.save();
    } catch (error) {
      throw new InternalServerErrorException('Error changing password');
    }
  }

  // Obtener usuarios con un rol específico
  async findByRole(role: string): Promise<User[]> {
    try {
      return await this.userModel.find({ role }).exec();
    } catch (error) {
      throw new InternalServerErrorException('Error fetching users by role');
    }
  }

  // Verificar credenciales (para login)
  async verifyCredentials(
    email: string,
    plainPassword: string,
  ): Promise<User | null> {
    try {
      const user = await this.findOneByEmail(email);
      if (user && (await bcrypt.compare(plainPassword, user.password))) {
        return user;
      }
      return null;
    } catch (error) {
      throw new InternalServerErrorException('Error verifying credentials');
    }
  }
}
