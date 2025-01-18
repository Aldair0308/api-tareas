
// deptos.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Depto } from './schemas/depto.schema';
import { CreateDeptoDto } from './dto/create-depto.dto';
import { UpdateDeptoDto } from './dto/update-depto.dto';

@Injectable()
export class DeptosService {
  constructor(
    @InjectModel('Depto') private readonly deptoModel: Model<Depto>,
  ) {}

  async create(createDeptoDto: CreateDeptoDto): Promise<Depto> {
    const newDepto = new this.deptoModel(createDeptoDto);
    return await newDepto.save();
  }

  async findAll(): Promise<Depto[]> {
    return await this.deptoModel.find().exec();
  }

  async findOne(id: string): Promise<Depto> {
    const depto = await this.deptoModel.findById(id).exec();
    if (!depto) {
      throw new NotFoundException(`Depto con el ID ${id} no encontrado`);
    }
    return depto;
  }

  async update(id: string, updateDeptoDto: UpdateDeptoDto): Promise<Depto> {
    const updatedDepto = await this.deptoModel.findByIdAndUpdate(id, updateDeptoDto, { new: true }).exec();
    if (!updatedDepto) {
      throw new NotFoundException(`Depto con el ID ${id} no encontrado`);
    }
    return updatedDepto;
  }

  async remove(id: string): Promise<{ message: string }> {
    const result = await this.deptoModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Depto con el ID ${id} no encontrado`);
    }
    return { message: `Depto con el ID ${id} ha sido eliminado` };
  }
}
